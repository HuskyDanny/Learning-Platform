import algoliasearch from "algoliasearch";
import React, { Component } from "react";
import "instantsearch.css/themes/algolia.css";
import {
  InstantSearch,
  SearchBox,
  Pagination,
  SortBy,
  Configure
} from "react-instantsearch-dom";

import CustomHits from "./customHits";

const searchClient = algoliasearch(
  process.env.REACT_APP_APPLICATION_ID,
  process.env.REACT_APP_SEARCH_ADMIN_API
);

class SearchBuilder extends Component {
  render() {
    return (
      <div>
        <InstantSearch indexName="Test" searchClient={searchClient} refresh>
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
            showFirst
            showPrevious
            showNext
            showLast
            padding={3}
            totalPages={10}
          />
        </InstantSearch>
      </div>
    );
  }
}

export default SearchBuilder;
