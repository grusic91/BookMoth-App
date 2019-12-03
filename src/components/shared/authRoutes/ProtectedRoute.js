import React from "react";
import { Route, Redirect } from "react-router-dom";
import AuthService from "store/services/auth-service";

export function ProtectedRoute(props) {
  const { component: Component, ...rest } = props;
  return (
    <Route {...rest} render={
      (props) => AuthService.isAuthenticated()
        ? <Component {...props} {...rest} />
        : <Redirect to={{pathname: '/login'}}/>
      }
    />
  )
}
