import { useDispatch } from "react-redux";
import './songs.css'

const SingleSong = ({ song }) => {
  const dispatch = useDispatch();

  return (

    <div className='song-box'>
      <ul>
        <li>Song Name: {song.title}</li>
        <li>Description: {song.description}</li>
      </ul>
      <div className="song-buttons">
        <button>Comment</button>
        <div>
          <button>Edit</button>
          <button>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default SingleSong;
