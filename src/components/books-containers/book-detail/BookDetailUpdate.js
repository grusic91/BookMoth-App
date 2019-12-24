import React, { Component } from "react";
import { connect } from "react-redux";
import {EditableInput} from "components/shared/editable/EditableInput";


class BookDetailUpdate extends Component {
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
              <EditableInput entity={book}  entityField={'title'} className={'book-title'}/>
              <EditableInput entity={book} entityField={'author'} className={'book-author'}/>
              <EditableInput entity={book} entityField={'category'} className={'book-category'}/>
              <EditableInput entity={book} entityField={'edition'} className={'book-text'}/>
              <EditableInput entity={book} entityField={'publisher'} className={'card-text'}/>
              <EditableInput entity={book} entityField={'language'} className={'card-text'}/>
              <EditableInput entity={book} type={'number'} entityField={'pages'} className={'card-text'}/>
              <EditableInput entity={book} entityField={'isbn'} className={'card-text'}/>
              <hr/>
              <EditableInput entity={book} type={'textarea'} entityField={'description'} className={"book-description"}/>
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
