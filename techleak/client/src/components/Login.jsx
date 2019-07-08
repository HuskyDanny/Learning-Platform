import React, { Component } from "react";
import axios from "../axios-blogs";
import Modal from "react-responsive-modal";
import Spinner from "./UI/Spinner/Spinner";
import { connect } from "react-redux";
class Login extends Component {
  state = {
    password: "",
    email: "",
    errStatus: "",
    username: "",
    loading: false
  };

  handleChange = (e, type) => {
    if (type === "email" || type === "password") {
      this.setState({ notMatched: false });
    }
    this.setState({ [type]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.setState({ loading: true });
    const { email, password } = this.state;
    const user = {
      user: {
        email: email,
        password: password
      }
    };
    axios
      .post("/api/users/login", user)
      .then(res => {
        this.setState({ loading: false, email: "", password: "" });
        this.props.handleLogIn(
          res.data.username,
          res.data.id,
          res.data.likedPosts,
          res.data.myPosts
        );
        //close modal
        this.props.onSwitchLoginModal();
        //save tokens
        localStorage.setItem("token", res.data.token);
      })
      .catch(err => {
        //Here we pass in status code into error, and we handle
        //error codes by err.response
        console.log(err);
        this.setState({
          loading: false,
          errStatus: err.response.status
        });
      });
  };

  render() {
    const modalBg = {
      modal: {
        background: "white ",
        borderRadius: "10%",
        maxHeight: "43%",
        height: "100%",
        maxWidth: "30%",
        width: "100%"
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
      login = <Spinner />;
    }
    return (
      <Modal
        className="modal-lg"
        open={this.props.loginOpen}
        onClose={this.props.onSwitchLoginModal}
        center
        styles={modalBg}
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
    handleLogIn: (username, userID, likedPosts, myPosts) =>
      dispatch({
        type: "LOGIN",
        username: username,
        userID: userID,
        likedPosts: likedPosts,
        myPosts: myPosts
      }),
    onSwitchLoginModal: () => dispatch({ type: "LOGINMODAL" })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
