import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="not-found">
      <p className="big-404 mb-2">404</p>
      <h3>Sorry, page not found!</h3>
      <Link to="/dashboard">
        Go back to Home page
      </Link>
    </div>
  )
}

export default NotFound
