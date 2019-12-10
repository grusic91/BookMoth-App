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
    const { successRegister } = this.props.location.state || false; // get this on props when registration is successful

    if(isAuth) {
      return <Redirect to={{pathname: '/books'}} />
    }

    return(
      <div className="login-page">
        { successRegister &&
            <div className="alert alert-success">
                <p>You have been successfuly registerd, please login now.</p>
            </div>
        }
        <LoginForm submitCb={this.loginUser} errors={errors} />
          <div className="registerImage">
            <img
              width="200px" src={process.env.PUBLIC_URL + '/img/login-image.jpg'}
              alt="Photo_by_hannah_grace_on_Unsplash" />
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
