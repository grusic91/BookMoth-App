import React from 'react';
import { Link } from 'react-router-dom';

export const BookCard = ({book}) => {

  let text = book.description;
  let count = 50;
  let trimmedDescription = text.slice(0, count) + (text.length > count ? "..." : "");

  let renderImg = () => {
    if (book.image_url) {
      return book.image_url;
    } else { return "https://via.placeholder.com/350x250"}
  }

  return (
    <div className="card" style={{width: "16rem"}}>
      <img src={renderImg()} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="book-title card-title">{book.title}</h5>
        <h6 className="book-author">{book.author}</h6>
        <hr/>
        <p className="card-text">{trimmedDescription}</p>
        <Link to={`/books/${book._id}`} className="btn btn-primary">More details</Link>
      </div>
    </div>
  )
}
