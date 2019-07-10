import axios from "../../axios-blogs";
import React, { Component } from "react";
import Editor from "../editor/Editor";
import { Link } from "react-router-dom";
import image from "../../assets/img/logo.jpg";
import DropDown from "../dropdown/dropdown";
import Spinner from "../UI/Spinner/Spinner";
import Modal from "react-responsive-modal";
import { connect } from "react-redux";
import TagSearch from "../searchTags/tagsearch";
import withHandler from "../UI/ErrorHandler/ErrorHandler";
import {
  openDisplay,
  closeDisplay,
  addTag,
  removeTag
} from "../../actions/tagActions";

class Publish extends Component {
  constructor(props) {
    super(props);

    this.state = {
      warning: false,
      loading: false,
      posted: false,
      content: "",
      title: "",
      loading: false
    };

    this.handlePost = this.handlePost.bind(this);
    this.successPosted = this.successPosted.bind(this);
    this.updateContent = this.updateContent.bind(this);
  }

  handlePost() {
    const token = localStorage.getItem("token");

    const post = {
      author: this.props.username,
      title: this.state.title,
      content: this.state.content,
      tags: this.props.tagReducer.tags || []
    };
    this.setState({ loading: true });

    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      }
    };

    axios
      .post("/api/posts", post, headers)
      .then(res => {
        axios
          .post(
            `/api/users/myPosts/${this.props.userID}`,
            { postID: res.data._id },
            headers
          )
          .then(res => {
            console.log(res);
            this.setState({ loading: false });
          })
          .catch(err => {
            console.log(err);
          });
        var newMyPosts = this.props.myPosts;
        newMyPosts.push(res.data._id);
        this.props.handleMyPosts(newMyPosts);
      })
      .catch(err => {
        console.log(err);
      });
    this.setState({ posted: true });
  }

  updateContent = value => {
    this.setState({ content: value });
  };

  handleCancel = () => {
    this.setState({ warning: true });
  };

  onCloseModal = () => {
    this.setState({ warning: false });
  };

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
    let inputTags = this.props.tagReducer.tags.map(tag => (
      <li key={tag} style={styles.items}>
        {tag}
        <button onClick={() => this.props.removeTag(tag)}>(x)</button>
      </li>
    ));

    let selection = <div />;

    if (this.props.tagReducer.tags.length === 0) {
      selection = (
        <div>
          <br />
        </div>
      );
    } else {
      selection = (
        <div>
          {inputTags}
          <br />
        </div>
      );
    }

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
                <Link to="/">
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
              <form onSubmit={this.handlePost}>
                <label>Title</label>
                <input
                  className="input is-rounded"
                  type="text"
                  required
                  value={this.state.title}
                  onChange={this.handleTitle}
                />
                <div>
                  <br />
                  <Editor
                    updateContent={this.updateContent}
                    value={this.state.content}
                  />
                </div>
                {selection}
                <label>Tags</label>
                <TagSearch
                  hitsDisplay={this.props.tagReducer.hitsDisplay}
                  tags={this.props.tagReducer.tags}
                  handleSelect={tag => this.props.addTag(tag)}
                  handleRemoveItem={tag => this.props.removeTag(tag)}
                  openDisplay={() => this.props.openDisplay()}
                  closeDisplay={() => this.props.closeDisplay()}
                  styles={styles}
                />
                <br />
                <div className="level-left">
                  <button
                    className="button is-primary level-item"
                    type="submit"
                  >
                    Post
                  </button>
                  <button
                    className="button is-primary level-item"
                    onClick={this.handleCancel}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </React.Fragment>
          )}
        </div>
        <Modal
          className="modal-lg"
          open={this.state.warning}
          onClose={this.onCloseModal}
          center
        >
          <div>
            <h1>
              <strong>Warning</strong>
            </h1>
            <p style={{ color: "red" }}>Your Post Will Not Be Saved</p>
            <Link className="button is-link" to="/index">
              Okay, I Got It
            </Link>
          </div>
        </Modal>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.persistedReducer.username,
    tagReducer: state.tagReducer,
    userID: state.persistedReducer.userID,
    myPosts: state.persistedReducer.myPosts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openDisplay: () => {
      dispatch(openDisplay());
    },
    closeDisplay: () => {
      dispatch(closeDisplay());
    },
    addTag: tag => {
      dispatch(addTag(tag));
    },
    removeTag: tag => {
      dispatch(removeTag(tag));
    },
    handleMyPosts: newMyPosts =>
      dispatch({
        type: "PUBLISHEDNEWPOST",
        myPosts: newMyPosts
      })
  };
};

const styles = {
  container: {
    border: "1px solid #ddd",
    padding: "5px",
    borderRadius: "5px"
  },

  hitStyle: {
    margin: "3% 1% 0 1%"
  },

  input: {
    outline: "none",
    border: "none",
    fontSize: "14px",
    fontFamily: "Helvetica, sans-serif"
  },

  items: {
    display: "inline-block",
    padding: "2px",
    border: "1px solid blue",
    fontFamily: "Helvetica, sans-serif",
    borderRadius: "5px",
    marginRight: "5px",
    cursor: "pointer"
  },

  hit: {
    width: "30%",
    height: "10%",
    float: "left",
    marginBottom: "10px",
    borderBottom: "solid 1px #eee",
    margin: "0.5%",
    border: "solid 1px #eee",
    boxShadow: "0 0 3px #f6f6f6",
    position: "relative",
    fontSize: "14px"
  }
};

export default withHandler(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Publish),
  axios
);
