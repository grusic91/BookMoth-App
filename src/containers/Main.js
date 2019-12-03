import React from "react";
import { Switch, Route, withRouter} from "react-router-dom";

//import components
import Homepage from "components/Homepage";
import BookList from "./books-containers/BookList";
import BookDetail from "./books-containers/BookDetail";
import Register from "components/auth/Register";
import Login from "components/auth/Login";

import { ProtectedRoute } from "components/shared/authRoutes/ProtectedRoute";
import { LoggedInRoute } from "components/shared/authRoutes/LoggedInRoute";

const Main = (props) => {

  return (
    <div className="main">
      <Switch>
        <Route exact path="/" component={Homepage } />
        <Route exact path="/books" component={BookList}/>
        <ProtectedRoute exact path="/book/:id" component={BookDetail}/>
        <LoggedInRoute exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
      </Switch>

    </div>
  )
}


export default withRouter(Main);
