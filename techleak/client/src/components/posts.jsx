import React from "react";
import Post from "./post";
import { connect } from "react-redux";

const Posts = props => {
  const { posts } = props;
  let rows = Math.ceil(posts.length / 3);
  rows = [...Array(rows)].map((val, index) => index);

  return (
    <React.Fragment>
      {rows.map(index => (
        <div
          key={index}
          className="columns"
          style={{
            width: "78%",
            margin: "auto 10% auto 10%"
          }}
        >
          {posts.slice(index * 3, index * 3 + 3).map((post, position) => (
            <Post key={position + rows} id={post.objectID} />
          ))}
        </div>
      ))}
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    posts: state.currentHits
  };
};

export default connect(mapStateToProps)(Posts);
