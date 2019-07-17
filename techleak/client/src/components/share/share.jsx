import React, { Component } from "react";
import Modal from "react-responsive-modal";
import { connect } from "react-redux";
import { Passers } from "prop-passer";
import ShareCss from "./shareCss";

import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  PinterestShareButton,
  VKShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
  PinterestIcon,
  VKIcon
} from "react-share";

class Share extends Component {
  render() {
    const modalBg = {
      modal: {
        background: "white",
        maxHeight: "18%",
        height: "100%",
        maxWidth: "30%",
        width: "100%"
      }
    };

    const {
      url = String(window.location),
      title = this.props.title,
      shareImage = "https://www.steadylearner.com/static/images/brand/prop-passer.png",
      size = 30
    } = this.props;

    const ShareList = Passers({
      url,
      className: "network__share-button"
    })({
      className: "network cursor-pointer hover transition--default",
      title: `Share ${String(window.location)}`
    })("li");

    let shareWindow = (
      <div>
        <input
          className="input is-rounded"
          type="text"
          defaultValue={url}
          style={{
            fontSize: 12
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
        `}
        >
          <ShareCss>
            <ShareList>
              <FacebookShareButton quote={title}>
                <FacebookIcon size={size} />
              </FacebookShareButton>

              <TwitterShareButton title={title}>
                <TwitterIcon size={size} />
              </TwitterShareButton>

              <WhatsappShareButton title={title} separator=":: ">
                <WhatsappIcon size={size} />
              </WhatsappShareButton>

              <LinkedinShareButton
                title={title}
                windowWidth={750}
                windowHeight={600}
              >
                <LinkedinIcon size={size} />
              </LinkedinShareButton>

              <PinterestShareButton
                url={String(window.location)}
                media={`${shareImage}`}
                windowWidth={1000}
                windowHeight={730}
              >
                <PinterestIcon size={size} />
              </PinterestShareButton>
            </ShareList>
          </ShareCss>
        </footer>
      </div>
    );

    return (
      <Modal
        className="model-share"
        open={this.props.shareOpen}
        onClose={this.props.onSwitchShareModal}
        showCloseIcon={false}
        styles={modalBg}
        blockScroll={false}
        center
      >
        {shareWindow}
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    shareOpen: state.persistedReducer.shareOpen
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSwitchShareModal: () => dispatch({ type: "SHAREMODAL" })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Share);
