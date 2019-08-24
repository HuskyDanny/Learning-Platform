import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "../../axios/axios-blogs";
import Modal from "react-responsive-modal";

export default class ResetPasswordPage extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleEmailSubmit = this.handleEmailSubmit.bind(this);
    this.handlePasswordSubmit = this.handlePasswordSubmit.bind(this);

    this.state = {
      email: "",
      password: "",
      passwordAgain: "",
      confirmation: "",
      sent: 0,
      userNotFound: false,
      PwdError: false,
      errStatus: ""
    };
  }

  handleChange = (e, type) => {
    this.setState({ [type]: e.target.value });
  };


  handleUserNotFound = (e) => {
    this.setState({ userNotFound: true })
  }

  handleCloseModal = (type) => {
    this.setState({[type]: false})
  } 

  handleEmailSubmit = e => {
    e.preventDefault();
    axios({
      method: "POST",
      url: "/api/users/reset-send-email",
      data: {
        email: this.state.email
      },
      headers: ""
    })
      .then(res => {
        this.setState({
          sent: this.state.sent + 1
        });
        localStorage.setItem("token", res.data.token);
      })
      .catch(err => {
        
        this.handleUserNotFound(e);
        console.log(err.response.status);
      });
  };

  handlePwdError = (e) => {
    this.setState({ PwdError: true });
  }

  handlePasswordSubmit = e => {
    e.preventDefault();
    const { email, password, passwordAgain, confirmation } = this.state;
    axios({
      method: "POST",
      url: "/api/users/reset-password",
      data: {
        email: email,
        password: password,
        passwordAgain: passwordAgain,
        confirmation: confirmation
      },
      headers: ""
    })
      .then(res => {
        this.setState({
          sent: this.state.sent + 1,
          email: "",
          password: "",
          passwordAgain: "",
          confirmation: ""
        });
        localStorage.setItem("token", res.data.token);
      })
      .catch(err => {
        this.setState({ errStatus: err.response.status })
        this.handlePwdError(e);
        console.log(err.response.status);
      });
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

    let error;
    //handles different error
    switch (this.state.errStatus) {
      case 401:
        error = "The Comfirmation Code Don't Match, Please Double Check!";
        break;
      case 403:
        error = "The Password is Currently Using, Please Reset to Some Other Password!";
        break;
      case 491:
        error = "The Passwords Need to Be Matched, Please Re-Enter!";
        break;
    }

    let display;
    if (this.state.sent % 3 === 0) {
      display = (
        <div className="row justify-content-center">
          <div className="col-10 col-sm-7 col-md-5 col-lg-4">
            <p>
              If you‘d like to reset your password, please enter your email here
              and a link to do so will be sent to the address you enter.
            </p>
            <form onSubmit={this.handleEmailSubmit}>
              <label className="label">Email</label>
              <input
                className="input is-primary"
                type="email"
                onChange={e => this.handleChange(e, "email")}
                onKeyPress={this.handleKeyPress}
                placeholder="Please enter your email address..."
                required
                value={this.state.email}
              />
              <div style={{ paddingTop: "15px" }}>
                <button type="submit" className="button is-primary">
                  Reset Password
                </button>
                <Link 
                  to="/"
                  className="button is-success"
                  style={{
                    width: "10%",
                    margin: "auto auto",
                    marginLeft: "5px"
                  }}
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      );
    } else if (this.state.sent % 3 === 1) {
      display = (
        <div className="row justify-content-center">
          <div className="col-10 col-sm-7 col-md-5 col-lg-4">
            <form onSubmit={this.handlePasswordSubmit} >
              <p>
                Please enter the new password you want to set as well as the
                six-digit confirmation code that we have sent to you email
                address
              </p>
              <label className="label">Password</label>
              <input
                className="contorl input is-primary"
                type="password"
                onChange={e => this.handleChange(e, "password")}
                onKeyPress={this.handleKeyPress}
                placeholder="Plase enter new password..."
                required
                value={this.state.password}
              />
              <label className="label">Re-enter Password</label>
              <input
                className="contorl input is-primary"
                type="password"
                onChange={e => this.handleChange(e, "passwordAgain")}
                onKeyPress={this.handleKeyPress}
                placeholder="Plase re-enter the password..."
                required
                value={this.state.passwordAgain}
              />
              {this.MatchedPassword()}
              <label className="label">Confirmation Code</label>
              <input
                className="input is-primary"
                name="confirmation"
                onChange={e => this.handleChange(e, "confirmation")}
                onKeyPress={this.handleKeyPress}
                placeholder="Plase enter new password..."
                required
                type="text"
                value={this.state.confirmation}
              />
              <div style={{ paddingTop: "15px" }}>
                <button type="submit" className="button is-primary">
                  Reset Password
                </button>
                <Link 
                  to="/"
                  className="button is-success"
                  style={{
                    width: "10%",
                    marginLeft: "5px",
                  }}
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      );
    } else if (this.state.sent % 3 === 2) {
      display = (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "10%"
          }}
        >
          <i
            className="far fa-check-circle "
            style={{
              color: "green",
              fontSize: "100px",
              margin: "auto auto "
            }}
          />
          <p
            style={{
              marginTop: "10%",
              margin: "auto auto"
            }}
          >
            Password Successfully Updated
          </p>
          <Link
            to="/"
            className="button is-success"
            style={{
              marginTop: "10%",
              width: "10%",
              margin: "auto auto"
            }}
          >
            Main Page
          </Link>
        </div>
      );
    }

    const modalBg = {
      modal: {
        borderRadius: "2%",
        height:"50px",
        padding: "5px 5px 5px 5px",
        display: "inpline-block", 
        textAlign: "center"
      }
    };

    return (
      <React.Fragment>
        {display}
        <div>
          <Modal
            open={this.state.userNotFound}
            onClose={e => this.handleCloseModal("userNotFound")}
            center
            styles={modalBg}
          >
            <h2 style={{ padding:"0.5% 60px 10px 50px" }}>
              We Can't Find User According to the Input Email Address, Please Double Check!
            </h2>
          </Modal>
        </div>
        <div>
          <Modal
            open={this.state.PwdError}
            onClose={e => this.handleCloseModal("PwdError")}
            center
            styles={modalBg}
          >
            <h2 style={{ padding:"0.5% 60px 10px 50px" }}>
              {error}
            </h2>
          </Modal>
        </div>
      </React.Fragment>
    );
  }
}
