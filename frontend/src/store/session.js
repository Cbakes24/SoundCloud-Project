import { csrfFetch } from "./csrf";

//variables
const SET_SESSION = "set/SET_SESSION";
const REMOVE_SESSION = "remove/REMOVE_SESSION";

// action
export const setSession = (user) => {
  return {
    type: SET_SESSION,
    payload: user
  };
};

export const removeSession = (id) => {
  return {
    type: REMOVE_SESSION,
    id,
  };
};

export const login = (user) => async (dispatch) => {
   const { credential, password } = user
    const res = await csrfFetch("/api/session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        credential,
        password
    }),
    });

    if (res.ok) {
     const currUser = await res.json();
     dispatch(setSession(currUser))

    }
    return res
  };

const initialState = { user: null }

const sessionReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {

    case SET_SESSION:
        newState.user = action.payload
      return newState
    case REMOVE_SESSION:
        newState.user = null
        return newState
    default:
      return newState;
  }
};

export default sessionReducer
