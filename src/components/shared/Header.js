import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import * as actions from "store/actions";

import SearchInput from "./form/SearchInput";

class Header extends Component {
  constructor() {
    super()

    this.logoutUser = this.logoutUser.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.hideSearch = this.hideSearch.bind(this);
  }

componentDidMount() {
  this.hideSearch()
}

/* Handling logout to redirect to homeapge*/
  handleLogout() {
    this.logoutUser();
    this.props.history.push('/');
  }

  logoutUser () {
    this.props.dispatch(actions.logout());
  }

/*Hide search if !isAuth*/
  hideSearch() {
    if(/*this.props.history.location.pathname === `/books` && */ this.props.auth.isAuth){
      return false;
    }
    return true;
  }

/*AUTH buttons rendering logic*/
  renderAuthButtons(isAuth) {

      if(isAuth) {
        return (
          <li className="nav-item">
            <p className="nav-link" onClick={this.handleLogout}>LOGOUT</p>
          </li>
        )
      }
    return (
      <React.Fragment>
        <li className="nav-item">
          <Link className="nav-link" to="/register">REGISTER</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">LOGIN</Link>
        </li>
      </React.Fragment>
    )
  }

  renderOwnerSection(isAuth) {

    if (isAuth) {
      return (
        <div className="dropdown">
          <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Owner Section
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a className="dropdown-item" href="#">Action</a>
            <Link className="nav-link dropdown-item" to="/books/new">Add Book</Link>
            <Link className="nav-link dropdown-item" to="#">Manage Books</Link>
          </div>
        </div>
      )
    }
  }

  render() {
    const {username, isAuth} = this.props.auth;
    return (
      <nav
        className="navbar navbar-expand-sm fixed-top"
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">BOOKMOTH</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse" id="navbarTogglerDemo02">

            <SearchInput hideSearch={this.hideSearch} />

            <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/books">Books</Link>
              </li>
              { isAuth &&
                  <a className="nav-link nav-item ml-auto">{this.props.auth.username}</a>
              }
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
