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
      <article className="media">
        <figure className="media-left">
          <p className="image is-64x64">
            <img src="https://bulma.io/images/placeholders/128x128.png" />
          </p>
        </figure>
        <div className="media-content">
          <div className="field">
            <p className="control">
              <textarea className="textarea" placeholder="Add a comment..." />
            </p>
          </div>
          <div className="field">
            <p className="control">
              <button className="button">Post comment</button>
            </p>
          </div>
        </div>
      </article>
    </div>
  );
};

export default Comments;
