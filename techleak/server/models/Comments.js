const mongoose = require("mongoose");

const Joi = require("joi");

const commentSchema = new mongoose.Schema({
  body: { type: String, required: true },
  date: { type: Date, default: Date.now },
  like: { type: Number, default: 0 },
  replies: [String]
});

const Comment = mongoose.model("Comment", commentSchema);

const commentValidator = comment => {
  const joiCommentSchema = {
    body: Joi.string().required(),
    date: Joi.string(),
    replies: Joi.array()
  };
  return Joi.validate(comment, joiCommentSchema);
};
module.exports.Comment = Comment;
module.exports.commentSchema = commentSchema;
module.exports.commentValidator = commentValidator;
