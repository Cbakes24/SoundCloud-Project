import "./Comments.css";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { loadAllComments } from "../../store/comments";
import { getSongs } from "../../store/songs";

const AllComments = ({ songs }) => {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments);
  const songState = useSelector((state) => state.songs);
  console.log(songState, "songStATEEEEEE");
  const allSongArr = Object.values(songState);
  console.log(allSongArr, "SONG ARRRR");
  const allCommentsArr = Object.values(comments);
  console.log(allCommentsArr, "ALL COMMENTS");

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
                <li>{song.title}</li>
                <li className="comment-text" key={comment.id}>
                  {comment.body}
                </li>
                <li>-{comment.username}</li>
              </div>
            </ul>
          );
        })}
      </div>
    </>
  );
};

export default AllComments;
