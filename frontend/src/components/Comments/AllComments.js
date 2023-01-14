import "./Comments.css";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { loadAllComments } from "../../store/comments";




const AllComments = () => {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments);
  const allCommentsArr = Object.values(comments);
  console.log(allCommentsArr, "ALL COMMENTS");

  useEffect(() => {
    dispatch(loadAllComments());
  }, [dispatch]);

  return (
    <div>
      <h1>Comments</h1>
      {allCommentsArr.map((comment) => (
        <ul className="comment">
          <li>{comment.User.username}</li>
          {/* <UserInfo comment={comment} /> */}
          <div className="comment-bodybox">
            <li className="comment-text" key={comment.id}>
              {comment.body}
            </li>
          </div>
        </ul>
      ))}
    </div>
  );
};

export default AllComments
