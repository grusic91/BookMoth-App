import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";

class Header extends Component {

  render() {
    console.log(this.props);
    return (
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">BOOKMOTH</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <form className="form-inline my-2 my-lg-0">
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
              <li className="nav-item">
                <Link className="nav-link" to="/register">REGISTER</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">LOGIN</Link>
              </li>
              <li className="nav-item">
                <p className="nav-link" onClick={this.props.logoutUser}>LOGOUT</p>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  };
}

export default connect(mapStateToProps, null)(Header);
