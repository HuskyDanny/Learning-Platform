const mongoose = require("mongoose");

const Joi = require("joi");

const commentSchema = new mongoose.Schema({
  body: { type: String, required: true },
  date: { type: Date, default: Date.now },
  replies: [String]
});

const Comment = mongoose.model("Comment", commentSchema);

const commentValidator = comment => {
  const joiCommentSchema = {
    body: Joi.string().required(),
    date: Joi.string().required()
  };
  return Joi.validate(comment, joiCommentSchema);
};
module.exports.Comment = Comment;
module.exports.commentValidator = commentValidator;
