import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import CommentList from "../Comments/CommentList";
import { createComment } from "../../store/songs";
import { getSongs } from "../../store/songs";
import { useEffect } from "react";
import { loadSongComments } from "../../store/comments";

const SongPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState([]);
  const currentUser = useSelector((state) => state.session.user);
  let userId;
  let username;
  if (currentUser) {
    userId = currentUser.id;
    username = currentUser.username;
  }
  const { songId } = useParams();
  const songs = useSelector((state) => state.songs);

  // const songArr = Object.values(songs)
  let comment;
  let song;
  if (songs) {
    song = songs[songId];
  }

  useEffect(() => {
    dispatch(getSongs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadSongComments(song));
  }, [dispatch]);

  //COMMENT FORM
  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors([]);
    const payload = {
      username,
      songId,
      userId,
      body,
    };
    const newComment = await dispatch(createComment(payload))
      .then((comment) => history.push(`/songs/${comment.songId}`))

      .catch(async (res) => {
        const data = await res.json();
        console.log(data.errors, "DATAAA for ERRORSSS");
        if (data && data.errors) setErrors(data.errors);
      });

      setBody('')
  };

  return song ? (
    <div>
      <section>
        <img src={song.previewImage} />
        <br />
        ID: {song.id}
        <br />
        Title: {song.title}
        <br />
        Description: {song.description}
        <br />
        <a href="/songs">
          <button>Back To Songs</button>
        </a>

         {/* <a href={song.url}>
          <button>
            Play <i className="fa-solid fa-play"></i>
          </button>
        </a> */}
        <form id='comment-form' onSubmit={handleSubmit}>
          <h2>Comment Form</h2>
          {errors.length > 0 &&
            errors.map((error, i) => <div key={i}> {error} </div>)}
          <input
            className="comment-input"
            type="textarea"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></input>
          <button>Submit Comment</button>
        </form>
      </section>

      <section>
        <div>
          <CommentList song={song} currentUser={currentUser} />
        </div>
      </section>
    </div>
  ) : null;
};

export default SongPage;
