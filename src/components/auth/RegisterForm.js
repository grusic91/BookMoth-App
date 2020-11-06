import React from 'react';
import { useForm } from 'react-hook-form';
import { sameAs } from 'helpers/validators';
import FormError from './FormError';
// eslint-disable-next-line
const EMAIL_VALIDATION = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const RegisterForm = ({onSubmit}) => {
  const { register, handleSubmit, errors, getValues } = useForm();

  return <form id="register-form" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="username">Username</label>
        <input
            className="form-control"
            name="username"
            label="Username"
            type="text"
            ref={register({
              required: 'Username is required!', 
              minLength: {value: 4, message: 'Username is too short. Min 4 characters required!'}})}
        />
        <FormError errors={errors} name="username">{ (message) => <p>{message}</p>}</FormError>
      <label htmlFor="email">Email:</label>
      <input
        className="form-control"
        name="email"
        label="Email"
        type="email"
        ref={register({
          required: 'Email is Required!', 
          pattern: {value: EMAIL_VALIDATION, message: 'Not valid email format!'}})}
      />
      <FormError errors={errors} name="email">{ (message) => <p>{message}</p>}</FormError>       
      <label htmlFor="password">Password</label>
      <input
        className="form-control"
        name="password"
        label="Password"
        type="password"
        ref={register({
          required: 'Password is Required!', 
          minLength: {value: 8, message: 'Min length of password is 8 characters!'}})}
      />
      <FormError errors={errors} name="password">{ (message) => <p>{message}</p>}</FormError>
      <label htmlFor="passwordConfirmation">Confirm Password</label>
      <input
        className="form-control"
        name="passwordConfirmation"
        label="Confirm Password"
        type="password"
        ref={register({required: true, minLength:8, validate: {sameAs: sameAs('password', getValues)}})}
      />
      {   errors.passwordConfirmation && <div className="alert alert-danger">
            {   errors.passwordConfirmation.type === 'required' && <span> Password is Required! </span> }
            {   errors.passwordConfirmation.type === 'minLength' && <span>Min length of password is 8 characters!</span>}
            {   errors.passwordConfirmation.type === 'sameAs' && <span>Password confirmation not matches password!</span>}
            </div>
        }
      <label htmlFor="profileImageUrl">Image URL:</label>
      <input
        className="form-control"
        name="profileImageUrl"
        label="Image URL"
        type="text"
        ref={register}
      />
    <button className="form-success btn btn-success fomr-control" type="submit">Register</button>
      { /*Displaying errors from response*/
        /* Object.entries(errors).length !== 0 &&
        <ResErrors errors={errors} /> */
      }
    </form>
}
export default RegisterForm;
