import React from "react";
import { Switch, Route, withRouter} from "react-router-dom";

//import components
import Homepage from "components/Homepage";
import BookListing from "./books-containers/BookListing";
import BookSearchListing from "./books-containers/BookSearchListing";
import BookDetail from "./books-containers/BookDetail";
import BookCreate from "./books-containers/BookCreate";
import Register from "components/auth/Register";
import Login from "components/auth/Login";

import { ProtectedRoute } from "components/shared/authRoutes/ProtectedRoute";
import { LoggedInRoute } from "components/shared/authRoutes/LoggedInRoute";

const Main = (props) => {
  return (
    <div
      id="main-page"
      className="component-container"
      style={{
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundImage: `url(${process.env.PUBLIC_URL} /img/homepage-background1.jpg)`,
        backgroundAttachment: 'fixed'
      }}
      >
      <Switch>
        <Route exact path="/" component={Homepage } />
        <Route exact path="/books" component={BookListing}/>
        <ProtectedRoute exact path="/books/new" component={BookCreate}/>
        <ProtectedRoute exact path="/books/:title/books" component={BookSearchListing}/>
        <ProtectedRoute exact path="/books/:id" component={BookDetail}/>
        <LoggedInRoute exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
      </Switch>

    </div>
  )
}


export default withRouter(Main);
