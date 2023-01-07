import { useDispatch } from "react-redux";
import './songs.css'
import { Link } from 'react-router-dom';

const SingleSong = ({ song }) => {
  const dispatch = useDispatch();

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
          <button>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default SingleSong;
