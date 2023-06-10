import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import { getAlbums } from "../../store/albums";
import './albums.css'

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
             <div className='albums-list'>
             {album.previewImage ? (<ls>{album.previewImage}</ls>) : (
                <ls>
                <img src="https://i.etsystatic.com/18338096/r/il/6fd75a/2865274586/il_fullxfull.2865274586_agx1.jpg" />
                </ls> )}
            
             <ls className='album-title'>{album.title}</ls>

            <ls>{album.description}</ls> 
             </div>
           )) 
           }
        </div>
    )
}

export default AlbumList
