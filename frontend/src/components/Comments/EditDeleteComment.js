import { useDispatch } from "react-redux";
import "./Comments.css";
import { removeComment } from "../../store/comments";
import { useHistory } from "react-router-dom";

const EditDeleteComment = ({comment, currentUser}) => {
    const dispatch = useDispatch();
    const history = useHistory();

  //EDIT BUTTON
  const handleEdit = (e) => {
    e.preventDefault();
    
    if (!currentUser) return window.alert("Please Login");
    if (comment.userId === currentUser.id) {
      history.push(`/comments/${comment.id}/edit`);
    } else {
      window.alert("This account does not have permission to edit this comment");
    }
  };

  //DELETE BUTTON
  const handleDelete = (e) => {
    e.preventDefault();
    if (!currentUser) return window.alert("Please Login");
    if (comment.userId === currentUser.id) {
     
      dispatch(removeComment(comment.id));
    } else {
      window.alert("This account does not have permission to delete this comment");
    }
  };


    return  currentUser.id === comment.userId ? (
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

export default EditDeleteComment
