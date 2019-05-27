import React from "react";
import Post from "./post";

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
            margin: "auto auto auto auto"
          }}
        >
          {posts.slice(index * 3, index * 3 + 3).map((post, position) => (
            <Post key={position + rows} post={post} />
          ))}
        </div>
      ))}
    </React.Fragment>
  );
};

export default Posts;
