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
  // const [currentPage, setCurrentPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(1);
  const songs = useSelector((state) => state.songs);
  const songsArr = Object.values(songs);



  // useEffect(() => {
  //   dispatch(getSongs(currentPage)); // Fetch songs with initial pagination parameters (page: 1, size: 10)
  // }, [dispatch, currentPage]);

  // const handlePageChange = (currentPage) => {
  //   dispatch(getSongs(currentPage)); // Fetch songs with the new page value and a fixed size of 10
  // };
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
    <div className='song-list-title' >

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

      {/* <div className="pagination">
        <button onClick={() => handlePageChange(1)}>First</button>
        <button onClick={() => handlePageChange(setCurrentPage(currentPage - 1))}>Previous</button>
        <button onClick={() => handlePageChange(setCurrentPage(currentPage + 1))}>Next</button>
        <button onClick={() => handlePageChange(totalPages)}>Last</button>
      </div> */}
    </div>
  );
};

export default SongsList;
