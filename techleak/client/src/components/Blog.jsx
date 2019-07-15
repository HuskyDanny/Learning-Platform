import React, { Component } from "react";
import Navbar from "./navbar";
import ReactHtmlParser from "react-html-parser";
import Comments from "./comment/comments";
import { connect } from "react-redux";
import axios from "../axios-blogs";
import withHandler from "./UI/ErrorHandler/ErrorHandler";
import Share from "./share/share";

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
      content: "",
      title: "",
      enableLike: this.props.loggedIn
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
          content: res.data.content,
          title: res.data.title,
          pageID: this.props.match.params.id
        });
        this.props.getBlog(res.data);
      })
      .catch(err => console.log(err));
  };

  handleLike = () => {
    //disable the like for a moment
    this.setState({ enableLike: false });
    const LIKED = this.props.likedPosts.includes(this.props.match.params.id);
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
        withCredentials: true
      }
    };

    //handling likeposts in User route
    const likePostPromise = LIKED
      ? axios.delete(
          `${process.env.REACT_APP_BACKEND_SERVER}/api/users/likes/${
            this.props.userID
          }?postID=${this.props.match.params.id}`,
          headers
        )
      : axios.post(
          `${process.env.REACT_APP_BACKEND_SERVER}/api/users/likes/${
            this.props.userID
          }`,
          { postID: this.props.match.params.id },
          headers
        );
    //handling like# in Post route
    const likeNumberPromise = axios.patch(
      `${process.env.REACT_APP_BACKEND_SERVER}/api/posts/likes/${
        this.props.match.params.id
      }`,
      { liked: LIKED },
      headers
    );

    Promise.all([likePostPromise, likeNumberPromise])
      .then(() => {
        this.props.handleLike(this.props.match.params.id, LIKED);
        this.setState({ enableLike: true });
      })
      .catch(err => {
        this.setState({ enableLike: true });
      });
  };

  render() {
    //handling disabled button
    const btn = document.getElementById("likeBtn");
    if (btn) {
      if (!this.state.enableLike) {
        btn.setAttribute("disabled", "");
      } else {
        btn.removeAttribute("disabled");
      }
    }
    const LIKED = this.props.likedPosts.includes(this.props.match.params.id);
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
                      onClick={this.props.onSwitchShareModal}
                    >
                      <span className="icon is-small">
                        <i className="far fa-share-square" aria-hidden="true" />
                      </span>
                    </button>

                    <button
                      id="likeBtn"
                      className={`level-item button ${
                        LIKED ? " is-success" : ""
                      }`}
                      aria-label="like"
                      onClick={this.state.enableLike ? this.handleLike : null}
                    >
                      <span className="icon is-small">
                        <i className="far fa-thumbs-up" aria-hidden="true" />
                      </span>
                    </button>
                  </div>
                  <hr />
                </div>
                <Comments blogID={this.props.match.params.id} />
              </div>
            </div>
          </section>
        </div>
        <Share pageID={this.state.pageID} title={this.state.title} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    userID: state.persistedReducer.userID,
    likedPosts: state.persistedReducer.likedPosts,
    shareOpen: state.persistedReducer.shareOpen,
    loggedIn: state.persistedReducer.loggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getBlog: blog => dispatch({ type: "GETBLOG", blog: blog }),
    onSwitchShareModal: () => dispatch({ type: "SHAREMODAL" }),
    handleLike: (id, liked) =>
      dispatch({ type: "HANDLELIKE", id: id, liked: liked })
  };
};

export default withHandler(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Blog),
  axios
);
