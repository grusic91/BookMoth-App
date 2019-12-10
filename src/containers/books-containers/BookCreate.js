import React from 'react';
import BookCreateForm from './BookCreateForm';
import { Redirect } from 'react-router-dom';
import * as actions from "store/actions";

class BookCreate extends React.Component {
  constructor() {
    super();
    this.bookCategories = ['novel', 'poem', 'history-novel']

    this.state = {
      errors: [],
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
      <section id="newBook">
        <div className="book-form">
          <div className="row">
            <div className="col-md-5">
              <h1>Create Book</h1>
              <BookCreateForm
                submitCb={this.createNewBook}
                options={this.bookCategories}
                errors={this.state.errors} />
            </div>
            <div className="col-md-6 ml-auto">
              <div className="image-contaier">
                <h2 className="catchprase">Books at home in reach of few clicks.</h2>
                <img src={process.env.PUBLIC_URL + '/img/create-book.jpg'} width="450" alt=""/>
              </div>
            </div>
          </div>
        </div>

      </section>
    )
  }
}

export default BookCreate;
