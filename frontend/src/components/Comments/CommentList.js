import "./Comments.css";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { deleteComment, loadAllComments, loadSongComments } from "../../store/comments";
import { useParams } from "react-router-dom";
import { useState } from "react";
import SingleComment from "./SingleComment";
import UserInfo from "./UserInfo";
import { getUserInfo } from "../../store/session";

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


  // useEffect(() => {
  //   dispatch(loadAllComments());
  // }, [dispatch]);

  useEffect(() => {
    dispatch(loadSongComments(song));
  }, [dispatch]);


  return (
    <div>
      <h1>Comments</h1>
      {currentSongComments.map((comment) => (
        <ul className="comment">
          <li>{comment.username}</li>
       {/* <UserInfo comment={comment} /> */}
       <div className="comment-bodybox">
         <li className='comment-text' key={comment.id}>{comment.body}</li>
       </div>

          <SingleComment comment={comment} />
        </ul>
      ))}
    </div>
  );
};

export default CommentList;
