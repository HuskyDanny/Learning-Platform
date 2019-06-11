import React from "react";
import Replies from "./replies";

const Comment = props => {
  console.log(props.comment.replies);
  return (
    <article className="media">
      <figure className="media-left">
        <p className="image is-64x64">
          <img
            src="https://bulma.io/images/placeholders/128x128.png"
            alt="placeholder"
          />
        </p>
      </figure>
      <div className="media-content">
        <div className="content">
          <p>
            <strong>{props.comment.username}</strong>
            <br />
            {props.comment.body}
            <br />
            <small>
              <a>{`Like ${props.comment.like}`}</a> · <a>Reply</a> · 3 hrs
            </small>
          </p>
        </div>
        {props.comment.replies.length > 0 ? (
          <Replies replies={props.comment.replies} />
        ) : null}
      </div>
    </article>
  );
};

export default Comment;
