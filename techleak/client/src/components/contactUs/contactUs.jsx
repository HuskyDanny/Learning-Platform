import React from "react";
import Modal from "react-responsive-modal";
import "./contactUs.css";
import { connect } from "react-redux";
import axios from "axios";
class ContactUs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      familyname: "",
      email: "",
      phone: "",
      title: "",
      message: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  handleChange(e, type) {
    this.setState({ [type]: e.target.value });
  }

  resetForm() {
    this.setState({
      firstname: "",
      familyname: "",
      email: "",
      phone: "",
      title: "",
      message: ""
    })
  }

  handleSubmit(e) {
    const {firstname, familyname, email, phone, title, message} = this.state;
    alert("Your message is sent successfully, " + firstname);
    e.preventDefault();
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_BACKEND_SERVER}/api/contact/contact`,
      data: {
        firstname: firstname, 
        familyname: familyname,
        email: email, 
        phone: phone, 
        title: title, 
        message: message
      }
    })
    .then((response)=>{
      if (response.data.msg === 'success'){
        alert("Message Sent."); 
        this.resetForm();
      } else if(response.data.msg === 'fail'){
          alert("Message failed to send.")
      }        
    })
  }

  render() {
    const modalBg = {
      modal: {
        width: "570px",
        background: "white",
        borderRadius: "20px",
        overflow: "hidden",
        position: "relative",
        padding: "0px"
      }
    };

    return (
      <Modal
        open={this.props.contactUsOpen}
        onClose={this.props.onSwitchContactModal}
        styles={modalBg}
        center
      >
        <section className="contact-title-wrap">
          <span className="contact-title-1">Contact Us</span>
          <span className="contact-title-2">
            We look forward to your message!
          </span>
        </section>

        <form className="contact-form" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label className="form-label">Family Name:</label>
            <input
              className="contact-input"
              placeholder="Enter your surname"
              type="text"
              required
              onChange={e => this.handleChange(e, "familyname")}
              value={this.state.familyname}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Given Name:</label>
            <input
              className="contact-input"
              placeholder="Enter your given name"
              type="text"
              required
              onChange={e => this.handleChange(e, "firstname")}
              value={this.state.firstname}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email:</label>
            <input
              className="contact-input"
              placeholder="Enter your email address"
              type="email"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              required
              onChange={e => this.handleChange(e, "email")}
              value={this.state.email}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Phone:</label>
            <input
              className="contact-input"
              placeholder="Enter your phone number (Optional)"
              type="tel"
              onChange={e => this.handleChange(e, "phone")}
              value={this.state.phone}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Title:</label>
            <input
              className="contact-input"
              placeholder="Enter a title of the message"
              type="text"
              required
              onChange={e => this.handleChange(e, "title")}
              value={this.state.title}
            />
          </div>

          <div className="form-group" style={{ marginBottom: "40px" }}>
            <label className="form-label">Message:</label>
            <textarea
              className="contact-input contact-input-textarea"
              placeholder="Comment here.."
              type="text"
              required
              onChange={e => this.handleChange(e, "message")}
              value={this.state.message}
              style={{ resize: "vertical" }}
            />
          </div>

          <div style={{ paddingLeft: "17%" }}>
            <button
              type="submit"
              className="button is-primary is-rounded is-medium"
            >
              Submit
            </button>
          </div>
        </form>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    contactUsOpen: state.persistedReducer.contactUsOpen
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSwitchContactModal: () => dispatch({ type: "CONTACTMODAL" })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactUs);
