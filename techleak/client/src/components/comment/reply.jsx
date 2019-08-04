import React from "react";
import elapsed from "../../utils/getElapsed";
const Reply = props => {
  return (
    <div className="content">
      <p>
        <strong>{props.reply.username}</strong>
        <br />
        {props.reply.body}
        <br />
        <small>
          <a>{`Like ${props.reply.like}`}</a> ·{" "}
          {elapsed(new Date().getTime() - props.reply.post_date_timestamp)} Ago
        </small>
      </p>
    </div>
  );
};

export default Reply;

console.log(new Date().getTime());
