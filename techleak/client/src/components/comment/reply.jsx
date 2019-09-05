import axios from "../../axios/axios-blogs";
import React from "react";
import elapsed from "../../utils/getElapsed";
import { connect } from "react-redux";

const Reply = props => {
  const handleDelete = () => {
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
        withCredentials: true
      }
    };
    axios
      .delete(
        `${process.env.REACT_APP_BACKEND_SERVER}/api/posts/comments/reply/${
          props.blogId
        }?commentId=${props.reply.commentRef}&replyId=${props.reply._id}`,
        headers
      )
      .then(res => {
        props.deleteReply(props.reply._id);
      })
      .catch(err => console.log(err));
  };

  const deleteButton = (
    <button className="button is-white" onClick={handleDelete}>
      <i className="fas fa-backspace" />
    </button>
  );

  return (
    <div className="content">
      <div className="level" style={{ marginBottom: "0px", fontSize: "0.8em" }}>
        <strong>
          <h5 style={{ display: "inline" }}>{props.reply.username}</h5>
        </strong>
        {props.reply.userID === props.userId ? deleteButton : null}
      </div>
      <span>
        {props.reply.body}
        <br />
        <small>
          {" "}
          {elapsed(new Date().getTime() - props.reply.post_date_timestamp)} Ago
        </small>
      </span>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    userId: state.persistedReducer.userID
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteReply: id => dispatch({ type: "DELETEREPLY", id: id })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Reply);
