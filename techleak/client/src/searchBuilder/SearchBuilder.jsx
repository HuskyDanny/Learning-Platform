import algoliasearch from "algoliasearch";
import React, { Component } from "react";
import "instantsearch.css/themes/algolia.css";
import {
  InstantSearch,
  SearchBox,
  Pagination,
  ClearRefinements,
  RefinementList,
  Configure,
  connectHits
} from "react-instantsearch-dom";
import Posts from "../components/posts";

const searchClient = algoliasearch(
  "ZHIBUXKOT0",
  "fe7ce01b726f12ff9c7555c1c5df9c03"
);

class SearchBuilder extends Component {
  render() {
    return (
      <div>
        <InstantSearch indexName="Test" searchClient={searchClient}>
          <div style={{ justifyContent: "center", display: "flex" }}>
            <SearchBox />
          </div>
          <CustomHits />
          <Pagination />
        </InstantSearch>
      </div>
    );
  }
}

const Hits = ({ hits }) => {
  return <Posts posts={hits} />;
};

const CustomHits = connectHits(Hits);

export default SearchBuilder;
