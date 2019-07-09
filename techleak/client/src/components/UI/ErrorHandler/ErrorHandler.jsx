import React, { Component } from "react";
import Modal from "react-responsive-modal";

const WithHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      errorMessage: "",
      error: false
    };

    componentDidMount() {
      // Add a request interceptor
      axios.interceptors.request.use(req => {
        // Do something with request error
        this.setState({ error: false, errorMessage: "" });
        return req;
      });

      // Add a response interceptor
      axios.interceptors.response.use(
        res => res,
        error => {
          // Do something with response error

          this.setState({
            error: true,
            errorMessage: error.response.status
          });
          return Promise.reject(error);
        }
      );
    }

    render() {
      const modalBg = {
        modal: {
          background: "white ",
          borderRadius: "10%",
          maxHeight: "20%",
          height: "100%",
          maxWidth: "30%",
          width: "100%"
        }
      };

      let message;
      switch (this.state.errorMessage) {
        case 403:
          message = "Please login, if you have logged in, please log in again";
          break;
      }

      const onClose = () => {
        this.setState({ error: false, errorMessage: "" });
      };
      return (
        <div>
          <Modal
            open={this.state.error}
            onClose={onClose}
            center
            styles={modalBg}
          >
            {message}{" "}
            <i className="fas fa-exclamation" style={{ color: "red" }} />
          </Modal>
          <WrappedComponent {...this.props} />
        </div>
      );
    }
  };
};

export default WithHandler;
