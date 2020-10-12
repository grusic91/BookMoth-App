import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from 'store/actions';
import { BookList } from 'components/books-containers/books-page/BookList';

function BookListingPage() {
  // equivalent react-redux hook to mapStateToProps function, previously used in class Component
    const books = useSelector(state => state.books.data );
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(actions.fetchBooks());
    }, [dispatch]);

    return <div className="books-listing-page">
        {
            books ? <BookList books={books} /> : <h2>No books in DB :(</h2>
        }        
    </div>;
}

export default BookListingPage;
