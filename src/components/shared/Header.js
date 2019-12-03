import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import * as actions from "store/actions";

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
      if(this.props.history.location.pathname === `/books` && this.props.auth.isAuth){
        return false;
      }
      return true;
    }

/*AUTH buttons rendering logic*/
  renderAuthButtons() {
    const {isAuth} = this.props.auth;
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

  render() {
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
            <form className="form-inline my-2 my-lg-0"
              hidden={this.hideSearch()}
              >
              <input className="form-control mr-sm-2" type="search" placeholder="Search" />
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>

            <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/books">Books</Link>
              </li>
              { this.renderAuthButtons() }
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
