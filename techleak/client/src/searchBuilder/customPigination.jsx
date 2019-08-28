import React from "react";
import { connectPagination } from "react-instantsearch-dom";
import { connect } from "react-redux";

const Pagination = ({
  currentRefinement,
  nbPages,
  refine,
  createURL,
  savePigination
}) => (
  <ul className="ais-Pagination-list" style={{ marginTop: "2%" }}>
    <li
      className={`ais-Pagination-item ais-Pagination-item--firstPage ${
        currentRefinement < 2 ? "ais-Pagination-item--disabled" : ""
      }`}
    >
      <button
        className="button ais-Pagination-link"
        aria-label="First"
        onClick={event => {
          event.preventDefault();
          if (currentRefinement >= 2) {
            refine(currentRefinement - 1);
            savePigination(currentRefinement - 1);
          }
        }}
      >
        ‹‹
      </button>
    </li>
    {new Array(nbPages).fill(null).map((_, index) => {
      const page = index + 1;
      const style = {
        fontWeight: currentRefinement === page ? "bold" : "",
        textDecoration: currentRefinement === page ? "underline" : ""
      };

      return (
        <li className="ais-Pagination-item" key={index}>
          <a
            href={createURL(page)}
            style={style}
            onClick={event => {
              event.preventDefault();
              refine(page);
              savePigination(page);
            }}
          >
            <span className="ais-Pagination-link">{page}</span>
          </a>
        </li>
      );
    })}
    <li
      className={`ais-Pagination-item ais-Pagination-item--lastPage ${
        currentRefinement >= nbPages ? "ais-Pagination-item--disabled" : ""
      }`}
    >
      <button
        className="button ais-Pagination-link"
        aria-label="Last"
        onClick={event => {
          event.preventDefault();
          if (currentRefinement < nbPages) {
            refine(currentRefinement + 1);
            savePigination(currentRefinement + 1);
          }
        }}
      >
        ››
      </button>
    </li>
  </ul>
);

const mapDispatchToProps = dispatch => {
  return {
    savePigination: currRefinement =>
      dispatch({ type: "PIGINATIONNUMBER", currRefinement: currRefinement })
  };
};

const CustomPagination = connectPagination(Pagination);

export default connect(
  null,
  mapDispatchToProps
)(CustomPagination);
