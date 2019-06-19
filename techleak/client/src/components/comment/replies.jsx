import React from "react";
import Reply from "./reply";

const Replies = props => {
  console.log(props.replies);
  return (
    <article class="media">
      <div class="media-content">
        {props.replies.map((reply, index) => (
          <Reply key={index} reply={reply} />
        ))}
      </div>
    </article>
  );
};

export default Replies;
