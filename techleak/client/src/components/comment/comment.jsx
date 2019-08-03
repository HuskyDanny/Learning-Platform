import React, { Component } from "react";
import Replies from "./replies";
import { connect } from "react-redux";
import axios from "../../axios-blogs";
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
            userID: this.props.userID,
            post_date_timestamp: new Date().getTime()
          }
        },
        headers
      )
      .then(res => {
        this.props.addReply({
          ...res.data,
          commentRef: this.props.comment._id
        });
        this.setState({ body: "" });
      })
      .catch(err => {
        console.log(err);
        console.log("error");
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
    return (
      <article className="media">
        <figure className="media-left">
          <p className="image is-64x64">
            <img
              src={
                this.props.avatar ||
                "https://bulma.io/images/placeholders/128x128.png"
              }
              alt="placeholder"
            />
          </p>
        </figure>
        <div className="media-content">
          <div className="content">
            <p>
              <strong>{this.props.comment.username}</strong>
              <br />
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
    userID: state.persistedReducer.userID,
    username: state.persistedReducer.username,
    avatar: state.persistedReducer.avatar
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addReply: reply => dispatch({ type: "ADDREPLY", reply: reply })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comment);
