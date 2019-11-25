import axios from "axios";
import { FETCH_BOOKS_SUCCESS } from "../actionTypes";

// Action Creator FETCH_BOOKS from server
const fetchBooksSuccess = books => {
  debugger
  return {
    type: FETCH_BOOKS_SUCCESS,
    books
  }
}

export const fetchBooks = () => {
  // debugger
// dispatch function send data to the store
  return dispatch => {
    // proxy to http://localhost:3005/api/books
    axios.get(`http://localhost:3000/api/books`)
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
      .catch(error => {

      })
  }
}


// REGISTER USER
export const register = (userData) => {
  return axios.post(`http://localhost:3000/api/auth/register`, {...userData})
    .then(
      (res) => {
        debugger
        return res.data;
      },
      (err) => {
        debugger
        return Promise.reject(err.response.data.error.message)
      }
    )
}
