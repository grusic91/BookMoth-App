import React from "react";
import * as actions from "store/actions";
import { Redirect } from "react-router-dom";
/*
This component loaded when user clicked on
  the unique link sent to their email address!
*/
class EmailConfirmation extends React.Component {
  // addres is being confirmed on the User model on server
  state = {
    redirect: false
  }

  /*fire action to pull that check if user is confirmed and show the button
    to redirect user to <login /> component*/
  componentDidMount() {
    const { id } = this.props.match.params;
    // console.log(id);
    actions.checkedConfirmation(id)
      .then(
        (res) => {
          // console.log(res);
          this.setState({redirect: true});
        },
        (err) => {
          console.error(err)
        }
      )
  }

  render () {
    const {redirect} = this.state;

    if(redirect) {
    return <Redirect to={{pathname: '/login', state: { successRegister: true }}} />
  }

    return(
      <div style={{marginTop: "200px"}}>
        <h1>EmailConfirmation component</h1>
      </div>
    )
  }
}

export default EmailConfirmation;
