import React, { Component } from "react";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import Modal from "react-modal";
import Editor from "../editor/Editor";
import Spinner from "../UI/Spinner/Spinner";
class Publish extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      posted: false
    };

    this.handlePost = this.handlePost.bind(this);
    this.successPosted = this.successPosted.bind(this);
  }

  componentDidMount() {
    Modal.setAppElement(this.el);
  }

  handlePost() {
    this.setState({ posted: true });
  }

  successPosted() {
    return <i className="far fa-check-circle " style={{ color: "green" , display:'flex', justifyContent:'center', fontSize:'100px'}} />;
  }

  render() {
    return (
      <div ref={ref => (this.el = ref)}>
        <SlidingPane
          isOpen={this.props.isPaneOpen}
          title="Share Your Wisdom and Click Post"
          from="bottom"
          width="100%"
          onRequestClose={this.props.onPaneOpen}
        >
          {this.state.posted ? (
            this.successPosted()
          ) : (
            <React.Fragment>
              <Editor />
              <button onClick={this.handlePost}>Post</button>
            </React.Fragment>
          )}
        </SlidingPane>
      </div>
    );
  }
}

export default Publish;
