import React, { Component } from 'react'
import axios from "axios";

export default class ResetPasswordPage extends Component {
  
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleEmailSubmit = this.handleEmailSubmit.bind(this);
    this.handlePasswordSubmit = this.handlePasswordSubmit.bind(this);

    this.state = {
      email: "",
      password: "",
      passwordAgain: "",
      confirmation: "",
      submit: false,
      error:""
    }
  }

  handleChange = (e, type) => {
    this.setState({ [type]: e.target.value });
  }

  handleKeyPress(e, target) {
    // const {submit, email, password, passwordAgain, confirmation} = this.state;
    // if (target.charCode == 13 && !submit && email !== "") {
    //   this.handleEmailSubmit(e);
    // } else if (target.charCode == 13 && submit && 
    //           password !== "" && passwordAgain !== "" &&
    //           confirmation !== "") {
    //   this.handlePasswordSubmit(e);
    // }
  }

  handleEmailSubmit = (e) => {
    e.preventDefault();
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_BACKEND_SERVER}/api/users/reset-send-email`,
      data: {
        email: this.state.email
      }
    })
      .then(res => {
        this.setState({
          email: "",
          submit: true
        })
        localStorage.setItem("token", res.data.token);
      })
      .catch(err => {
        console.log(err);
        this.setState({
          error: err.response.status
        });
      })
  }

  handlePasswordSubmit = (e) => {
    e.preventDefault();
    const { 
      email,
      password,
      passwordAgain,
      confirmation
    } = this.state

    if (password === passwordAgain) {
      axios({
        method: 'POST',
        url: `${process.env.REACT_APP_BACKEND_SERVER}/api/users/reset-password`,
        data: {
          email: email,
          password: password,
          confirmation: confirmation
        }
      })
        .then(res => {
          this.setState({
            submit: false,
            email: "",
            password: "",
            passwordAgain: "",
            confirmation: ""
          })
          localStorage.setItem("token", res.data.token);
        })
        .catch(err => {
          console.log(err);
          this.setState({
            error: err.response.status
          })
        })
    }
  }

  MatchedPassword = () => {
    if (!this.state.password || !this.state.passwordAgain) return;
    if (this.state.password !== this.state.passwordAgain) {
      return <p className="help is-danger">Passwords are not matched</p>;
    } else {
      return <p className="help is-success">Passwords match</p>;
    }
  };

  render() {

    let display = (
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
              placeholder="noreply@techleak.com"
              required
              type="text"
              value={this.state.email}
            />
            <button type="submit" className="button is-primary">Reset Password</button>
          </form>
        </div>
      </div>
    )

    if (this.state.submit) {
      display = (
        <div className="row justify-content-center">
          <div className="col-10 col-sm-7 col-md-5 col-lg-4">
            <form onSubmit={this.handlePasswordSubmit}>
              <p>
                Please enter the new password you want to set as well as the six-digit
                confirmation code that we have sent to you email address
              </p>
              <label className="label">Password</label>
              <input
                className="input is-primary"
                name="password"
                onChange={e => this.handleChange(e, "password")}
                onKeyPress={this.handleKeyPress}
                placeholder="Plase enter new password..."
                required
                type="text"
                value={this.state.password}
              />
              <label className="label">Re-enter Password</label>
              <input
                className="input is-primary"
                name="password"
                onChange={e => this.handleChange(e, "passwordAgain")}
                onKeyPress={this.handleKeyPress}
                placeholder="Plase re-enter the password..."
                required
                type="text"
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
              <button type="submit" className="button is-primary">Reset Password</button>
            </form>
          </div>
        </div>
      )
    }
    
    return (
      <React.Fragment>
        {display}
      </React.Fragment>
    );
  }
}
