import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BookDetailInfo } from './BookDetailInfo';
import BookDetailUpdate from './BookDetailUpdate';
import { UserGuard } from 'components/shared/authRoutes/UserGuard';
import * as actions from 'store/actions';

class BookDetail extends Component {
  constructor() {
    super();

    this.state = {
      isAllowed: false,
      isFatching: true
    }

    this.verifyBookOwner = this.verifyBookOwner.bind(this);
  }

  componentDidMount() {
    const { isUpdate } = this.props.location.state || false;

    if (isUpdate) this.verifyBookOwner();

    const bookId = this.props.match.params.id;
    this.props.dispatch(actions.fetchBookById(bookId));


  }

  verifyBookOwner() {
    const bookId = this.props.match.params.id;
    this.setState({ isFatching: true});

    return actions.varifyBookOwner(bookId).then(
      () => {
        this.setState({isAllowed: true, isFatching: false})
      },
      () => {
        this.setState({isAllowed: false, isFatching: false})
      });
  }

  renderBookDetail(book, errors) {
    const { isUpdate } = this.props.location.state || false;
    const {isAllowed, isFatching} = this.state;

    return isUpdate ? <UserGuard isAllowed={isAllowed} isFatching={isFatching}>
                        <BookDetailUpdate
                                   dispatch={this.props.dispatch}
                                   book={book}
                                   errors={errors}
                                   verifyUser={this.verifyBookOwner}
                        />
                      </UserGuard>
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
