import React from "react";
import RegisterForm from "./RegisterForm";
import * as actions from "store/actions";
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
      <div id="register-page" className="container">
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <div className="row form-box">
              <div className="col-md-6">
                <div className="form-title">Registration Form - Sign up</div>
                <RegisterForm submitCb={this.registerUser} errors={errors} />
              </div>
              <div
                className="form-img col-md-6"
                style={{
                     backgroundPosition: 'center',
                     backgroundSize: 'cover',
                     backgroundImage: `url(${process.env.PUBLIC_URL} /img/book-shelve.jpg`
                     }}
               >
               <div className="form-img-text">
                 <p>You are just few steps away to start using this amazing app!</p>
               </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Register;
