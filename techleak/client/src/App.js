import React, { Component } from "react";
import { Route } from "react-router-dom";
import "./App.css";
import Search from "./searchBuilder/SearchBuilder";
import Navbar from "./components/navbar";
import Blog from "./components/Blog";
import ContactUs from "./components/contactUs/contactUs";
import ErrorBoundary from "./components/UI/ErrorHandler/ErrorHandler";
import Publish from "./components/publish/Publish";
import Footer from "./components/footer/footer";
import About from "./components/about/about";

class App extends Component {
  state = {
    signupOpen: false,
    loginOpen: false,
    loggedIn: false,
    username: "",
    token: "",
    contactUsOpen: false,
    tags: ["Python", "Interview", "10XCoder", "Interview", "Leetcode"]
  };

  onOpenModal = type => {
    this.setState({ [type]: true });
  };

  onCloseModal = type => {
    this.setState({ [type]: false });
  };

  likeHandler = id => {
    this.state.posts.filter(post => post.id === id);
    this.setState({});
  };

  logHandler = (name, token) => {
    this.setState({
      loggedIn: !this.state.loggedIn,
      username: name,
      token: token
    });
  };

  render() {
    const {
      signupOpen,
      loginOpen,
      loggedIn,
      contactUsOpen,
      username
    } = this.state;

    return (
      <React.Fragment>
        <Route
          exact
          path="/"
          render={props => <h1>"localhost:3000/index" to view the page</h1>}
        />
        <Route
          path="/index"
          render={props => (
            <ErrorBoundary>
              <Navbar
                onOpenModal={this.onOpenModal}
                onCloseModal={this.onCloseModal}
                signupOpen={signupOpen}
                loginOpen={loginOpen}
                loggedIn={loggedIn}
                logHandler={this.logHandler}
                username={username}
                contactUsOpen={contactUsOpen}
                onPaneOpen={this.onPaneOpen}
              />
              <Search />
              <About />
              <Footer />
            </ErrorBoundary>
          )}
        />
        <Route
          path="/designer"
          component={() => (window.location = "https://zhuorandeng.com")}
        />
        <Route
          path="/blog/:id"
          exact
          component={props => (
            <Blog
              {...props}
              onOpenModal={this.onOpenModal}
              onCloseModal={this.onCloseModal}
              signupOpen={signupOpen}
              loginOpen={loginOpen}
              loggedIn={loggedIn}
              logHandler={this.logHandler}
              username={username}
              contactUsOpen={contactUsOpen}
            />
          )}
        />
        <Route path="/contact" exact component={ContactUs} />
        <Route
          path="/publish"
          exact
          component={props => (
            <Publish {...props} loggedIn={loggedIn} username={username} />
          )}
        />
      </React.Fragment>
    );
  }
}

export default App;
