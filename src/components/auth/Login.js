import React from "react";
import LoginForm from "./LoginForm";
import * as actions from "store/actions";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

class Login extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      errors: ""
    }
    this.loginUser = this.loginUser.bind(this);
  }

  loginUser (userData) {
    this.props.dispatch(actions.login(userData));
  }

  render () {
    const { isAuth, errors } = this.props.auth;
    const { successRegister } = this.props.location.state || false;

    if(isAuth) {
      return <Redirect to={{pathname: '/books'}} />
    }

    return(
      <div className="container" id="login-page">
        { successRegister &&
            <div id="success-alert" className="alert alert-success">
                <p>You have been successfuly registerd, please login now.</p>
            </div>
        }
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <div className="row form-box">
              <div className="col-md-6">
                <div className="form-title">Login Form - Sign in</div>
                <LoginForm submitCb={this.loginUser} errors={errors} />
              </div>
              <div
                className="form-img col-md-6"
                style={{
                     backgroundPosition: 'center',
                     backgroundSize: 'cover',
                     backgroundImage: `url(${process.env.PUBLIC_URL} /img/create-book.jpg)`
                     }}
              >
                <div className="form-img-text">
                  <p>Welcome back, let's log in and discover your shelve!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToPorps(state) {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToPorps)(Login);
