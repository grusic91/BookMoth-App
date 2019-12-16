import React from 'react';
import BookCreateForm from './BookCreateForm';
import { Redirect } from 'react-router-dom';
import * as actions from "store/actions";

class BookCreate extends React.Component {
  constructor() {
    super();
    this.bookCategories = ['novel', 'poem', 'history-novel']

    this.state = {
      errors: "",
      redirect: false
    }
    this.createNewBook = this.createNewBook.bind(this);
  }

  createNewBook (bookData) {
    actions.createBook(bookData).then(
      (book) => this.setState({redirect: true}),
      (errors) => this.setState({errors})
    )
  }

  render() {
    if(this.state.redirect) {
      return <Redirect to={{pathname:`/books`}} />
    }
    return (
      <div className="container" id="newBook">
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-lg-8">
            <div className="row form-box">
              <div className="col-md-6">
                <div className="form-title">Create Book</div>
                <BookCreateForm
                  submitCb={this.createNewBook}
                  options={this.bookCategories}
                  errors={this.state.errors} />
              </div>
              <div
                className="form-img col-md-6"
                style={{
                     backgroundPosition: 'center',
                     backgroundSize: 'cover',
                     backgroundImage: `url(${process.env.PUBLIC_URL} /img/book-moth-register.jpg`
                     }}
              >
                <div className="form-img-text">
                  <p>You are just few steps away to start using this amazing app!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default BookCreate;
