import React from "react";
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


const HitComponent = ({ hit, handleSelect, styles }) => {
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

const MyHits = connectHits(({ hits, handleSelect, styles }) => {
  const hs = hits.map(hit => <HitComponent 
                                key={hit.objectID} 
                                hit={hit} 
                                handleSelect={handleSelect}
                                styles={styles}/>);
  return <div id="hits">{hs}</div>;
})

const TagSearch = (props) => {

  
  let result = (
    <div className="container-fluid" id="results">

    </div>
  )

  if (props.hitsDisplay) {
    result = (
      <Flexbox 
        flexDirection="column" 
      >
        <div className="rows">
          <MyHits handleSelect={props.handleSelect} styles={props.styles}/>
        </div>
      </Flexbox>
    )
  }

  return (
    <InstantSearch indexName="tags" searchClient={searchClient}>
      <Configure hitsPerPage={12} analytics={true} distinct />
      <CustomSearchBox
        styles={props.styles}
        openDisplay={props.openDisplay}
        closeDisplay={props.closeDisplay}
      />
      {result}
    </InstantSearch>
  );
}

export default TagSearch;