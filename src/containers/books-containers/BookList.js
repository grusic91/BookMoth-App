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
    // debugger
    this.props.dispatch(actions.fetchBooks())
  }


  BookCard() {

    return this.props.books.map((book) => {
      return (
        <BookCard key={book.id} book={book} />
      );
    });
  }


  render() {

    console.log(this.props.books);
    return (
      <div className="row">
        { this.BookCard() }
      </div>
    )
  }
}

function mapStateToProps(state) {
  // debugger
  return {
    books: state.books.data
  }
}

export default connect(mapStateToProps) (BookList);
