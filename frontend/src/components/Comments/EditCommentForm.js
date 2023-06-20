import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import CommentForm from "./CommentForm";
import { loadAllComments } from "../../store/comments";

const EditCommentForm = () => {
  const { commentId } = useParams();
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments);
  const comment = comments[commentId];

  useEffect(() => {
    dispatch(loadAllComments(comment));
  }, [dispatch, commentId]);

  if (!comment) {
    return null;
  }
  return <CommentForm comment={comment} formType="Edit Comment" />;
};
export default EditCommentForm;
