import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Navbar/Navbar.css";
import { Container } from "react-bootstrap";
import brandIcon from "../../assets/images/BrandIcon.png";
import { EventManagementState } from "../../contexts/context";

const Navbar = ({ handlelogout }) => {
  const { state, dispatch } = EventManagementState();

  return (
    <header>
      <nav className="navbar navbar-expand-xl navbar-dark fixed-top bg-dark">
        <Container fluid>
          <Link to="/">
            <div className="navbar-brand">
              <img
                src={brandIcon}
                alt="Bootstrap"
                width="40"
                height="40"
                className="img img-circle"
              />
            </div>
          </Link>
          <Link to="/">
            <div className="navbar-brand">NEU - Events Hub</div>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ffffff"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>

          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav me-auto ms-auto mb-2 mb-md-0">
              <li className="nav-item">
                <Link
                  to="/main"
                  className="n-item mx-xs-0 mx-sm-0 mx-md-0 mx-lg-0 mx-xl-3"
                >
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  to="/allEvents"
                  className="n-item mx-xs-0 mx-sm-0 mx-md-0 mx-lg-0 mx-xl-3"
                >
                  All Events
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  to="/category"
                  className="n-item mx-xs-0 mx-sm-0 mx-md-0 mx-lg-0 mx-xl-3"
                >
                  Categories
                </Link>
              </li>
              {state.role === "admin" && (
                <li className="nav-item">
                  <Link
                    to="/createEvent"
                    className="n-item mx-xs-0 mx-sm-0 mx-md-0 mx-lg-0 mx-xl-3"
                  >
                    Create an Event
                  </Link>
                </li>
              )}

              <li className="nav-item">
                <Link
                  to="/account"
                  className="n-item mx-xs-0 mx-sm-0 mx-md-0 mx-lg-0 mx-xl-3"
                >
                  My Account
                </Link>
              </li>
            </ul>

            <form className="d-flex me-5" role="search">
              <input
                className="form-control shadow-none me-2"
                type="search"
                placeholder="Search Events"
                aria-label="Check Events"
              />
            </form>

            {(
              <button
                className="btn btn-events-hub text-light ms-xs-0 ms-sm-0 ms-md-5 ms-lg-5 ms-xl-5"
                onClick={handlelogout}
                type="submit"
              >
                Logout
              </button>
            )}
          </div>
        </Container>
      </nav>
      <br />
      <br />
    </header>
  );
};

export default Navbar;
