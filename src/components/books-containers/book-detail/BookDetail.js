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

  renderBookDetail(book, errors) {
    const { isUpdate } = this.props.location.state || false;

    return isUpdate ? <BookDetailUpdate dispatch={this.props.dispatch} book={book} errors={errors} />
                    : <BookDetailInfo book={book} />
  }

  render() {
    const { book, errors } = this.props;

    if (book._id) {
      return (
        <div id="book-detail-page">
          {this.renderBookDetail(book, errors)}
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
