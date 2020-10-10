import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import * as actions from "store/actions";

import SearchInput from "./form/SearchInput";

class Header extends Component {
  constructor() {
    super();
    this.logoutUser = this.logoutUser.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.hideSearch = this.hideSearch.bind(this);
  }

  componentDidMount() {
    this.hideSearch();
  }

  handleLogout() {
    /* logout user, redirect to homeapge */
    this.logoutUser();
    this.props.history.push('/');
  }

  logoutUser () {
    this.props.dispatch(actions.logout());
  }

  hideSearch() {
    /*Hide search input if !isAuth*/
    if(this.props.auth.isAuth){
      return false;
    }
    return true;
  }

/*AUTH buttons rendering logic*/
  renderAuthButtons(isAuth) {
    if(!isAuth) {
      return (
        <React.Fragment>
          <li className="nav-item">
            <Link className="nav-link auth-btn" to="/register">register</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link auth-btn" to="/login">login</Link>
          </li>
        </React.Fragment>
      )
    }
  }

  renderOwnerSection(isAuth) {
    if (isAuth) {
      return (
        <li className="nav-item dropdown show">
          <Link
            className="naw-item nav-link dropdown-toggle"
            to="#" id="users-features"
            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            USER: {this.props.auth.username}
          </Link>
          <div className="dropdown-menu dropdown-menu-right" aria-labelledby="users-features">
            <Link className="dropdown-item" to="#" onClick={this.handleLogout}>LOGOUT</Link>
            <Link className="dropdown-item" to="/books/new">Add Book</Link>
            <Link className="dropdown-item" to="/books/manage">Manage Books</Link>
          </div>
        </li>
      )
    }
  }
  // RENDER COMPONENT
  render() {
    const {isAuth} = this.props.auth;

    return (
      <nav id="header" className="navbar navbar-expand-md sticky-top navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <small>BOOK</small><strong>M<small>OTH</small></strong>
          </Link>
          <button
            className="navbar-toggler "
            type="button"
            data-toggle="collapse"
            data-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <SearchInput hideSearch={this.hideSearch} />
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/">Home</Link> {/* in future add active class to links*/}
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/books">Books</Link>
              </li>
              { this.renderOwnerSection(isAuth)}
              { this.renderAuthButtons(isAuth) }
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default withRouter(connect(mapStateToProps, null)(Header));
