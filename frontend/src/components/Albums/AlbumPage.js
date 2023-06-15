import { useParams, useHistory, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import { getAlbum } from "../../store/albums";
import SongsList from "../Songs/SongsList";
import SingleSong from "../Songs/SingleSong";
import { getSongs } from "../../store/songs";
import { PlayIcon } from '@heroicons/react/24/solid'
const AlbumPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const currentUser = useSelector((state) => state.session.user);
  const [errors, setErrors] = useState([]);
  const { albumId } = useParams();
  const songState = useSelector((state) => state.songs);
  const songArr = Object.values(songState);

  const albumState = useSelector((state) => state.albums);
  const album = albumState[albumId];
  //   const albumArr = Object.values(albums)
  //     const currAlbum = albumArr.filter((album) => {
  //         return album.id === albumId
  //     })

  useEffect(() => {
    dispatch(getAlbum(albumId));
    dispatch(getSongs());
  }, [dispatch, albumId]);

  const songsInAlbum = songArr.filter((song) => {
    return song.albumId == albumId;
  });

  return (
    <div className='album-page'>
     Album Page
      <section className="album-section">
        <div className="album-info">
          {album && album.previewImage ? (
            <img src={album.previewImage} alt="Album Preview" />
          ) : (
            <img src="https://i.etsystatic.com/18338096/r/il/6fd75a/2865274586/il_fullxfull.2865274586_agx1.jpg" />
          )}

          <h2>{album && album.title}</h2>
          <p>Description: {album && album.description}</p>
        </div>
      </section>
      <br></br>
      <h3>Songs</h3>
      <div className="album-song-list">
        {songsInAlbum.map((song) => (

<Link className='song-link' to={`/songs/${song.id}`} >

     <div className="album-song">
          <PlayIcon className="play-icon"/>
            <img src={song.previewImage} />
            <h3>{song.title}</h3>
          </div>
</Link>
       
        ))}
      </div>
      <br></br>
      <a href="/albums">
        <button>Back To Albums</button>
      </a>
    </div>
  );
};

export default AlbumPage;
