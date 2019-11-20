/* Root Reducer*/
import { combineReducers} from "redux";
import currentUser from "./currentUser";
import errors from "./errors";
import {bookReducer} from "./books";

const rootReucer = combineReducers({
  currentUser,
  errors,
  books: bookReducer,
});

export default rootReucer;
