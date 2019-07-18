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
  state = {
    refresh: false
  };

  //refresh periodically
  // componentDidMount() {
  //   this.interval = setInterval(
  //     () =>
  //       this.setState({ refresh: true }, () => {
  //         this.setState({ refresh: false });
  //       }),
  //     5000
  //   );
  // }
  // componentWillUnmount() {
  //   clearInterval(this.interval);
  // }

  refresh = () => {
    this.setState({ refresh: true }, () => {
      this.setState({ refresh: false });
    });
  };
  render() {
    return (
      <div>
        <InstantSearch
          indexName="Test"
          searchClient={searchClient}
          refresh={this.state.refresh}
        >
          <Configure hitsPerPage={6} analytics={true} distinct />
          <div style={{ justifyContent: "center", display: "flex" }}>
            <SortBy
              defaultRefinement="posts"
              items={[
                {
                  value: "posts",
                  label: "Sorted By"
                },
                {
                  value: "posts_post_date_decs",
                  label: "Date desc."
                },
                {
                  value: "posts_posts_date_asc",
                  label: "Date asc."
                },
                {
                  value: "posts_likes_desc",
                  label: "Likes desc."
                },
                {
                  value: "posts_likes_asc",
                  label: "Likes asc."
                }
              ]}
            />
            <SearchBox />
            <button onClick={this.refresh}> Refresh</button>
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
