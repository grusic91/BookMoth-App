/* Root Reducer*/
import { combineReducers} from "redux";
import currentUser from "./currentUser";
import errors from "./errors";

const rootReucer = combineReducers({
  currentUser,
  errors
});

export default rootReucer;
