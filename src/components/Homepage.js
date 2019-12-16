import React from "react";
import { Link } from "react-router-dom";
// Photo by Sincerely Media on Unsplash
const Homepage = () => {
  return (
    <div className="homepage">
        <div className="home-content">
          <h1>Wooow, what a Moth...</h1>
          <div>
            <h4>New to BookMoth page?</h4>
            <Link to="/register">
              <button type="button"  className="btn btn-outline-secondary">
                Registration page
              </button>
            </Link>
          </div>
          <div id="homepage-description">
            <p>
              Everyone has at home a lot of books.
              <strong> BookMoth</strong> is <strong>Free Web Application</strong> page, where you can store data of your books at home.
              It is like database for your home phisical Library! Whit using of this page you <strong>keep track
              of your books.</strong>
            </p>

          </div>

        </div>
    </div>
  )
}

export default Homepage;
