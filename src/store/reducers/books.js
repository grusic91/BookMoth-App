import {
  FETCH_BOOKS_SUCCESS,
  FETCH_BOOKS_INIT,
  FETCH_BOOKS_FAIL,
  FETCH_BOOK_BY_ID_INIT,
  FETCH_BOOK_BY_ID_SUCCESS,
  UPDATE_BOOK_SUCCESS,
  UPDATE_BOOK_FAIL,
  RESET_BOOK_ERRORS
 } from "../actionTypes";

const INITIAL_STATE = {
  books: {
    data: [],
    errors: []
  },
  book: {
    data: {},
    errors: undefined
  }
}

export const bookReducer = (state = INITIAL_STATE.books, action) => {
  switch (action.type) {
    case FETCH_BOOKS_INIT:

      return { ...state, data: [], errors: [] }
    case FETCH_BOOKS_SUCCESS:

      return {...state, data: action.books}
    case FETCH_BOOKS_FAIL:
      return { ...state, errors: action.errors, data: []}
    default:
      return state;
  }
}

export const selectedBookReducer = (state = INITIAL_STATE.book, action) => {
  switch (action.type) {
    case FETCH_BOOK_BY_ID_INIT:
      return {...state, data: {}};
    case FETCH_BOOK_BY_ID_SUCCESS:
      return {...state, data: action.book};
    case UPDATE_BOOK_SUCCESS:
      return {...state, data: action.book};
    case UPDATE_BOOK_FAIL:
      
      return {...state, errors: action.errors};
    case RESET_BOOK_ERRORS:
      return {...state, errors: []};
    default:
      return state;
  }
}
