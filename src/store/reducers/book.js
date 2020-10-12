import {
    FETCH_BOOK_BY_ID_INIT,
    FETCH_BOOK_BY_ID_SUCCESS,
    UPDATE_BOOK_SUCCESS,
    UPDATE_BOOK_FAIL,
    RESET_BOOK_ERRORS
   } from "../actionTypes";

   // INITIAL STATE
const book = {
        data: {},
        errors: undefined
    }

export const bookByIdReducer = (state = book , action) => {
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
