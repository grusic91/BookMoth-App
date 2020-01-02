import React from "react";
import { Link } from "react-router-dom";
// Photo by Sincerely Media on Unsplash
const Homepage = () => {
  return (
  <div className="homepage container-fluid">
    <div className="home-content row jumbotron">
      <div className="col-xs-12 col-sm-12 col-md-9 col-lg-9 col-xl-10">
        <h1 className="display-6">New to BookMoth page?</h1>
        <p className="lead">Register now and start making your own Library.</p>
      </div>
      <div className="col-xs-12 col-sm-12 col-md-9 col-lg-9 col-xl-10">
        <Link to="/register">
          <button type="button"  className="btn btn-outline-secondary btn-lg">
            Registration page
          </button>
        </Link>
      </div>
      <div className="container-fluid">
        <div className="text-left">
          <hr className="my-4"/>
          <div className="col-12">
            <p className="homepage-text">
              Everyone has at home a lot of books.
              <strong> BookMoth</strong> is <strong>Free Web Application</strong> page,
              where you can store data of your books at home. It is like database for your home phisical
              Library! By using this application you will have a list of your books
              <strong> always in your hand!</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Homepage;
