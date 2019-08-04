import React, { Component } from "react";
import Signup from "./Signup";
import Login from "./Login";
import image from "../assets/img/logo1.jpg";
import { Link } from "react-router-dom";
import ContactUs from "./contactUs/contactUs";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faBars from "@fortawesome/fontawesome-free-solid/faBars";

const Navbar = props => {
  const handleLogOut = () => {
    localStorage.clear();
    props.handleLogOut();
  };

  let top_menu_class = `top-menu ${props.menu_class}`;

  let status = (
    <div className="navbar-end">
      <div className="navbar-item">
        <div className="buttons">
          <button id="changableButton" onClick={props.onSwitchSignupModal}>
            <p>Sign up</p>
          </button>
          <button id="changableButton" onClick={props.onSwitchLoginModal}>
            <p>Log in</p>
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
            <Link id="changableButton" to="/publish">
              <i className="fas fa-plus-circle" />
              <p>New Post</p>
            </Link>

            <Link id="changableButton" to="/userProfile">
              <p>My Profile</p>
            </Link>

            <Link id="changableButton" onClick={handleLogOut} to="/">
              <p>Log Out</p>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <React.Fragment>
      <nav
        className={`navbar ${top_menu_class}`}
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <Link
            className="navbar-item"
            style={{ width: "150px", height: "52px", position: "fix" }}
            to="/"
          >
            <img src={image} width="112" height="48" alt="logo" />
          </Link>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start left">
            <a className="navbar-item" href="#about">
              About
            </a>

            <Link className="navbar-item" onClick={props.onSwitchContactModal}>
              Contact Us
            </Link>
          </div>
          <div className="right">{status}</div>
        </div>
        <FontAwesomeIcon
          icon={faBars}
          className="top-menu-icon"
          onClick={props.handleToggleMenu}
        />
      </nav>
      <Signup />
      <Login />
      <ContactUs />
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    logIn: state.persistedReducer.loggedIn,
    signupOpen: state.persistedReducer.signupOpen,
    loginOpen: state.persistedReducer.loginOpen,
    contactUsOpen: state.persistedReducer.contactUsOpen,
    menu_class: state.persistedReducer.menu_class
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleLogOut: () => dispatch({ type: "LOGOUT" }),
    onSwitchSignupModal: () => dispatch({ type: "SIGNUPMODAL" }),
    onSwitchLoginModal: () => dispatch({ type: "LOGINMODAL" }),
    onSwitchContactModal: () => dispatch({ type: "CONTACTMODAL" }),
    handleToggleMenu: () => dispatch({ type: "TOGGLEMENUCLASS" })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
