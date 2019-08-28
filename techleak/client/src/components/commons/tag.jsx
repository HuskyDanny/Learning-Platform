import React from "react";

const Tag = props => {
  const { name } = props;
  return <span className="tag is-primary is-rounded is-small">{name}</span>;
  // return <li style={styles.items}>{name}</li>;
};

export default Tag;
