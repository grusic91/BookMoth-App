import { SET_CURRENT_USER } from "../actionTypes";

const DEFAULT_STATE = {
  isAuthenticated: false,
  user: {}, // when isAuthenticated true it will fill all the user info
}

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        /*isAuthenticated returns true, that means that length is going to be greater than zero*/
        isAuthenticated: Object.keys(action.user).length > 0,
        user: action.user
      };
    default:
      return state;
  }
}
