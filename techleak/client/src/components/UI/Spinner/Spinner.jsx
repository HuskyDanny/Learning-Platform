import React, { Component } from "react";
import Loader from "react-loader-spinner";
export default class Spinner extends React.Component {
  //other logic
  render() {
    return (
      <Loader
        style={{ margin: "10% 10%" }}
        type="ThreeDots"
        color="#00BFFF"
        height="100"
        width="100"
      />
    );
  }
}
