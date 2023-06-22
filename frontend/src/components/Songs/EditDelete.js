import { useDispatch } from "react-redux";
import "./songs.css";
import { removeSong } from "../../store/songs";
import { useHistory } from "react-router-dom";

const EditDelete = ({song, currentUser}) => {
    const dispatch = useDispatch();
    const history = useHistory();

  //EDIT BUTTON
  const handleEdit = (e) => {
    e.preventDefault();
   
    if (!currentUser) return window.alert("Please Login");
    if (song.userId === currentUser.id) {
      history.push(`/songs/${song.id}/edit`);
    } else {
      window.alert("This account does not have permission to edit this song");
    }
  };

  //DELETE BUTTON
  const handleDelete = (e) => {
    e.preventDefault();
    if (!currentUser) return window.alert("Please Login");
    if (song.userId === currentUser.id) {
     
      dispatch(removeSong(song.id));
    } else {
      window.alert("This account does not have permission to delete this song");
    }
  };


    return  currentUser?.id && currentUser.id === song.userId ? (
     <>
        <button className="editButton" onClick={handleEdit}>
          Edit
        </button>

        <button className="delete" onClick={handleDelete}>
          Delete
        </button>
        </>
 ) : history.push`/`
}

export default EditDelete
