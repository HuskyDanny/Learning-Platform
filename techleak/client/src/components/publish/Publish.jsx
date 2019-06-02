import axios from "axios";
import React, { Component } from "react";
import Editor from "../editor/Editor";
import { Link } from "react-router-dom";
import image from "../../assets/img/logo.jpg";
import DropDown from "../dropdown/dropdown";
import Spinner from "../UI/Spinner/Spinner";
class Publish extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      posted: false,
      content: "",
      author: "Allen",
      title: "How to construct a class in python",
      tags: ["python", "interview"]
    };

    this.handlePost = this.handlePost.bind(this);
    this.successPosted = this.successPosted.bind(this);
    this.updateContent = this.updateContent.bind(this);
  }

  handlePost() {
    const token = localStorage.getItem("token");

    const post = {
      author: this.state.author,
      title: this.state.title,
      content: this.state.content,
      tags: this.state.tags || []
    };
    this.setState({ loading: true });

    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + token
      }
    };
    axios
      .post("http://localhost:3000/api/posts", post, headers)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
    this.setState({ posted: true, loading: false });
  }

  updateContent = value => {
    this.setState({ content: value });
  };

  // handleTags = e => {
  //   e.preventDefault();
  //   this.setState({ tags: e.target.value });
  // };

  handleTitle = e => {
    e.preventDefault();
    this.setState({ title: e.target.value });
  };
  successPosted() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: "10%"
        }}
      >
        <i
          className="far fa-check-circle "
          style={{
            color: "green",
            fontSize: "100px",
            margin: "auto auto "
          }}
        />
        <p
          style={{
            marginTop: "10%",
            margin: "auto auto"
          }}
        >
          Successfully Posted
        </p>
        <Link
          to="/index"
          className="button is-success"
          style={{
            marginTop: "10%",
            width: "10%",
            margin: "auto auto"
          }}
        >
          Main Page
        </Link>
      </div>
    );
  }

  render() {
    return (
      <React.Fragment>
        <div>
          <nav
            className="navbar"
            role="navigation"
            aria-label="main navigation"
          >
            <div className="navbar-brand">
              <div className="navbar-item">
                <Link to="/index">
                  <img src={image} width="112" height="48" alt="logo" />
                </Link>
              </div>
            </div>

            <div id="navbarBasicExample" className="navbar-menu">
              <div className="navbar-start" />
              <DropDown lists={["Save", "Draft"]} />
            </div>
          </nav>
        </div>
        <div style={{ width: "80%", margin: "auto auto" }}>
          {this.state.loading ? (
            <Spinner />
          ) : this.state.posted ? (
            this.successPosted()
          ) : (
            <React.Fragment>
              <input
                className="input is-rounded"
                type="text"
                placeholder="Enter Your Title..."
                value={this.state.title}
                onChange={this.handleTitle}
              />
              <input
                className="input is-rounded"
                type="text"
                placeholder="Enter Your Tags..."
              />
              <Editor
                updateContent={this.updateContent}
                value={this.state.content}
              />
              <button className="button is-primary" onClick={this.handlePost}>
                Post
              </button>
            </React.Fragment>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default Publish;
