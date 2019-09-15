import React from "react";
import { Link } from "react-router-dom";

const divStyle = {
  width: "50%",
  height: "10rem",
  margin: "10% auto auto auto",
  textAlign: "center",
  paddingLeft: " 10%",
  paddingTop: "2%",
  background:
    "url(http://i.imgur.com/lcm5byq.png) 20px 10px/ 15% 90% no-repeat,url(http://i.imgur.com/2tiJEnP.png) 0% 0%/cover",
  color: "white"
};
const buttonStyle = {
  display: "block",
  margin: "2% auto 2% auto",
  width: "30%",
  backgroundColor: "#EB383B"
};

const confirmation = props => {
  return (
    <div style={divStyle}>
      <p>
        Congratulation, you have verified your email account, now you could
        share your experience, enjoy learning
        <Link className="button is-primary" style={buttonStyle} to="/">
          Got It
        </Link>
      </p>
    </div>
  );
};

export default confirmation;
