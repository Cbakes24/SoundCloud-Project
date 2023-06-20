import { csrfFetch } from "./csrf";

//******* Variables *********
const LOAD_SONGS = "load/LOAD_SONGS";
const ADD_SONG = "add/ADD_SONG";
const DELETE_SONG = "delete/DELETE_SONG";
const EDIT_SONG = "edit/EDIT_SONG";
const PAGE_SONG = "page/PAGE_SONG";
// const ADD_COMMENT = "add/ADD_COMMENT";

//******* Actions *********

// const addComment = (payload) => {
//   return {
//     type: ADD_COMMENT,
//     payload,
//   };
// };

const loadSongs = (songs) => {
  return {
    type: LOAD_SONGS,
    songs,
  };
};

const changeSongPage = (songs) => {
  return {
    type: PAGE_SONG,
    songs,
  };
};

const addSong = (payload) => {
  return {
    type: ADD_SONG,
    payload,
  };
};

const editSong = (song) => {
  return {
    type: EDIT_SONG,
    song,
  };
};

export const deleteSong = (id) => {
  //the songId from the removeSong thunk is passed in here
  return {
    type: DELETE_SONG,
    id,
  };
};

export const getSongs = (page, size) => async (dispatch) => {
  console.log("🚀 ~ file: songs.js:83 ~ getSongs ~ page:", page);
  let res = await fetch("/api/songs");

  console.log(res, "RESPONSE");
  if (res.ok) {
    const songs = await res.json();
    console.log(songs, "SONGSSSS");
    dispatch(loadSongs(songs.allSongs)); //because allsongs was the initial key in the list of songs see the console log
  }
};

export const getPage = (page, size) => async (dispatch) => {
  console.log("🚀 ~ file: songs.js:83 ~ getSongs ~ page:", page);
  let res = await fetch(`/api/songs?page=${page}&size=${9}`);

  console.log(res, "RESPONSE");
  if (res.ok) {
    const songs = await res.json();
    console.log(songs, "SONGSSSS");
    dispatch(changeSongPage(songs.allSongs)); //because allsongs was the initial key in the list of songs see the console log
  }
};

export const getUserSongs = () => async (dispatch) => {
  const res = await fetch("/api/songs/current");
  if (res.ok) {
    const songs = await res.json();
    dispatch(loadSongs(songs)); //because allsongs was the initial key in the list of songs see the console log
  }
};

export const createSong = (payload) => async (dispatch) => {
  const { title, description, albumId, audioFile } = payload;

  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("albumId", albumId);

  // for single file
  if (audioFile) formData.append("audioFile", audioFile);

  const res = await csrfFetch("/api/songs", {
    method: "POST",
    headers: { "Content-Type": "multipart/form-data" },
    body: formData,
  });
  if (res.ok) {
    const song = await res.json();
    dispatch(addSong(song));
    return song;
  }
  return res;
};

export const updateSong = (payload) => async (dispatch) => {
  const { title, description, albumId, audioFile, songId } = payload;

  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("albumId", albumId);
  if (audioFile) formData.append("audioFile", audioFile);

  const res = await csrfFetch(`/api/songs/${songId}`, {
    method: "PUT",
    headers: { "Content-Type": "multipart/form-data" },
    body: formData,
  });

  if (res.ok) {
    const song = await res.json();
    dispatch(editSong(song));
    return song;
  }
  return res;
};

export const removeSong = (songId) => async (dispatch) => {
  const res = await csrfFetch(`/api/songs/${songId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  if (res.ok) {
    dispatch(deleteSong(songId));
  }
};
const initialState = {};

const songReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case LOAD_SONGS:
      action.songs.forEach((song) => {
        newState[song.id] = song;
      });
      return newState;
    case PAGE_SONG:
      let newPage = {};
      action.songs.forEach((song) => {
        newPage[song.id] = song;
      });
      return newPage;
    case ADD_SONG:
      newState[action.payload.id] = action.payload;
      return newState;
    case DELETE_SONG:
      delete newState[action.id];
      return newState;
    case EDIT_SONG:
      newState[action.song.id] = action.song;
      return newState;

    default:
      return state;
  }
};

export default songReducer;
