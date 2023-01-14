import { useDispatch, useSelector } from "react-redux";
import { getSongs } from "../../store/songs";
import React, { useState, useEffect } from "react";
import "./songs.css";
import SingleSong from "./SingleSong";
import { NavLink, Link } from "react-router-dom";
import AllComments from "../Comments/AllComments";

const SongsList = () => {
  const dispatch = useDispatch();

  //   The Array of all the songs
  const currentUser = useSelector((state) => state.session.user);

  const songs = useSelector((state) => state.songs);
  const songsArr = Object.values(songs);
  //   console.log(songsArr, "SONGARRAYYY");

  // const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    dispatch(getSongs());
  }, [dispatch]);

  return (
    <div className="song-comments">
      <div className="comments">
        <h1>Songs</h1>
        <h2>Comments</h2>
      </div>
      <Link to="/songs/new">Add Song</Link>

      <div>
        <ul className="song-list">
          {/* this map is diplaying all the songs from songsArr, tryh to figure out how to use the pagination */}
          {songsArr.map((song) => (
            <SingleSong song={song} key={song.id} currentUser={currentUser} />
          ))}
        </ul>

      </div>

      <Link to="/songs/new">Add Song</Link>
    </div>
  );
};

export default SongsList;
