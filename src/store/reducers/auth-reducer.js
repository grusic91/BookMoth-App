import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from "../actionTypes";

const INITIAL_STATE = {
  isAuth: false,
  errors: [],
  username: ''
}

export const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {...state, isAuth: true, errors: [], username: action.username}
    case LOGIN_FAILURE:
      return {...state, errors: action.errors}
    case LOGOUT:
      return {...state, isAuth: false }
    default:
      return state;
  }
}
