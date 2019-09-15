import React from "react";
import { connect } from "react-redux";
import axios from "../../../axios/axios-blogs";
import profile from "../../../assets/img/Portrait_Placeholder.png";
// import getReputation from "../../../utils/getSumFromArray";

class HeadingSection extends React.Component {
  state = {
    selectedFile: null,
    loading: false,
    editing: false,
    bio: this.props.bio
  };

  fileHandler = e => {
    this.setState({
      selectedFile: e.target.files[0]
    });
    var reader = new FileReader();
    reader.onload = function () {
      var dataURL = reader.result;
      var output = document.getElementById("profile");
      output.src = dataURL;
      output.width = "128px";
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  handleEditPop = () => {
    this.setState({ editing: true });
  };

  onChange = e => {
    e.preventDefault();
    this.setState({ bio: e.target.value });
  };

  handleEdit = () => {
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
        withCredentials: true
      }
    };
    axios
      .patch(
        `/api/users/bio/${this.props.userId}`,
        { bio: this.state.bio },
        headers
      )
      .then(res => {
        this.setState({ editing: false });
      });
    this.props.updateBio(this.state.bio);
  };

  handleUpload = () => {
    if (this.state.selectedFile) {
      const data = new FormData();
      data.append("avatar", this.state.selectedFile);
      this.setState({ loading: true });
      const token = localStorage.getItem("token");
      const headers = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
          withCredentials: true
        }
      };
      axios
        .patch(`/api/users/profile/${this.props.userId}`, data, headers)
        .then(res => {
          this.setState({ loading: false });
          this.setState({ selectedFile: null });
          this.props.updateAvatar(res.data.avatar);
          axios.patch(
            `${process.env.REACT_APP_BACKEND_SERVER}/api/posts/avatar/${
            this.props.userId
            }`,
            { avatar: this.props.avatar },
            headers
          );
        })
        .catch(err => {
          this.setState({ loading: false });
          this.setState({ selectedFile: null });
        });
    }
  };
  render() {
    const editInput = (
      <div className="media-content">
        <div className="field">
          <p className="control">
            <textarea
              className="textarea"
              value={this.state.bio}
              onChange={this.onChange}
              placeholder="Add a comment..."
            />
          </p>
        </div>
        <div className="field">
          <p className="control">
            <button className="button" onClick={this.handleEdit}>
              Save
            </button>
          </p>
        </div>
      </div>
    );

    return (
      <div className="section profile-heading">
        <div className="columns is-mobile is-multiline">
          <div
            className="column is-2-desktop is-2-tablet is-6-mobile"
            style={{ textAlign: "center" }}
          >
            <span className="header-icon user-profile-image">
              <figure className="image is-square">
                <img
                  id="profile"
                  src={this.props.avatar || profile}
                  style={{
                    filter: `blur(${this.state.loading ? 2 : 0}px)`,
                    maxWidth: "100%",
                    maxHeight: "100%"
                  }}
                  alt="profile"
                />
              </figure>
              <div className="file is-small" style={{ float: "left" }}>
                <label className="file-label">
                  <input
                    className="file-input"
                    type="file"
                    name="resume"
                    onChange={this.fileHandler}
                  />
                  <span className="file-cta">
                    <span className="file-icon">
                      <i className="fas fa-upload" />
                    </span>
                    <span
                      className="file-label"
                      style={{
                        display: "inline-flex",
                        textOverflow: "ellipsis"
                      }}
                    >
                      Select Image
                    </span>
                  </span>
                </label>
              </div>
              <button
                className={`button is-active is-small ${
                  this.state.loading ? "is-loading" : ""
                  }`}
                style={{
                  display: "inline-block",
                  backgroundColor: "whitesmoke",
                  color: "#4a4a4a",
                  borderColor: "#dbdbdb",
                  borderRadius: "4px",
                  fontSize: "0.75em",

                  overflow: "hidden",
                  textOverflow: "ellipsis"
                }}
                onClick={this.handleUpload}
              >
                Upload
              </button>
            </span>
          </div>
          <div className="column is-5-desktop is-5-tablet is-6-mobile name">
            <p>
              <span className="title is-bold">{this.props.username}</span>
              <br />
              <button
                className="button is-primary is-outlined"
                id="edit-preferences"
                style={{ margin: "5px 0" }}
                onClick={this.handleEditPop}
              >
                Edit Biography
              </button>
            </p>
            {this.state.editing ? editInput : <p>{this.props.bio}</p>}
          </div>
          <div className="column is-2-desktop is-2-tablet is-2-mobile has-text-centered" />
          <div className="column is-1-desktpp is-1-tablet is-4-mobile has-text-centered"
            style={{ borderLeft: "0px" }} >
            <p className="stat-val">{this.props.knowledge || 0}</p>
            <p className="stat-key" style={{ fontSize: "1em" }}>
              knowledge
            </p>
          </div>
          <div className="column is-2-desktop is-2-tablet is-4-mobile has-text-centered">
            <p className="stat-val">{this.props.reputation || 0}</p>
            <p className="stat-key" style={{ fontSize: "1em" }}>
              reputation
            </p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.persistedReducer.username,
    userId: state.persistedReducer.userID,
    avatar: state.persistedReducer.avatar,
    bio: state.persistedReducer.bio,
    myPostsDetail: state.persistedReducer.myPostsDetail,
    reputation: state.persistedReducer.reputation,
    knowledge: state.persistedReducer.knowledge
  };
};
const mapDispatchToProps = dispatch => {
  return {
    updateAvatar: avatar => dispatch({ type: "UPDATEAVATAR", avatar: avatar }),
    updateBio: bio => dispatch({ type: "UPDATEBIO", bio: bio })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeadingSection);
