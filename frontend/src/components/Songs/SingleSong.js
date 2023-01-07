import { useDispatch } from "react-redux";
import './songs.css'
import { Link } from 'react-router-dom';
import { deleteSong } from "../../store/songs";

const SingleSong = ({ song }) => {
  const dispatch = useDispatch();


    const handleDelete = (e) => {
    e.preventDefault()

    dispatch(deleteSong(song.id))
}

  return (
    <div className='song-box'>
      <ul className='singleSong'>
<img src={song.previewImage}/>

        <li>ID: {song.id}</li>
        <Link to={`/songs/${song.id}`}>Song Name: {song.title}</Link>
        <li>Album: {song.albumId}</li>
        <li>Description: {song.description}</li>

        {/* <div style={{ backgroundImage: `url('${song.previewImage}')` }}>

        </div> */}
      </ul>
      <div className="song-buttons">
        <button>Comment</button>
        <div>
            {/* <a href={`/songs/:songId/edit`}>
            <button>Edit</button>
            </a> */}
        <Link to={`/songs/${song.id}/edit`}>Edit</Link>
        <a href={`/songs/:songId/edit`}>
            <button onClick={handleDelete}>Delete</button>
            </a>
        </div>
      </div>
    </div>
  );
};

export default SingleSong;
