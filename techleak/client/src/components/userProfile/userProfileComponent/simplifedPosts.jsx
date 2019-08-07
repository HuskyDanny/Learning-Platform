import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import SimplifiedPost from "./simplifiedPost";
import { stat } from "fs";

var faker = require("faker");

class SimplifiedPosts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likedPostsDetail: this.props.likedPostsDetail,
      myPostsDetail: this.props.myPostsDetail,
      likedPosts: this.props.likedPosts,
      myPosts: this.props.myPosts
    };
    // this.retrievePosts(this.props.PostType);
    this.handleCancelClick = this.handleCancelClick.bind(this);
  }

  handleAdjustLikedPost(id, status) {
    // retrieve the post id that has been deleted by the original aurthor
    // to update a user's likedposts in database and redux
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
        withCredentials: true
      }
    };
    if (status == 400) {
      axios
        .delete(
          `${process.env.REACT_APP_BACKEND_SERVER}/api/users/likes/${
          this.props.userID
          }?postID=${id}`,
          headers
        )
        .then(res => {
          this.props.handleUpdatedLikedPosts(res.data.likedPosts);
        })
        .catch(err => console.log(err));
    }
  }

  // this method updates the local state and the redux of my posts and liked posts
  // when a deleted button was clicked.
  handleCancelClick(e, objectID, PostType) {
    e.preventDefault();

    if (PostType === "MyLikes") {
      const updatedLikedPostsDetail = this.state.likedPostsDetail.filter(function (lPostDetail) {
        return lPostDetail._id != objectID;
      })
      const updatedLikedPosts = this.state.likedPosts.filter(likedPost => {
        return likedPost !== objectID;
      });
      // this portion update the local state (by using setState) to achieve new rendering
      this.setState({
        likedPostsDetail: updatedLikedPostsDetail,
        likedPosts: updatedLikedPosts
      })
      // this portion update the redux to finalize the delete
      this.props.handleUpdatedLikedPosts(updatedLikedPostsDetail, updatedLikedPosts);
    }

    if (PostType === "MyPosts") {
      const updatedMyPostsDetail = this.state.myPostsDetail.filter(function (mPostDetail) {
        return mPostDetail._id != objectID;
      })
      const updatedMyPosts = this.state.myPosts.filter(myPost => {
        return myPost !== objectID;
      });
      // this portion update the local state (by using setState) to achieve new rendering
      this.setState({
        myPostsDetail: updatedMyPostsDetail,
        myPosts: updatedMyPosts
      })
      // this portion update the redux to finalize the delete
      this.props.handleUpdatedMyPosts(updatedMyPostsDetail, updatedMyPosts);
    }
  }

  render() {
    let { PostType } = this.props;
    let { likedPostsDetail, myPostsDetail } = this.state;
    var simpPosts = [];
    if (PostType === "MyLikes") {
      simpPosts = likedPostsDetail;
    } else if (PostType === "MyPosts") {
      simpPosts = myPostsDetail;
    }
    return (
      <React.Fragment>
        {simpPosts.map(simPost => {
          return (
            <SimplifiedPost
              title={simPost.title}
              views={faker.random.number()}
              comments={simPost.comments}
              tags={simPost.tags}
              img={
                this.props.avatar ||
                "https://bulma.io/images/placeholders/128x128.png"
              }
              objectID={simPost._id}
              handleCancelClick={this.handleCancelClick}
              PostType={PostType}
            />
          );
        }).reverse()}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    userID: state.persistedReducer.userID,
    loggedIn: state.persistedReducer.loggedIn,
    likedPosts: state.persistedReducer.likedPosts,
    myPosts: state.persistedReducer.myPosts,
    avatar: state.persistedReducer.avatar,
    likedPostsDetail: state.persistedReducer.likedPostsDetail,
    myPostsDetail: state.persistedReducer.myPostsDetail
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleUpdatedLikedPosts: (updatedLikedPostsDetail, updatedLikedPosts) =>
      dispatch({
        type: "USERLIKEDPOSTSUPDATED",
        likedPostsDetail: updatedLikedPostsDetail,
        likedPosts: updatedLikedPosts
      }),
    handleUpdatedMyPosts: (updatedMyPostsDetail, updatedMyPosts) =>
      dispatch({
        type: "USERMYPOSTSUPDATED",
        myPostsDetail: updatedMyPostsDetail,
        myPosts: updatedMyPosts
      })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SimplifiedPosts);
