import { useParams, useHistory, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect,  } from "react";
import { getAlbum } from "../../store/albums";
import SongsList from "../Songs/SongsList";
import SingleSong from "../Songs/SingleSong";
import { getSongs } from "../../store/songs";
import { PlayIcon } from "@heroicons/react/24/solid";
import EditDeleteAlbum from "./EditDeleteAlbum";

const AlbumPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const songState = useSelector((state) => state.songs);
  const songArr = Object.values(songState);
  const currentUser = useSelector((state) => state.session.user);
  const [errors, setErrors] = useState([]);
  const [activeAudio, setActiveAudio] = useState(null);
  const { albumId } = useParams();
  const albumState = useSelector((state) => state.albums);
  const album = albumState[albumId];




  useEffect(() => {
    dispatch(getAlbum(albumId));
    dispatch(getSongs());
  }, [dispatch, albumId]);

  const songsInAlbum = songArr.filter((song) => {
    return song.albumId == albumId;
  });



  // const handlePlay = (songId) => {
  //   if (activeAudio === songId) {
  //     setActiveAudio(null); // Clicked on the currently active audio, so stop playing
  //   } else {
  //     setActiveAudio(songId); // Clicked on a different audio, set it as active
  //   }
  // };
  return (
    <div className="album-page">
      Album Page
      <section className="album-section">
        <div className="album-info">
          {album && album.previewImage ? (
            <img src={album.previewImage} alt="Album Preview" />
          ) : (
            <img src="https://i.etsystatic.com/18338096/r/il/6fd75a/2865274586/il_fullxfull.2865274586_agx1.jpg" />
          )}

          <h2>{album && album.title}</h2>
          <h3>{album.artist}</h3>
          <p>Description: {album && album.description}</p>
        </div>
      </section>
      <br></br>
      <h3>Songs</h3>
      <div className="album-song-list">
        {songsInAlbum.map((song) => (
          <Link className="song-link" to={`/songs/${song.id}`} key={song.id}>
            <div className={`album-song ${activeAudio === song.id ? "active" : ""}`}>
              {/* <audio
                controls
                className="audio-player"
                onPlay={() => handlePlay(song.id)}
                onPause={() => setActiveAudio(null)}
              >
                <source src={song.url} type="audio/mp3" />
                Your browser does not support the audio element.
              </audio> */}
              <PlayIcon className="play-icon" />
              <img src={song.previewImage} alt={song.title} />
              <h3>{song.title}</h3>
            </div>
          </Link>
        ))}
      </div>
      <br></br>
      <a href="/albums">
        <button>Back To Albums</button>
      </a>
      <EditDeleteAlbum album={album} currentUser={currentUser}/>
    </div>
  );
};

export default AlbumPage;
