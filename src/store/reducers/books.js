import {
  FETCH_BOOKS_SUCCESS,
  FETCH_BOOKS_INIT,
  FETCH_BOOKS_FAIL,
  FETCH_BOOK_BY_ID_INIT,
  FETCH_BOOK_BY_ID_SUCCESS
 } from "../actionTypes";

const INITIAL_STATE = {
  books: {
    data: [],
    errors: []
  },
  book: {
    data: {}
  }
}

export const bookReducer = (state = INITIAL_STATE.books, action) => {
  switch (action.type) {
    case FETCH_BOOKS_INIT:

      return { ...state, data: [], errors: [] }
    case FETCH_BOOKS_SUCCESS:

      return {...state, data: action.books}
    case FETCH_BOOKS_FAIL:
    debugger
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
    default:
      return state;
  }
}
