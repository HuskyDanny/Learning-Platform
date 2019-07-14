import React from "react";
import { connectHits } from "react-instantsearch-dom";
import Posts from "../components/posts";

const Hits = ({ hits }) => {
  if (hits && hits.length > 0) {
    return <Posts posts={hits} />;
  }
  return null;
};

const CustomHits = connectHits(Hits);

export default CustomHits;
