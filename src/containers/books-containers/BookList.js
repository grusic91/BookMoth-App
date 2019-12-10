import React from "react";
import { BookCard } from "./BookCard";

export class BookList extends React.Component {
  renderBookCards() {
    return this.props.books.map((book, idx) => {
      return (
        <BookCard key={book._id} book={book} />
      )
    });
  }

  render() {
    return (
      <div className="row">
        {this.renderBookCards()}
      </div>
    )
  }
}
