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
    <li className="ais-Pagination-item ais-Pagination-item--firstPage ais-Pagination-item--disabled">
      <span className="ais-Pagination-link" aria-label="First">
        ‹‹
      </span>
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
    <li className="ais-Pagination-item ais-Pagination-item--lastPage">
      <a className="ais-Pagination-link" aria-label="Last" href="#">
        ››
      </a>
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
