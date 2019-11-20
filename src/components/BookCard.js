import React from "react";
import { Link } from 'react-router-dom';

export const BookCard = ({book}) => {

  return (
    <div className="card" style={{width: "18rem"}}>
      <img src="https://via.placeholder.com/350x250" className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{book.title}</h5>
        <p>CATEGORY: {book.category}</p>
        <p>PAGES: {book.pages}</p>
        <p className="card-text">
          {book.description}
        </p>
        <Link to="/book/234" className="btn btn-primary">More details</Link>
      </div>
    </div>
  )
}
