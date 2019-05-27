import React from "react";

const Likes = props => {
  const { likes } = props;
  return (
    <div>
      <i className="far fa-thumbs-up" style={{ color: "red" }} />
      <span style={{ fontFamily: "Comic Sans MS", color: "black" }}>
        {" " + likes}
      </span>
    </div>
  );
};

export default Likes;
