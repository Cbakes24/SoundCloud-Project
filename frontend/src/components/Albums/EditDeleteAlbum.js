import { useDispatch } from "react-redux";
import "./albums.css";
import { removeAlbum } from "../../store/albums";
import { useHistory } from "react-router-dom";

const EditDeleteAlbum = ({album, currentUser}) => {
    const dispatch = useDispatch();
    const history = useHistory();

  //EDIT BUTTON
  const handleEdit = (e) => {
    e.preventDefault();
    
    if (!currentUser) return window.alert("Please Login");
    if (album.userId === currentUser.id) {
      history.push(`/albums/${album.id}/edit`);
    } else {
      window.alert("This account does not have permission to edit this album");
    }
  };

  //DELETE BUTTON
  const handleDelete = async (e) => {
    e.preventDefault();
    if (!currentUser) return window.alert("Please Login");
    if (album.userId === currentUser.id) {
     
     await dispatch(removeAlbum(album.id));
     history.push(`/albums`)
    } else {
      window.alert("This account does not have permission to delete this album");
    }
  };


    return  currentUser.id === album.userId ? (
     <>
        <button className="editButton" onClick={handleEdit}>
          Edit
        </button>

        <button className="delete" onClick={handleDelete}>
          Delete
        </button>
        </>
 ) : null
}

export default EditDeleteAlbum
