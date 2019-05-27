const { Router } = require("express");
const mongoose = require("mongoose");

const Joi = require("joi");

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    tags: {
      type: [String],
      enum: [
        "python",
        "javascript",
        "java",
        "interview",
        "database",
        "10xcoder"
      ],
      required: true,
      lowercase: true
    },
    likes: { type: Number },
    datePosted: {
      type: Date
    },
    author: { type: String, require: true },
    content: { type: String, required: true },
    offset: { type: Number }
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

const validatePost = post => {
  const joiPostSchema = {
    title: Joi.string()
      .required()
      .min(5)
      .max(50),
    author: Joi.string().required(),
    content: Joi.string().required(),
    tags: Joi.array()
  };
  return Joi.validate(post, joiPostSchema);
};

module.exports.Post = Post;
module.exports.postValidator = validatePost;
