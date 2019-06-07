import React, { Component } from "react";
import Navbar from "./navbar";
import axios from "axios";
import ReactHtmlParser from "react-html-parser";
import Comment from "./comment/comment";

class Blog extends Component {
  state = {
    title: "",
    author: "",
    content: "",
    liked: false,
    saved: false,
    shared: false,
    post_date: "",
    loaded: false
  };

  handleLike = type => {
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + token
      }
    };
    axios
      .patch(
        "http://localhost:3000/api/posts/likes/" + this.props.match.params.id,
        null,
        headers
      )
      .then(res => {
        this.setState({ [type]: !this.state[type] });
      })
      .catch(err => err);
  };

  render() {
    if (!this.state.loaded) {
      axios
        .get("http://localhost:3000/api/posts/" + this.props.match.params.id)
        .then(res => {
          this.setState({
            title: res.data.title,
            author: res.data.author,
            post_date: res.data.post_date,
            content: res.data.content,
            likes: res.data.likes,
            loaded: true
          });
        })
        .catch(err => console.log(err));
    }
    let { liked, shared, saved } = this.state;

    return (
      <React.Fragment>
        <Navbar
          onOpenModal={this.props.onOpenModal}
          onCloseModal={this.props.onCloseModal}
          signupOpen={this.props.signupOpen}
          loginOpen={this.props.loginOpen}
          logHandler={this.props.logHandler}
          username={this.props.username}
          contactUsOpen={this.props.contactUsOpen}
        />

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
                    class="level-left"
                    style={{
                      justifyContent: "space-between",
                      width: "80%",
                      margin: "3% auto 3% auto"
                    }}
                  >
                    <button
                      class="level-item button "
                      onClick={() => this.handleLike("shared")}
                    >
                      <span class="icon is-small">
                        <i class="far fa-share-square" aria-hidden="true" />
                      </span>
                    </button>
                    <button
                      class={
                        saved
                          ? "level-item button is-success"
                          : "level-item button"
                      }
                      aria-label="retweet"
                      onClick={() => this.handleLike("saved")}
                    >
                      <span class="icon is-small">
                        <i class="far fa-save" aria-hidden="true" />
                      </span>
                    </button>
                    <button
                      class={
                        liked
                          ? "level-item button is-success"
                          : "level-item button"
                      }
                      aria-label="like"
                      onClick={() => this.handleLike("liked")}
                    >
                      <span class="icon is-small">
                        <i class="far fa-thumbs-up" aria-hidden="true" />
                      </span>
                    </button>
                  </div>
                  <hr />
                </div>
                <Comment />
              </div>
            </div>
          </section>
        </div>
      </React.Fragment>
    );
  }
}

export default Blog;
