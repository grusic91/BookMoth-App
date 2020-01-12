import React from "react";
import { Link } from "react-router-dom";
// Photo by Sincerely Media on Unsplash
const Homepage = () => {
  return (
  <div className="homepage container-fluid">
    <div className="home-content">
      <h1 className="display-6">BookMoth App</h1>
      <small style={{color:"red", fontWeight: "bold"}}>...STILL DEVELOPING...</small>
      <p>Make your own data Book Collection.</p>
      <Link to="/books">
        <button type="button" className="btn btn-outline-dark btn-lg">
          Books are Here
        </button>
      </Link>
      <p className="homepage-text">
        <strong> BookMoth</strong> is <strong>Free Web Application</strong> page,
        where you can store data of your books and have list of them
        <strong> always at hand.</strong>
      </p>

    </div>
  </div>
  )
}

export default Homepage;
