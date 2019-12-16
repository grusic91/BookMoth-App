import React from "react";
import { connect } from "react-redux";
import { BookList } from "./BookList";
import * as actions from 'store/actions';

class BookListing extends React.Component {

  componentDidMount() {
    /* get books from DB*/
    this.props.dispatch(actions.fetchBooks());
  }

  render() {
    return (
      <div className="books-listing-page">
        <BookList books={this.props.books} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    books: state.books.data
  }
}

export default connect(mapStateToProps) (BookListing);
