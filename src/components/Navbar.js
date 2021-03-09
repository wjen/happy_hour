import React, { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../context/auth.context';

function Navbar() {
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const { logOut, user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      setShowAdminBoard(user.roles.includes('ROLE_ADMIN'));
    }
  }, [user]);

  const logOutHandler = () => {
    logOut();
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <NavLink to="/" className="navbar-brand">
            <i className="fas fa-cocktail"></i>Happy Hour
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink to="/about" className="nav-link" activeClassName="active">
                  About
                </NavLink>
              </li>
              {showAdminBoard && (
                <>
                  <li className="nav-item">
                    <NavLink to="/admin/users" className="nav-link" activeClassName="active">
                      Admin-Dashboard
                    </NavLink>
                  </li>
                </>
              )}
              {user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/profile" className="nav-link" activeClassName="active">
                      Profile
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <a
                      href="/login"
                      className="nav-link"
                      onClick={logOutHandler}
                    >
                      Logout
                    </a>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link" activeClassName="active">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link"  activeClassName="active">
                      Login
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
