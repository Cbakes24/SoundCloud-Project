import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";


const AlbumPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const currentUser = useSelector((state) => state.session.user);
  




    return (
        <div>
            HELLO ALBUM LIST
        </div>
    )
}
