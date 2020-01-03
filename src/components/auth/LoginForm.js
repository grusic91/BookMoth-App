import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { InputField } from '../shared/form/InputField';
import { required, minLength4, email} from '../shared/form/validators';
import { ResErrors} from '../shared/form/ResErrors';


const LoginForm = props => {
  const { handleSubmit, pristine, submitting, submitCb, valid, errors } = props;

  const renderError = (errors) => {
    if (errors !== [] && 'error' in errors) {
      return <ResErrors errors={errors} />
    }
    if ('errors' in errors) {
      return <ResErrors errors={errors} />
    }
  }

  return (
    <form id="login-form" onSubmit={handleSubmit(submitCb)}>
      <Field
        className="form-control"
        name="email"
        component={InputField}
        label="Email"
        type="email"
        validate={[required, minLength4, email]}
      />
      <Field
        className="form-control"
        name="password"
        component={InputField}
        label="Password"
        type="password"
        valdiate={[required]}
      />
    <button className="form-success btn btn-success fomr-control"
          type="submit"
          disabled={!valid || pristine || submitting}>
        Login
      </button>
      {
       renderError(errors)
      }
    </form>
  )
}

export default reduxForm({
  form: 'loginForm', // a unique identifier for this form

})(LoginForm);
