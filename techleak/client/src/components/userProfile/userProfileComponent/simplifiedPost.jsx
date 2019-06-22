import React from "react";
import Modal from "react-responsive-modal";
import axios from "axios";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

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
    const { tagNames } = this.props;
    return (
      <React.Fragment>
        {tagNames.map(tagName => (
          <React.Fragment>
            <a class="button is-primary is-small">
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
    const { title, objectID, PostType } = this.props;
    if (PostType === "MyPosts") {
      return (
        <a class="level-item" aria-label="cancel">
          <span class="icon is-small">
            <i class="fas fa-times" style={{ color: "#808080" }} />
          </span>
        </a>
      );
    } else {
      return (
        <a
          class="level-item"
          aria-label="cancel"
          onClick={e => {
            this.props.handleCancelClick(e, title);
            this.handleDelete(e, objectID);
          }}
        >
          <span class="icon is-small">
            <i class="fas fa-times" />
          </span>
        </a>
      );
    }
  }

  render() {
    const { title, views, answers, img, objectID, PostType } = this.props;
    const { openComment } = this.state;
    return (
      <div class="box" style={{ marginBottom: "0.5rem", padding: "0.8rem" }}>
        <Link to={`/blog/${objectID}`}>
          <article class="media">
            <div
              class="media-left"
              onClick={e => this.handleStopPropagation(e)}
            >
              <figure class="image is-64x64">
                <img src={img} alt="Image" />
              </figure>
            </div>
            <div class="media-content">
              <div class="content">
                <nav class="level is-mobile" style={{ float: "right" }}>
                  <div class="level-left">
                    <a
                      class="level-item"
                      aria-label="comment"
                      onClick={e => this.handleComment(e)}
                      style={{ marginRight: "0.25rem" }}
                    >
                      <span class="icon is-small">
                        <i class="fas fa-comment" />
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
          <article class="media">
            <figure class="media-left">
              <p class="image is-64x64">
                <img src="https://versions.bulma.io/0.7.0/images/placeholders/128x128.png" />
              </p>
            </figure>
            <div class="media-content">
              <div class="field">
                <p class="control">
                  <textarea class="textarea" placeholder="Add a comment..." />
                </p>
              </div>
              <nav class="level">
                <div class="level-left">
                  <div class="level-item">
                    <a class="button is-info">Submit</a>
                  </div>
                </div>
                <div class="level-right">
                  <div class="level-item">
                    <label class="checkbox">
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
    likedPosts: state.persistedReducer.likedPosts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleLike: (id, liked) =>
      dispatch({ type: "HANDLELIKE", id: id, liked: liked })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SimplifiedPost);
