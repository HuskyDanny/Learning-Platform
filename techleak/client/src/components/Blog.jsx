import React, { Component } from "react";
import getTimeFormat from "../utils/getTimeFormat";
import ReactHtmlParser from "react-html-parser";
import Comments from "./comment/comments";
import { connect } from "react-redux";
import axios from "../axios/axios-blogs";

import { withRouter } from "react-router";
import errorBoundary from "./UI/ErrorHandler/ErrorHandler";

import Share from "./share/share";
import Flexbox from "flexbox-react";

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
      rawPostData: "",
      tags: [],
      enableLike: true
    };

    this.handleLike = this.handleLike.bind(this);
  }

  componentDidMount = () => {
    axios
      .get(`/api/posts/${this.props.match.params.id}`, { headers: "" })
      .then(res => {
        this.setState({
          comments: res.data.comments,
          post_date: getTimeFormat(res.data.post_date_timestamp),
          username: res.data.username,
          userID: res.data.userID,
          content: res.data.content,
          title: res.data.title,
          pageID: this.props.match.params.id,
          rawPostData: res.data,
          tags: res.data.tags
        });
        this.props.getBlog(res.data);
      })
      .catch(err => {
        if (err.response.status === 400) {
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
          axios
            .delete(
              `${process.env.REACT_APP_BACKEND_SERVER}/api/users/likes/${
                this.props.userID
              }?postID=${this.props.match.params.id}`,
              headers
            )
            .then(res => {
              this.props.handleLike(this.props.match.params.id, null, true);
            })
            .catch(err => console.log(err));
        }
      });
  };

  handleLike = () => {
    //disable the like for a moment
    this.setState({ enableLike: false });
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
        withCredentials: true
      }
    };
    const LIKED = this.props.likedPosts.includes(this.props.match.params.id);

    //handling likeposts in User route
    const likePostPromise = LIKED
      ? axios.delete(
          `/api/users/likes/${this.props.userID}?postID=${
            this.props.match.params.id
          }`,
          headers
        )
      : axios.post(
          `/api/users/likes/${this.props.userID}`,
          { postID: this.props.match.params.id },
          headers
        );
    //handling like# in Post route
    const likeNumberPromise = axios.patch(
      `/api/posts/likes/${this.props.match.params.id}`,
      { liked: LIKED },
      headers
    );

    Promise.all([likeNumberPromise, likePostPromise]).catch(err => {
      this.props.handleLike(
        this.props.match.params.id,
        this.state.rawPostData,
        !LIKED
      );
    });
    this.props.handleLike(
      this.props.match.params.id,
      this.state.rawPostData,
      LIKED
    );
    new Promise(resolve => setTimeout(resolve, 1000)).then(() => {
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
    console.log(this.state.tags);

    let tagsDisplay = this.state.tags.map(tag => (
      <li key={tag} style={styles.items}>
        <Flexbox>{tag}</Flexbox>
      </li>
    ));
    return (
      <React.Fragment>
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
                  <div>{tagsDisplay}</div>
                  <hr />

                  <div className="level is-mobile">
                    <button
                      className="level-item has-text-centered button "
                      onClick={this.props.onSwitchShareModal}
                    >
                      <span className="icon is-small">
                        <i className="far fa-share-square" aria-hidden="true" />
                      </span>
                    </button>

                    <button
                      id="likeBtn"
                      className={`level-item has-text-centered button ${
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
                <div id="comment" style={{
                  paddingRight: "3%",
                  paddingLeft: "3%", 
                  paddingBottom: "2%" 
                }}>
                  <Comments blogID={this.props.match.params.id} />
                </div>
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
    handleLike: (id, rawPostData, liked) =>
      dispatch({
        type: "HANDLELIKEPOSTS",
        id: id,
        rawPostData: rawPostData,
        liked: liked
      })
  };
};

export default errorBoundary(
  withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(Blog)
  ),
  axios
);

const styles = {
  items: {
    display: "inline-block",
    padding: "5px",
    border: "none",
    backgroundColor: "#cfcece",
    fontFamily: "Helvetica, sans-serif",
    borderRadius: "5px",
    marginRight: "5px",
    cursor: "default"
  }
};
