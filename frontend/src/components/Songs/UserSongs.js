import { useDispatch, useSelector } from "react-redux";
import { getUserSongs } from "../../store/songs";
import { useState } from 'react'

const UserSongs = () => {

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const songs = useSelector((state) => state.songs);
  const songsArr = Object.values(songs);
  console.log(songsArr, "USERS SONGS ARRAY");

  useEffect(() => {
    dispatch(getUserSongs());
  }, [dispatch]);

  return (
    <div>
      <h1>My Songs</h1>
      <Link to="/songs/new">Add Song</Link>
      <ul className="song-list">
        {/* this map is diplaying all the songs from songsArr, tryh to figure out how to use the pagination */}
        {songsArr.map((song) => (
          <SingleSong song={song} key={song.id} currentUser={currentUser} />
        ))}
      </ul>
    </div>
  );
};
