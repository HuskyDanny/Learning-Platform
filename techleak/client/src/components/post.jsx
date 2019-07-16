import React from "react";
import Tag from "./commons/tag";
import Likes from "./commons/likes";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
const Post = props => {
  const {
    author,
    likes,
    title,
    tags,
    post_date_timestamp,
    objectID
  } = props.post;

  const contentStyles = {
    padding: "3% 1% 2% 1%",
    height: "100%"
  };
  const postStyle = {
    margin: "3% 1% 0 1%"
  };

  const date = new Date(post_date_timestamp);

  return (
    <div className="column box is-4" style={postStyle}>
      <div>
        <Link to={`/blog/${objectID}`}>
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
          <footer style={contentStyles}>
            <div
              className="is-flex"
              style={{ justifyContent: "space-between" }}
            >
              <div>
                <span style={{ color: "black", fontSize: "12px" }}>
                  {`${date.getMonth() +
                    1}-${date.getDate()}-${date.getFullYear()}`}
                </span>
              </div>

              <div>
                <Likes likes={likes} />
              </div>
            </div>
          </footer>
        </Link>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    persistedReducer: state.persistedReducer
  };
};

export default connect(mapStateToProps)(Post);
