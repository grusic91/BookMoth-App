import React from 'react';
import { Link } from 'react-router-dom';

export const BookCard = ({book}) => {

  let renderImg = () => {
    if (book.image_url) {
      return book.image_url;
    } else { return "https://via.placeholder.com/350x250"}
  }

  return <div className="my-card">
    <Link className="card-link" to={`/books/${book._id}`}>
        <div className="card_image-container">
            <img src={renderImg()} className="" alt="..." />
        </div>  
        <div className="card_content">
            <h2 style={{color: "#212529"}} className="card-title text-medium">{book.title}</h2>
            <p className="book-author">{book.author}</p>
        </div> 
    </Link>         
  </div>  
}
