import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { InputField } from 'components/shared/form/InputField';
import { BookSelectCategory } from 'components/shared/form/BookSelectCategory';
import { BookTextArea } from 'components/shared/form/BookTextArea';
import { BookFileUpload } from 'components/shared/form/BookFileUpload';
import { ResErrors} from 'components/shared/form/ResErrors';

const BookCreateForm = props => {
  const { handleSubmit, pristine, submitting, submitCb, valid, errors, options } = props;

  return (
    <form onSubmit={handleSubmit(submitCb)}>
      <Field
        className="form-control"
        name="title"
        component={InputField}
        label="Title"
        type="text"
      />
      <Field
        className="form-control"
        name="author"
        component={InputField}
        label="Author"
        type="text"
      />
      <Field
        className="form-control"
        name="languege"
        component={InputField}
        label="Language"
        type="text"
      />
      <Field
        className="form-control"
        name="publisher"
        component={InputField}
        label="Publisher"
        type="text"
      />
      <Field
        options={options}
        className="form-control"
        name="category"
        component={BookSelectCategory}
        label="Category"
      />
      <Field
        options={options}
        className="form-control"
        name="pages"
        type="number"
        component={InputField}
        label="Pages"
      />
      <Field
        className="form-control textarea"
        name="description"
        rows="6"
        component={BookTextArea}
        label="Description"
        type="text"
      />
      <Field
        name="bookImgUrl"
        component={BookFileUpload}
        label="Image URL"
      />
    
      <Field
        name="readed"
        component={InputField}
        label="Readed"
        type="checkbox"
      />

      <button className="btn btn-success fomr-control"
          type="submit"
          disabled={!valid || pristine || submitting}>
        Submit
      </button>
      { /*Displaying errors from response*/
        <ResErrors errors={errors} />
      }
    </form>
  )
}

/* Syncornious Validation*/
const validate = values => {
  const errors = {}

  if (!values.title) {
    errors.title = "Please enter title";
  }

  if (!values.author) {
    errors.author = "Please enter author!";
  }
  if (!values.category) {
    errors.category = "Please enter category!";
  }

  if (!values.description) {
    errors.description = "Please enter description!";
  }
  if (!values.bookImgUrl) {
    errors.bookImgUrl = "Please enter bookImgUrl!";
  }
  return errors
}

export default reduxForm({
  form: 'bookCreateForm', // a unique identifier for this form
  validate,
  initialValues: { shared: false}
})(BookCreateForm)
