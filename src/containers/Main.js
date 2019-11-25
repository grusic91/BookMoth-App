import React from "react";
import { Switch, Route, withRouter} from "react-router-dom";
import { connect } from "react-redux";

//import components
import Homepage from "../components/Homepage";
import BookList from "./books-containers/BookList";
import BookDetail from "./books-containers/BookDetail";
import Register from "../components/auth/Register";
//import RegisterForm from "../components/register/RegisterForm";

const Main = () => {
  return (
    <div className="container-fluid">
      <Switch>
        <Route exact path="/" render={props => <Homepage {...props} />}/>
        <Route exact path="/books" component={BookList}/>
        <Route exact path="/book/:id" component={BookDetail}/>
        <Route exact path="/register" component={Register} />
      </Switch>

    </div>
  )
}
function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}

export default withRouter(connect(mapStateToProps, null)(Main));
