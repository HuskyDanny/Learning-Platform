import React, { Component } from "react";
import axios from "axios";
import Modal from "react-responsive-modal";
import Spinner from "./UI/Spinner/Spinner";
import { connect } from "react-redux";
class Login extends Component {
  state = {
    password: "",
    email: "",
    notMatched: false,
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
      .post("http://127.0.0.1:3000/api/users/login", user)
      .then(res => {
        this.setState({ loading: false, email: "", password: "" });
        console.log(res);
        this.props.handleLogIn(
          res.data.username,
          res.data.id,
          res.data.likedPosts
        );
        //close modal
        this.props.onSwitchLoginModal();
        //save tokens
        localStorage.setItem("token", res.data.token);
      })
      .catch(err => {
        this.setState({ notMatched: true, loading: false });
      });
  };

  emailDuplicateError = () => {
    if (this.state.emailError) {
      return <p className="help is-danger">{this.state.emailError}</p>;
    }
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

    const notMatchedError = () => {
      if (this.state.notMatched) {
        return (
          <p className="help is-danger"> Email and Password are not matched</p>
        );
      } else {
        return null;
      }
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
              {this.emailDuplicateError()}
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
          {notMatchedError()}
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
    loginOpen: state.loginOpen
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleLogIn: (username, userID, likedPosts) =>
      dispatch({
        type: "LOGIN",
        username: username,
        userID: userID,
        likedPosts: likedPosts
      }),
    onSwitchLoginModal: () => dispatch({ type: "LOGINMODAL" })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
