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
  likeHandler = id => {
    this.state.posts.filter(post => post.id === id);
    this.setState({});
  };

  render() {
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
              <Navbar />
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
          component={props => <Blog {...props} />}
        />
        <Route path="/contact" exact component={ContactUs} />
        <Route
          path="/publish"
          exact
          component={props => <Publish {...props} />}
        />
      </React.Fragment>
    );
  }
}

export default App;
