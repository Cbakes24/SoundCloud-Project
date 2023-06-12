import "./Comments.css";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { loadSongComments } from "../../store/comments";
import { useParams } from "react-router-dom";
import SingleComment from "./SingleComment";

const CommentList = ({ song }) => {
  const dispatch = useDispatch();
  const { songId } = useParams();

  useEffect(() => {
    dispatch(loadSongComments(song));
  }, [dispatch, song]);

  const comments = useSelector((state) => state.comments);
  const commentsArr = Object.values(comments);


  const currentSongComments = commentsArr.filter(
    (comment) => comment.songId == songId
  );
  const currentUser = useSelector((state) => state.session.user);



  return (
    <div>
      <h1>Comments</h1>
      {currentSongComments.length > 0 ? (
      currentSongComments.map((comment) => (
        <ul className="comment">
          <li>{song.title}</li>
          <div className="comment-bodybox">
            <li className="comment-text" key={comment.id}>
              {comment.body}
            </li>
            <li>-{comment.User?.username || currentUser?.username}</li>
          </div>

          <SingleComment comment={comment}  />
        </ul> 
        )
      )) : 
          <p>no COmments</p>
      
      }
    </div>
  );
};

export default CommentList;
