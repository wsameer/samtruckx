import React from 'react'
import { AuthContext } from '../../context/AuthContext';

function Navbar() {
  const { state, dispatch } = React.useContext(AuthContext);
  const { email } = state;

  const logoutFunction = () => {
    dispatch({
      type: "LOGOUT"
    });
  }

  return (
    <nav className="navbar navbar-light bg-light">
      <p className="navbar-brand">Sam-TruckX</p>
      <div className="form-inline">
        <span className="pr-3">Hello {email}</span>
        <button
          className="btn btn-outline-danger my-2 my-sm-0"
          type="button"
          onClick={logoutFunction}>
          Logout
        </button>
      </div>
    </nav>
  )
}

export default Navbar
