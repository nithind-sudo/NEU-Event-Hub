import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/Navbar/Navbar.css";
import { Container } from "react-bootstrap";
import brandIcon from "../../assets/images/BrandIcon.png";
import { EventManagementState } from "../../contexts/context";
import LogoutContext from "../../contexts/LogoutContext";
import { useContext } from "react";
import { fetchEvents, getAllEvents } from "../../apiClient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { NavHashLink } from "react-router-hash-link";

const Navbar = (props) => {
  const { state, dispatch } = EventManagementState();
  const handlelogout = useContext(LogoutContext); // Add this line
  let [events, setEvents] = useState([]);
  let [filteredEvents, setFilteredEvents] = useState([]);
  let [eventKey, setEventKey] = useState("");
  let navigate = useNavigate();
  const handleEventSearchKey = (e) => {
    let wantedEvents = [];
    if (
      e.target.value == "" ||
      e.target.value == null ||
      e.target.value == undefined
    ) {
      setFilteredEvents(allEventArray);
    } else {
      allEventArray
        .filter((data) => {
          return data.title
            .toLowerCase()
            .includes(e.target.value.toLowerCase());
        })
        .map((data) => {
          wantedEvents.push(data);
        });
      setFilteredEvents(wantedEvents);
    }
  };
  const handleSearch = () => {
    navigate("/searchEvents", { state: { filters: filteredEvents } });
  };
  const [allEventArray, setAllEventArray] = useState([]);
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getAllEvents();
        // console.log("Response for GET Event Array: ", response);
        if (response.data) {
          setAllEventArray(response.data);
          // console.log(allEventArray);
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchEvents();
  }, [allEventArray]);
  return (
    <header>
      <nav className="navbar navbar-expand-xl navbar-dark fixed-top bg-dark">
        <Container fluid>
          <Link to="/">
            <div className="navbar-brand">
              <img
                src={brandIcon}
                alt="Bootstrap"
                width="30"
                height="30"
                className="img img-circle"
              />
            </div>
          </Link>
          <Link to="/">
            <div className="navbar-brand">
              <div className="h5 mb-0">NEU - Events Hub</div>
            </div>
          </Link>

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
            <form>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control shadow-none"
                  placeholder="Search Events"
                  aria-label="searchEvents"
                  aria-describedby="basic-addon1"
                  onChange={handleEventSearchKey}
                />
                <span
                  className="input-group-text"
                  id="basic-addon1"
                  onClick={handleSearch}>
                  {" "}
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </span>
              </div>
            </form>
            <ul className="navbar-nav me-auto ms-auto mb-2 mb-md-0">
              <li className="nav-item nav-item-width-set">
                <Link
                  to="/main"
                  className="n-item mx-xs-0 mx-sm-0 mx-md-0 mx-lg-0 mx-xl-3">
                  <span>Home</span>
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
                <NavHashLink
                  to="/#category"
                  className="n-item mx-xs-0 mx-sm-0 mx-md-0 mx-lg-0 mx-xl-3">
                  Categories
                </NavHashLink>
              </li>
              {state.role === "admin" && (
                <li className="nav-item">
                  <Link
                    to="/createEvent"
                    className="n-item mx-xs-0 mx-sm-0 mx-md-0 mx-lg-0 mx-xl-3">
                    Create an Event
                  </Link>
                </li>
              )}
            </ul>

            <div className="flex-shrink-0 dropdown">
              <Link
                to="#"
                className="d-block link-dark text-decoration-none dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false">
                <span className="text-light">
                  Welcome back, {state.first_name}{" "}
                </span>
                <img
                  src="https://media.istockphoto.com/id/1206439390/photo/silhouette-of-profile-guy-in-shirt-with-white-button-in-aqua-menthe-circle-on-black.jpg?s=170667a&w=0&k=20&c=xIcUug38E_KlqT3HjxDYSQE7ZlMyV0y0vKmkXmr016U="
                  alt="mdo"
                  width="30"
                  height="30"
                  className="rounded-circle"
                />
              </Link>
              <ul className="dropdown-menu text-small shadow dropdown-menu-end">
                <li>
                  <Link className="dropdown-item" to="/account">
                    My Account
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/registeredEvents">
                    Upcoming Events
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/attendedEvents">
                    Attended Events
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <div
                    className="text-center makePointerCursor"
                    onClick={() => handlelogout()}>
                    <div className="text-danger">Logout</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </nav>
      <br />
      <br />
    </header>
  );
};

export default Navbar;
