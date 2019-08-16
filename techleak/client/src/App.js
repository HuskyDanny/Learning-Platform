import React, { Component } from "react";
import { Route } from "react-router-dom";
import "./App.css";
import Search from "./searchBuilder/SearchBuilder";
import Blog from "./components/Blog";
import ContactUs from "./components/contactUs/contactUs";
import Publish from "./components/publish/Publish";
import Footer from "./components/footer/footer";
import About from "./components/about/about";
import UserProfile from "./components/userProfile/userProfile";
import ResetPasswordPage from "./components/resetpassword/ResetPasswordPage";
import IdleTimer from "react-idle-timer";
import { connect } from "react-redux";
import NavBar from "./components/navbar";

class App extends Component {
  constructor(props) {
    super(props);
    this.idleTimer = null;
    this.onIdle = this._onIdle.bind(this);
  }

  async componentDidMount() {
    // await new Promise(resolve => setTimeout(resolve, 100000));
    const ele = document.getElementById("ipl-progress-indicator");
    if (ele) {
      // fade out
      ele.classList.add("available");
      ele.outerHTML = "";
    }
  }
  _onIdle(e) {
    this.props.logout();
  }

  render() {
    return (
      <div>
        <NavBar />
        <IdleTimer
          ref={ref => {
            this.idleTimer = ref;
          }}
          element={document}
          onActive={this.onActive}
          onIdle={this.onIdle}
          onAction={this.onAction}
          debounce={250}
          timeout={1000 * 1800}
        />

        <React.Fragment>
          <Route
            path="/"
            exact
            render={props => (
              <React.Fragment>
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
                <UserProfile {...props} />
              </React.Fragment>
            )}
          />
          <Route exact path="/reset-password" component={ResetPasswordPage} />
        </React.Fragment>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return { logout: () => dispatch({ type: "LOGOUT" }) };
};

export default connect(
  null,
  mapDispatchToProps
)(App);
