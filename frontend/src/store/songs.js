import { csrfFetch } from "./csrf";

//******* Variables *********
const LOAD_SONGS = "load/LOAD_SONGS";
const ADD_SONG = "add/ADD_SONG";
const DELETE_SONG = "delete/DELETE_SONG";
const EDIT_SONG = "edit/EDIT_SONG";

//******* Actions *********
const loadSongs = (songs) => {
  return {
    type: LOAD_SONGS,
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
    song
  };
};

export const deleteSong = (id) => { //the songId from the removeSong thunk is passed in here
  return {
    type: DELETE_SONG,
    id
  }
}
//******* THUNK *******
export const getSongs = () => async (dispatch) => {
  const res = await fetch("/api/songs");
  console.log(res, "RESPONSE");
  if (res.ok) {
    const songs = await res.json();
    console.log(songs, "SONGSSSS");
    dispatch(loadSongs(songs.allSongs)); //because allsongs was the initial key in the list of songs see the console log
  }
};

export const createSong = (payload) => async (dispatch) => {
  const res = await csrfFetch("/api/songs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (res.ok) {
    const song = await res.json();
    dispatch(addSong(song));
    return song;
  }
  return res
};

export const updateSong = (payload) => async (dispatch) => {
  const res = await csrfFetch(`/api/songs/${payload.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (res.ok) {
    const song = await res.json();
    dispatch(editSong(song));
    return song;
  }
  return res
};

export const removeSong = (songId) => async (dispatch) => {
  console.log(songId, 'Remove Song THUNK hits')
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
      console.log(newState, "NEWSTATE");
      return newState;
    case ADD_SONG:
      //why is it adding a song and there is no code here?
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
