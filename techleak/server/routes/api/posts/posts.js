const { postValidator, Post } = require("../../../models/Posts");
const { Router } = require("express");
const auth = require("../../auth");
const { index, algoliaSchema } = require("../../../config/algolia");
const router = Router();
const { Comment, commentValidator } = require("../../../models/Comments");
const _ = require("lodash");

router.get("/", auth.required, async (req, res) => {
  try {
    const posts = await Post.find();
    return res.send(posts);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.get("/:id", auth.optional, async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });
    return res.send(post);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.post("/", auth.required, async (req, res, next) => {
  const result = await postValidator(req.body);
  if (result.error) return res.status(400).send(error.message);

  try {
    //save to db
    const dbSchema = {
      title: result.title,
      author: result.author,
      content: result.content,
      tags: result.tags ? result.tags : [],
      likes: result.likes ? result.likes : 0
    };

    let post = new Post(dbSchema);
    post = await post.save();

    //save to algolia
    let algoSchema = _.pick(post, algoliaSchema);
    algoSchema["objectID"] = post._id;
    await index.addObjects([algoSchema]);

    res.status(201).json(post);
  } catch (error) {
    return res.status(400).json(error.message);
  }
});

router.delete("/:id", (req, res) => {
  const promiseAlgolia = index.deleteObject(req.params.id);

  const promiseMongo = Post.findOneAndDelete({ _id: req.params.id });

  Promise.all([promiseAlgolia, promiseMongo])
    .then(content => res.json(content))
    .catch(err => res.status(500).json(err.message));
});

router.patch("/likes/:id", auth.required, (req, res) => {
  const promiseMongo = Post.findOneAndUpdate(
    { _id: req.params.id },
    { $inc: { likes: 1 } },
    { new: true }
  );

  const promiseAlgolia = index
    .getObject(req.params.id, ["likes"])
    .then(content =>
      index.partialUpdateObject({
        likes: content.likes + 1,
        objectID: req.params.id
      })
    )
    .catch(err => res.status(500).json(err.message));

  //only fetching the first object returned by algolia
  Promise.all([promiseAlgolia, promiseMongo])
    .then(content => res.json(content[0]))
    .catch(err => res.status(500).json(err.message));
});

router.patch("/comments/:id", auth.required, async (req, res) => {
  try {
    const post = await Post.findOneAndUpdate(
      { _id: req.params.id },
      {
        $push: {
          comments: new Comment(req.body.comment)
        }
      },
      { new: true }
    );

    if (!post) return res.status(400).send("Post not Found");

    return res.json(post);
  } catch (error) {
    return res.json(error);
  }
});

router.patch("/tags/:id", auth.required, async (req, res) => {
  try {
    const post = await Post.findOneAndUpdate(
      { _id: req.params.id },
      { tags: req.body.tags },
      { new: true }
    );

    if (!post) return res.status(400).send("Post not Found");

    return res.json(post);
  } catch (error) {
    return res.json(error);
  }
});

module.exports = router;
