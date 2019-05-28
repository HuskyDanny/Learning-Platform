import React from "react";
import Tag from "./commons/tag";
import Likes from "./commons/likes";
import { Link } from "react-router-dom";
const Post = props => {
  const { author, title, tags, likes, post_date, objectID } = props.post;
  const contentStyles = {
    padding: "3% 1% 2% 1%",
    height: "100%"
  };
  const postStyle = {
    margin: "3% 1% 0 1%"
  };

  return (
    <div className="column box is-4" style={postStyle}>
      <div>
        <Link to={"/blog/" + objectID}>
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
                  {post_date.slice(0, 10)}
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

export default Post;
