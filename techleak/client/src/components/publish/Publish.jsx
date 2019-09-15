import axios from "../../axios/axios-blogs";
import React, { Component } from "react";
import Editor from "../editor/Editor";
import { Link } from "react-router-dom";
import DropDown from "../dropdown/dropdown";
import Spinner from "../UI/Spinner/Spinner";
import Modal from "react-responsive-modal";
import { connect } from "react-redux";
import TagSearch from "../searchTags/tagsearch";
import withHandler from "../UI/ErrorHandler/ErrorHandler";
import WarningWindow from "./WarningWindow";
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
      tagError: false,
      titleError: false,
      updateTime: ""
    };

    this.handlePostCheck = this.handlePostCheck.bind(this);
    this.handleFinalPost = this.handleFinalPost.bind(this);
    this.successPosted = this.successPosted.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.getContent = this.getContent.bind(this);
    this.showUpdateTime = this.showUpdateTime.bind(this);
  }

  showUpdateTime = () => {
    const currTime = new Date().toTimeString();
    this.setState({ updateTime: currTime });
  };

  getContent = () => {
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
        withCredentials: true
      }
    };
    axios.get(`/api/users/draft/${this.props.userID}`, headers).then(res => {
      this.setState({ content: res.data.content });
    });
  };

  handleFinalPost = async () => {
    const post = {
      author: this.props.username,
      title: this.state.title,
      content: this.state.content,
      tags: this.props.tagReducer.tags || [],
      userId: this.props.userID,
      avatar:
        this.props.avatar || "https://bulma.io/images/placeholders/128x128.png"
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
            { postID: res.data._id },
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

  handlePostCheck = e => {
    e.preventDefault();
    const title = this.state.title.trim();
    if (
      this.props.tagReducer.tags.length === 0 ||
      this.props.tagReducer.tags.length >= 4
    ) {
      this.setState({
        ...this.state,
        tagError: true
      });
    } else if (title.length < 8 || title.length > 50) {
      this.setState({
        ...this.state,
        titleError: true
      });
    } else {
      this.handleFinalPost();
    }
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
    this.setState({
      ...this.state,
      warning: false,
      tagError: false,
      titleError: false
    });
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

    const modalBg = {
      modal: {
        background: "white ",
        borderRadius: "3%",
        maxHeight: "100%",
        maxWidth: this.state.modalMaxWidth
      }
    };

    return (
      <React.Fragment>
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
              <label>Title</label>
              <div className="level">
                <input
                  className="input is-rounded"
                  type="text"
                  required
                  placeholder="Title..."
                  value={this.state.title}
                  onChange={this.handleTitle}
                />

                <DropDown
                  lists={["Get Saved Draft"]}
                  funcs={[this.getContent]}
                />
              </div>
              <div>
                <Editor
                  updateContent={this.updateContent}
                  value={this.state.content}
                  userID={this.props.userID}
                  showUpdateTime={this.showUpdateTime}
                />
                <span style={{ fontSize: "13px" }}>
                  {this.state.updateTime
                    ? `Saved at ${this.state.updateTime}`
                    : ""}
                </span>
              </div>
              <br />
              {selection}
              <hr />
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
              <div className="level" style={{ marginBottom: "2rem" }}>
                <button
                  type="submit"
                  className="button is-primary level-item"
                  style={{ marginRight: "0.5rem" }}
                  onClick={this.handlePostCheck}
                >
                  Post
                </button>

                <button
                  className="button is-primary level-item"
                  type="button"
                  style={{ marginLeft: "0.5rem" }}
                  onClick={this.handleCancel}
                >
                  Cancel
                </button>
              </div>
            </React.Fragment>
          )}
        </div>
        <Modal
          className="modal-lg"
          open={this.state.warning}
          onClose={this.onCloseModal}
          center
          styles={modalBg}
        >
          <WarningWindow
            message="Your Post Will Not Be Saved"
            onCloseModal={this.onCloseModal}
            buttonType="ToFrontPage"
          />
        </Modal>
        <Modal
          className="modal-lg"
          open={this.state.tagError}
          onClose={this.onCloseModal}
          blockScroll={false}
          center
          styles={modalBg}
        >
          <WarningWindow
            message="Please limit the number of the input tags from 1 to 3"
            onCloseModal={this.onCloseModal}
          />
        </Modal>
        <Modal
          className="modal-lg"
          open={this.state.titleError}
          onClose={this.onCloseModal}
          blockScroll={false}
          center
          styles={modalBg}
        >
          <WarningWindow
            message="The title should have at least 8 characters and at most 50 characters"
            onCloseModal={this.onCloseModal}
          />
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
