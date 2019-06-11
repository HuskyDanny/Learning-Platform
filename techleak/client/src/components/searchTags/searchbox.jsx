import React, { Component } from 'react'
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
    <label>
      <ul style={styles.container}>
        <input
          style={styles.input}
          type="text"
          value={currentRefinement}
          onChange={e => handleChange(e, refine)}
        />
      </ul>
    </label>
  )
}

export default connectSearchBox(CustomSearchBox);