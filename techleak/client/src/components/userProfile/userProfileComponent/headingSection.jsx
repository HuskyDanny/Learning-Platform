import React from "react";
import { connect } from "react-redux";

var faker = require("faker");

class HeadingSection extends React.Component {
  render() {
    return (
      <div className="section profile-heading">
        <div className="columns is-mobile is-multiline">
          <div className="column is-2">
            <span
              className="header-icon user-profile-image"
              style={{ paddingLeft: "25%" }}
            >
              <img alt="" src={faker.image.avatar()} />
            </span>
          </div>
          <div className="column is-6-tablet is-10-mobile name">
            <p>
              <span className="title is-bold">{this.props.username}</span>
              <br />
              <a
                className="button is-primary is-outlined"
                href="#"
                id="edit-preferences"
                style={{ margin: "5px 0" }}
              >
                Edit Preferences
              </a>
            </p>
            <p className="tagline">
              The users profile bio would go here, of course. It could be two
              lines or more or whatever. We should probably limit the amount of
              characters to ~500 at most though.
            </p>
          </div>
          <div className="column is-2-tablet is-4-mobile has-text-centered" />
          <div className="column is-1-tablet is-4-mobile has-text-centered">
            <p className="stat-val">30</p>
            <p className="stat-key">reputation</p>
          </div>
          <div className="column is-1-tablet is-4-mobile has-text-centered">
            <p className="stat-val">10</p>
            <p className="stat-key">likes</p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.persistedReducer.username,
    userID: state.persistedReducer.userID
  };
};

export default connect(mapStateToProps)(HeadingSection);
