import { csrfFetch } from "./csrf";

//******* Variables *********
const LOAD_COMMENTS = "load/LOAD_COMMENTS";
const ADD_COMMENT = "add/ADD_COMMENT";
const DELETE_COMMENT = "delete/DELETE_COMMENT";
const EDIT_COMMENT = "edit/EDIT_COMMENT";

//******* Actions *********
const loadComments = (comments) => {
    return {
      type: LOAD_COMMENTS,
      comments,
    };
  };

  const addComment = (payload) => {
    return {
      type: ADD_COMMENT,
      payload,
    };
  };

  const editComment = (comment) => {
    return {
      type: EDIT_COMMENT,
      song
    };
  };

  export const deleteComment = (id) => { //the commentId from the removeComment thunk is passed in here
    return {
      type: DELETE_COMMENT,
      id
    }
  }

initialState = {}

const commentReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
      case LOAD_COMMENTS:
        action.comments.forEach((comment) => {
          newState[comment.id] = comment;
        });
        console.log(newState, "NEWSTATE");
        return newState;
      case ADD_COMMENT:
        //why is it adding a comment and there is no code here?
        newState[action.payload.id] = action.payload;
        return newState;
      case DELETE_COMMENT:
        delete newState[action.id];
        return newState;
      case EDIT_COMMENT:
        newState[action.comment.id] = action.comment;
        return newState;
      default:
        return state;
    }
  };

  export default commentReducer;
