import React from 'react';

export const BookDetailInfo = ({book}) => {

  let renderImg = () => {
    if (book.image_url) {
      return book.image_url;
    } else { return `${process.env.PUBLIC_URL} /img/homepage-background.jpg`}
  }

  return (
  <div id="bookDetailInfo" className="mb-3" >
    <div className="row no-gutters">
      <div className="col-md-4">
        <img src={renderImg()} className="card-img" alt="..." />
      </div>
      <div className="col-md-8">
        <div className="card-body">
          <h3 className="book-title card-title">{book.title}</h3>
          <h4 className="book-author">{book.author}</h4>
          <p className="book-category card-text">{book.category}</p>
          <p className="book-edition card-text">{book.edition}</p>
          <p className="book-publish-prod card-text">Publishing and production: {book.publisher}</p>
          <p className="card-text">Languege: {book.language}</p>
          <p className="card-text">Pages: {book.pages}</p>
          <p className="book-isbn card-text">{book.sibn}</p>
          <hr/>
          <p className="book-description card-text"><strong>Description:</strong> {book.description}</p>
        </div>
      </div>
    </div>
  </div>
  )
}
