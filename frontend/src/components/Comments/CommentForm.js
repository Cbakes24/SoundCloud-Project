import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { createComment } from "../../store/comments";
import { updateComment } from "../../store/comments";

const CommentForm = ({ comment, formType }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [body, setBody] = useState(comment.body);
  const [username, setUsername] = useState(comment.username)
  const [errors, setErrors] = useState([]);
  // const user = comment.username;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...comment,
      body,
      username
    }

    const action = comment?.id ? updateComment : createComment;
    const data = await dispatch(action(payload));
    if (data.errors) {
      setErrors(data.errors);
    } else {
      history.push(`/comments`)
    }

  };

  return (
    <section className="comment-section">
      <form clessName='comment-form' onSubmit={handleSubmit}>
        <h2>Comment Form</h2>
        <input
          type="textarea"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></input>
        <button>Submit</button>
      </form>
    </section>
  );
};

export default CommentForm;
