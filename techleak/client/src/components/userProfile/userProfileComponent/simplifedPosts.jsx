import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import SimplifiedPost from "./simplifiedPost";

var faker = require("faker");

class SimplifiedPosts extends React.Component {
  constructor(props) {
    super(props);
    this.retrievePosts(this.props.PostType);
    this.state = {
      simpPosts: []
    };
    this.handleCancelClick = this.handleCancelClick.bind(this);
  }

  retrievePosts(PostType) {
    const tempPosts = [];
    var processPosts = [];
    if (PostType === "MyLikes") {
      processPosts = this.props.likedPosts;
    } else if (PostType === "MyPosts") {
      processPosts = this.props.myPosts;
    }
    for (var i = 0; i < processPosts.length; i++) {
      axios
        .get(
          `${process.env.REACT_APP_BACKEND_SERVER}/api/posts/${processPosts[i]}`
        )
        .then(res => {
          var temp = {
            title: "",
            views: "",
            answers: "",
            tagNames: "",
            img: "",
            objectID: ""
          };
          temp.title = res.data.title;
          temp.views = faker.random.number();
          temp.answers = res.data.comments.length;
          temp.tagNames = res.data.tags;
          temp.img = faker.image.avatar();
          temp.objectID = res.data._id;
          tempPosts.push(temp);
          this.setState({ simpPosts: tempPosts });
        })
        .catch(err => console.log(err));
    }
  }

  // randomPosts() {
  //     var simpPosts = [];
  //     for (var i = 0; i < 10; i++) {
  //         var temp = { title: "", views: "", answers: "", tagNames: "", img: "" };
  //         temp.title = faker.lorem.lines();
  //         temp.views = faker.random.number();
  //         temp.answers = faker.random.number();
  //         temp.tagNames = [faker.random.word(), faker.random.word(), faker.random.word()];
  //         temp.img = faker.image.avatar();
  //         simpPosts.push(temp);
  //     }
  //     return simpPosts;
  // }

  handleCancelClick(e, title) {
    e.preventDefault();
    const newSimpPosts = this.state.simpPosts.filter(simPost => {
      return simPost.title !== title;
    });

    this.setState({
      simpPosts: [...newSimpPosts]
    });
  }

  render() {
    const { simpPosts } = this.state;
    return (
      <React.Fragment>
        {simpPosts.map(simPost => {
          return (
            <SimplifiedPost
              title={simPost.title}
              views={simPost.views}
              answers={simPost.answers}
              tagNames={simPost.tagNames}
              img={simPost.img}
              objectID={simPost.objectID}
              handleCancelClick={this.handleCancelClick}
              PostType={this.props.PostType}
            />
          );
        })}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    userID: state.persistedReducer.userID,
    loggedIn: state.persistedReducer.loggedIn,
    likedPosts: state.persistedReducer.likedPosts,
    myPosts: state.persistedReducer.myPosts
  };
};

export default connect(mapStateToProps)(SimplifiedPosts);
