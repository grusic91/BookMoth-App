import React from 'react';
import { Link } from 'react-router-dom';

export const BookCard = ({book}) => {
  let text = book.description;
  let count = 50;
  let trimmedDescription = text.slice(0, count) + (text.length > count ? "..." : "");
  return (
    <div className="card" style={{width: "16rem"}}>
      <img src="https://via.placeholder.com/350x250" className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{book.title}</h5>
        <p>CATEGORY: {book.category}</p>
        <p>PAGES: {book.pages}</p>
        <p className="card-text">
          {trimmedDescription}
        </p>
        <Link to={`/books/${book._id}`} className="btn btn-primary">More details</Link>
      </div>
    </div>
  )
}
