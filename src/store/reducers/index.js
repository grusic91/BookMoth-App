/* Root Reducer*/
import { combineReducers} from "redux";
import currentUser from "./currentUser";
import errors from "./errors";
import {bookReducer} from "./books";
import { reducer as formReducer} from "redux-form"; // handled by redux-form package

const rootReucer = combineReducers({
  currentUser,
  errors,
  books: bookReducer,
  form: formReducer
});

export default rootReucer;
