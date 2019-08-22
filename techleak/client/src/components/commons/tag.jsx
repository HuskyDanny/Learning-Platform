import React from "react";

const Tag = props => {
  const { name } = props;
  return <li style={styles.items}>{name}</li>;
};

const styles = {
  items: {
    display: "inline-block",
    fontSize: "12px",
    padding: "5px",
    marginBottom: "2%",
    border: "none",
    whiteSpace: "nowrap",
    color: "#ffffff",
    backgroundColor: "#10d3a9",
    fontFamily: "Helvetica, sans-serif",
    maxWidth: "30%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    borderRadius: "5px",
    marginRight: "1%",
    cursor: "pointer"
  }
};

export default Tag;
