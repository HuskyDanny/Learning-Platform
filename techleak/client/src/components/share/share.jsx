import React, { Component } from 'react'
import Modal from "react-responsive-modal";
import { connect } from "react-redux";
import { Passers } from "prop-passer";
import ShareCss from "./shareCss";

import { 
  FacebookShareButton, 
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon
} from 'react-share';

class Share extends Component {
  render() {

    const modalBg = {
      modal: {
        background: "black",
        maxHeight: "20%",
        height: "100%",
        maxWidth: "30%",
        width: "100%"
      }
    };

    const {
      url = String(window.location),
      title = this.props.title,
      size = 30,
    } = this.props;

    const ShareList = Passers({
      url,
      className: "network__share-button",
    })({
      className: "network cursor-pointer hover transition--default",
      title: `Share ${String(window.location)}`,
    })("li");

    let shareWindow = (
      <div>
        <input 
          className="input is-rounded"
          type="text"
          defaultValue={url}
          style={{
            fontSize:12
          }}
        />
        <footer
          className={`
            height--nav
            sub
            fixed
            width-vw
            center
            cursor-pointer
            transition--default
        `}>
          <ShareCss>
            <ShareList>
              <FacebookShareButton
                quote={title}
              >
                <FacebookIcon size={size} />
              </FacebookShareButton>
              <TwitterShareButton
                quote={title}
              >
                <TwitterIcon size={size} />
              </TwitterShareButton>
            </ShareList>
          </ShareCss>
        </footer>
      </div>
    )

    return (
      <Modal
        className="model-share"
        open={this.props.shareOpen}
        onClose={this.props.onSwitchShareModal}
        showCloseIcon={false}
        styles={modalBg}
      >
        {shareWindow}
      </Modal>
    )
  }
}

const mapStateToProps = state => {
  return {
    shareOpen: state.persistedReducer.shareOpen
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSwitchShareModal: () => dispatch({ type: "SHAREMODAL" })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Share);

