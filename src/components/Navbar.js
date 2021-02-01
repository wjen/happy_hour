import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

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
          <Link to="/" className="navbar-brand">
            <i className="fas fa-cocktail"></i>Happy Hour
          </Link>
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
                <Link to="/about" className="nav-link">
                  About
                </Link>
              </li>
              {showAdminBoard && (
                <>
                  <li className="nav-item">
                    <Link to="/admin/users" className="nav-link">
                      Admin-Dashboard
                    </Link>
                  </li>
                </>
              )}
              {user ? (
                <>
                  <li className="nav-item">
                    <Link to="/profile" className="nav-link">
                      Profile
                    </Link>
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
                    <Link to="/register" className="nav-link">
                      Register
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/login" className="nav-link" href="#">
                      Login
                    </Link>
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
