import { useDispatch } from "react-redux";
import "./songs.css";
import { Link } from "react-router-dom";
import { removeSong } from "../../store/songs";
import { useHistory } from "react-router-dom";

const SingleSong = ({ song, currentUser }) => {
  const dispatch = useDispatch();
  const history = useHistory();


  //EDIT BUTTON
  const handleEdit = (e) => {
    e.preventDefault();
    console.log(song.userId, "USER ID");
    if(!currentUser) return window.alert('Please Login')
    if (song.userId === currentUser.id) {
      history.push(`/songs/${song.id}/edit`);
    } else {
      window.alert("This account does not have permission to edit this song");
    }
  };


  //DELETE BUTTON
  const handleDelete = (e) => {
    e.preventDefault();
    if(!currentUser) return window.alert('Please Login')
    if (song.userId === currentUser.id) {
     console.log(song, "SONG BEING DELETED");
    dispatch(removeSong(song.id));
      } else {
        window.alert("This account does not have permission to delete this song");
      }
  };

  return (
    <div className="song-box">
      <ul className="singleSong">
        <img src={song.previewImage} />
        <li>ID: {song.id}</li>
        <Link to={`/songs/${song.id}`}>Song Name: {song.title}</Link>
        <li>Album: {song.albumId}</li>
        <li>Description: {song.description}</li>
        <a href={song.url}>
    <button>Play Song</button>
      </a>
      </ul>
      <div className="song-buttons">
        <button>Comment</button>

        <button className="editButton" onClick={handleEdit}>
          Edit
        </button>
        {/* <Link to={`/songs/${song.id}/edit`}>Edit</Link> */}
        <button className="delete" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default SingleSong;
