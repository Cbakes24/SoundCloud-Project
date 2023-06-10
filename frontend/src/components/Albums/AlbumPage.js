import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import { getAlbum } from "../../store/albums";
import SongsList from "../Songs/SongsList";
import SingleSong from "../Songs/SingleSong";
import { getSongs } from "../../store/songs";
const AlbumPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const currentUser = useSelector((state) => state.session.user);
  const [errors, setErrors] = useState([]);
  const { albumId } = useParams();
  const songState = useSelector((state) => (state.songs))
  const songArr = Object.values(songState)

  console.log(songArr, "SONGS STATEEEEEE")
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
        // console.log(album.songs, "ALBUM SONGSSS")
       
       
       
        const songsInAlbum = songArr.filter((song) => {
            console.log(song.albumId, "SONG IN FUNCTION ****")
            console.log(albumId, typeof(albumId), typeof(song.albumId))
            return song.albumId == albumId
        })

    console.log(songsInAlbum , "SONGS IN ALBUM ****")
  return (
    <div>
      HELLO ALBUM Page
      <section>
        {album && album.previewImage ? (
          <div>{album.previewImage}</div>
        ) : (
          <img src="https://i.etsystatic.com/18338096/r/il/6fd75a/2865274586/il_fullxfull.2865274586_agx1.jpg" />
        )}
        <br />
        ID: {album && album.id}
        <br />
        Title: {album && album.title}
        <br />
        Description: {album && album.description}
        <br />
        <a href="/albums">
          <button>Back To Albums</button>
        </a>
      </section>
   
      {songsInAlbum.map((song) => (
                <SingleSong song={song} currentUser={{currentUser}} />
            
            ))}
    </div>
  );
};

export default AlbumPage;
