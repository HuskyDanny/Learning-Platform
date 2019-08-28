import React from 'react'
import { connectSearchBox } from 'react-instantsearch-dom';

const CustomSearchBox = ({ currentRefinement, refine, openDisplay, closeDisplay, styles, ...props }) => {
  const handleChange = (e, refine) => {
    const value = e.target.value
    refine(value)
    if (value !== "") {
      openDisplay();
    } else {
      closeDisplay();
    }
  }
  
  return (
    <input
      className="input is-rounded"
      type="text"
      value={currentRefinement}
      onChange={e => handleChange(e, refine)}
    />
  )
}

export default connectSearchBox(CustomSearchBox);