import React from "react";
import Reply from "./reply";

const Replies = props => {
  return (
    <article className="media">
      <div className="media-content">
        {props.replies.map((reply, index) => (
          <Reply key={index} reply={reply} blogId={props.blogId} />
        ))}
      </div>
    </article>
  );
};

export default Replies;
