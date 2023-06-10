import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import { getAlbums } from "../../store/albums";


const AlbumList = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const currentUser = useSelector((state) => state.session.user);
    const albums = useSelector((state) => state.albums);
    const albumArr = Object.values(albums)
    console.log(albumArr, "ALBUM ARR")
    console.log(albums, "ALBUMS")

useEffect(() => {
    dispatch(getAlbums())
}, [dispatch]);

console.log(albums, "ALBUMS HI")
    return (
        <div>
        HI
           {albumArr.map((album) => (
             <p>
             {album.title}
             </p>
           )) 
           }
        </div>
    )
}

export default AlbumList
