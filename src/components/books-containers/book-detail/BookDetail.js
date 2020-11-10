import React, { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { BookDetailInfo } from './BookDetailInfo';
import * as actions from 'store/actions';

function BookDetail(props) {
    
    /* get book from redux store */
    const book = useSelector(state =>{      
        return state.book.item;
    }, shallowEqual);

    const isFetching = useSelector(state => {
        return state.book.isFetching;
    }, shallowEqual);

    const error = useSelector(state => state.book.errors, shallowEqual);
    const bookId = props.match.params.id;
  // equivalent react-redux hook to mapStateToProps
    const dispatch = useDispatch(); 
    useEffect(() => {     
        dispatch(actions.fetchBookById(bookId));
    }, []);

    if (isFetching === true || Object.entries(book.data).length === 0 || book.data._id !== bookId) {
        return <h1>LOADING...{error}</h1>
    } else {        
        return <div id="book-detail-page"><BookDetailInfo book={book.data} /></div>
    } 
}

export default BookDetail;
