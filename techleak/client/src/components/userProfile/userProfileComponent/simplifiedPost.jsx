import React from "react";
import Modal from "react-responsive-modal";
import axios from "../../../axios/axios-blogs";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-custom-confirm-alert";
import "react-custom-confirm-alert/src/react-confirm-alert.css";

class SimplifiedPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openComment: false
    };
    this.handleComment = this.handleComment.bind(this);
    this.handleStopPropagation = this.handleStopPropagation.bind(this);
  }

  spaceDividor() {
    return <div style={{ margin: "5px", display: "inline-block" }} />;
  }

  createTagGroup() {
    const { tags } = this.props;
    return (
      <React.Fragment>
        {tags.map((tag, index) => (
          <React.Fragment key={index}>
            <button className="button is-primary is-small">
              <span>{tag}</span>
            </button>
            {this.spaceDividor()}
          </React.Fragment>
        ))}
      </React.Fragment>
    );
  }

  handleComment(e) {
    this.setState({ openComment: !this.state.openComment });
    e.preventDefault();
  }

  handleStopPropagation(e) {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  }

  // delete like posts in the backend
  handleDelete(e, objectID) {
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
        withCredentials: true
      }
    };

    const liked = this.props.likedPosts.includes(objectID);

    // delete likedPost for users
    const likePostPromise = axios.delete(
      `/api/users/likes/${this.props.userID}?postID=${objectID}`,
      headers
    );

    //handling like# in Post route
    const likeNumberPromise = axios.patch(
      `/api/posts/likes/${objectID}`,
      { liked: liked },
      headers
    );
    Promise.all([likeNumberPromise, likePostPromise]).catch(err => {
      this.props.handleLike(objectID, "", !liked);
    });
    this.props.handleLike(objectID, "", liked);
  }

  deleteControl = () => {
    const { objectID, postType, userID } = this.props;
    if (postType === "MyPosts") {
      return (
        <button
          className="level-item button is-white"
          aria-label="cancel"
          onClick={e => {
            e.persist();
            confirmAlert({
              message:
                "Your post will be deleted permanently, are you sure to do this?",
              buttons: [
                {
                  label: "Yes",
                  onClick: async () => {
                    const token = localStorage.getItem("token");
                    const headers = {
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Token ${token}`
                      }
                    };
                    try {
                      // delete the post in the "Post" pool backend
                      let deletedPostData = axios.delete(
                        `${
                        process.env.REACT_APP_BACKEND_SERVER
                        }/api/posts/${objectID}`,
                        headers
                      );
                      // delete the post in the author's "myPost" backend
                      let deletedmyPostID = axios.delete(
                        `${
                        process.env.REACT_APP_BACKEND_SERVER
                        }/api/users/myPosts/${userID}?postID=${objectID}`,
                        headers
                      );
                      // waiting for the above two promise to finish
                      await Promise.all([deletedPostData, deletedmyPostID]);
                      // handle the front end rendering after one "myPost" was deleted
                      this.props.handleCancelClick(e, objectID, postType);
                    } catch (e) {
                      console.log(e);
                    }
                  }
                },
                {
                  label: "No",
                  onClick: () => {
                    console.log(objectID);
                  }
                }
              ]
            });
            e.preventDefault();
          }}
        >
          <span className="icon is-small">
            <i className="fas fa-times" />
          </span>
        </button>
      );
    } else if (postType === "MyLikes") {
      return (
        <button
          className="level-item button is-white"
          aria-label="cancel"
          onClick={e => {
            // handle the front end rendering
            this.props.handleCancelClick(e, objectID, postType);
            // handle the backend data stroge in data base
            this.handleDelete(e, objectID);
          }}
        >
          <span className="icon is-small">
            <i className="fas fa-times" />
          </span>
        </button>
      );
    }
  };

  render() {
    const { title, views, comments, img, objectID } = this.props;
    const { openComment } = this.state;
    const simPostFormat = (
      <article className="media">
        <div
          className="media-left"
          onClick={e => this.handleStopPropagation(e)}
        >
          <figure className="image is-64x64">
            <img
              alt=""
              src={img}
              style={{
                display: "block",
                maxHeight: "100%",
                maxWidth: "100%",
                height: "auto",
                width: "auto"
              }}
            />
          </figure>
        </div>
        <div className="media-content">
          <div className="content">
            <nav className="level is-mobile" style={{ float: "right", marginBottom: "0px" }}>
              <div className="level-left">
                <div
                  href=""
                  className="level-item"
                  aria-label="comment"
                  onClick={e => this.handleComment(e)}
                  style={{ marginRight: "0.25rem" }}
                >
                  <span className="icon is-small">
                    <i className="fas fa-comment" />
                  </span>
                </div>
                {this.deleteControl()}
              </div>
            </nav>
            <div>
              <h3>{title}</h3>
              <div style={{ float: "left" }}>{this.createTagGroup()}</div>
              <div style={{ float: "right" }}>
                <small>{views} Views</small>
                {this.spaceDividor()}
                <small>
                  {comments === "-" ? "-" : comments.length} Replies
                </small>
              </div>
            </div>
          </div>
        </div>
      </article>
    );

    // determine whether the simpost should be clickable based on the objectID
    const simpPostClick =
      this.props.deleted === true ? (
        <span>{simPostFormat}</span>
      ) : (
          <Link to={`/blog/${objectID}`}>{simPostFormat}</Link>
        );
    return (
      <div
        className="box"
        style={{ marginBottom: "0.5rem", padding: "0.8rem" }}
      >
        {simpPostClick}
        <Modal open={openComment} onClose={e => this.handleComment(e)} center>
          <article className="media">
            <figure className="media-left">
              <p className="image is-64x64">
                <img
                  src="https://versions.bulma.io/0.7.0/images/placeholders/128x128.png"
                  alt=""
                />
              </p>
            </figure>
            <div className="media-content">
              <div className="field">
                <p className="control">
                  <textarea
                    className="textarea"
                    placeholder="Add a comment..."
                  />
                </p>
              </div>
              <nav className="level">
                <div className="level-left">
                  <div className="level-item">
                    <button className="button is-info button is-white">
                      Submit
                    </button>
                  </div>
                </div>
                <div className="level-right">
                  <div className="level-item">
                    <label className="checkbox">
                      <input type="checkbox" /> Press enter to submit
                    </label>
                  </div>
                </div>
              </nav>
            </div>
          </article>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userID: state.persistedReducer.userID,
    likedPosts: state.persistedReducer.likedPosts,
    myPosts: state.persistedReducer.myPosts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleLike: (id, rawPostData, liked) =>
      dispatch({
        type: "HANDLELIKEPOSTS",
        id: id,
        rawPostData: rawPostData,
        liked: liked
      })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SimplifiedPost);
