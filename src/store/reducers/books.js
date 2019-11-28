import { FETCH_BOOKS_SUCCESS } from "../actionTypes";

const INITIAL_STATE = {
  data: []
}

export const bookReducer = (state = INITIAL_STATE, action) => {
  // debugger
  switch (action.type) {
    case FETCH_BOOKS_SUCCESS:
      return {...state, data: action.books}
    default:
      return state;
  }
}
