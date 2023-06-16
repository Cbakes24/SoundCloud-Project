import { useDispatch, useSelector } from "react-redux";
import { getSongs } from "../../store/songs";
import React, { useState, useEffect } from "react";
import "./songs.css";
import SingleSong from "./SingleSong";
import { NavLink, Link, useHistory } from "react-router-dom";
import AllComments from "../Comments/AllComments";

const SongsList = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  //   The Array of all the songs
  const currentUser = useSelector((state) => state.session.user);

  const songs = useSelector((state) => state.songs);
  const songsArr = Object.values(songs);
  //   console.log(songsArr, "SONGARRAYYY");

  // const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    dispatch(getSongs());
  }, [dispatch]);

  const handleNew = (e) => {
    e.preventDefault();
    if (!currentUser) return window.alert("Please Login");
    history.push(`/songs/new`);
  };

  return (
    <div className="song-list-page">
    <div className='song-page-title' >

      <button onClick={handleNew}>Add Song</button>
      <h2> New Songs</h2>

    </div>
      <div className="songs-section">
        <ul className="song-list">
          <div className="songs">
            {songsArr.reverse().map((song) => (
              <SingleSong song={song} key={song.id} currentUser={currentUser} />
            ))}
          </div>
        </ul>
      </div>

    
    </div>
  );
};

export default SongsList;
