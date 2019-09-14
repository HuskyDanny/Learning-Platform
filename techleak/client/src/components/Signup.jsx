import React, { Component } from "react";
import axios from "../axios/axios-blogs";
import Modal from "react-responsive-modal";
import Spinner from "./UI/Spinner/Spinner";
import { connect } from "react-redux";
class Singup extends Component {
  state = {
    username: "",
    password: "",
    email: "",
    passwordAgain: "",
    emailError: "",
    usernameError: "",
    loading: false
  };

  handleChange = (e, type) => {
    if (type === "email") {
      this.setState({ emailError: "" });
    }
    if (type === "username") {
      this.setState({ usernameError: "" });
    }
    this.setState({ [type]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ loading: true });
    if (this.state.password === this.state.passwordAgain) {
      const { username, email, password } = this.state;
      const user = {
        user: {
          username: username,
          email: email,
          password: password
        }
      };
      axios
        .post("/api/users/signup", user, { headers: "" })
        .then(res => {
          this.setState({
            loading: false,
            username: "",
            password: "",
            passwordAgain: "",
            email: ""
          });
          this.props.onSwitchModal();
          this.props.getWarning(
            "A verification email has been sent to your email account, you cannot post before verification"
          );
          const data = res.data;
          console.log(res);
          this.props.handleLogIn(data.username, data.id);
          localStorage.setItem("token", data.token);
        })
        .catch(err => {
          if (err.response) {
            this.setState({
              emailError: err.response.data.email,
              usernameError: err.response.data.username
            });
          }
          this.setState({ loading: false });
        });
    }
  };

  emailDuplicateError = () => {
    if (this.state.emailError) {
      return <p className="help is-danger">{this.state.emailError}</p>;
    }
  };
  usernameDuplicateError = () => {
    if (this.state.usernameError) {
      return <p className="help is-danger">{this.state.usernameError}</p>;
    }
  };

  MatchedPassword = () => {
    if (!this.state.password || !this.state.passwordAgain) return;
    if (this.state.password !== this.state.passwordAgain) {
      return <p className="help is-danger">Passwords are not matched</p>;
    } else {
      return <p className="help is-success">Passwords match</p>;
    }
  };

  render() {
    const modalBg = {
      modal: {
        background: "white ",
        borderRadius: "10%",
        maxHeight: "70%",
        height: "100%"
      }
    };

    let signUp = (
      <div style={{ padding: "4% " }}>
        <form onSubmit={this.handleSubmit}>
          <div className="field">
            <label className="label">Username</label>
            <div className="control has-icons-left has-icons-right">
              <input
                className="input is-primary"
                type="text"
                placeholder="Your Username"
                minLength="5"
                maxLength="15"
                required
                onChange={e => this.handleChange(e, "username")}
                value={this.state.username}
              />

              <span className="icon is-small is-left">
                <i className="fas fa-user" />
              </span>
              {this.usernameDuplicateError()}
            </div>
          </div>
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

          <div className="field">
            <label className="label">Enter Password Again</label>
            <div className="control has-icons-left has-icons-right">
              <input
                className="input is-primary"
                type="password"
                placeholder="Your Password"
                required
                onChange={e => this.handleChange(e, "passwordAgain")}
                value={this.state.passwordAgain}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-key" />
              </span>
              {this.MatchedPassword()}
            </div>
          </div>

          <div
            className="field is-grouped"
            style={{ justifyContent: "center" }}
          >
            <div className="control">
              <button type="submit" className="button is-primary">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    );

    if (this.state.loading) {
      signUp = (
        <div
          style={{
            textAlign: "center",
            paddingTop: "25%",
            paddingBottom: "25%"
          }}
        >
          <Spinner />;
        </div>
      );
    }
    return (
      <Modal
        className="modal-lg"
        open={this.props.signupOpen}
        onClose={this.props.onSwitchModal}
        center
        styles={modalBg}
        showCloseIcon={false}
      >
        {signUp}
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    signupOpen: state.persistedReducer.signupOpen
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSwitchModal: () => dispatch({ type: "SIGNUPMODAL" }),
    getWarning: warning => dispatch({ type: "GETWARNING", warning: warning }),
    handleLogIn: (username, userID) =>
      dispatch({
        type: "SIGNUP",
        username: username,
        userID: userID
      })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Singup);
