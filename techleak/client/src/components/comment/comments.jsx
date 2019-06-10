import React from "react";
import Comment from "./comment";

const Comments = props => {
  return (
    <div>
      <h1>Comments Section</h1>
      <br />

      {props.comments.map((comment, index) => (
        <Comment key={index} comment={comment} />
      ))}
      <article class="media">
        <figure class="media-left">
          <p class="image is-64x64">
            <img src="https://bulma.io/images/placeholders/128x128.png" />
          </p>
        </figure>
        <div class="media-content">
          <div class="field">
            <p class="control">
              <textarea class="textarea" placeholder="Add a comment..." />
            </p>
          </div>
          <div class="field">
            <p class="control">
              <button class="button">Post comment</button>
            </p>
          </div>
        </div>
      </article>
    </div>
  );
};

export default Comments;
