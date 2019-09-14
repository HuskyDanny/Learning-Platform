import React from "react";
import { connect } from "react-redux";
const styles = {
  textAlign: "center",
  background: "linear-gradient(to left top, #B2EBF2, #B2DFDB)",
  marginBottom: "0.5rem"
};
const button = {
  backgroundColor: "Transparent",
  border: "0px",
  cursor: "pointer",
  outline: null,
  overflow: "hidden",
  padding: "0 0 0 0"
};
const warning = props => {
  const handleCancel = () => {
    props.cancelWarning();
  };
  if (!props.warning) {
    return null;
  }
  return (
    <p style={styles}>
      <i className="fas fa-exclamation-triangle" style={{ color: "gold" }}></i>
      {props.warningContent}{" "}
      <button style={button} onClick={handleCancel}>
        <i className="far fa-times-circle" style={{ color: "#FF5722" }}></i>
      </button>
    </p>
  );
};
const mapStateToProps = state => {
  return {
    warning: state.persistedReducer.warning,
    warningContent: state.persistedReducer.warningContent
  };
};

const mapDispatchToProps = dispatch => {
  return {
    cancelWarning: () => dispatch({ type: "CANCELWARNING" })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(warning);
