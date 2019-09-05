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
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
        withCredentials: true
      }
    };
    axios
      .patch(
        `/api/posts/comments/reply/${this.props.blogID}?commentId=${
          this.props.comment._id
        }`,
        {
          reply: {
            body: this.state.body,
            username: this.props.username,
            userID: this.props.userId,
            post_date_timestamp: new Date().getTime()
          }
        },
        headers
      )
      .then(res => {
        console.log(res);
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
        <div className="field has-addons" style={{ paddingTop: "5px" }}>
          <div className="control" style={{ width: "100%" }}>
            <input
              className="input is-rounded"
              type="text"
              placeholder="reply something..."
              onChange={this.onChange}
              value={this.state.body}
            />
          </div>
          <div className="control">
            <button className="button is-info" onClick={this.handleReply}>
              <i className="fas fa-reply" />
            </button>
          </div>
        </div>
      );
    }
  };
  render() {
    const deleteButton = (
      <button className="button is-white" onClick={this.handleDelete}>
        <i className="fas fa-backspace" />
      </button>
    );
    return (
      <article className="media">
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
            <div>
              <div className="level" style={{ marginBottom: "0px" }}>
                <div style={{ fontSize: "0.8em", display:'inline-block'}}>
                  <strong>
                    <h5 style={{ display: "inline" }}>
                      {this.props.comment.username + " "}
                    </h5>
                  </strong>
                  <i class="fas fa-book"> {this.props.comment.knowledge} </i>{" "}
                  <i class="fas fa-award"> {this.props.comment.reputation}</i>
                </div>
                {this.props.comment.userId === this.props.userId
                  ? deleteButton
                  : null}
              </div>
              {this.props.comment.body}
              <br />

              <small>
                {" "}
                <button
                  class="button is-small is-light"
                  onClick={this.openReply}
                >
                  Reply
                </button>{" "}
                ·{" "}
                {elapsed(
                  new Date().getTime() - this.props.comment.post_date_timestamp
                )}{" "}
                Ago
              </small>
            </div>
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
    username: state.persistedReducer.username,
    reputation: state.persistedReducer.reputation
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
