import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: "" };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true, errorMessage: error });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>{this.state.errorMessage}</h1>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
