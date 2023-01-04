


//Variables

const ADD_SONG = 'add/ADD_SONG'
const DELETE_SONG = 'delete/DELETE_SONG'
const EDIT_SONG = 'edit/EDIT_SONG'






const songReducer = (state = initialState(), action) => {
  let newState = { ...state };
  switch (action.type) {
    case ADD_SONG:
      newState.user = action.song;
      return newState;
    case DELETE_SONG:
      delete newState.sog;
      return newState;
    case EDIT_SONG:
      newState.song;
      return newState;

    default:
      return state;
  }
};
