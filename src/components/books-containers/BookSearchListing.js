import React from "react";
import { connect } from "react-redux";
import { BookList } from "./books-page/BookList";
import * as actions from 'store/actions';

class BookSearchListing extends React.Component {
  constructor() {
    super();
    this.state= {
      searchedBook: ''
    }
  };

  componentDidMount() {
      this.searchBookByTitle();
  }

  searchBookByTitle() {
    const searchedBook = this.props.match.params.title;
    this.setState({searchedBook});
    this.props.dispatch(actions.fetchBooks(searchedBook));
  }

  renderTitle() {
    const { errors, data } = this.props.books;
    const { searchedBook } = this.state;
    let title = '';
    let detail = '';

    if (errors.length > 0 ) {
      title = errors[0].title;
      detail = errors[0].detail;
      return (
        <div>
          <h1>Error Title: {title}</h1>
          <h5>Error detail: {detail}</h5>
        </div>
      )
    }
    if( data.length > 0) {
      title = `Your Searched book is ${searchedBook}`;
      return <h1>{title}</h1>;
    }
  }

  render() {
    return (
      <div
        className="container bookSearchListing "
        style={{marginTop: 50}}>
        { this.renderTitle() }
        <div className="d-flex justify-content-around">
        { !this.state.searchedBook ?
          <h2>LOADING...</h2>
        :
          <BookList books={this.props.books.data} />
         }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    books: state.books
  }
}

export default connect(mapStateToProps) (BookSearchListing);
