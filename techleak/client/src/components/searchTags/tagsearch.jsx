import React, { Component } from 'react'
import algoliasearch from "algoliasearch";
import "instantsearch.css/themes/algolia.css";
import {
  InstantSearch,
  Highlight,
  connectHits,
  Configure
} from 'react-instantsearch-dom';
import CustomSearchBox from './searchbox';
import Flexbox from 'flexbox-react';

const searchClient = algoliasearch(
  process.env.REACT_APP_APPLICATION_ID,
  process.env.REACT_APP_SEARCH_ADMIN_API
);


const TagSearch = ({handleSelect, tags, handleRemoveItem, hitsDisplay, styles, openDisplay, closeDisplay, ...props}) => {

  const HitComponent = ({ hit, handleSelect }) => {
    return (
      <div className="column box" style={styles.hit}>
        <div 
          onClick={() => handleSelect(hit.name)}
        >
          <Highlight attribute="name" hit={hit} />
        </div>
      </div>
    );
  }
  
  const MyHits = connectHits(({ hits, handleSelect }) => {
    const hs = hits.map(hit => <HitComponent 
                                  key={hit.objectID} 
                                  hit={hit} 
                                  handleSelect={handleSelect}/>);
    return <div id="hits">{hs}</div>;
  })

  let inputTags = (
    tags.map((tag) => 
      <li key={tag} style={styles.items}>
        {tag}
        <button
          onClick={() => handleRemoveItem(tag)}
        >
          (x)
        </button>
      </li>
    )
  )

  let result = (
    <div className="container-fluid" id="results">

    </div>
  )

  if (hitsDisplay) {
    result = (
      <Flexbox 
        flexDirection="column" 
        minHeight="100vh"
      >
        <div className="rows">
          <MyHits handleSelect={handleSelect}/>
        </div>
      </Flexbox>
    )
  }


  return (
    <InstantSearch indexName="tags" searchClient={searchClient}>
      <Configure hitsPerPage={12} analytics={true} distinct />
      <CustomSearchBox
        styles={styles}
        openDisplay={openDisplay}
        closeDisplay={closeDisplay}
      />
      <Flexbox>
        {inputTags}
      </Flexbox>
      {result}

    </InstantSearch>
  )
}

export default TagSearch