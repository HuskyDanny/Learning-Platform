import React, { Component } from "react";
import Navbar from "./navbar";
import axios from "axios";

class Blog extends Component {
  state = {
    title: "",
    author: "",
    content: "",
    likes: "",
    post_date: "",
    loaded: false
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

    return (
      <React.Fragment>
        <Navbar
          onOpenModal={this.props.onOpenModal}
          onCloseModal={this.props.onCloseModal}
          signupOpen={this.props.signupOpen}
          loginOpen={this.props.loginOpen}
          loggedIn={this.props.loggedIn}
          logHandler={this.props.logHandler}
          username={this.props.username}
          contactUsOpen={this.props.contactUsOpen}
        />

        <section className="hero is-info is-medium is-bold">
          <div className="hero-body">
            <div className="container has-text-centered">
              <h1 className="title">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
              </h1>
            </div>
          </div>
        </section>

        <div className="container">
          <section className="articles">
            <div className="column is-8 is-offset-2">
              <div className="card article ">
                <div className="card-content">
                  <div className="media">
                    <div className="media-content has-text-centered">
                      <h1 className="has-text-centered is-size-4">
                        <strong>{this.state.title}</strong>
                      </h1>

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
                  <div className="content article-body">
                    {this.state.content}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </React.Fragment>
    );
  }
}

export default Blog;
