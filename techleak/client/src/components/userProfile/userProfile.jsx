import React from "react";
import ErrorBoundary from "../UI/ErrorHandler/ErrorHandler";
import "./userProfile.css";
import HeadingSection from "./userProfileComponent/headingSection";
import ProfileOptions from "./userProfileComponent/profieOptions";
import "./profileOption.css";
import { connect } from "react-redux";

class UserProfile extends React.Component {
  render() {
    return (
      <div className="hero is-fullheight">
        <div className="hero-head">
          <HeadingSection {...this.props} />
        </div>
        <div className="hero-body" style={{ padding: "0px", display: "block" }}>
          <ProfileOptions />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.persistedReducer.username,
    loggedIn: state.persistedReducer.loggedIn,
    likedPosts: state.persistedReducer.likedPosts,
    myPosts: state.persistedReducer.myPosts
  };
};

export default connect(mapStateToProps)(UserProfile);
