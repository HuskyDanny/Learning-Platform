import React, { Component } from "react";
import { Route } from "react-router-dom";
import "./App.css";
import Search from "./searchBuilder/SearchBuilder";
import Navbar from "./components/navbar";
import Blog from "./components/Blog";
import ContactUs from "./components/contactUs/contactUs";
import Publish from "./components/publish/Publish";
import Footer from "./components/footer/footer";
import About from "./components/about/about";
import UserProfile from "./components/userProfile/userProfile";

class App extends Component {
  async componentDidMount() {
    // await new Promise(resolve => setTimeout(resolve, 100000));
    const ele = document.getElementById("ipl-progress-indicator");
    if (ele) {
      // fade out
      ele.classList.add("available");
      ele.outerHTML = "";
    }
  }
  render() {
    return (
      <React.Fragment>
        <Route
          path="/"
          exact
          render={props => (
            <React.Fragment>
              <Navbar />
              <Search />
              <About />
              <Footer />
            </React.Fragment>
          )}
        />
        <Route
          path="/designer"
          exact
          component={() => (window.location = "https://zhuorandeng.com")}
        />
        <Route
          path="/blog/:id"
          exact
          component={props => <Blog {...props} />}
        />
        <Route
          path="/contact"
          exact
          component={props => <ContactUs {...props} />}
        />
        <Route
          path="/publish"
          exact
          component={props => <Publish {...props} />}
        />
        <Route
          path="/userProfile"
          exact
          component={props => (
            <React.Fragment>
              <Navbar />
              <UserProfile {...props} />
            </React.Fragment>
          )}
        />
      </React.Fragment>
    );
  }
}

export default App;
