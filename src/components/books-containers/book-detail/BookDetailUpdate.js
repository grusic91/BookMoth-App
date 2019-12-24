import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from 'store/actions';
import {EditableInput} from "components/shared/editable/EditableInput";
import {EditableTextArea} from "components/shared/editable/EditableTextArea";


class BookDetailUpdate extends Component {
  constructor() {
    super();
    this.updateBook = this.updateBook.bind(this);
  }


  updateBook(bookData) {
    const { book: {_id} } = this.props;
    this.props.dispatch(actions.updateBook(_id, bookData));
  }

  render() {
    const book = this.props.book;
    return (
      <div className="mb-3">
        <div className="row no-gutters">
          <div className="col-md-4">
            <img src={`${process.env.PUBLIC_URL} /img/create-book.jpg`} className="card-img" alt="..." />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <EditableInput entity={book}
                             entityField={'title'}
                             className={'book-title'}
                             updateEntity={this.updateBook}/>
              <EditableInput entity={book}
                             entityField={'author'}
                             className={'book-author'}
                             updateEntity={this.updateBook}/>
              <EditableInput entity={book}
                             entityField={'category'}
                             className={'book-category'}
                             updateEntity={this.updateBook}/>
              <EditableInput entity={book}
                             entityField={'edition'}
                             className={'book-text'}
                             updateEntity={this.updateBook}/>
              <EditableInput entity={book}
                             entityField={'publisher'}
                             className={'card-text'}
                             updateEntity={this.updateBook}/>
              <EditableInput entity={book}
                             entityField={'language'}
                             className={'card-text'}
                             updateEntity={this.updateBook}/>
              <EditableInput entity={book}
                             type={'number'}
                             entityField={'pages'}
                             className={'card-text'}
                             updateEntity={this.updateBook}/>
              <EditableInput entity={book}
                             entityField={'isbn'}
                             className={'card-text'}
                             updateEntity={this.updateBook}/>
              <hr/>
              <EditableTextArea entity={book}
                             entityField={'description'}
                             className={"book-description"}
                             rows={6}
                             cols={50}
                             updateEntity={this.updateBook}
                             />
            </div>
          </div>
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

export default connect(mapStateToProps)(BookDetailUpdate);
