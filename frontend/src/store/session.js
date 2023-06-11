import { csrfFetch } from "./csrf";

const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";
const EDIT_USER = "get/GET_USER"


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

const editUser = (user) => {
  return {
    type: EDIT_USER,
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


//  *** AWS CREATE USER ***
export const signup = (user) => async (dispatch) => {
  const { username, email, password, firstName, lastName, images, image } = user;
  const formData = new FormData();
  formData.append("username", username);
  formData.append("email", email);
  formData.append("password", password);
  formData.append("firstName", firstName);
  formData.append("lastName", lastName);

  // for multiple files
  if (images && images.length !== 0) {
    for (var i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }
  }

  // for single file
  if (image) formData.append("image", image);

  const res = await csrfFetch(`/api/users/`, {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  });

  const data = await res.json();
  dispatch(setUser(data.user));
};


// export const signup = (user) => async (dispatch) => {
//   const { firstName, lastName, username, email, password } = user;
//   const response = await csrfFetch("/api/users", {
//     method: "POST",
//     body: JSON.stringify({
//       firstName,
//       lastName,
//       username,
//       email,
//       password,
//     }),
//   });
//   const data = await response.json();
//   dispatch(setUser(data));
//   return response;
// };

export const restoreUser = () => async (dispatch) => {
  const response = await csrfFetch("/api/session");
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

export const updateUser = (payload) => async (dispatch) => {
  console.log(payload, "PAYYYY LOADDD ****")
  const res = await csrfFetch(`/api/users/${payload.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (res.ok) {
    const user = await res.json();
    console.log(user, "**** ressss ok user ****")
    dispatch(editUser(user));
    return user;
  }
  return res
};


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
      case EDIT_USER:
        newState.user = action.user;
        return newState;

    default:
      return state;
  }
};

export default sessionReducer;
