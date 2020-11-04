import React, { useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import * as actions from 'store/actions';
import { BookList } from 'components/books-containers/books-page/BookList';

function BookListingPage() {
  // equivalent react-redux hook to mapStateToProps function, previously used in class Component
  const books = useSelector(state => {return [...state.books.data]}, shallowEqual);
    const dispatch = useDispatch();
    
    useEffect(() => {
        if (books.length <= 0) {
            dispatch(actions.fetchBooks());
        }
        return;   
    }, [dispatch, books.length]);

    
    return <div className="books-listing-page">
        {
            books.length > 0 ? <BookList books={books} /> : <h2>Loading...</h2>
        }        
    </div>;
}

export default BookListingPage;
