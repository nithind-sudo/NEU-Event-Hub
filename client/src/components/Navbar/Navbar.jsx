import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Navbar/Navbar.css";

const Navbar = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-xl navbar-dark fixed-top bg-dark">
        <div className="container-fluid">
          <div className="navbar-brand">Northeastern's Events Hub</div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ffffff">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav me-auto ms-auto mb-2 mb-md-0">
              <li className="nav-item">
                <Link
                  to="/"
                  className="n-item mx-xs-0 mx-sm-0 mx-md-0 mx-lg-0 mx-xl-3">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/allEvents"
                  className="n-item mx-xs-0 mx-sm-0 mx-md-0 mx-lg-0 mx-xl-3">
                  All Events
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/category"
                  className="n-item mx-xs-0 mx-sm-0 mx-md-0 mx-lg-0 mx-xl-3">
                  Categories
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/createEvent"
                  className="n-item mx-xs-0 mx-sm-0 mx-md-0 mx-lg-0 mx-xl-3">
                  Create an Event
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/login"
                  className="n-item mx-xs-0 mx-sm-0 mx-md-0 mx-lg-0 mx-xl-3">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/signup"
                  className="n-item mx-xs-0 mx-sm-0 mx-md-0 mx-lg-0 mx-xl-3">
                  Signup
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/contact"
                  className="n-item mx-xs-0 mx-sm-0 mx-md-0 mx-lg-0 mx-xl-3">
                  Contact
                </Link>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control shadow-none me-2"
                type="search"
                placeholder="Check Events"
                aria-label="Check Events"
              />
              <button className="btn btn-events-hub text-light" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
      <br />
      <br />
    </header>
  );
};

export default Navbar;
