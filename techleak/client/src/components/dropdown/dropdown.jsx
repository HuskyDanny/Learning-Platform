import React from "react";

const DropDown = props => {
  return (
    <React.Fragment>
      <div className="dropdown is-hoverable navbar-item">
        <div className="dropdown-trigger">
          <button
            className="button"
            aria-haspopup="true"
            aria-controls="dropdown-menu4"
          >
            <span>More Options</span>
            <span className="icon is-small">
              <i className="fas fa-angle-down" aria-hidden="true" />
            </span>
          </button>
        </div>
        <div className="dropdown-menu" id="dropdown-menu4" role="menu">
          <div className="dropdown-content">
            <div className="dropdown-item">
              {props.lists.map((list, index) => (
                <button
                  key={index}
                  onClick={props.funcs[index]}
                  className="dropdown-item button is-white"
                >
                  {list}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default DropDown;
