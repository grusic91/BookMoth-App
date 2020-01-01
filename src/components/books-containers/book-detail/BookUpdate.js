import React, { Component } from 'react';
import { connect } from 'react-redux';
import { UserGuard } from 'components/shared/authRoutes/UserGuard';
import * as actions from 'store/actions';

import {EditableInput} from 'components/shared/editable/EditableInput';
import {EditableTextArea} from 'components/shared/editable/EditableTextArea';
import {EditableSelect} from 'components/shared/editable/EditableSelect';
import {EditableImage} from 'components/shared/editable/EditableImage';

class BookUpdate extends Component {

  constructor() {
    super();

    this.state = {
      bookProperties: ['title', 'author', 'category', 'edition', 'publisher', 'language', 'pages', 'description'],
      isAllowed: false,
      isFatching: true
    }
    this.updateBook = this.updateBook.bind(this);
    this.resetBookErrors = this.resetBookErrors.bind(this);
    this.verifyBookOwner = this.verifyBookOwner.bind(this);
  }

  componentDidMount() {
    this.verifyBookOwner();

    const bookId = this.props.match.params.id;
    this.props.dispatch(actions.fetchBookById(bookId));
  }

  updateBook(bookData) {
    const { book: {_id}, dispatch } = this.props;
    dispatch(actions.updateBook(_id, bookData));
  }

  resetBookErrors() {
    this.props.dispatch(actions.resetUpdateBookErrors());
  }

  verifyBookOwner() {
    const bookId = this.props.match.params.id;
    this.setState({ isFatching: true});

    return actions.varifyBookOwner(bookId).then(
      () => {
        this.setState({isAllowed: true, isFatching: false})
      },
      () => {
        this.setState({isAllowed: false, isFatching: false})
      });
  }

  render() {
    const { book, errors } = this.props;
    const {isAllowed, isFatching} = this.state;

    if (book._id) {
      return (
         <UserGuard isAllowed={isAllowed} isFatching={isFatching}>
          <div id="book-detail-page">
            <div className="mb-3">
              <div className="row no-gutters">
                <div className="col-md-4">

                  <EditableImage
                    entity={book}
                    entityField={'image_url'}
                    errors={errors}
                    updateEntity={this.updateBook} ></EditableImage>
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
          </div>
        </UserGuard>
      )
    } else {
      return <h1>LOADING...</h1>
    }
  }
}

function mapStateToProps(state) {
  return {
    book: state.book.data,
    errors: state.book.errors
  }
}

export default connect(mapStateToProps)(BookUpdate);
