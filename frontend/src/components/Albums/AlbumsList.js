import { useParams, useHistory, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import { getAlbums } from "../../store/albums";
import "./albums.css";
import AlbumPage from "./AlbumPage";

const AlbumList = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const currentUser = useSelector((state) => state.session.user);
  const albums = useSelector((state) => state.albums);
  const albumArr = Object.values(albums);
  console.log(albumArr, "ALBUM ARR");
  console.log(albums, "ALBUMS");

  useEffect(() => {
    dispatch(getAlbums());
  }, [dispatch]);


  const handleNew = (e) => {
    e.preventDefault();
    if (!currentUser) return window.alert("Please Login");
    history.push(`/songs/new`);
  };
  console.log(albums, "ALBUMS HI");
  return (
    <div className="albums-dom">


        <button onClick={handleNew}>Add Album</button>
      <h2> Albums</h2>
    <div className='all-albums'>
      {albumArr.map((album) => (
        <div className="albums-list">
          <Link className="album-title" to={`/albums/${album.id}`}>
            {album.previewImage ? (
              <img src={album.previewImage} alt="Album Preview" />
            ) : (
              <div>
                <img src="https://i.etsystatic.com/18338096/r/il/6fd75a/2865274586/il_fullxfull.2865274586_agx1.jpg" />
              </div>
            )}

            {album.title}

            {/* <div>{album.description}</div>  */}
          </Link>
        </div>
      ))}
    </div>
    </div>
  );
};

export default AlbumList;
