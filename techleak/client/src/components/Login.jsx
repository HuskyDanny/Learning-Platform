import React, { Component } from "react";
import axios from "../axios/axios-blogs";
import Modal from "react-responsive-modal";
import Spinner from "./UI/Spinner/Spinner";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Login extends Component {
  state = {
    password: "",
    email: "",
    username: "",
    loading: false
  };

  handleChange = (e, type) => {
    if (type === "email" || type === "password") {
      this.setState({ notMatched: false });
    }
    this.setState({ [type]: e.target.value });
  };

  handleResetPassword = () => {
    this.props.onSwitchLoginModal();
  };

  handleSubmit = async e => {
    e.preventDefault();

    this.setState({ loading: true });
    const { email, password } = this.state;
    const user = {
      user: {
        email: email,
        password: password
      }
    };

    try {
      let res = await axios.post("/api/users/login", user, { headers: "" });
      let data = res.data;
      // asyn function that retrieve all details about likedPosts and myPosts
      let allPostDetail = await this.fetchAllPostDetails(data);
      let likedPostsDetail = allPostDetail[0];
      let myPostsDetail = allPostDetail[1];
      this.setState({ loading: false, email: "", password: "" });
      //remove memeory likes first then add back in
      this.props.handleLogIn(
        data.username,
        data.id,
        data.likedPosts,
        data.myPosts,
        data.avatar,
        data.bio,
        likedPostsDetail,
        myPostsDetail
      );
      //close modal
      this.props.onSwitchLoginModal();
      //save tokens
      localStorage.setItem("token", res.data.token);
    } catch (err) {
      //Here we pass in status code into error, and we handle
      //error codes by err.response
      console.log(err);
      this.setState({
        loading: false,
        errStatus: err.response.status
      });
    }
  };

  // responsible for fetching data about my posts and liked posts from
  // the database. the output is later used for setting states in redux
  fetchAllPostDetails = async data => {
    const likedPosts = data.likedPosts.reverse();
    const myPosts = data.myPosts.reverse();
    let singleLikedPostDetailPromise = [];
    let singleMyPostDetailPromise = [];
    try {
      for (var i = 0; i < likedPosts.length; i++) {
        let l_promise = this.fetchSinglePostDetail(likedPosts[i]);
        singleLikedPostDetailPromise.unshift(l_promise);
      }
      for (var j = 0; j < myPosts.length; j++) {
        let m_promise = this.fetchSinglePostDetail(myPosts[j]);
        singleMyPostDetailPromise.unshift(m_promise);
      }
      let allLikedPostDetails = Promise.all(singleLikedPostDetailPromise);
      let allmyPostDetails = Promise.all(singleMyPostDetailPromise);
      let allPostDetails = await Promise.all([
        allLikedPostDetails,
        allmyPostDetails
      ]);
      return allPostDetails;
    } catch (error) {
      console.log(error);
    }
  };

  fetchSinglePostDetail = async postID => {
    try {
      let userDetail = await axios.get(`/api/posts/${postID}`, { headers: "" });
      let userData = userDetail.data;
      userData.deleted = false;
      return userData;
    } catch (error) {
      return {
        _id: postID,
        deleted: true
      };
    }
  };

  render() {
    const modalBg = {
      modal: {
        borderRadius: "10%"
      }
    };

    const userError = () => {
      let body;

      //handles different error
      switch (this.state.errStatus) {
        case 458:
          body = "Account does not exist";
          break;
        case 468:
          body = "Email and password not matched";
          break;
        case 478:
          body = "Email has not been verified";
          break;
        default:
          break;
      }
      return <p className="help is-danger"> {body}</p>;
    };

    let login = (
      <div style={{ padding: "4%" }}>
        <form onSubmit={this.handleSubmit}>
          <div className="field">
            <label className="label">Email</label>
            <div className="control has-icons-left has-icons-right">
              <input
                className="input is-primary"
                type="email"
                placeholder="Your Email"
                required
                onChange={e => this.handleChange(e, "email")}
                value={this.state.email}
              />

              <span className="icon is-small is-left">
                <i className="fas fa-envelope" />
              </span>
            </div>
          </div>

          <div className="field">
            <label className="label">Password</label>
            <div className="control has-icons-left has-icons-right">
              <input
                className="input is-primary"
                type="password"
                placeholder="Your Password"
                minLength="8"
                maxLength="20"
                size="30"
                required
                onChange={e => this.handleChange(e, "password")}
                value={this.state.password}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-key" />
              </span>
            </div>
          </div>
          {userError()}
          <div className="forgetPwd">
            <button
              type="button"
              className="button is-small is-light"
              onClick={this.handleResetPassword}
            >
              <Link to="/reset-password">
                <p>Forget Password?</p>
              </Link>
            </button>
          </div>
          <div
            className="field is-grouped"
            style={{ justifyContent: "center" }}
          >
            <div className="control">
              <button type="submit" className="button is-primary">
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    );
    if (this.state.loading) {
      login = (
        <div
          style={{
            textAlign: "center",
            paddingTop: "25%",
            paddingBottom: "25%"
          }}
        >
          <Spinner />
        </div>
      );
    }
    return (
      <Modal
        className="modal-lg"
        open={this.props.loginOpen}
        onClose={this.props.onSwitchLoginModal}
        center
        styles={modalBg}
        showCloseIcon={false}
      >
        {login}
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    loginOpen: state.persistedReducer.loginOpen
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleLogIn: (
      username,
      userID,
      likedPosts,
      myPosts,
      avatar,
      bio,
      likedPostsDetail,
      myPostsDetail
    ) =>
      dispatch({
        type: "LOGIN",
        username: username,
        userID: userID,
        likedPosts: likedPosts,
        myPosts: myPosts,
        avatar: avatar,
        bio: bio,
        likedPostsDetail: likedPostsDetail,
        myPostsDetail: myPostsDetail
      }),
    onSwitchLoginModal: () => dispatch({ type: "LOGINMODAL" }),
    removeLikes: () => dispatch({ type: "REMOVELIKES" })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
