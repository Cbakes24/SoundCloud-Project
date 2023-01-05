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



//******* THUNK *******
export const getSongs = () => async (dispatch) => {
  const res = await fetch("/api/songs");
    console.log(res, 'RESPONSE')
  if (res.ok) {
    const songs = await res.json();
    console.log(songs, 'SONGSSSS')
    dispatch(loadSongs(songs.allSongs));
  }
};

export const createSong = (payload) => async (dispatch) => {
  const res = await fetch("/api/songs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (res.ok) {
    const song = await res.json();
    dispatch(addSong(song));
    return song;
  }
};

const initialState = {};

const songReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case LOAD_SONGS:

        action.songs.forEach(song => {
            newState[song.id] = song
        })
      console.log(newState, "NEWSTATE")
      return newState;
    case ADD_SONG:
      return newState;
    case DELETE_SONG:
        delete newState[action.song.id]
      return newState;
    case EDIT_SONG:
      return newState;
    default:
      return state;
  }
};

export default songReducer;
