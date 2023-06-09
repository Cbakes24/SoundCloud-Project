import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";


const AlbumList = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const currentUser = useSelector((state) => state.session.user);
  




    return (
        <div>
           <p> HELLO ALBUM LIST </p>
        </div>
    )
}

export default AlbumList
