import axios from "axios";
import React, { Component } from "react";
import Editor from "../editor/Editor";
import { Link } from "react-router-dom";
import image from "../../assets/img/logo.jpg";
import DropDown from "../dropdown/dropdown";
import Spinner from "../UI/Spinner/Spinner";
import Modal from "react-responsive-modal";
import { connect } from "react-redux";
import TagSearch from "../searchTags/tagsearch"
import { openDisplay, closeDisplay, addTag, removeTag } from "../../actions/tagActions"
import Tag from "../commons/tag";

class Publish extends Component {
  constructor(props) {
    super(props);

    this.state = {
      warning: false,
      loading: false,
      posted: false,
      content: "",
      title: "",
    };

    this.handlePost = this.handlePost.bind(this);
    this.successPosted = this.successPosted.bind(this);
    this.updateContent = this.updateContent.bind(this);
  }

  handlePost() {
    const token = localStorage.getItem("token");

    const post = {
      author: this.props.username,
      title: this.state.title,
      content: this.state.content,
      tags: this.state.tags || []
    };
    this.setState({ loading: true });

    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      }
    };
    axios
      .post(`${process.env.REACT_APP_BACKEND_SERVER}/api/posts`, post, headers)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
    this.setState({ posted: true, loading: false });
  }

  updateContent = value => {
    this.setState({ content: value });
  };

  handleCancel = () => {
    this.setState({ warning: true });
  };

  onCloseModal = () => {
    this.setState({ warning: false });
  };

  // openDisplay = () => {
  //   this.setState({ hitsDisplay: true })
  // }

  // closeDisplay = () => {
  //   this.setState({ hitsDisplay: false })
  // }

  // handleRemoveItem = (target) => {
  //   this.setState(state => ({
  //     tags: state.tags.filter((tag) => tag !== target)
  //   }));
  // }

  // handleSelect = value => {
  //   if (this.state.tags.indexOf(value) === -1) {
  //     this.setState(prevState => ({ 
  //       tags:[...prevState.tags, value]
  //     }));
  //   };
  // }

  // handleTags = e => {
  //   e.preventDefault();
  //   this.setState({ tags: e.target.value });
  // };

  handleTitle = e => {
    e.preventDefault();
    this.setState({ title: e.target.value });
  };
  
  successPosted() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: "10%"
        }}
      >
        <i
          className="far fa-check-circle "
          style={{
            color: "green",
            fontSize: "100px",
            margin: "auto auto "
          }}
        />
        <p
          style={{
            marginTop: "10%",
            margin: "auto auto"
          }}
        >
          Successfully Posted
        </p>
        <Link
          to="/index"
          className="button is-success"
          style={{
            marginTop: "10%",
            width: "10%",
            margin: "auto auto"
          }}
        >
          Main Page
        </Link>
      </div>
    );
  }

  render() {

    let submit = (
      <div class="level-left">
        <button
          className="button is-primary level-item"
          type="submit"
        >
          Post
        </button>
        <button
          className="button is-primary level-item"
          onClick={this.handleCancel}
        >
          Cancel
        </button>
      </div>
    )

    if (this.state.hitsDisplay) {
      submit = (
        <div></div>
      )
    }

    return (
      <React.Fragment>
        <div>
          <nav
            className="navbar"
            role="navigation"
            aria-label="main navigation"
          >
            <div className="navbar-brand">
              <div className="navbar-item">
                <Link to="/index">
                  <img src={image} width="112" height="48" alt="logo" />
                </Link>
              </div>
            </div>

            <div id="navbarBasicExample" className="navbar-menu">
              <div className="navbar-start" />
              <DropDown lists={["Save", "Draft"]} />
            </div>
          </nav>
        </div>
        <div style={{ width: "80%", margin: "auto auto" }}>
          {this.state.loading ? (
            <Spinner />
          ) : this.state.posted ? (
            this.successPosted()
          ) : (
            <React.Fragment>
              <form onSubmit={this.handlePost}>
                <label>Title</label>
                <input
                  className="input is-rounded"
                  type="text"
                  required
                  value={this.state.title}
                  onChange={this.handleTitle}
                />
                <div style={{ margin: "auto auto" }}>
                  <Editor
                    updateContent={this.updateContent}
                    value={this.state.content}
                  />
                </div>
                <label>Tags</label>
                <TagSearch
                  hitsDisplay={this.props.tagReducer.hitsDisplay}
                  tags={this.props.tagReducer.tags}
                  handleSelect={(tag) => this.props.addTag(tag)}
                  handleRemoveItem={(tag) => this.props.removeTag(tag)}
                  openDisplay={() => this.props.openDisplay()}
                  closeDisplay={() => this.props.closeDisplay()}
                  styles={styles}
                />
                {submit}
              </form>
            </React.Fragment>
          )}
        </div>
        <Modal
          className="modal-lg"
          open={this.state.warning}
          onClose={this.onCloseModal}
          center
        >
          <div>
            <h1>
              <strong>Warning</strong>
            </h1>
            <p style={{ color: "red" }}>Your Post Will Not Be Saved</p>
            <Link className="button is-link" to="/index">
              Okay, I Got It
            </Link>
          </div>
        </Modal>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.username,
    tagReducer: state.tagReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openDisplay: () => {
      dispatch(openDisplay());
    },
    closeDisplay: () => {
      dispatch(closeDisplay());
    },
    addTag: (tag) => {
      dispatch(addTag(tag));
    },
    removeTag: (tag) => {
      dispatch(removeTag(tag));
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(Publish);
