import { useDispatch, useSelector } from "react-redux";
import { getSongs } from "../../store/songs";
import React, { useState, useEffect } from "react";
import "./songs.css";
import SingleSong from "./SingleSong";
import { NavLink, Link, useHistory } from "react-router-dom";
import AllComments from "../Comments/AllComments";
import { getPage } from "../../store/songs";
const SongsList = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  //   The Array of all the songs
  const currentUser = useSelector((state) => state.session.user);
  const [page, setPage] = useState(parseInt(1));
  // const [isLoaded, setIsLoaded] = useState(false);
  const songs = useSelector((state) => state.songs);
  const songsArr = Object.values(songs);


  useEffect(() => {
    dispatch(getPage(page))
  }, [dispatch, page]);





  const handleNew = (e) => {
    e.preventDefault();
    if (!currentUser) return window.alert("Please Login");
    history.push(`/songs/new`);
  };


  const handlePageNext = () => {
    setPage(page + 1)
    console.log(page, "*** PAGE BUTTON CLICK ")
  }

  const handlePageBack = () => {
    setPage(page - 1)
     console.log(page, "*** PAGE BUTTON CLICK ")
  }

  // const handlePageOne = () => {
  //   setPage(1)
  //    console.log(page, "*** PAGE BUTTON CLICK ")
  // }



  return (
    <div className="song-list-page">
     <div className='song-list-title' >

      <button onClick={handleNew}>Add Song</button>
      <h2> New Songs</h2>

    </div>
      <div className="songs-section">
        <div className="song-list">
          <div className="songs">
            {songsArr.reverse().map((song) => (
              <SingleSong song={song} key={song.id} currentUser={currentUser} />
            ))}
          </div>
        </div>
      </div>
              <p>Page Number: {page}</p>
      <div className="pagination">
        {/* <button onClick={() => handlePageOne()}>First</button> */}
        <button onClick={() => handlePageBack()}>Previous</button>
        <button onClick={() => handlePageNext()}>Next</button>
       
      </div>
    </div>
  );
};

export default SongsList;
