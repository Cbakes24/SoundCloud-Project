import { useDispatch } from "react-redux";
import "./songs.css";
import { Link } from "react-router-dom";
import { deleteSong } from "../../store/songs";
import { useHistory } from "react-router-dom"

const SingleSong = ({ song }) => {
  const dispatch = useDispatch();
    const history = useHistory()


  const handleEdit = (e) => {
    e.preventDefault();

    history.push(`/songs/${song.id}/edit`)
  };

  const handleDelete = (e) => {
    e.preventDefault();

    dispatch(deleteSong(song.id));
  };

  return (
    <div className="song-box">
      <ul className="singleSong">
        <img src={song.previewImage} />

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
          <button className="editButton" onClick={handleEdit}>Edit</button>
          {/* <Link to={`/songs/${song.id}/edit`}>Edit</Link> */}
          <button className="delete" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleSong;
