import React from 'react';
import * as actions from 'store/actions';
import { Link, withRouter } from 'react-router-dom';
import { ToastContainer, toast} from 'react-toastify';
import BookManageCard from './BookManageCard';

class BookManage extends React.Component {
  constructor() {
    super()
    this.state = {
      userBooks: [],
      errors: [],
      isFetching: false
    }
    this.deleteBook = this.deleteBook.bind(this);
  }
  componentDidMount() {
    this.setState({isFetching: true})
    actions.getUserBooks().then(
        userBooks => this.setState({userBooks, isFetching: false}),
        errors => this.setState({errors, isFetching: false}))
  }

  renderBookCards(books) {
    return books.map((book, idex) =>
      <BookManageCard
        book={book}
        key={idex}
        bookIndex={idex}
        deleteBookCb={this.deleteBook} />
    );
  }

  deleteBook(bookId, bookIndex) {
    actions.deleteUsersBook(bookId).then(
      () => this.deleteBookFromList(bookIndex),
      errors => toast.errors(errors[0].detail)
    )
  }

  deleteBookFromList(bookIndex) {
    const userBooks = this.state.userBooks.slice();
    userBooks.splice(bookIndex, 1);

    this.setState({userBooks});
  }

  render() {
    const {userBooks, isFetching} = this.state;
    return (
      <div id="book-manage-page" className="container">
        <ToastContainer />
        <div className="row">
          { this.renderBookCards(userBooks) }
        </div>
        {
          !isFetching && userBooks.length === 0 &&
            <div className="alert alert-warning">
              You have no Books created. Go to Add Book sesction and create your first book today!
              <Link style={{"marginLeft": "10px"}} to="books/new">Create Book</Link>
            </div>
        }
      </div>
    )
  }
}



export default withRouter(BookManage);
