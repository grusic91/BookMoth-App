/* Root Reducer*/
import { combineReducers} from "redux";
import errors from "./errors";
import {bookReducer} from "./books";
import { reducer as formReducer} from "redux-form"; // handled by redux-form package
import { authReducer } from "./auth-reducer";

const rootReucer = combineReducers({
  errors,
  books: bookReducer,
  form: formReducer,
  auth: authReducer
});

export default rootReucer;
