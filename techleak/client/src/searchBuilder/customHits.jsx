import React from "react";
import { connectHits } from "react-instantsearch-dom";
import Posts from "../components/posts";
import { store } from "../store/configureStore";

const Hits = ({ hits }) => {
  store.dispatch({ type: "GETHITS", hits: hits });
  return <Posts posts={hits} />;
};

const CustomHits = connectHits(Hits);

export default CustomHits;
