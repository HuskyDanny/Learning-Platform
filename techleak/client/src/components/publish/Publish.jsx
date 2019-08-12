import axios from "../../axios/axios-blogs";
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
  removeTag,
  handlePosted
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

  handlePost = async () => {
    const post = {
      author: this.props.username,
      title: this.state.title,
      content: this.state.content,
      tags: this.props.tagReducer.tags || [],
      userId: this.props.userID,
      avatar: this.props.avatar || "https://bulma.io/images/placeholders/128x128.png"
    };
    this.setState({ loading: true });
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
        withCredentials: true
      }
    };
    axios
      .post("/api/posts", post, headers)
      .then(res => {
        axios
          .post(
            `/api/users/myPosts/${this.props.userID}`,
            {
              postID: res.data._id
            },
            headers
          )
          .then(res => {
            //cannot divide the call into two setState calls
            this.setState({ loading: false, posted: true });
          })
          .catch(err => {
            console.log(err);
            this.setState({ loading: false });
          });
        var updatedMyPosts = [...this.props.myPosts];
        updatedMyPosts.push(res.data._id);
        var updatedMyPostsDetail = [...this.props.myPostsDetail];
        updatedMyPostsDetail.push(res.data);
        this.props.handleUpdatedMyPosts(updatedMyPostsDetail, updatedMyPosts);
      })
      .catch(err => {
        this.setState({ loading: false });
      });

    this.props.handlePosted();
  };

  updateContent = value => {
    this.setState({ content: value });
  };

  handleCancel = () => {
    this.setState({ warning: true });
  };

  handlePostCancel = () => {
    this.props.handlePosted();
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
          to="/"
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
            <div
              style={{
                textAlign: "center",
                paddingTop: "25%",
                paddingBottom: "25%"
              }}
            >
              <Spinner />
            </div>
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
                      minLength="5"
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
                        type="button"
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
            <Link
              className="button is-link"
              onClick={this.handlePostCancel}
              to="/"
            >
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
    myPosts: state.persistedReducer.myPosts,
    myPostsDetail: state.persistedReducer.myPostsDetail,
    avatar: state.persistedReducer.avatar
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
    handlePosted: () => {
      dispatch(handlePosted());
    },
    handleUpdatedMyPosts: (updatedMyPostsDetail, updatedMyPosts) =>
      dispatch({
        type: "USERMYPOSTSUPDATED",
        myPostsDetail: updatedMyPostsDetail,
        myPosts: updatedMyPosts
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
