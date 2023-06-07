import CommentList from "./CommentList";
import "./Comments.css";
import { useDispatch, useSelector } from "react-redux";
import { removeComment } from "../../store/comments";
import { Link, useHistory } from "react-router-dom";

const SingleComment = ({ comment }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const currentUser = useSelector((state) => state.session.user);

  const handleDelete = (e) => {
    e.preventDefault();

    if (!currentUser) return window.alert("Please Login");
    if (currentUser.id !== comment.userId) {
      return window.alert("You do not have access to delete this comment");
    } else {
      dispatch(removeComment(comment.id));
    }
  };
 

  const handleEdit = async (e) => {
    e.preventDefault();
    if (currentUser.id === comment.userId) {
      history.push(`/comments/${comment.id}/edit`);
    }
    return null;
  };
  // const handleEdit = (e) => {
  //   e.preventDefault();
  //   if (currentUser.id !== comment.userId) {
  //     return window.alert("You do not have access to delete this comment");
  //   } else {
  //     return;
  //   }
  // };
  console.log(currentUser.id === comment.userId);

  return currentUser.id === comment.userId ? (
    <div>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={handleEdit}>Edit</button>
    </div>
  ) : null;
};

export default SingleComment;
