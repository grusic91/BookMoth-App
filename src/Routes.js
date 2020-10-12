import React from 'react';
import { Switch, Route } from 'react-router-dom';

// COMPONENTS:
import Homepage from "components/pages/Homepage";
import Register from "components/pages/Register";
import Login from "components/pages/Login";
import BookListingPage from "components/pages/BookListingPage";
import BookCreate from "components/books-containers/book-create/BookCreate";
import BookManage from "components/books-containers/manage/BookManage";
import BookSearchListing from "components/books-containers/BookSearchListing";
import BookDetail from "components/books-containers/book-detail/BookDetail";
import BookUpdate from "components/books-containers/book-detail/BookUpdate";
import EmailConfirmation from "components/auth/EmailConfirmation";
import { ProtectedRoute } from "components/shared/authRoutes/ProtectedRoute";
import { LoggedInRoute } from "components/shared/authRoutes/LoggedInRoute";

const Routes = () => <Switch>
    <Route exact path="/" component={Homepage} />
    <Route exact path="/books" component={BookListingPage}/>
    <ProtectedRoute exact path="/books/new" component={BookCreate}/>
    <ProtectedRoute exact path="/books/manage" component={BookManage} />
    <ProtectedRoute exact path="/books/:title/books" component={BookSearchListing}/>
    <Route exact path="/books/:id" component={BookDetail}/>
    <ProtectedRoute exact path="/books/:id/edit" component={BookUpdate}/>
    <LoggedInRoute exact path="/register" component={Register} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/confirm/:id" component={EmailConfirmation} />
</Switch>

export default Routes;
