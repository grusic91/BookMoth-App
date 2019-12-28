import React from "react";
import { Switch, Route, withRouter} from "react-router-dom";

//import components
import Homepage from "components/Homepage";
import BookListing from "components/books-containers/books-page/BookListing";
import BookCreate from "components/books-containers/book-create/BookCreate";
import BookManage from "components/books-containers/manage/BookManage";
import BookSearchListing from "components/books-containers/BookSearchListing";
import BookDetail from "components/books-containers/book-detail/BookDetail";
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
        backgroundAttachment: 'fixed',
        zIndex: -1
      }}
      >
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/books" component={BookListing}/>
        <ProtectedRoute exact path="/books/new" component={BookCreate}/>
        <ProtectedRoute exact path="/books/manage" component={BookManage} />
        <ProtectedRoute exact path="/books/:title/books" component={BookSearchListing}/>
        <ProtectedRoute exact path="/books/:id" component={BookDetail}/>
        <LoggedInRoute exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </div>
  )
}


export default withRouter(Main);
