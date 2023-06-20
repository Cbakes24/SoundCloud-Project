import { csrfFetch } from "./csrf";

//******* Variables *********
const LOAD_SONGS = "load/LOAD_SONGS";
const ADD_SONG = "add/ADD_SONG";
const DELETE_SONG = "delete/DELETE_SONG";
const EDIT_SONG = "edit/EDIT_SONG";
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
// export const createComment =  (payload) => async (dispatch) => {
//   console.log(payload, 'HERE IS THE SUBMITTED COMMENT!!!')
//   const {username, body, userId, songId} = payload
//   const res = await csrfFetch(`/api/songs/${songId}/comments`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({body})
//     });

//     if (res.ok) {
//       const comment = await res.json();
//       comment.User = {id: userId, username}
//       console.log(comment, 'RETURNED COMMENT')
//       dispatch(addComment(comment));
//       return comment;
//     }
//   };
// export const createComment =  (payload) => async (dispatch) => {
//   console.log(payload, 'HERE IS THE SUBMITTED COMMENT!!!')
//   const res = await csrfFetch(`/api/songs/${payload.songId}/comments`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     });

//     if (res.ok) {
//       const comment = await res.json();
//       console.log(comment, 'THIS IS THE RETURNED COMMENT')
//       dispatch(addComment(comment));
//       return comment;
//     }
//   };



export const getSongs = (page, size) => async (dispatch) => {
  // console.log("🚀 ~ file: songs.js:83 ~ getSongs ~ page:", page)
  // let res;
  // if(page) {
  //   let res = await fetch(`/api/songs?page=${page}`);
  // } else {
  //   let res = await fetch("/api/songs");
  // }
  let res = await fetch("/api/songs");
  console.log(res, "RESPONSE");
  if (res.ok) {
    const songs = await res.json();
    console.log(songs, "SONGSSSS");
    dispatch(loadSongs(songs.allSongs)); //because allsongs was the initial key in the list of songs see the console log
  }
};

export const getUserSongs = () => async (dispatch) => {
  const res = await fetch("/api/songs/current");
  console.log(res, "RESPONSE");
  if (res.ok) {
    const songs = await res.json();
    console.log(songs, "User SONGSSSS");
    dispatch(loadSongs(songs)); //because allsongs was the initial key in the list of songs see the console log
  }
};



export const createSong = (payload) => async (dispatch) => {
  console.log(payload, "*** SONG DATA SUBMITTED* ****")

  const {title, description, albumId, audioFile} = payload
  console.log(audioFile, '**** FILEEEE ****')
  
  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("albumId", albumId)



 // for single file
if (audioFile) formData.append("audioFile", audioFile);


  const res = await csrfFetch("/api/songs", {
    method: "POST",
    headers: { "Content-Type": "multipart/form-data" },
    body: formData
  });
  console.log(res, '**** SONG NEW RES ****')
  if (res.ok) {
    const song = await res.json();
    console.log("🚀 ~ file: songs.js:130 ~ createSong ~ *** SONG ***:", song)
    dispatch(addSong(song));
    return song;
  }
  return res
};

export const updateSong = (payload) => async (dispatch) => {
  console.log("🚀 ~ file: songs.js:137 ~ updateSong ~ payload:", payload)
  const {title, description, albumId, audioFile, songId} = payload

  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("albumId", albumId)
if(audioFile) formData.append('audioFile', audioFile)

  const res = await csrfFetch(`/api/songs/${songId}`, {
    method: "PUT",
    headers: { "Content-Type": "multipart/form-data" },
    body: formData
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
