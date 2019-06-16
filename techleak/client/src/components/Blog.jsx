import React, { Component } from "react";
import Navbar from "./navbar";
import axios from "axios";
import ReactHtmlParser from "react-html-parser";
import Comments from "./comment/comments";
import { connect } from "react-redux";

class Blog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      saved: false,
      shared: false,
      post_date: "",
      comments: [],
      username: "",
      userID: "",
      content: ""
    };

    this.handleLike = this.handleLike.bind(this);
  }

  componentDidMount = () => {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_SERVER}/api/posts/${
          this.props.match.params.id
        }`
      )
      .then(res => {
        const date = new Date(res.data.post_date_timestamp);
        this.setState({
          comments: res.data.comments,
          post_date: `${date.getMonth() +
            1}-${date.getDate()}-${date.getFullYear()}`,
          username: res.data.username,
          userID: res.data.userID,
          content: res.data.content
        });
      })
      .catch(err => console.log(err));
  };

  handleLike = type => {
    const token = localStorage.getItem("token");
    console.log(token);
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
        withCredentials: true
      }
    };

    const liked = this.props.likedPosts.includes(this.props.match.params.id);
    //handling likeposts in User route

    liked
      ? axios
          .delete(
            `${process.env.REACT_APP_BACKEND_SERVER}/api/users/likes/${
              this.props.userID
            }?postID=${this.props.match.params.id}`,
            headers
          )
          .then(res => console.log(res))
      : axios.post(
          `${process.env.REACT_APP_BACKEND_SERVER}/api/users/likes/${
            this.props.userID
          }`,
          { postID: this.props.match.params.id },
          headers
        );

    //handling like# in Post route
    axios
      .patch(
        `${process.env.REACT_APP_BACKEND_SERVER}/api/posts/likes/${
          this.props.match.params.id
        }`,
        { liked: liked },
        headers
      )
      .then(res => {
        this.props.handleLike(this.props.match.params.id, liked);
      })
      .catch(err => err);
  };

  render() {
    const liked = this.props.likedPosts.includes(this.props.match.params.id);
    const saved = liked;
    return (
      <React.Fragment>
        <Navbar />

        <section className="hero is-info is-medium is-bold">
          <div className="hero-body">
            <div className="container has-text-centered">
              <h1 className="title">{this.state.title}</h1>
            </div>
          </div>
        </section>

        <div className="container">
          <section className="articles">
            <div className="column is-10 is-offset-1">
              <div className="card article ">
                <div className="card-content">
                  <div className="media">
                    <div className="media-content has-text-centered">
                      <div className="tags has-addons level-item">
                        <span className="tag is-rounded is-info">
                          DatePosted@
                        </span>
                        <span className="tag is-rounded">
                          {this.state.post_date.slice(0, 10)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div
                    className="content article-body"
                    style={{ marginBottom: "10%" }}
                  >
                    {ReactHtmlParser(this.state.content)}
                  </div>
                  <hr />

                  <div
                    className="level-left"
                    style={{
                      justifyContent: "space-between",
                      width: "80%",
                      margin: "3% auto 3% auto"
                    }}
                  >
                    <button
                      className="level-item button "
                      onClick={() => this.handleLike("shared")}
                    >
                      <span className="icon is-small">
                        <i className="far fa-share-square" aria-hidden="true" />
                      </span>
                    </button>
                    <button
                      className={
                        saved
                          ? "level-item button is-success"
                          : "level-item button"
                      }
                      aria-label="retweet"
                      onClick={() => this.handleLike("saved")}
                    >
                      <span className="icon is-small">
                        <i className="far fa-save" aria-hidden="true" />
                      </span>
                    </button>
                    <button
                      className={
                        liked
                          ? "level-item button is-success"
                          : "level-item button"
                      }
                      aria-label="like"
                      onClick={() => this.handleLike("liked")}
                    >
                      <span className="icon is-small">
                        <i className="far fa-thumbs-up" aria-hidden="true" />
                      </span>
                    </button>
                  </div>
                  <hr />
                </div>
                <Comments comments={this.state.comments} />
              </div>
            </div>
          </section>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    userID: state.userID,
    likedPosts: state.likedPosts
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
)(Blog);
