import React from "react";
import LoginForm from "../auth/LoginForm";

function Login (props) {
  
  const loginUser = (formData) => {
    alert(JSON.stringify(formData));
    //this.props.dispatch(actions.login(formData));
  }

    return <div className="container" id="login-page">
        {/*  successRegister &&
            <div id="success-alert" className="alert alert-success">
                <p>You have been successfuly registerd, please login now.</p>
            </div> */
        }
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <div className="row form-box">
              <div className="col-md-6">
                <div className="form-title">Login Form - Sign in</div>
                <LoginForm onSubmit={loginUser} />
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
}

export default Login;
