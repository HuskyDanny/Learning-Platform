import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "../../axios/axios-blogs";

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
      sent: 0
    };
  }

  handleChange = (e, type) => {
    this.setState({ [type]: e.target.value });
  };

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
        console.log(err);
      });
  };

  handlePasswordSubmit = e => {
    e.preventDefault();
    const { email, password, passwordAgain, confirmation } = this.state;

    if (password === passwordAgain) {
      axios({
        method: "POST",
        url: "/api/users/reset-password",
        data: {
          email: email,
          password: password,
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
          console.log(err);
        });
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
                name="email"
                onChange={e => this.handleChange(e, "email")}
                onKeyPress={this.handleKeyPress}
                placeholder="Please enter your email address..."
                required
                type="text"
                value={this.state.email}
              />
              <button type="submit" className="button is-primary">
                Reset Password
              </button>
              <Link 
                to="/"
                className="button is-success"
                style={{
                  marginTop: "10%",
                  width: "10%",
                  margin: "auto auto"
                }}
              >
                Cancel
              </Link>
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
              <button type="submit" className="button is-primary">
                Reset Password
              </button>
              <Link 
                to="/"
                className="button is-success"
                style={{
                  marginTop: "10%",
                  width: "10%",
                  margin: "auto auto",

                }}
              >
                Cancel
              </Link>
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

    return <React.Fragment>{display}</React.Fragment>;
  }
}
