import React, { Component } from 'react'
import {
  InstantSearch,
  Highlight,
  connectHits
} from 'react-instantsearch-dom';
import CustomSearchBox from './searchbox'
import '../App.css'
import Flexbox from 'flexbox-react';

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

export default class Tagsearch extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      inputContent:"",
      tags:[]
    };
  }

  handleRemoveItem = (target) => {
    this.setState(state => ({
      tags: state.tags.filter((tag) => tag !== target)
    }));
  }

  handleSelect = value => {
    if (this.state.tags.indexOf(value) === -1) {
      this.setState(prevState => ({ 
        tags:[...prevState.tags, value]
      }));
    };
    this.setState({ selected:true });
  }

  // openDisplay = () => {
  //   this.setState({ hitsDisplay: true })
  // }

  // closeDisplay = () => {
  //   this.setState({ hitsDisplay: false })
  // }
  
  render() {

    let inputTags = (
      this.state.tags.map((tag) => 
        <li key={tag} style={styles.items}>
          {tag}
          <button
            onClick={() => this.handleRemoveItem(tag)}
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

    if (this.props.hitsDisplay) {
      result = (
        <Flexbox 
          flexDirection="column" 
          minHeight="100vh"
        >
          <div className="rows">
            <MyHits handleSelect={this.handleSelect}/>
          </div>
        </Flexbox>
      )
    }

    return (
      <InstantSearch
        appId="JZR96HCCHL"
        apiKey="b6fb26478563473aa77c0930824eb913"
        indexName="tags"
      >
        <CustomSearchBox
          styles={styles}
          openDisplay={this.props.openDisplay}
          closeDisplay={this.props.closeDisplay}
        />
        <Flexbox>
          {inputTags}
        </Flexbox>
        {result}

      </InstantSearch>
    )
  }
}

const styles = {
  container: {
    border: '1px solid #ddd',
    padding: '5px',
    borderRadius: '5px',
  },

  hitStyle: {
    margin: "3% 1% 0 1%"
  },

  input: {
    outline: 'none',
    border: 'none',
    fontSize: '14px',
    fontFamily: 'Helvetica, sans-serif'
  },

  items: {
    display: 'inline-block',
    padding: '2px',
    border: '1px solid blue',
    fontFamily: 'Helvetica, sans-serif',
    borderRadius: '5px',
    marginRight: '5px',
    cursor: 'pointer'
  },

  hit: {
    width: '30%',
    height: '10%',
    float: 'left',
    marginBottom: '10px',
    borderBottom: 'solid 1px #eee',
    margin: '0.5%',
    border: 'solid 1px #eee',
    boxShadow: '0 0 3px #f6f6f6',
    position: 'relative',
    fontSize: '14px'
  }
}
