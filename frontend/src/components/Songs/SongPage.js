import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import CommentList from "../Comments/CommentList";
import { createComment } from "../../store/songs";
import { getSongs } from "../../store/songs";
import { useEffect } from 'react'
import { loadSongComments } from "../../store/comments";

const SongPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState([]);
  const currentUser = useSelector((state) => state.session.user);
  const userId = currentUser.id;
  const { songId } = useParams();
  const songs = useSelector((state) => state.songs);
  // const songArr = Object.values(songs)
  let song;
if(songs) {
  song = songs[songId]
}

useEffect(() => {
  dispatch(getSongs())
}, [dispatch])



useEffect((song) => {
  console.log(song, 'DISPATCHING THIS SONG')
  dispatch(loadSongComments(song));
}, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors([]);
    const payload = {
      songId,
      userId,
      body,
    };
    const newComment = await dispatch(createComment(payload)).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );

    history.push(`./${song.id}`);
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
        <a href={song.url}>
          <button>Play Song</button>
        </a>
        {/* <Link to="/songs">Back to Songs</Link> */}
        <form onSubmit={handleSubmit}>
          <h2>Comment Form</h2>
          <input
            type="textarea"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></input>
          <button>Submit</button>
        </form>
      </section>

      <section>
        <div>
          <CommentList />
        </div>
      </section>
    </div>
  ) : null
};

export default SongPage;
