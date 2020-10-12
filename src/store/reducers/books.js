import {
    FETCH_BOOKS_SUCCESS,
    FETCH_BOOKS_INIT,
    FETCH_BOOKS_FAIL,
} from "../actionTypes";

// INITIAL STATE
const books = {
    data: [],
    errors: []
}

export const bookReducer = (state = books, action) => {
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
