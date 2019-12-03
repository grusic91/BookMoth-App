import React from "react";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div className="homepage"
      style={{
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundImage: `url(${process.env.PUBLIC_URL} /img/book-shelve.jpg)`

      }}>

        <div className="home-content">
          <h1>Wooow, what a Moth</h1>
          <h4>New to BookMoth?</h4>
          <Link to="/register" className="btn btn-primary">
            SignUp Here
          </Link>
          HOMEPAGE!
        </div>



    </div>
  )
}

export default Homepage;
