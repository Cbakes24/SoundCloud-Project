import CommentList from "./CommentList";
import "./Comments.css";
import { useDispatch, useSelector } from "react-redux";
import { removeComment } from "../../store/comments";

const SingleComment = ({ comment }) => {
  const dispatch = useDispatch();
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

console.log(currentUser.id === comment.userId)


  return currentUser.id === comment.userId ?
  <button onClick={handleDelete}>Delete</button>
: null
};

export default SingleComment;
