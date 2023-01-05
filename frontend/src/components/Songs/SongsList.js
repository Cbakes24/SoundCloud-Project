import { useDispatch, useSelector } from "react-redux";
import { getSongs } from "../../store/songs";
import React, { useState, useEffect } from "react";
import "./songs.css";
import SingleSong from "./SingleSong";

const SongsList = () => {
  const dispatch = useDispatch();

  const songs = useSelector((state) => state.songs);
  const songsArr = Object.values(songs);

  console.log(songsArr, "SONGARRAYYY");

  useEffect(() => {
    dispatch(getSongs());
  }, [dispatch]);

  return (
    <div>
      <ul className='song-list'>
        {songsArr.map((song) => {
          <SingleSong somg={song} key={song.id} />
        })}
      </ul>
      <h1>Songs</h1>

      <button>Add Song</button>
    </div>
  );
};

export default SongsList;
