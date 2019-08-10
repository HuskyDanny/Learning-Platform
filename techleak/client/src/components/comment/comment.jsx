import React, { Component } from "react";
import Replies from "./replies";
import { connect } from "react-redux";
import axios from "../../axios/axios-blogs";
import elapsed from "../../utils/getElapsed";

class Comment extends Component {
  state = { replyBox: false, body: "" };
  openReply = () => {
    this.setState({ replyBox: !this.state.replyBox });
  };
  onChange = e => {
    e.preventDefault();
    this.setState({ body: e.target.value });
  };
  handleDelete = () => {
    axios
      .delete(
        `api/posts/comments/${this.props.blogID}?commentId=${
          this.props.comment._id
        }`
      )
      .then(res => {
        this.props.deleteComment(this.props.comment._id);
      });
  };
  handleReply = () => {
    axios
      .patch(
        `/api/posts/comments/reply/${this.props.blogID}?commentId=${
          this.props.comment._id
        }`,
        {
          reply: {
            body: this.state.body,
            username: this.props.username,
            userId: this.props.userId,
            post_date_timestamp: new Date().getTime()
          }
        }
      )
      .then(res => {
        this.props.addReply({
          ...res.data,
          commentRef: this.props.comment._id
        });
        this.setState({ body: "" });
      });
  };
  showReplyBox = () => {
    if (this.state.replyBox) {
      return (
        <div className="field has-addons">
          <div class="control" style={{ width: "100%" }}>
            <input
              class="input is-rounded"
              type="text"
              placeholder="reply something..."
              onChange={this.onChange}
              value={this.state.body}
            />
          </div>
          <div class="control">
            <a class="button is-info" onClick={this.handleReply}>
              <i class="fas fa-reply" />
            </a>
          </div>
        </div>
      );
    }
  };
  render() {
    const deleteButton = (
      <a onClick={this.handleDelete}>
        <i class="fas fa-backspace" />
      </a>
    );
    return (
      <article className="media" style={{ marginBottom: "1%" }}>
        <figure className="media-left">
          <p className="image is-64x64">
            <img
              src={
                this.props.comment.avatar ||
                "https://bulma.io/images/placeholders/128x128.png"
              }
              alt="placeholder"
            />
          </p>
        </figure>
        <div className="media-content">
          <div className="content">
            <p>
              <div className="level" style={{ marginBottom: "0px" }}>
                <strong>{this.props.comment.username}</strong>
                {this.props.comment.userId === this.props.userId
                  ? deleteButton
                  : null}
              </div>
              {this.props.comment.body}
              <br />
              <small>
                <a>{`Like ${this.props.comment.like}`}</a> ·{" "}
                <a onClick={this.openReply}>Reply</a> ·{" "}
                {elapsed(
                  new Date().getTime() - this.props.comment.post_date_timestamp
                )}{" "}
                Ago
              </small>
            </p>
            {this.showReplyBox()}
          </div>
          {this.props.replies.length > 0 ? (
            <Replies
              replies={this.props.replies.filter(
                reply => reply.commentRef === this.props.comment._id
              )}
              blogId={this.props.blogID}
            />
          ) : null}
        </div>
      </article>
    );
  }
}

const mapStateToProps = state => {
  return {
    replies: state.persistedReducer.replies,
    userId: state.persistedReducer.userID,
    username: state.persistedReducer.username
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addReply: reply => dispatch({ type: "ADDREPLY", reply: reply }),
    deleteComment: id => dispatch({ type: "DELETECOMMENT", id: id })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comment);
