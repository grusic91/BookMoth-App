import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BookDetailInfo } from './BookDetailInfo';
import * as actions from 'store/actions';

function BookDetail(props) {
    const book = useSelector(state => state.book.data);
    const error = useSelector(state => state.book.errors)
    const bookId = props.match.params.id;
  // equivalent react-redux hook to mapStateToProps function, previously used in class Component
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(actions.fetchBookById(bookId))
    }, [dispatch, bookId])

    if (book._id) {
        return <div id="book-detail-page"><BookDetailInfo book={book} /></div>
    } else {
        return <h1>LOADING...{error}</h1>
    }  
}

export default BookDetail;
