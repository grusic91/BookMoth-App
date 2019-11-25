import React from "react";
import RegisterForm from "./RegisterForm";
import * as actions from "../../store/actions";
import { Redirect } from "react-router-dom";

class Register extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      errors: "",
      redirect: false
    }
    this.registerUser = this.registerUser.bind(this);
  }

  registerUser(userData) {
    actions.register(userData)
      .then(
        (registered) => {
          debugger
          // when registered successful redirect
          this.setState({redirect: true});
        },
        (errors) => {
          this.setState({errors})
        }
      )
  }

  render () {
    const { errors, redirect } = this.state;

    if(redirect) {
      return <Redirect to={{pathname: '/login', state: { successRegister: true }}} />
    }

    return(
      <div>
        <RegisterForm submitCb={this.registerUser} errors={errors} />
      </div>

    )
  }
}

export default Register;
