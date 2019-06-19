import React, { Component } from "react";
import Comment from "./comment";
import axios from "../../axios-blogs";
import { connect } from "react-redux";

class Comments extends Component {
  state = {
    body: ""
  };
  onChange = e => {
    e.preventDefault();
    this.setState({ body: e.target.value });
  };
  handlePost = () => {
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
        withCredentials: true
      }
    };
    axios.patch(
      "/api/posts/comments/5d00b108eadb8845bf470b66",
      {
        content: this.state.body
      },
      headers
    );
    this.props.addComment(this.state.body);
    this.setState({ body: "" });
  };
  render() {
    return (
      <div>
        <h1>Comments Section</h1>
        <br />

        {this.props.comments.map((comment, index) => (
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
                <textarea
                  className="textarea"
                  value={this.state.body}
                  onChange={this.onChange}
                  placeholder="Add a comment..."
                />
              </p>
            </div>
            <div className="field">
              <p className="control">
                <button className="button" onClick={this.handlePost}>
                  Post comment
                </button>
              </p>
            </div>
          </div>
        </article>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    comments: state.comments
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
)(Comments);
