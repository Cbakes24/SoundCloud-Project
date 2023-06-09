import { csrfFetch } from "./csrf";

//******* Variables *********
const LOAD_ALBUMS = "load/LOAD_ALBUMS";
const ADD_ALBUM = "add/ADD_ALBUM";
const DELETE_ALBUM = "delete/DELETE_ALBUM";
const EDIT_ALBUM = "edit/EDIT_ALBUM";
const ADD_COMMENT = "add/ADD_COMMENT";

//******* Actions *********

const addComment = (payload) => {
  return {
    type: ADD_COMMENT,
    payload,
  };
};

const loadAlbums = (albums) => {
  return {
    type: LOAD_ALBUMS,
    albums,
  };
};

const addAlbum = (payload) => {
  return {
    type: ADD_ALBUM,
    payload,
  };
};

const editAlbum = (album) => {
  return {
    type: EDIT_ALBUM,
    album
  };
};

export const deleteAlbum = (id) => {
    return {
      type: DELETE_ALBUM,
      id
    }
  }


//   *** DELETE AN ALBUM *** 
export const removeAlbum = (albumId) => async (dispatch) => {
    console.log(albumId, 'Remove Album THUNK hits')
    const res = await csrfFetch(`/api/albums/${albumId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      dispatch(deleteAlbum(albumId));
    }
  };


//   *** CREATE AN ALBUM ***
export const createAlbum = (payload) => async (dispatch) => {
    const res = await csrfFetch("/api/albums", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  
    if (res.ok) {
      const album = await res.json();
      dispatch(addAlbum(album));
      return album;
    }
    return res
  };



export const updateAlbum = (payload) => async (dispatch) => {
    const res = await csrfFetch(`/api/albums/${payload.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  
    if (res.ok) {
      const album = await res.json();
      dispatch(editAlbum(album));
      return album;
    }
    return res
  };


  const initialState = {};

const albumReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case LOAD_ALBUMS:
      action.albums.forEach((album) => {
        newState[album.id] = album;
      });
      console.log(newState, "NEWSTATE");
      return newState;
    case ADD_ALBUM:
      //why is it adding a album and there is no code here?
      newState[action.payload.id] = action.payload;
      return newState;
    case DELETE_ALBUM:
      delete newState[action.id];
      return newState;
    case EDIT_ALBUM:
      newState[action.album.id] = action.album;
      return newState;
  //  case ADD_COMMENT:
  //     newState[action.payload.id] = action.payload
  //     console.log(newState, 'HELLLOOOOOOOO')
  //     return newState
    default:
      return state;
  }
};

export default albumReducer;
