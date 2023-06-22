import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import CommentList from "../Comments/CommentList";
import { createComment } from "../../store/comments";
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
      .then((comment) => 
      history.push(`/songs/${songId}`))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });

      setBody('')
  };

  return !song ? ( <p>...loading</p> ) : (


  
    <div>
      <section className="song-page-section">
        <img src={song.previewImage} className='songpage-img' alt={song.title}/>
    <div className="audio-player">
    <div className="song-page-title">
    <div id="songtitle"> 
    <h1 className='songname'>{song.title} - {song.Album?.artist} </h1> 

    </div>
       
       

        <p className="song-description">Description: {song.description}</p>
      </div>
        <audio controls >
        <source src={song.url} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    </div>

   

      <br></br>

      </section>
        <a href="/songs">
          <button>Back To Songs</button>
        </a>

      <section className='comments-songpage'>
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
        <div>
          <CommentList song={song} currentUser={currentUser} />
        </div>
      </section>
    </div>
  ) 
};

export default SongPage;
