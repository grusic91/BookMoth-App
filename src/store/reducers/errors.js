// simple reducer to handle displaying errors to the user
import {ADD_ERROR, REMOVE_ERROR} from "../actionTypes";

export default (state = {message: null}, action) => {
  switch (action.type) {
    case ADD_ERROR:
    // retuns whatever the previous state was along with the key of message and value of error
      return { ...state, message: action.error };
    case REMOVE_ERROR:
      return { ...state, message: null};
    default:
      return state;
  }
}
