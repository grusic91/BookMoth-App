import React from "react";
import { Route, Redirect } from "react-router-dom";
import AuthService from "store/services/auth-service";

export function LoggedInRoute (props) {
  const { component: Component, ...rest } = props;
  return (
    <Route {...rest} render={
      (props) => AuthService.isAuthenticated()
        ? <Redirect to={{pathname: '/books'}}/>
        : <Component {...props} {...rest} />
      }
    />
  )
}
