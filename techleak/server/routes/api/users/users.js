const { userValidator, User } = require("../../../models/Users");
const { Router } = require("express");
const passport = require("passport");
const auth = require("../../auth");
const sgMail = require("../../../config/sgMail");

const router = Router();

router.get("/all", auth.required, async (req, res) => {
  try {
    let users = await User.find();
    users = users.map(user => user.userView());
    return res.json(users);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

router.get("/", auth.required, async (req, res) => {
  const {
    payload: { _id }
  } = req;

  try {
    const user = await User.findOne({ _id: _id });
    if (!user) return res.status(400).json("User not Found");
    return res.json({ user: user.userView() });
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

router.patch("/tags/:id", auth.required, async (req, res) => {
  const {
    body: { tags },
    params: { id }
  } = req;

  try {
    const user = await User.findOneAndUpdate(
      { _id: id },
      { tags: tags },
      { new: true }
    );
    return res.json(user.userView());
  } catch (error) {
    return res.json(error.message);
  }
});

router.post("/signup", auth.optional, async (req, res) => {
  //wrap everything as user
  const {
    body: { user }
  } = req;

  //validate content
  const { error } = userValidator(user);
  if (error) return res.status(400).json(error.message);

  //salt and hash the newuser
  let newUser = new User(user);
  newUser.setPassword(user.password);

  //save to mongodb
  try {
    newUser = await newUser.save();
    const msg = {
      to: newUser.email,
      from: "junchenp1018@gmail.com",
      subject: "Welcome to TechLeak, Enjoy Learning",
      text: "and easy to do anywhere, even with Node.js",
      html: "<strong>and easy to do anywhere, even with Node.js</strong>"
    };
    await sgMail.send(msg);
    return res.status(201).json(newUser.toAuthJSON());
  } catch (error) {
    //duplicate error return to user
    if (error.code === 11000) {
      let message = { email: "", username: "" };
      if (error.errmsg.includes("email")) {
        message.email = "email has been taken";
      }
      if (error.errmsg.includes("username")) {
        message.username = "username has been taken";
      }
      return res.status(400).json(message);
    }
  }
});

router.post("/login", (req, res) => {
  return passport.authenticate("local", { session: false }, function(
    err,
    user,
    info
  ) {
    if (err) {
      next(err);
    }
    if (user) {
      return res.json(user.toAuthJSON());
    }
    return res.status(400).json(info);
  })(req, res);
});

module.exports = router;
