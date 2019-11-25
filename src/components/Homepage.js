import React from "react";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div>
      <h1>Wooow, what a Moth</h1>
      <h4>New to BookMoth?</h4>
      <Link to="/register" className="btn btn-primary">
        SignUp Here
      </Link>
      HOMEPAGE!
    </div>
  )
}

export default Homepage;
