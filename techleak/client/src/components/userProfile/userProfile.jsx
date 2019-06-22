import React from 'react';
import axios from "axios";
import "./userProfile.css";
import HeadingSection from './userProfileComponent/headingSection';
import ProfileOptions from './userProfileComponent/profieOptions';
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
    )
  }
}

const mapStateToProps = state => {
  return {
    username: state.username,
    loggedIn: state.loggedIn,
    likedPosts: state.likedPosts,
    myPosts: state.myPosts
  };
};

export default connect(mapStateToProps)(UserProfile);