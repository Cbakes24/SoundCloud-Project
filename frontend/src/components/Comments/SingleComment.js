import CommentList from "./CommentList";
import "./Comments.css";
import { useDispatch, useSelector } from "react-redux";
import { removeComment } from "../../store/comments";

const SingleComment = ({ comment }) => {
    const dispatch = useDispatch()
    const currentUser = useSelector((state) => state.session.user);





  const handleDelete = (e) => {
    e.preventDefault();
    console.log(comment.id, "TARGET VALUE");

    if (!currentUser) return window.alert("Please Login");

    dispatch(removeComment(comment.id));
  };

  return <button onClick={handleDelete}>Delete</button>;
};

export default SingleComment;
