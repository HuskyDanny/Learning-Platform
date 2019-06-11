import React from "react";
import Signup from "./Signup";
import Login from "./Login";
import image from "../assets/img/logo.jpg";
import { Link } from "react-router-dom";
import ContactUs from "./contactUs/contactUs";
import { connect } from "react-redux";
const Navbar = props => {
  let status = (
    <div className="navbar-end">
      <div className="navbar-item">
        <div className="buttons">
          <button
            className="button is-primary"
            onClick={props.onSwitchSignupModal}
          >
            <strong>Sign up</strong>
          </button>
          <button
            className="button is-primary"
            onClick={props.onSwitchLoginModal}
          >
            <strong>Log in</strong>
          </button>
        </div>
      </div>
    </div>
  );

  if (props.logIn) {
    status = (
      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons">
            <Link className="button is-primary" to="/publish">
              <i className="fas fa-plus-circle" /> <strong> New Post</strong>
            </Link>

            <div className="button is-primary">
              <strong>My Profile </strong>
            </div>

            <div className="button is-primary" onClick={props.handleLogOut}>
              <strong>Log Out</strong>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <React.Fragment>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <div className="navbar-item">
            <Link to="/index">
              <img src={image} width="112" height="48" alt="logo" />
            </Link>
          </div>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <a className="navbar-item" href="#about">
              About
            </a>

            <Link className="navbar-item" onClick={props.onSwitchContactModal}>
              Contact Us
            </Link>

            <div className="navbar-item has-dropdown is-hoverable">
              <Link className="navbar-link">Jobs</Link>
            </div>
          </div>
          {status}
        </div>
      </nav>
      <Signup />
      <Login />
      <ContactUs />
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    logIn: state.loggedIn,
    signupOpen: state.signupOpen,
    loginOpen: state.loginOpen,
    contactUsOpen: state.contactUsOpen
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleLogOut: () => dispatch({ type: "LOGOUT" }),
    onSwitchSignupModal: () => dispatch({ type: "SIGNUPMODAL" }),
    onSwitchLoginModal: () => dispatch({ type: "LOGINMODAL" }),
    onSwitchContactModal: () => dispatch({ type: "CONTACTMODAL" })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
