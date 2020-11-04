import { combineReducers } from 'redux';
import {
    FETCH_BOOK_BY_ID_SUCCESS,
    UPDATE_BOOK_SUCCESS,
    UPDATE_BOOK_FAIL,
    RESET_BOOK_ERRORS,
    IS_FETCHING_BOOK
   } from "../actionTypes";

   // INITIAL STATE
const initialBookState = {
        data: {},
        errors: undefined,
        isFetching: false
    }

const initBookRreducer = () => {
    const isFetching = (state = initialBookState, action ) => {
        switch(action.type) {
            case IS_FETCHING_BOOK:
                return {
                    ...state, isFetching: true
                }
            case FETCH_BOOK_BY_ID_SUCCESS:
                return {
                    ...state, isFetching: false, data: {}};
            default:
                return state;
        }
    }

    const item = (state = initialBookState , action) => {
        switch (action.type) {   
            case IS_FETCHING_BOOK:
                return {
                    ...state, isFetching: false, data: {}
                };            
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

    return combineReducers({
        item,
        isFetching
    });
}

const bookReducer = initBookRreducer();

export default bookReducer;
