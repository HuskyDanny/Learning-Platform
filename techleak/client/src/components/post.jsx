import React from "react";
import Tag from "./commons/tag";
import Likes from "./commons/likes";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import getTimeFormat from "../utils/getTimeFormat";
const Post = props => {
  const { author, title, tags, post_date_timestamp, objectID } = props.post;

  const contentStyles = {
    padding: "3% 1% 2% 1%"
  };
  const postStyle = {
    margin: "3% 1% 0 1%",
    display: "flex",
    minHeight: "100%",
    position: "relative"
  };

  return (
    <div className="column box is-4" style={postStyle}>
      <Link to={`/blog/${objectID}`} style={{ width: "100%" }}>
        <header style={{ contentStyles }}>
          <div className="tags">
            {tags.map((tag, index) => (
              <Tag key={index} name={tag} />
            ))}
          </div>
        </header>

        <section style={contentStyles}>
          <p className="is-family-sans-serif" style={{ color: "black" }}>
            {title}
          </p>
          <p
            className="is-family-monospace"
            style={{ color: "black", marginTop: "1%" }}
          >
            <i className="fas fa-user-astronaut" /> {author}
          </p>
        </section>

        <br />

        <footer
          style={{
            position: "absolute",
            bottom: "8px",
            left: "3.5%",
            right: "3.5%",
            paddingTop: "3%"
          }}
        >
          <div className="is-flex" style={{ justifyContent: "space-between" }}>
            <div>
              <span
                style={{
                  color: "black",
                  fontSize: "12px",
                  paddingTop: "3px",
                  float: "left"
                }}
              >
                {getTimeFormat(post_date_timestamp)}
              </span>
            </div>

            <div style={{ float: "right" }}>
              <Likes likes={props.persistedReducer.likes[objectID]} />
            </div>
          </div>
        </footer>
      </Link>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    persistedReducer: state.persistedReducer
  };
};

export default connect(mapStateToProps)(Post);
