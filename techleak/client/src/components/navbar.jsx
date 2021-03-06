import React from "react";
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

  const handleScroll = e => {
    new Promise(resolve => setTimeout(resolve, 200)).then(() => {
      window.scroll({
        top: 550,
        behavior: "auto"
      });
    });
  };
  const toNewPost = () => {
    props.getWarning("Your draft is automatically saved, check out \"More Options\" to see more functionalities")
  }

  if (props.logIn) {
    status = (
      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons">
            <Link id="changableButton" to="/publish" onClick={toNewPost}>
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
        <div className="navbar-brand" id="brand">
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
            <Link className="navbar-item" to="/" onClick={handleScroll}>
              About
            </Link>

            <button 
              type="button" 
              className="navbar-item" 
              id="contactButton"
              onClick={props.onSwitchContactModal}
            >
              Contact Us
            </button>
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
    handleToggleMenu: () => dispatch({ type: "TOGGLEMENUCLASS" }),
    getWarning: (warning) => dispatch({type:"GETWARNING", warning : warning})
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
