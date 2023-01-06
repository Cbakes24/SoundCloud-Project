import { useDispatch, useSelector } from "react-redux";
import { getSongs } from "../../store/songs";
import React, { useState, useEffect } from "react";
import "./songs.css";
import SingleSong from "./SingleSong";
import {NavLink, Link} from 'react-router-dom'

const SongsList = () => {
  const dispatch = useDispatch();

//   The Array of all the songs
  const songs = useSelector((state) => state.songs);
  const songsArr = Object.values(songs);
//   console.log(songsArr, "SONGARRAYYY");

const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    dispatch(getSongs());
  }, [dispatch]);

  return (
    <div>
        <div className="comments">
        <h1>Songs</h1>
        <div>
             <h2>Comments</h2>
           comment box here
        </div>

        </div>
      <ul className='song-list'>
        {songsArr.map((song) =>( <SingleSong song={song} key={song.id} />)
        )}
        <Link to='/songs/new'>Add Song</Link>
      </ul>



    </div>
  );
};

export default SongsList;
