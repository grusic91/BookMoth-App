import React from 'react';
import { Redirect } from 'react-router-dom';

export class UserGuard extends React.Component {


  render() {
    const { isFatching, isAllowed } = this.props;

    if(isAllowed && !isFatching) {
      return this.props.children;
    } else if (!isAllowed && !isFatching) {
      return <Redirect to={{pathname: '/books'}} />
    } else {
      return <h1> LOADING.... </h1>
    }
  }
}
