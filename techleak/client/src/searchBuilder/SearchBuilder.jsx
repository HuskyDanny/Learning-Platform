import algoliasearch from "algoliasearch";
import React, { Component } from "react";
import "instantsearch.css/themes/algolia.css";
import {
  InstantSearch,
  SearchBox,
  SortBy,
  Configure
} from "react-instantsearch-dom";
import { connect } from "react-redux";
import CustomHits from "./customHits";
import Pagination from "./customPigination";

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
  //     1000 * 60 * 5
  //   );
  //   this.props.refreshLikes();
  // }
  // componentWillUnmount() {
  //   clearInterval(this.interval);
  // }

  //refresh by click
  refresh = () => {
    this.setState({ refresh: true }, () => {
      this.setState({ refresh: false });
    });
    this.props.refreshLikes();
  };

  componentDidMount() {
    this.refresh();
  }

  render() {
    return (
      <div>
        <InstantSearch
          indexName="Test"
          searchClient={searchClient}
          refresh={this.state.refresh}
        >
          <Configure hitsPerPage={6} analytics={true} distinct page={1} />
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
            <button
              className="button"
              onClick={this.refresh}
              style={{
                color: "black",
                backgroundColor: "#ecf0f1",
                border: "1px solid grey",
                fontSize: "0.84em"
              }}
            >
              {" "}
              Refresh Content
            </button>
          </div>
          <CustomHits />
          <Pagination
            defaultRefinement={this.props.piginationNumber}
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

const mapStateToProps = state => {
  return {
    piginationNumber: state.persistedReducer.piginationNumber,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    refreshLikes: () => dispatch({ type: "REFRESHLIKES" })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBuilder);
