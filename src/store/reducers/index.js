/* Root Reducer*/
import { combineReducers} from "redux";
import errors from "./errors";
import { booksReducer } from "./books";
import bookReducer from './book';
import { reducer as formReducer} from "redux-form"; // handled by redux-form package
import { authReducer } from "./auth-reducer";

const rootReucer = combineReducers({
  errors,
  books: booksReducer,
  book: bookReducer,
  form: formReducer,
  auth: authReducer
});

export default rootReucer;
