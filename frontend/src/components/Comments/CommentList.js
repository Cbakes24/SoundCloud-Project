import "./Comments.css";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { deleteComment, loadAllComments } from "../../store/comments";
import { useParams } from "react-router-dom";
import { useState } from "react";
import SingleComment from "./SingleComment";

const CommentList = ({ song }) => {
  const dispatch = useDispatch();
  const { songId } = useParams();
  const comments = useSelector((state) => state.comments);
  const commentsArr = Object.values(comments);

  // const [commentId, setCommentId] = useState("");

  const currentSongComments = commentsArr.filter(
    (comment) => comment.songId == songId
  );
  const currentUser = useSelector((state) => state.session.user);
  const username = currentUser.username;

  useEffect(() => {
    dispatch(loadAllComments());
  }, [dispatch]);

  // const handleDelete = (e) => {
  //   e.preventDefault()
  //   // console.log(comment.id, "TARGET VALUE");

  //   if (!currentUser) return window.alert("Please Login");

  //   dispatch(deleteComment());
  // };

  return (
    <div>
      <h1>Comments</h1>
      {currentSongComments.map((comment) => (
        <ul className="comment">
          <li>{username}</li>
          <li key={comment.id}>Comment: {comment.body}</li>
         

          <SingleComment comment={comment}/>
        </ul>
      ))}
    </div>
  );
};

export default CommentList;
