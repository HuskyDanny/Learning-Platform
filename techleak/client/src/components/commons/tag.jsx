import React from "react";

const Tag = props => {
  const { name } = props;
  return <span className="tag is-primary is-rounded is-small">{name}</span>;
  // return <li style={styles.items}>{name}</li>;
};

const styles = {
  items: {
    display: "inline-block",
    fontSize: "12px",
    padding: "5px",
    marginBottom: "2%",
    border: "none",
    color: "#ffffff",
    backgroundColor: "#10d3a9",
    fontFamily: "Helvetica, sans-serif",
    borderRadius: "5px",
    marginRight: "1%",
    cursor: "pointer"
  }
};

export default Tag;
