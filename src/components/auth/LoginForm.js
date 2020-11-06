import React from 'react';
import { useForm } from 'react-hook-form';
import FormError from './FormError';
// eslint-disable-next-line
const EMAIL_VALIDATION = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const LoginForm = ({onSubmit}) => { 
    const { register, handleSubmit, errors } = useForm();
    
    return <form id="login-form" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">Email:</label>
        <input
            className="form-control"
            name="email"             
            label="Email"
            type="email"
            ref={register({
                required: 'Email is required!', 
                pattern: {value: EMAIL_VALIDATION, message: 'Invalid email pattern!'}})}
        />
        <FormError errors={errors} name="email">{ (message) => <p>{message}</p> }</FormError>
        <label htmlFor="password">Password:</label>
        <input
            className="form-control"
            name="password"      
            type="password"
            ref={register({
                required: "Password is required!", 
                minLength: {value: 8, message: 'Minimum length of password is 8 characters!'}})} 
        />
        <FormError errors={errors} name="password">{(message) => <p>{message}</p>}</FormError>        
        <button className="form-success btn btn-success fomr-control" type="submit">
            Login
        </button>
    </form>
}

export default LoginForm;
