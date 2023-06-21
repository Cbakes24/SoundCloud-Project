import { useDispatch } from "react-redux";
import "./songs.css";
import { Link } from "react-router-dom";
import { removeSong } from "../../store/songs";
import { useHistory } from "react-router-dom";
import EditDelete from "./EditDelete";

const SingleSong = ({ song, currentUser }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  //COmment Button
  const handleComment = (e) => {
    e.preventDefault();
    if (!currentUser) return window.alert("Please Login");

    history.push(`/songs/${song.id}`);
  };

  return (
    <div className="song-box">
      <ul className="singleSong">
          <h5 className="song-title">{song.title}</h5>
        <Link className="songpage-link" to={`/songs/${song.id}`}>
          <img className='song-card-img' src={song.previewImage} />
          <p>Album: {song.Album.title}</p>
       
        </Link>
        {/* <a href={song.url}>
          <button>
            Play <i className="fa-solid fa-play"></i>
          </button>
        </a> */}
      </ul>

      <div className="song-buttons">
        {/* <button className="commentButton" onClick={handleComment}>
          Comment
        </button> */}

        <EditDelete song={song} currentUser={currentUser} />
      </div>
    </div>
  );
};

export default SingleSong;
