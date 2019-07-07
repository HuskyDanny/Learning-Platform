import React from "react";
import Modal from "react-responsive-modal";
import axios from "axios";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-custom-confirm-alert";
import 'react-custom-confirm-alert/src/react-confirm-alert.css'

class SimplifiedPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openComment: false,
    };
    this.handleComment = this.handleComment.bind(this);
    this.handleStopPropagation = this.handleStopPropagation.bind(this);
  }

  spaceDividor() {
    return <div style={{ margin: "5px", display: "inline-block" }} />;
  }

  createTagGroup() {
    const { tagNames } = this.props;
    return (
      <React.Fragment>
        {tagNames.map(tagName => (
          <React.Fragment>
            <a className="button is-primary is-small">
              <span>{tagName}</span>
            </a>
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

    axios.delete(
      `${process.env.REACT_APP_BACKEND_SERVER}/api/users/likes/${
        this.props.userID
      }?postID=${objectID}`,
      headers
    );

    axios
      .patch(
        `${process.env.REACT_APP_BACKEND_SERVER}/api/posts/likes/${objectID}`,
        { liked: liked },
        headers
      )
      .then(res => {
        this.props.handleLike(objectID, liked);
      })
      .catch(err => err);
  }

  deleteControl() {
    const { title, objectID, PostType, userID, myPosts } = this.props;
    if (PostType === "MyPosts") {
      return (
        <a className="level-item" 
           aria-label="cancel"
           onClick={(e) => {
            confirmAlert({
              message: 'Your post will be deleted permanently, are you sure to do this?',
              buttons: [
                {
                  label: 'Yes',
                  onClick: () => {
                    const token = localStorage.getItem("token");
                    const headers = {
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Token ${token}`
                      }
                    };

                    axios
                      .delete(
                        `${process.env.REACT_APP_BACKEND_SERVER}/api/posts/${
                          objectID
                        }`, 
                          headers
                      )
                      .then(res => {
                            console.log(res);
                            axios
                            .delete(
                              `${process.env.REACT_APP_BACKEND_SERVER}/api/users/myPosts/${
                                userID
                              }?postID=${objectID}`,
                              headers
                            )
                            .then(res => {
                              console.log("removed my posts successfully: " + res);
                            })
                            .catch(err => {
                              console.log(err);
                            });
                          var newMyPosts = myPosts.filter(myPost => myPost != objectID);
                          this.props.handleMyPosts(newMyPosts);                            
                      })
                      .catch(err => {
                        console.log(err);
                      });                    
                  }
                },
                {
                  label: 'No',
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
        </a>
      );
    } else {
      return (
        <a
          className="level-item"
          aria-label="cancel"
          onClick={e => {
            this.props.handleCancelClick(e, title);
            this.handleDelete(e, objectID);
          }}
        >
          <span className="icon is-small">
            <i className="fas fa-times" />
          </span>
        </a>
      );
    }
  }

  render() {
    const { title, views, answers, img, objectID } = this.props;
    const { openComment } = this.state;
    return (
      <div className="box" style={{ marginBottom: "0.5rem", padding: "0.8rem" }}>
        <Link to={`/blog/${objectID}`}>
          <article className="media">
            <div
              className="media-left"
              onClick={e => this.handleStopPropagation(e)}
            >
              <figure className="image is-64x64">
                <img src={img} alt="Image" />
              </figure>
            </div>
            <div className="media-content">
              <div className="content">
                <nav className="level is-mobile" style={{ float: "right" }}>
                  <div className="level-left">
                    <a
                      className="level-item"
                      aria-label="comment"
                      onClick={e => this.handleComment(e)}
                      style={{ marginRight: "0.25rem" }}
                    >
                      <span className="icon is-small">
                        <i className="fas fa-comment" />
                      </span>
                    </a>
                    {this.deleteControl()}
                  </div>
                </nav>
                <p>
                  <h3>{title}</h3>
                  <div style={{ float: "left" }}>{this.createTagGroup()}</div>
                  <p style={{ float: "right" }}>
                    <small>{views} Views</small>
                    {this.spaceDividor()}
                    <small>{answers} Answers</small>
                  </p>
                </p>
              </div>
            </div>
          </article>
        </Link>
        <Modal open={openComment} onClose={e => this.handleComment(e)} center>
          <article className="media">
            <figure className="media-left">
              <p className="image is-64x64">
                <img src="https://versions.bulma.io/0.7.0/images/placeholders/128x128.png" />
              </p>
            </figure>
            <div className="media-content">
              <div className="field">
                <p className="control">
                  <textarea className="textarea" placeholder="Add a comment..." />
                </p>
              </div>
              <nav className="level">
                <div className="level-left">
                  <div className="level-item">
                    <a className="button is-info">Submit</a>
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
    handleLike: (id, liked) =>
      dispatch({ type: "HANDLELIKE", id: id, liked: liked }),
    handleMyPosts: newMyPosts =>
      dispatch({
        type: "PUBLISHEDNEWPOST",
        myPosts: newMyPosts
      })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SimplifiedPost);
