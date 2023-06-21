import { useDispatch, useSelector } from "react-redux";
import { getUserSongs } from "../../store/songs";
import { useState } from 'react'
import { useEffect }  from 'react'
import { useHistory } from 'react-router-dom'
import SingleSong from "./SingleSong";
import { getPage } from "../../store/songs";
const UserSongs = () => {
  const history = useHistory()
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const [page, setPage] = useState(parseInt(1));
  const songs = useSelector((state) => state.songs);
  const songsArr = Object.values(songs);
  const userSongsArr = songsArr.filter(song => {
    return song.userId === currentUser.id
  })

  useEffect(() => {
    dispatch(getUserSongs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getPage(page))
  }, [dispatch, page]);


  const handleNew = (e) => {
    e.preventDefault()
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
  return (
    <div className="song-list-page">
     <div className='song-list-title' >

      <button onClick={handleNew}>Add Song</button>
      <h2> New Songs</h2>

    </div>
      <div className="songs-section">
        <div className="song-list">
          <div className="songs">
            {userSongsArr.reverse().map((song) => (
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

export default UserSongs
