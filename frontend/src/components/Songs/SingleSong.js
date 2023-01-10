import { useDispatch } from "react-redux";
import "./songs.css";
import { Link } from "react-router-dom";
import { removeSong } from "../../store/songs";
import { useHistory } from "react-router-dom"

const SingleSong = ({ song, currentUser }) => {
  const dispatch = useDispatch();
    const history = useHistory()


  const handleEdit = (e) => {
    e.preventDefault();
   console.log(song.userId, 'USER ID')
if(song.userId === currentUser.id){
  history.push(`/songs/${song.id}/edit`)
} else {

}
//add if statement here for being verified to edit this song..
// if currentuser.id === song[user.id] something like this to only allow the owner of the song to edit

  };

  const handleDelete = (e) => {
    e.preventDefault();
    console.log(song, 'SONG BEING DELETED')
    dispatch(removeSong(song.id));
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

          <button className="editButton" onClick={handleEdit}>Edit</button>
          {/* <Link to={`/songs/${song.id}/edit`}>Edit</Link> */}
          <button className="delete" onClick={handleDelete}>
            Delete
          </button>

      </div>
    </div>
  );
};

export default SingleSong;
