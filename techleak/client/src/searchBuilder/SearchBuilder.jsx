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
          <div>
            <div
              style={{
                position: "absolute",
                left: "45%",
                marginBottom: "2%"
              }}
            >
              <SearchBox />
            </div>
            <CustomHits />
            <Pagination />
          </div>
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
