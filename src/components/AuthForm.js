import React, { Component } from "react";
import { Field, reduxForm } from 'redux-form'

class AuthForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      profileImageUrl: ""
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render () {
    const {email, username, password, profileImageUrl} = this.state;
    const {heading, buttonText, signUp} = this.props;
    return(
      <div>

        <div className="row justify-content-md-center text-center">
          <div className="col-md-6">
            <form onSubmit={this.handleSubmit}>
              <h2>{heading}</h2>
              <label htmlFor="email">Email:</label>
              <Field
                className="form-control"
                id="email"
                name="email"
                onChange={this.handleChange}
                value={email}
                type="text"
              />
              <label htmlFor="password">Password:</label>
              <Field
                className="form-control"
                id="password"
                name="password"
                onChange={this.handleChange}
                type="password"
              />
              { signUp && (
                <div>
                <label htmlFor="passwordconfirmation">Confirm Password:</label>
                <Field
                  className="form-control"
                  id="passwordconfirmation"
                  name="passwordconfirmation"
                  onChange={this.handleChange}
                  type="password"
                />
                <label htmlFor="username">Username:</label>
                <Field
                  className="form-control"
                  id="username"
                  name="username"
                  onChange={this.handleChange}
                  value={username}
                  type="text"
                />
                <label htmlFor="image-url">Image URL:</label>
                <Field
                  className="form-control"
                  id="image-url"
                  name="profileImageUrl"
                  onChange={this.handleChange}
                  value={profileImageUrl}
                  type="text"
                />
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default reduxForm({
  from: 'authForm'
})(AuthForm);
