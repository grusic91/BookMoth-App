import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { InputField } from 'components/shared/form/InputField';
import { ResErrors} from 'components/shared/form/ResErrors';

const RegisterForm = props => {
  const { handleSubmit, pristine, submitting, submitCb, valid, errors } = props;

  return (
    <form id="register-form" onSubmit={handleSubmit(submitCb)}>
      <Field
        className="form-control"
        name="username"
        component={InputField}
        label="Username"
        type="text"
      />
      <Field
        className="form-control"
        name="email"
        component={InputField}
        label="Email"
        type="email"
      />
      <Field
        className="form-control"
        name="password"
        component={InputField}
        label="Password"
        type="password"
      />
      <Field
        className="form-control"
        name="passwordConfirmation"
        component={InputField}
        label="Confirm Password"
        type="password"
      />
      <Field
        className="form-control"
        name="profileImageUrl"
        component={InputField}
        label="Image URL"
        type="text"
      />
    <button className="form-success btn btn-success fomr-control"
          type="submit"
          disabled={!valid || pristine || submitting}>
        Register
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

  if (values.username && values.username.length < 4) {
    errors.username = "Username min length is 4 characters!";
  }

  if (!values.username) {
    errors.username = "Please enter username";
  }

  if (!values.email) {
    errors.email = "Please enter email!";
  }

  if (!values.passwordConfirmation) {
    errors.passwordConfirmation = "Please enter password confirmation!";
  }

  if (values.password !== values.passwordConfirmation) {
    errors.password = "Password is not the same as password confirmation!";
  }

  return errors
}

export default reduxForm({
  form: 'simple', // a unique identifier for this form
  validate
})(RegisterForm)
