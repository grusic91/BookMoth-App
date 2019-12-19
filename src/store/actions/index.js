import axios from "axios";
import authService from "../services/auth-service";
import axiosService from "../services/axios-service";
import { FETCH_BOOKS_SUCCESS } from "../actionTypes";
import { LOGIN_SUCCESS } from "../actionTypes";
import { LOGIN_FAILURE } from "../actionTypes";
import { LOGOUT } from "../actionTypes";
import { FETCH_BOOKS_INIT } from "../actionTypes";
import { FETCH_BOOKS_FAIL } from "../actionTypes";
import { FETCH_BOOK_BY_ID_SUCCESS } from "../actionTypes";
import { FETCH_BOOK_BY_ID_INIT } from "../actionTypes";

const axiosInstance = axiosService.getInstance();

// Action Creator FETCH_BOOKS from server
const fetchBooksSuccess = books => {
  return {
    type: FETCH_BOOKS_SUCCESS,
    books
  }
}

const fetchBooksInit = () => {
  // reset our data to empty arrays
  return {
    type: FETCH_BOOKS_INIT,
  }
}

const fetchBooksFail = (errors) => {
  return {
    type: FETCH_BOOKS_FAIL,
    errors
  }
}

const fetchBookByIdInit = () => {
  return {
    type:   FETCH_BOOK_BY_ID_INIT
  }
}

const fetchBookByIdSuccess = (book) => {
  return {
    type: FETCH_BOOK_BY_ID_SUCCESS,
    book
  }
}

/*FETCH BOOKS*/
export const fetchBooks = (title) => {
  // create url and check for title if title is use url with title elese for all boooks
  const url = title ? `http://localhost:3000/api/books?title=${title}`: `http://localhost:3000/api/books`;
// dispatch function send data to the store
  return dispatch => {
    // frist reset data with fetchBooksInit
    // when navigating between search page and normal books page, reset data before request
    dispatch(fetchBooksInit());
    // proxy to http://localhost:3005/api/books
    axiosInstance.get(url)
      .then(res => {
          return res.data
      })
      .then(booksNoAuth => dispatch(fetchBooksSuccess(booksNoAuth)))
      .catch(({response}) => {
        return dispatch(fetchBooksFail(response.data.errors))
      })
  }
}

/* GET BOOK BY ID*/
export const fetchBookById = (bookId) => {
  /*bookId get from URL set in BookDetail*/
  // GET book from DB finded by ID
  return dispatch => {
    dispatch(fetchBookByIdInit());

    axiosInstance.get(`http://localhost:3000/api/books/${bookId}`)
      .then(res => res.data)
      .then(book => dispatch(fetchBookByIdSuccess(book)))
      .catch(err => console.log(err))
  }
}

/* Create New Book*/
export const createBook = (bookData) => {
  return axiosInstance.post(`http://localhost:3000/api/books`, bookData)
    .then(
      (res) => {
        return res.data;
      },
      (err) => {
        return Promise.reject(err.response.data.error.message);
      }
    )
}

// GET USER'S BOOKS
export const getUserBooks = () => {
  return axiosInstance.get(`http://localhost:3000/api/books/manage`).then(
        res => res.data,
        err => Promise.reject(err.response.data.error.message)
      )
}

// DELETE USER'S Book
export const deleteUsersBook = (bookData) => {
  return axiosInstance.delete(`http://localhost:3000/api/books/${bookData}`)
    .then(
        res => res.data,
        err => Promise.reject(err.response.data.error.message)
      );
}

// REGISTER USER
export const register = (userData) => {
  return axios.post(`http://localhost:3000/api/auth/register`, {...userData})
    .then(
      (res) => {
        return res.data;
      },
      (err) => {
        return Promise.reject(err.response.data.error.message);
      }
    )
}

// LOGIN USER
const loginSuccess = () => {
  const username = authService.getUsername();
  return {
    type: LOGIN_SUCCESS,
    username
  }
}

const loginFailure = (errors) => {
  return {
    type: LOGIN_FAILURE,
    errors
  }
}

export const checkAuthState = () => {
  return dispatch => {
    if(authService.isAuthenticated()) {
      dispatch(loginSuccess());
    }
  }
}

export const login = (userData) => {
  return dispatch => {
    return axios.post("http://localhost:3000/api/auth/login", {...userData})
    .then(res => {
      return res.data;
    })
    .then(res => {

      let token = res.token;
      // save token to localStorage
      // this will be saved in the browser in localStorage
      authService.saveToken(token);
      dispatch(loginSuccess(token));
    })
    .catch((err) => {
      dispatch(loginFailure(err.response.data.error.message));
    })
  }
}

export const logout = () => {
  authService.invalidateUser();
  return {
    type: LOGOUT
  }
}
