import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from 'store/actions';

class BookDetail extends Component {

  componentDidMount() {
    const bookId = this.props.match.params.id;
    this.props.dispatch(actions.fetchBookById(bookId));
  }

  render() {
    const book = this.props.book;
    return (
      <div id="book-detail-page" className="card mb-3">
        <img src="https://via.placeholder.com/350x250" className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">Card title: {book.title}</h5>
          <h5 className="card-title">Card Author: {book.author}</h5>
          <p className="card-text">
            This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    book: state.book.data
  }
}

export default connect(mapStateToProps)(BookDetail);
