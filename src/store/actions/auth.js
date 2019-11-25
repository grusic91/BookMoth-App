import { apiCall } from "../services/api";
import { SET_CURRENT_USER } from "../actionTypes";

export function setCurrentUser(user) {
  // this function is going to be used to dispatch and send to redux reducer
  debugger;
  return {
    type: SET_CURRENT_USER,
    user
  }
}
