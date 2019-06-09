const { Router } = require("express");
const mongoose = require("mongoose");

const Joi = require("joi");

const availableTags = [
  "python",
  "javascript",
  "java",
  "golang",
  "interview",
  "database",
  "10xcoder",
  "network",
  "database",
  "compiler",
  "concurrency"
];

const Comment = new mongoose.Schema({
  body: String,
  date: String
});

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  tags: {
    type: [String],
    enum: availableTags,
    lowercase: true
  },
  likes: { type: Number },
  post_date_timestamp: {
    type: Number,
    default: new Date().getTime()
  },
  author: { type: String, require: true },
  content: { type: String, required: true },
  comments: [Comment]
});

const Post = mongoose.model("Post", postSchema);

const validatePost = post => {
  const joiPostSchema = {
    title: Joi.string()
      .required()
      .min(5)
      .max(50),
    author: Joi.string().required(),
    content: Joi.string().required(),
    tags: Joi.array(),
    likes: Joi.number()
  };
  return Joi.validate(post, joiPostSchema);
};
module.exports.Post = Post;
module.exports.postValidator = validatePost;
