import React from "react";
import { connect } from "react-redux";
import { BookCard } from "components/BookCard";
import * as actions from 'store/actions';

class BookList extends React.Component {
  constructor() {
    super();
    this.state= {
      books: []
    }
  };

  componentDidMount() {
    this.props.dispatch(actions.fetchBooks());
  }

  BookCard() {
    return this.props.books.map((book) => {
      return (
        <BookCard key={book.id} book={book} />
      );
    });
  }


  render() {
    return (
      <div className="row books-list">
        { this.BookCard() }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    books: state.books.data
  }
}

export default connect(mapStateToProps) (BookList);
