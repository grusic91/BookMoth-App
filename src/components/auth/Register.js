import React from "react";
import RegisterForm from "./RegisterForm";
import * as actions from "store/actions";
import { Redirect } from "react-router-dom";

class Register extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      errors: {},
      redirect: false,
      sendingEmail: false,
      isConfirmed: false
    }
    this.registerUser = this.registerUser.bind(this);
  }


// on submit registration form
  registerUser(userData) {
    // fire fregistration function which start sending email to the user
    this.setState({ sendingEmail: true});
    actions.RegisterAndVerification(userData)
      .then(
        (res) => {

          if (res.data.msg === 'sended') {
            // Mail is send successfully, time to update the stato
            // message the user to get the feedback that he has verification mail in inbox
            this.setState({ sendingEmail: false })
            //console.log(res.data);
            alert("Check your email inbox to confirm registration!");
          } else if (res.data.msg === "already confirmed") {
            this.setState({
                errors: "This username/email is already taken and confirmed!!!",
                sendingEmail: false
              })
          }
          else if (res.data.msg === 'fail'){
            alert("Oops, something went wrong. Try again")
          } else {
            this.setState({sendingEmail: false})
          }
        },
        (errors) => {
          this.setState({errors})
        }
      )
  }

  render () {
    const { errors, redirect, sendingEmail } = this.state;
      if(redirect) {
      return <Redirect to={{pathname: '/login', state: { successRegister: true }}} />
    }

    return(
      <div id="register-page" className="container">
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-lg-8">
            <div className="row form-box">
              <div className="col-md-6">
                <div className="form-title">Registration Form - Sign up</div>

                {
                  sendingEmail && <h1>SENDING VERIFICATION EMAIL!</h1>

                }
                {
                  !sendingEmail && <RegisterForm submitCb={this.registerUser} errors={errors} />
                }

              </div>
              <div
                className="form-img col-md-6"
                style={{
                     backgroundPosition: 'center',
                     backgroundSize: 'cover',
                     backgroundImage: `url(${process.env.PUBLIC_URL} /img/book-shelve.jpg)`
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
