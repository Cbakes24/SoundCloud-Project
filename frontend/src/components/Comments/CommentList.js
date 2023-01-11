import "./Comments.css";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { loadAllComments } from "../../store/comments";

const CommentList = () => {
  const dispatch = useDispatch();

  const comments = useSelector((state) => state.comments);
  console.log(comments, "COMMETNSSS from state");
  const commentsArr = Object.values(comments);

  const currentUser = useSelector((state) => state.session.user)
console.log(currentUser, "cuureeentt USEERRR")
  useEffect(() => {
    dispatch(loadAllComments());
  }, [dispatch]);

  return (
    <div>
      <h1>Comments</h1>
      {commentsArr.map((comment) => (
        <ul>

         <li>Comment: {comment.body}</li>
        <li>User ID: {comment.userId}</li>
        </ul>

      ))}
    </div>
  );
};

export default CommentList;
