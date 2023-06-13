import "./Comments.css";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { loadAllComments } from "../../store/comments";
import { getSongs } from "../../store/songs";

const AllComments = ({ songs, username }) => {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments);
  const songState = useSelector((state) => state.songs);
  console.log(songState, "songStATEEEEEE");
  const allSongArr = Object.values(songState);
  console.log(allSongArr, "SONG ARRRR");
  const allCommentsArr = Object.values(comments);
  console.log(allCommentsArr, "ALL COMMENTS");
  
  const currentUser = useSelector((state) => state.session.user);
  // const songImage = allSongArr.map((song) => {
  //   return {id: song.previewImage}
  // })

  useEffect(() => {
    dispatch(loadAllComments());
    dispatch(getSongs());
  }, [dispatch]);
  return (
    <>
      <h1>The Feed</h1>
      <div id="feed">
        {allCommentsArr.map((comment) => {
          const song = allSongArr.find((song) => song.id === comment.songId);
          console.log(comment.User, "COMENT USERRRRR *****")
          const userProfilePic = comment.User?.previewImage || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png";

          return (
            <ul className="comment" key={comment.id}>
              <div className="comment-bodybox">
                <div className="comment-info">
                  
                  <div className="comment-info-row">
                    <img className="comment-profile-pic" src={userProfilePic} alt="Profile" />
                 
                    <span className="comment-username">{comment.User?.username || "Unknown"}</span>
                  </div>
                </div>
                <div className="comment-info-row">
                  <span className="comment-text">{comment.body}</span>
                </div>
              </div>
            </ul>
          );
        })}
      </div>
    </>
  );
};

export default AllComments;
