import { sanitizeBody } from "express-validator"
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createComment, updateComment } from "../../store/comments";

const CommentForm = ({comment, formType}) => {
const dispatch = useDispatch()
const history = useHistory()


const [ body, setBody] = useState(comment.body)
const [errors, setErrors] = useState([])
const user = comment.username

const handleSubmit = async (e) => {
    e.preventDefault()
    if (formType === "New Comment") {
    setErrors([]);
    const payload = {
      body,
      user
    };

    const newComment = await dispatch(createComment(payload)).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    }); // sending it to the Thunk and action and reducer to update the state

    history.push(`./`);
} else {

    const payload = {
        ...comment,
        body,
        user,

      };

   console.log(payload, ' EDIT PAYLOAD')
      dispatch(updateComment(payload)).catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });

      history.push(`/comments`);
    }
    return setErrors([
        "Confirm Password field must be the same as the Password field",
      ]);

}
    return (

        <section>
            <form onSubmit={handleSubmit}>
                <h2>Comment Form</h2>
                <input
                    type='textarea'
                     value={body}
                     onChange={(e) => setBody(e.target.value)}
                     >

                </input>
        <button>Submit</button>

            </form>

        </section>
    )
}

export default CommentForm
