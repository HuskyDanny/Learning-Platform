import React, { Component } from "react";
import Modal from "react-responsive-modal";
import { Link } from "react-router-dom";


const WithHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      errorMessage: "",
      error: false,
      modalMaxWidth: "30%"
    };

    componentDidMount() {
      window.addEventListener("resize", this.resize.bind(this));
      this.resize()
    }

    componentWillMount() {
      // Add a request interceptor
      this.reqInterceptor = axios.interceptors.request.use(req => {
        // Do something with request error
        this.setState({ error: false, errorMessage: "" });
        return req;
      });

      // Add a response interceptor
      this.resInterceptor = axios.interceptors.response.use(
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

    //Need to remove the interceptor after calls
    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    resize() {
      if (window.innerWidth <= 650) {
        this.setState({ modalMaxWidth: "90%" })
      } else if (window.innerWidth <= 1000) {
        this.setState({ modalMaxWidth: "50%" })
      } else {
        this.setState({ modalMaxWidth: "30%" })
      }
    }

    render() {
      const modalBg = {
        modal: {
          background: "white ",
          borderRadius: "3%",
          maxHeight: "100%",
          maxWidth: this.state.modalMaxWidth,
        }
      };

      let message;
      switch (this.state.errorMessage) {
        case 403:
          message = "Please login, login status is expired";
          break;
        case 400:
          message =
            "Data not found. The author may have deleted the post. If you have questions, please contact us!";
          break;
        case 500:
          message = "Server breaks, please contact us";
          break;
        case 412:
          message = "Post not successful, please write some content or repost";
          break;
        case 422:
          message = "Account not verified, please verify first";
          break;
        default:
          message = "Unexpected error occurs. Please report the error to us through contact us";
          break;
      }

      const onClose = () => {
        this.setState({ error: false });
      };

      const onExited = () => {
        if (
          this.props.history &&
          (this.state.errorMessage === 400 || this.state.errorMessage === 500)
        ) {
          this.props.history.push("/");
        }
      };
      return (
        <div>
          <Modal
            blockScroll={false}
            open={this.state.error}
            onClose={onClose}
            center
            styles={modalBg}
            onExited={onExited}
          >
            <section style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                  fontFamily: "sans-serif",
                  fontWeight: "700",
                  fontSize: "20px",
                  textAlign: "center"
                }}
              >
                <i
                  class="fas fa-exclamation-triangle"
                  style={{
                    color: "red",
                    fontWeight: "0.5rem",
                    paddingRight: "0.5rem"
                  }}
                >
                  {" "}
                </i>
                Error
                </span>
              <br />
              <div
                style={{
                  fontSize: "1.2rem",
                  textAlign: "center",
                  fontWeight: "450"
                }}
              >
                {message}{" "}
              </div>
              <br />
              <Link
                to="/"
                className="button is-success"
                style={{
                  width: "30%",
                  alignSelf: "center"
                }}
              >
                OK
              </Link>
            </section>
          </Modal>
          <WrappedComponent {...this.props} />
        </div >
      );
    }
  };
};

export default WithHandler;
