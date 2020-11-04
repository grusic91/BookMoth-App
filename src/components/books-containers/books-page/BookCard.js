import React from 'react';
import { Link } from 'react-router-dom';

export const BookCard = React.memo(({book}) => {

  return <div className="my-card">
    <Link className="card-link" to={`/books/${book._id}`}>
        <div className="card_image-container">
            <img src={book.image_url} className="" alt="..." />
        </div>  
        <div className="card_content">
            <h2 style={{color: "#212529"}} className="card-title text-medium">{book.title}</h2>
            <p className="book-author">{book.author}</p>
        </div> 
    </Link>          
  </div>  
});