import React from "react";

const Reply = props => {
  return (
    <div class="content">
      <p>
        <strong>{props.reply.username}</strong>
        <br />
        {props.reply.body}
        <br />
        <small>
          <a>{`Like ${props.reply.like}`}</a> · 2 hrs
        </small>
      </p>
    </div>
  );
};

export default Reply;
