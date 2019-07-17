import React, { Component } from "react";
import Signup from "./Signup";
import Login from "./Login";
import image from "../assets/img/logo.jpg";
import { Link } from "react-router-dom";
import ContactUs from "./contactUs/contactUs";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faBars from "@fortawesome/fontawesome-free-solid/faBars";

const Navbar = props => {
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

            <Link id="changableButton" onClick={props.handleLogOut} to="/">
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

// class Navbar extends Component {

//   render() {

//     let status = (
//       <div className="navbar-end">
//         <li className="navbar-item">
//           <button
//             className="button is-primary"
//             onClick={this.props.onSwitchSignupModal}
//           >
//             <strong>Sign up</strong>
//           </button>
//         </li>
//         <li className="navbar-item">
//           <button
//             className="button is-primary"
//             onClick={this.props.onSwitchLoginModal}
//           >
//             <strong>Log in</strong>
//           </button>
//         </li>
//       </div>
//     );

//     if (this.props.logIn) {
//       status = (
//         <div className="navbar-end">
//           <li className="navbar-item">
//             <Link className='button is-primary' to="/publish" >
//               <i className="fas fa-plus-circle" />
//               <strong >New Post</strong>
//             </Link>
//           </li>
//           <li className="navbar-item">
//             <Link className="button is-primary" to="/userProfile">
//               <strong>My Profile</strong>
//             </Link>
//           </li>
//           <li className="navbar-item">
//             <div className="button is-primary" onClick={this.props.handleLogOut}>
//               <strong>Log Out</strong>
//             </div>
//           </li>
//         </div>
//       );
//     }

//     return (
//       <React.Fragment>
//         <div className='flex'>
//           <div className="navbar navbar-brand navbar-item" role="navigation" aria-label="main navigation">
//             <Link to="/index">
//               <img src={image} width="112" height="48" alt="logo" />
//             </Link>
//           </div>
//           <ResponsiveMenu
//             menuOpenButton={<div><MdMenu /></div>}
//             menuCloseButton={<div><FaTimes/></div>}
//             changeMenuOn="1090px"
//             menu={
//               <div className="navbar" role="navigation" aria-label="main navigation">
//                 <div className="navbar-start">
//                   <li className="navbar-item">
//                     <a className="navbar-item" href="#about">
//                       About
//                     </a>
//                   </li>
//                   <li className="navbar-item">
//                     <Link className="navbar-item" onClick={this.props.onSwitchContactModal}>
//                       Contact Us
//                     </Link>
//                   </li>
//                 </div>
//                 {status}
//               </div>
//             }
//           />

//           <Signup />
//           <Login />
//           <ContactUs />
//         </div>
//       </React.Fragment>
//     )
//   }
// }

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
