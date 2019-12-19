import React from 'react';
import { Link } from 'react-router-dom';

class BookManageCard extends React.Component {
  constructor() {
    super();
    this.state = {
      wantDelete: false,
    }
    // this.deleteBook = this.deleteBook.bind(this);
    this.showDeleteMenue = this.showDeleteMenue.bind(this);
  }

  showDeleteMenue() {
    this.setState({wantDelete: true});
  }

  closeDeleteMenue() {
    this.setState({wantDelete: false})
  }

  deleteBook(bookId, bookIndex) {
    this.setState({wantDelete: false});

    this.props.deleteBookCb(bookId, bookIndex);
  }


  render() {
    const { book, idex, bookIndex } = this.props;
    const { wantDelete } = this.state;
    return (
      <div key={idex} className="col-sm-6">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{book.title}</h5>
            <p className="card-text">{book.description}</p>
            <Link to={`/books/${book._id}`} className="btn btn-primary">Manage this book</Link>
            {
              !wantDelete &&
              <button onClick={this.showDeleteMenue} className="btn btn-danger">Delete</button>
            }
            {
              wantDelete &&
              <div>
                Do you confirm?
                <button onClick={() => {this.deleteBook(book._id, bookIndex)}} className="btn btn-danger">Yes</button>
                <button onClick={() => this.closeDeleteMenue()} className="btn btn-success">No</button>
              </div>
            }
          </div>
        </div>
      </div>
    )
  }
}

export default BookManageCard
