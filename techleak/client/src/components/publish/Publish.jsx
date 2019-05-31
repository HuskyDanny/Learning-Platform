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
      posted: false
    };

    this.handlePost = this.handlePost.bind(this);
    this.successPosted = this.successPosted.bind(this);
  }

  handlePost() {
    this.setState({ posted: true });
  }

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
        {this.state.posted ? (
          this.successPosted()
        ) : (
          <React.Fragment>
            <Editor />
            <button className="button is-primary" onClick={this.handlePost}>
              Post
            </button>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default Publish;
