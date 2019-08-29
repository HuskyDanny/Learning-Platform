import React from "react";
import Loader from "react-loader-spinner";
export default class Spinner extends React.Component {
  //other logic
  render() {
    return (
      <Loader
        style={{ display: "inline-block" }}
        type="ThreeDots"
        color="#00BFFF"
        height="100"
        width="100"
      />
    );
  }
}
