import "./Comments.css";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { loadSongComments } from "../../store/comments";
import { useParams } from "react-router-dom";
import SingleComment from "./SingleComment";

const CommentList = ({ song }) => {
  const dispatch = useDispatch();
  const { songId } = useParams();

  const comments = useSelector((state) => state.comments);
  const commentsArr = Object.values(comments);

  useEffect(() => {
    dispatch(loadSongComments(song));
  }, [dispatch, song]);

  const currentSongComments = commentsArr.filter(
    (comment) => comment.songId == songId
  );
  const currentUser = useSelector((state) => state.session.user);

  return (
    <div>
      <h1>The Feed</h1>
      {currentSongComments.length > 0 ? (
        currentSongComments.map((comment) => (
          <div>
            <div className="comment-bodybox">
              <div className="comment-title-row">
                <img
                  className="comment-profile-pic"
                  src={comment.User?.previewImage}
                  alt="Profile"
                />

                <span className="comment-username">
                  {comment.User?.username || "Unknown"}
                </span>
              </div>
              <br></br>
              
              <div>
        
              "{comment.body}"
              </div>
            </div>

            <SingleComment comment={comment} />
          </div>
        ))
      ) : (
        <h6>No Comments</h6>
      )}
    </div>
  );
};

export default CommentList;
