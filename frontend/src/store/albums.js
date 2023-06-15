import { csrfFetch } from "./csrf";

//******* Variables *********
const LOAD_ALBUMS = "load/LOAD_ALBUMS";
const LOAD_ALBUM = "load/LOAD_ALBUM";
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

const loadAlbum = (album) => {
    return {
      type: LOAD_ALBUM,
      album,
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

// *** GET ALL ALBUMS ***

export const getAlbums = () => async (dispatch) => {
    console.log('ALBUMS THUNK')
    const res = await fetch("/api/albums");
    console.log(res, "RESPONSE");
    if (res.ok) {
      const albums = await res.json();
      console.log(albums, "THUNK ALBUMSSS");
      dispatch(loadAlbums(albums)); //because allsongs was the initial key in the list of songs see the console log
    }
  };

//   *** GET SINGLE ALBUM ***
export const getAlbum = (albumId) => async (dispatch) => {
    console.log('ALBUMS THUNK')
    const res = await fetch(`/api/albums/${albumId}`);
    console.log(res, "RESPONSE");
    if (res.ok) {
      const album = await res.json();
      console.log(album, "THUNK Album ");
      dispatch(loadAlbum(album)); //because allsongs was the initial key in the list of songs see the console log
    }
  };

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
  console.log(payload, "*** ALBUM DATA SUBMITTED* ****")
  const {title, description, images, image} = payload
  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);


  // for multiple files
  if (images && images.length !== 0) {
    for (var i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }
  }
  
   // for single file
  if (image) formData.append("image", image);
    const res = await csrfFetch("/api/albums/create", {
      method: "POST",
      headers: { "Content-Type": "multipart/form-data" },
      body: formData
    });
  console.log(res, '**** ALBUM NEW RES ****')
    if (res.ok) {
      const album = await res.json();
      console.log("🚀 ~ file: albums.js:114 ~ createAlbum ~ album:", album)
  
      dispatch(addAlbum(album.newAlbum));
      return album;
    }
    return res
  };


  export const updateAlbum = (payload) => async (dispatch) => {
    console.log("🚀 ~ file: albums.js:137 ~ updatealbum ~ payload:", payload)
    const {title, description, image, albumId} = payload
  
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
  if(image) formData.append('image', image)
  
    const res = await csrfFetch(`/api/albums/${albumId}`, {
      method: "PUT",
      headers: { "Content-Type": "multipart/form-data" },
      body: formData
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

      newState[action.payload.id] = action.payload;
      console.log(newState, "ALBUM NEWSTAT ***")
      return newState;
    case DELETE_ALBUM:
      delete newState[action.id];
      return newState;
    case EDIT_ALBUM:
      newState[action.album.id] = action.album;
      return newState;
      case LOAD_ALBUM:
      newState[action.album.id] = action.album;
      console.log(newState, "ALBUM STATE SINGLE")
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
