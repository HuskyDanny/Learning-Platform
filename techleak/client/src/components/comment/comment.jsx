import React from "react";
import Replies from "./replies";
import { connect } from "react-redux";

const Comment = props => {
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
        {props.replies.length > 0 ? (
          <Replies
            replies={props.replies.filter(
              reply => reply.commentRef === props.comment._id
            )}
          />
        ) : null}
      </div>
    </article>
  );
};

const mapStateToProps = state => {
  return {
    replies: state.replies
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addComment: body => dispatch({ type: "ADDCOMMENT", body: body })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comment);
