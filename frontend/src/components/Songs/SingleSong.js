import { useDispatch } from "react-redux";
import './songs.css'
import { Link } from 'react-router-dom';

const SingleSong = ({ song }) => {
  const dispatch = useDispatch();

const handleEdit = () => {



}

  return (
    <div className='song-box'>
      <ul className='singleSong'>
<img src={song.previewImage}/>

        <li>ID: {song.id}</li>
        <li>Song Name: {song.title}</li>
        <li>Album: {song.albumId}</li>
        <li>Description: {song.description}</li>
        <li>Image {song.previewImage}</li>
        {/* <div style={{ backgroundImage: `url('${song.previewImage}')` }}>

        </div> */}
      </ul>
      <div className="song-buttons">
        <button>Comment</button>
        <div>
        <Link to={`/songs/${song.id}/edit`}>Edit</Link>
          <button>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default SingleSong;
