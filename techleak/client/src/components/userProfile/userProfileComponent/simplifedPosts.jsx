import React from "react";
import { connect } from "react-redux";
import SimplifiedPost from "./simplifiedPost";

var faker = require("faker");

class SimplifiedPosts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likedPostsDetail: this.props.likedPostsDetail,
      myPostsDetail: this.props.myPostsDetail,
      likedPosts: this.props.likedPosts,
      myPosts: this.props.myPosts,
      filterPosts: this.props.filterPosts
    };
    this.handleCancelClick = this.handleCancelClick.bind(this);
    // let redux know which post tab the user is looking at
    this.props.handlePostType(this.props.postType);
  }

  componentDidUpdate(prevProps) {
    console.log(this.props.filterPosts);
    if (this.props.filterPosts.length !== prevProps.filterPosts.length) {
      if (this.props.postType === "MyLikes") {
        this.setState({
          likedPostsDetail: this.props.filterPosts
        });
      } else if (this.props.postType === "MyPosts") {
        this.setState({
          myPostsDetail: this.props.filterPosts
        });
      }
    }
  }

  // this method updates the local state and the redux of my posts and liked posts
  // when a deleted button was clicked.
  handleCancelClick(e, objectID, postType) {
    e.preventDefault();

    if (postType === "MyLikes") {
      // "deleting" a post should always act upon the "unchangeable props" instead of state
      const updatedLikedPostsDetail = this.props.likedPostsDetail.filter(
        function (lPostDetail) {
          return lPostDetail._id !== objectID;
        }
      );
      const updatedLikedPosts = this.props.likedPosts.filter(likedPost => {
        return likedPost !== objectID;
      });
      // the state and the props may have different value because of the filter
      const updatedLikedPostsDetailState = this.state.likedPostsDetail.filter(
        function (lPostDetail) {
          return lPostDetail._id !== objectID;
        }
      );
      const updatedLikedPostsState = this.state.likedPosts.filter(likedPost => {
        return likedPost !== objectID;
      });
      // this portion update the local state (by using setState) to achieve new rendering
      this.setState({
        likedPostsDetail: updatedLikedPostsDetailState,
        likedPosts: updatedLikedPostsState
      });
      // this portion update the redux to finalize the delete
      this.props.handleUpdatedLikedPosts(
        updatedLikedPostsDetail,
        updatedLikedPosts
      );
    }

    if (postType === "MyPosts") {
      // "deleting" a post should always act upon the "unchangeable props" instead of state
      const updatedMyPostsDetail = this.props.myPostsDetail.filter(function (
        mPostDetail
      ) {
        return mPostDetail._id !== objectID;
      });
      const updatedMyPosts = this.props.myPosts.filter(myPost => {
        return myPost !== objectID;
      });
      // the state and the props may have different value because of the filter
      const updatedMyPostsDetailState = this.state.myPostsDetail.filter(
        function (mPostDetail) {
          return mPostDetail._id !== objectID;
        }
      );
      const updatedMyPostsState = this.state.myPosts.filter(myPost => {
        return myPost !== objectID;
      });
      // this portion update the local state (by using setState) to achieve new rendering
      this.setState({
        myPostsDetail: updatedMyPostsDetailState,
        myPosts: updatedMyPostsState
      });
      // this portion update the redux to finalize the delete
      this.props.handleUpdatedMyPosts(updatedMyPostsDetail, updatedMyPosts);
    }
  }

  render() {
    let { postType } = this.props;
    let { likedPostsDetail, myPostsDetail } = this.state;
    var simpPosts = [];
    if (postType === "MyLikes") {
      simpPosts = likedPostsDetail;
    } else if (postType === "MyPosts") {
      simpPosts = myPostsDetail;
    }
    return (
      <React.Fragment>
        {simpPosts
          .map(simPost => {
            console.log(simPost)
            if (!simPost) return false;
            if (simPost.deleted === true) {
              return (
                <SimplifiedPost
                  key={simPost._id}
                  title={"[Deleted Post]"}
                  views={"-"}
                  comments={"-"}
                  tags={[]}
                  img={
                    "https://bulma.io/images/placeholders/128x128.png"
                  }
                  objectID={simPost._id}
                  handleCancelClick={this.handleCancelClick}
                  postType={postType}
                  deleted={simPost.deleted}
                />
              )
            } else {
              return (
                <SimplifiedPost
                  key={simPost._id}
                  title={simPost.title}
                  views={faker.random.number()}
                  comments={simPost.comments}
                  tags={simPost.tags}
                  img={
                    simPost.avatar ||
                    "https://bulma.io/images/placeholders/128x128.png"
                  }
                  objectID={simPost._id}
                  handleCancelClick={this.handleCancelClick}
                  postType={postType}
                  deleted={simPost.deleted}
                />
              )
            };
          })
          .reverse()}
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
    myPostsDetail: state.persistedReducer.myPostsDetail,
    filterPosts: state.persistedReducer.filterPosts
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
      }),
    handlePostType: postType =>
      dispatch({
        type: "UPDATEPOSTTYPE",
        postType: postType
      })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SimplifiedPosts);
