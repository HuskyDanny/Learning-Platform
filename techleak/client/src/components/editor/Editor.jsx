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
import "froala-editor/js/plugins/image_manager.min.js";
import FroalaEditorComponent from "react-froala-wysiwyg";

const EditorComponent = props => {
  const YOURSERVER = "http://localhost:3000";

  const config = {
    height: 300,
    imageUploadURL: `${YOURSERVER}/api/uploads/images`,
    requestHeaders: {
      Authorization: `Token ${localStorage.getItem("token")}`
    },
    events: {
      "image.removed": function($img) {
        console.log($img.attr("src").slice(YOURSERVER.length + 1));
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          // Image was removed.
          if (this.readyState == 4 && this.status == 200) {
            console.log("image was deleted");
          }
        };
        xhttp.open("POST", `${YOURSERVER}/api/uploads/delete_image`, true);
        xhttp.setRequestHeader(
          "Content-Type",
          "application/json;charset=UTF-8"
        );
        xhttp.send(
          JSON.stringify({
            //Here use slice to exclude http://localhost:3000
            src: $img.attr("src").slice(YOURSERVER.length + 1)
          })
        );
      },
      "image.beforeUpload": function(images) {
        // Return false if you want to stop the image upload.
      },
      "image.uploaded": function(response) {
        // Image was uploaded to the server.
        const img = JSON.parse(response).link;
        var img_url = YOURSERVER + img;
        this.image.insert(img_url, false, null, this.image.get(), response);

        return false;
      },
      "image.inserted": function($img, response) {
        // Image was inserted in the editor.
      },
      "image.replaced": function($img, response) {
        // Image was replaced in the editor.
        console.log("replaced");
      },
      "image.error": function(error, response) {
        // Bad link.
        if (error.code == 1) {
          console.log(1);
        }

        // No link in upload response.
        else if (error.code == 2) {
          console.log(2);
        }

        // Error during image upload.
        else if (error.code == 3) {
          console.log(3);
        }

        // Parsing response failed.
        else if (error.code == 4) {
          console.log(4);
        }

        // Image too text-large.
        else if (error.code == 5) {
          console.log(5);
        }

        // Invalid image type.
        else if (error.code == 6) {
          console.log(6);
        }

        // Image can be uploaded only to same domain in IE 8 and IE 9.
        else if (error.code == 7) {
          console.log(7);
        }

        // Response contains the original server response to the request if available.
      }
    }
  };
  return (
    <FroalaEditorComponent
      model={props.value}
      onModelChange={props.updateContent}
      config={config}
    />
  );
};

export default EditorComponent;