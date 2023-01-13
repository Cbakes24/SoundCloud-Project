import "./Comments.css";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { loadAllComments } from "../../store/comments";
import { loadSongComments } from "../../store/comments";
import { getSongs } from "../../store/songs";
import { useParams } from "react-router-dom";

const CommentList = () => {
  const dispatch = useDispatch();
  const { songId } = useParams()
  console.log(songId, 'SONG ID')
  const comments = useSelector((state) => state.comments);
  const commentsArr = Object.values(comments);
  console.log(commentsArr, 'COMMENTS ARRAY')
  const currentSongComments = commentsArr.filter((comment) => comment.songId == songId );

  console.log(currentSongComments, 'CURRENT SONG COMMENTS')
  const currentUser = useSelector((state) => state.session.user)
  const username = currentUser.username

//   const songs = useSelector((state) => state.songs);
//   console.log(songs,'YOOOOOOOOOOOO SONGS')
//   const songsArr = Object.values(songs);
// const song = songsArr.forEach(song => {
//     return song
// })



  useEffect(() => {
    dispatch(loadAllComments());
  }, [dispatch]);

//   useEffect(() => {
//     dispatch(getSongs);
//   }, [dispatch]);

  return (
    <div>
      <h1>Comments</h1>
      {currentSongComments.map((comment) => (
        <ul>

         <li key={comment.id}>Comment: {comment.body}</li>
            <li>comment with songId {comment.songId}</li>
            <li>songId {songId}</li>
        <li>Username: {username}</li>
        </ul>

      ))}
    </div>
  );
};

export default CommentList;
