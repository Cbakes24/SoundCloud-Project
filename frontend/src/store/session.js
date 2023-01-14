import { csrfFetch } from "./csrf";

const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";
const GET_USER = "get/GET_USER"


const setUser = (user) => {
  return {
    type: SET_USER,
    user
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

const getUser = (user) => {
  return {
    type: GET_USER,
    user
  }
}




export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data));
  return response;
};

export const logout = () => async (dispatch) => {
  const response = await csrfFetch("/api/session", {
    method: "DELETE",
  });
  dispatch(removeUser());
  return response;
};

export const signup = (user) => async (dispatch) => {
  const { firstName, lastName, username, email, password } = user;
  const response = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      firstName,
      lastName,
      username,
      email,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data));
  return response;
};

export const restoreUser = () => async (dispatch) => {
  const response = await csrfFetch("/api/session");
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

// export const getUserInfo = (userId) => async (dispatch) => {
//   const res = await csrfFetch(`/api/users/${userId}`);
//   if (res.ok) {
//     const user = await res.json();
//     dispatch(getUser(user.Artist));
//   }
//   return res
// };


const initialState = () => ({ user: null });

const sessionReducer = (state = initialState(), action) => {
  let newState = { ...state };
  switch (action.type) {
    case SET_USER:
      newState.user = action.user;
      return newState;
    case REMOVE_USER:
      delete newState.user
      return newState;
      // case GET_USER:
      //   newState.commentUser = action.user
      //   console.log(newState, " GETUSER NEW STATE")
        // return newState;

    default:
      return state;
  }
};

export default sessionReducer;
