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

  return  (
    <div className="song-box">
      <ul className="singleSong">
        <img src={song.previewImage} />
        <li>ID: {song.id}</li>
        <Link to={`/songs/${song.id}`}>Song Name: {song.title}</Link>
        <li>Album: {song.albumId}</li>
        <li>Description: {song.description}</li>
        {/* <a href={song.url}>
          <button>
            Play <i className="fa-solid fa-play"></i>
          </button>
        </a> */}
      </ul>

      <div className="song-buttons">
        <button className="commentButton" onClick={handleComment}>
          Comment
        </button>

    <EditDelete  song={song} currentUser={currentUser}/>

      </div>
    </div>
  );
};

export default SingleSong;
