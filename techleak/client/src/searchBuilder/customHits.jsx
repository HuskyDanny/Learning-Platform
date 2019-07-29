import React from "react";
import { connectHits } from "react-instantsearch-dom";
import Posts from "../components/posts";
import { connect } from "react-redux";

const Hits = ({ hits, handleLikes }) => {
  if (hits && hits.length > 0) {
    console.log(hits);
    handleLikes(hits);
    return <Posts posts={hits} />;
  }
  return null;
};

const CustomHits = connectHits(Hits);

const mapDispatchToProps = dispatch => {
  return {
    handleLikes: hits => dispatch({ type: "HANDLELIKE", hits: hits })
  };
};

export default connect(
  null,
  mapDispatchToProps
)(CustomHits);
