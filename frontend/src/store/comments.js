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
      comment
    };
  };

  export const deleteComment = (id) => { //the commentId from the removeComment thunk is passed in here
    return {
      type: DELETE_COMMENT,
      id
    }
  }


//******* Thunks *********
export const loadAllComments = () => async (dispatch) => {
    const res = await csrfFetch("/api/comments");
    console.log(res, "RESPONSE");
    if (res.ok) {
      const comments = await res.json();
      console.log(comments, "COMMENTSSS");
      dispatch(loadComments(comments.comments));
    }
  };


  export const createComment =  (payload) => async (dispatch) => {
    const res = await csrfFetch("/:songId/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const comment = await res.json();
        dispatch(addComment(comment));
        return comment;
      }
    };

    export const updateComment = (payload) => async (dispatch) => {
        const res = await csrfFetch(`/api/comments/${payload.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          const comment = await res.json();
          dispatch(editComment(comment));
          return comment;
        }
      };

const initialState = {}

const commentReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case LOAD_COMMENTS:
            console.log(action.comments, "ACTION COMMENTS")
            action.comments.forEach(comment => {
                newState[comment.id] = comment
            })
            console.log(newState, 'newState COmments')
            return newState
            // case ADD_COMMENT:
            //     newState[action.payload.id] = action.payload
            //     console.log(newState)
            //     return newState
      default:
        return state;
    }
  };

  export default commentReducer;
