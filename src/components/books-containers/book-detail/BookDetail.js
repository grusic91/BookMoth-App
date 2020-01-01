import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BookDetailInfo } from './BookDetailInfo';
import * as actions from 'store/actions';

class BookDetail extends Component {

  componentDidMount() {

    const bookId = this.props.match.params.id;
    this.props.dispatch(actions.fetchBookById(bookId));
  }

  render() {
    const { book } = this.props;

    if (book._id) {
      return (
        <div id="book-detail-page">
          <BookDetailInfo book={book} />
        </div>
      )
    } else {
      return <h1>LOADING...</h1>
    }
  }
}

function mapStateToProps(state) {
  return {
    book: state.book.data,
    errors: state.book.errors
  }
}

export default connect(mapStateToProps)(BookDetail);
