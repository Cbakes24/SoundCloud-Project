import "./Comments.css";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { loadAllComments } from "../../store/comments";

const AllComments = ({ songs }) => {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments);
  const allCommentsArr = Object.values(comments);
  console.log(allCommentsArr, "ALL COMMENTS");

  const songId = useEffect(() => {
    dispatch(loadAllComments());
  }, [dispatch]);


  return (
    <>
      <h1>The Feed</h1>
      <div id="feed">
        {allCommentsArr.map((comment) => (
          <ul className="comment">

            <div className="comment-bodybox">
              <li className="comment-text" key={comment.id}>
                {comment.body}
              </li>
            </div>
          </ul>
        ))}
      </div>
    </>
  );
};

export default AllComments;
