import axios from 'axios';
import authService from '../services/auth-service';
import axiosService from '../services/axios-service';
import { FETCH_BOOKS_SUCCESS,
         LOGIN_SUCCESS,
         LOGIN_FAILURE,
         LOGOUT,
         FETCH_BOOKS_INIT,
         FETCH_BOOKS_FAIL,
         FETCH_BOOK_BY_ID_SUCCESS,
         FETCH_BOOK_BY_ID_INIT,
         UPDATE_BOOK_SUCCESS,
         UPDATE_BOOK_FAIL,
         RESET_BOOK_ERRORS } from '../actionTypes';

const axiosInstance = axiosService.getInstance();

export const varifyBookOwner = (bookId) => {
    return axiosInstance.get(`/books/${bookId}/verify-user`);
}

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
  const url = title ? `/books?title=${title}`: `/books`;
// dispatch function send data to the store
  return dispatch => {
    // frist reset data with fetchBooksInit
    // when navigating between search page and normal books page, reset data before request
    dispatch(fetchBooksInit());

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

    axiosInstance.get(`/books/${bookId}`)
      .then(res => {
        return dispatch(fetchBookByIdSuccess(res.data))
      })
      .catch(err =>{
        return Promise.reject(err.response.data.error.message);
      })
  }
}

/* Create New Book*/
export const createBook = (bookData) => {
  return axiosInstance.post(`/books`, bookData)
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
  return axiosInstance.get(`/books/manage`).then(
        res => res.data,
        err => Promise.reject(err.response.data.error.message)
      )
}

// DELETE USER'S Book
export const deleteUsersBook = (bookData) => {
  return axiosInstance.delete(`/books/${bookData}`)
    .then(
        res => res.data,
        err => Promise.reject(err.response.data.error.message)
      );
}

// REGISTER USER
export const register = (userData) => {
  return axios.post(`/api/auth/register`, {...userData})
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
    return axios.post(`/api/auth/login`, {...userData})
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
    .catch(({response}) => {
        dispatch(loginFailure(response.data));
    })
  }
}

export const logout = () => {
  authService.invalidateUser();
  return {
    type: LOGOUT
  }
}

// UPDATE BOOKS
const updateBookSuccess = (updatedBook) => {
  return {
    type: UPDATE_BOOK_SUCCESS,
    book: updatedBook
  }
}

const updateBookFail = (errors) => {
  return {
    type: UPDATE_BOOK_FAIL,
    errors
  }
}

export const resetUpdateBookErrors = () => {
  return {
    type: RESET_BOOK_ERRORS
  }
}

export const updateBook = (id, bookData) => dispatch => {
  return axiosInstance.patch(`/books/${id}`, bookData)
    .then(res => res.data)
    .then(updatedBook => {
      dispatch(updateBookSuccess(updatedBook));
    })
    .catch(({response}) => {
      dispatch(updateBookFail(response.data.erros))
    })
}

/*--UPLOAD IMAGE */
export const  uploadImage = (image) => {
  const formData = new FormData();
  // append image on formData
  formData.append('image', image);

  // make request on server
  return axiosInstance.post('/image-upload', formData)
    .then(json => {
      return json.data.image_url;
    })
    .catch(({response}) => {
      return Promise.reject(response.data.errors[0])}
  )
}
