import algoliasearch from "algoliasearch";
import React, { Component } from "react";
import "instantsearch.css/themes/algolia.css";
import {
  InstantSearch,
  SearchBox,
  Pagination,
  SortBy,
  connectHits,
  Configure
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
          <Configure hitsPerPage={6} analytics={true} distinct />
          <div style={{ justifyContent: "center", display: "flex" }}>
            <SortBy
              defaultRefinement="Test"
              items={[
                { value: "Test", label: "Sorted By" },
                { value: "Test_post_date_decs", label: "Date desc." },
                { value: "Test_posts_date_asc", label: "Date asc." },
                { value: "Test_likes_desc", label: "Likes desc." },
                { value: "Test_likes_asc", label: "Likes asc." }
              ]}
            />
            <SearchBox />
          </div>
          <CustomHits />
          <Pagination
            defaultRefinement={1}
            showFirst={true}
            showPrevious={true}
            showNext={true}
            showLast
            padding={3}
            totalPages={10}
          />
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
