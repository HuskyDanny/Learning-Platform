import React from "react";
import Signup from "./Signup";
import Login from "./Login";
import image from "../assets/img/logo.jpg";
import { Link } from "react-router-dom";
import ContactUs from "./contactUs/contactUs";
const Navbar = props => {
  let {
    onOpenModal,
    onCloseModal,
    signupOpen,
    loginOpen,
    loggedIn,
    logHandler,
    username,
    contactUsOpen,
    onPaneOpen
  } = props;

  let status = (
    <div className="navbar-end">
      <div className="navbar-item">
        <div className="buttons">
          <button
            className="button is-primary"
            onClick={() => onOpenModal("signupOpen")}
          >
            <strong>Sign up</strong>
          </button>
          <button
            className="button is-primary"
            onClick={() => onOpenModal("loginOpen")}
          >
            <strong>Log in</strong>
          </button>
        </div>
      </div>
    </div>
  );

  if (props.loggedIn) {
    status = (
      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons">
            <button className="button is-primary" onClick={onPaneOpen}>
              <strong>Post</strong>
            </button>

            <Link to={"/profile/" + username}>
              <div className="button is-primary">
                <strong>Welcome, {username} </strong>
              </div>
            </Link>
            <Link>
              <div
                className="button is-primary"
                onClick={() => {
                  logHandler("", "");
                }}
              >
                <strong>Log Out</strong>
              </div>
            </Link>
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
            <Link className="navbar-item" to="/about">
              About
            </Link>

            <Link
              className="navbar-item"
              onClick={() => onOpenModal("contactUsOpen")}
            >
              Contact Us
            </Link>

            <div className="navbar-item has-dropdown is-hoverable">
              <Link className="navbar-link">Jobs</Link>
            </div>
          </div>
          {status}
        </div>
      </nav>

      <Signup
        signupOpen={signupOpen}
        loginOpen={loginOpen}
        onCloseModal={onCloseModal}
        logHandler={logHandler}
      />
      <Login
        loginOpen={loginOpen}
        loggedIn={loggedIn}
        onCloseModal={onCloseModal}
        logHandler={logHandler}
      />
      <ContactUs onCloseModal={onCloseModal} contactUsOpen={contactUsOpen} />
    </React.Fragment>
  );
};

export default Navbar;
