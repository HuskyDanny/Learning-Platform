import React, { Component } from "react";

import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/js/plugins/video.min.js";
import "froala-editor/js/plugins/url.min.js";
import "froala-editor/js/plugins/file.min.js";
import "froala-editor/js/plugins/image.min.js";
import "froala-editor/js/plugins/emoticons.min.js";
import "froala-editor/js/plugins/table.min.js";
import "froala-editor/js/plugins/special_characters.min.js";
import "froala-editor/js/plugins/link.min.js";
import "froala-editor/js/plugins/help.min.js";
import "froala-editor/js/plugins/font_family.min.js";
import "froala-editor/js/plugins/font_size.min.js";
import "froala-editor/js/plugins/align.min.js";
import "froala-editor/js/plugins/code_view.min.js";
import "froala-editor/js/plugins/char_counter.min.js";
import "froala-editor/js/plugins/draggable.min.js";
import "froala-editor/js/plugins/save.min.js";
import "froala-editor/js/plugins/paragraph_format.min.js";
import "froala-editor/js/plugins/paragraph_style.min.js";
import "froala-editor/js/plugins/color.min.js";
import FroalaEditorComponent from "react-froala-wysiwyg";

class EditorComponent extends React.Component {
  constructor() {
    super();

    this.handleModelChange = this.handleModelChange.bind(this);

    this.state = {
      model: "Example text"
    };
  }

  handleModelChange(model) {
    this.setState({
      model: model
    });
  }

  render() {
    const config = {
      height: 300,
      imageUploadURL: "http://localhost:3000/api/uploads",
      events: {
        "image.beforeUpload": function(images) {
          // Return false if you want to stop the image upload.
          console.log(images);
        },
        "image.uploaded": function(response) {
          // Image was uploaded to the server.
          console.log(response);
        },
        "image.inserted": function($img, response) {
          // Image was inserted in the editor.
          console.log(response);
        }
      }
    };
    return (
      <FroalaEditorComponent
        model={this.state.model}
        onModelChange={this.handleModelChange}
        config={config}
      />
    );
  }
}
export default EditorComponent;
