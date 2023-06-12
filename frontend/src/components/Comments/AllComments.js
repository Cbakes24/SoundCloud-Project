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
          return (
            <ul className="comment" key={comment.id}>
              <div className="comment-bodybox">
                {song && <img src={song.previewImage} alt={song.title} />}
                {song.title}
                <li className="comment-text" key={comment.id}>
                  {comment.body}
                  <div className='user-comment-info'>

                  <li>- {comment.User && comment.User.username ? comment.User.username : "Unknown"}</li>
                  <li>{comment.User && comment.User.previewImage ? comment.User.previewImage : <img className='user-default' src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png' />}</li>
                  </div>

                </li>
              
              </div>
            </ul>
          );
        })}
      </div>
    </>
  );
};

export default AllComments;
