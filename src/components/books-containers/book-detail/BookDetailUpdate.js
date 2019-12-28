import React, { Component } from 'react';
import * as actions from 'store/actions';
import { toast } from 'react-toastify';
import {EditableInput} from 'components/shared/editable/EditableInput';
import {EditableTextArea} from 'components/shared/editable/EditableTextArea';
import {EditableSelect} from 'components/shared/editable/EditableSelect';

class BookDetailUpdate extends Component {
  constructor() {
    super();
    this.state = {
      bookProperties: ['title', 'author', 'category', 'edition', 'publisher', 'language', 'pages', 'description'],
    }
    this.updateBook = this.updateBook.bind(this);
    this.resetBookErrors = this.resetBookErrors.bind(this);
  }

  updateBook(bookData) {
    const { book: {_id}, dispatch } = this.props;
    dispatch(actions.updateBook(_id, bookData));
  }

  resetBookErrors() {
    this.props.dispatch(actions.resetUpdateBookErrors());
  }

  render() {
    const {book, errors} = this.props;
    const {bookProperties} = this.state;

     if (errors) {
      bookProperties.map(key => {
         if (key in errors) {
           return toast.error(errors[key].message)
         } else { return undefined; }
       });
    }

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
                             updateEntity={this.updateBook}
                             errors={errors}
                             resetErrors={this.resetBookErrors}/>
              <EditableInput entity={book}
                             entityField={'author'}
                             className={'book-author'}
                             updateEntity={this.updateBook}
                             errors={errors}
                             resetErrors={this.resetBookErrors}/>
              <EditableSelect entity={book}
                             entityField={'category'}
                             className={'book-category'}
                             updateEntity={this.updateBook}
                             options={['Novel', 'Poem', 'History', 'Biography']}
                             errors={errors}
                             resetErrors={this.resetBookErrors}/>
              <EditableInput entity={book}
                             entityField={'edition'}
                             className={'book-text'}
                             updateEntity={this.updateBook}
                             errors={errors}
                             resetErrors={this.resetBookErrors}/>
              <EditableInput entity={book}
                             entityField={'publisher'}
                             className={'card-text'}
                             updateEntity={this.updateBook}
                             errors={errors}
                             resetErrors={this.resetBookErrors}/>
              <EditableInput entity={book}
                             entityField={'language'}
                             className={'card-text'}
                             updateEntity={this.updateBook}
                             errors={errors}
                             resetErrors={this.resetBookErrors}/>
              <EditableInput entity={book}
                             type={'number'}
                             entityField={'pages'}
                             className={'card-text'}
                             updateEntity={this.updateBook}
                             errors={errors}
                             resetErrors={this.resetBookErrors}/>
              <EditableInput entity={book}
                             entityField={'isbn'}
                             className={'card-text'}
                             updateEntity={this.updateBook}
                             errors={errors}
                             resetErrors={this.resetBookErrors}/>
              <hr/>
              <EditableTextArea entity={book}
                             entityField={'description'}
                             className={"book-description"}
                             rows={6}
                             cols={50}
                             updateEntity={this.updateBook}
                             errors={errors}
                             resetErrors={this.resetBookErrors}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default BookDetailUpdate;
