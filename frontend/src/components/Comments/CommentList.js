import "./Comments.css";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { loadAllComments } from "../../store/comments";
import { getSongs } from "../../store/songs";

const CommentList = () => {
  const dispatch = useDispatch();

  const comments = useSelector((state) => state.comments);

  const commentsArr = Object.values(comments);

  const currentUser = useSelector((state) => state.session.user)
  const username = currentUser.username

//   const songs = useSelector((state) => state.songs);
//   console.log(songs,'YOOOOOOOOOOOO SONGS')
//   const songsArr = Object.values(songs);
// const song = songsArr.forEach(song => {
//     return song
// })



  // useEffect(() => {
  //   dispatch(loadAllComments());
  // }, [dispatch]);

//   useEffect(() => {
//     dispatch(getSongs);
//   }, [dispatch]);

  return (
    <div>
      <h1>Comments</h1>
      {commentsArr.map((comment) => (
        <ul>

         <li>Comment: {comment.body}</li>

        <li>Username: {username}</li>
        </ul>

      ))}
    </div>
  );
};

export default CommentList;
