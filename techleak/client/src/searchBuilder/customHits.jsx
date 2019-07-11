import React from "react";
import { connectHits } from "react-instantsearch-dom";
import Posts from "../components/posts";
import { connect } from "react-redux";

const Hits = ({ hits, getHits }) => {
  if (hits && hits.length > 0) {
    getHits(hits);
    return <Posts posts={hits} />;
  }
  return null;
};

const CustomHits = connectHits(Hits);

const mapDispatchToProps = dispatch => {
  return {
    getHits: hits => dispatch({ type: "GETHITS", hits: hits })
  };
};

export default connect(
  null,
  mapDispatchToProps
)(CustomHits);
