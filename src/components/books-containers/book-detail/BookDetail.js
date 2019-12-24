import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BookDetailInfo } from './BookDetailInfo';
import BookDetailUpdate from './BookDetailUpdate';
import * as actions from 'store/actions';

class BookDetail extends Component {

  componentDidMount() {
    const bookId = this.props.match.params.id;
    this.props.dispatch(actions.fetchBookById(bookId));
  }

  renderBookDetail(book) {
    const { isUpdate } = this.props.location.state || false;

    return isUpdate ? <BookDetailUpdate dispatch={this.props.dispatch} book={book} />
                    : <BookDetailInfo book={book} />

  }

  render() {
    const book = this.props.book;

    if (book._id) {
      return (
        <div id="book-detail-page">
          {this.renderBookDetail(book)}
        </div>
      )
    } else {
      return <h1>LOADING...</h1>
    }
  }
}

function mapStateToProps(state) {
  return {
    book: state.book.data
  }
}

export default connect(mapStateToProps)(BookDetail);
