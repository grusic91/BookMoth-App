import axios from "axios";
import authService from "../services/auth-service";
import axiosService from "../services/axios-service";
import { FETCH_BOOKS_SUCCESS } from "../actionTypes";
import { LOGIN_SUCCESS } from "../actionTypes";
import { LOGIN_FAILURE } from "../actionTypes";
import { LOGOUT } from "../actionTypes";

const axiosInstance = axiosService.getInstance();

// Action Creator FETCH_BOOKS from server
const fetchBooksSuccess = books => {
  return {
    type: FETCH_BOOKS_SUCCESS,
    books
  }
}

export const fetchBooks = () => {
// dispatch function send data to the store
  return dispatch => {
    // proxy to http://localhost:3005/api/books
    axiosInstance.get(`http://localhost:3000/api/books`)
      .then(books => {
        // debugger
        /* DO THIS IN THE FUTURE Sort data that we want to use for users without authentication*/
          //if user is not authenticated get
          let booksNoAuth = books.data.map(book => {
            return {
              title: book.title,
              author: book.author,
              description: book.description,
              id: book._id,
              language: book.language,
              category: book.category,
              pages: book.pages
            }
          })
        // dispatch action for geting data from server
        dispatch(fetchBooksSuccess(booksNoAuth));
      })
      .catch(err => {
        debugger
        console.error(err);
      })
  }
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
  return {
    type: LOGIN_SUCCESS
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
