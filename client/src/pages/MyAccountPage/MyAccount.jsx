import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./MyAccount.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Layout/Footer";
import MyAccountCard from "../../components/ui/MyAccountCard";
import { Nav } from "react-bootstrap";
import MyTickets from "../MyTickets/MyTickets";
import Favorites from "../Favorites/Favorites";
import Profile from "../ProfilePage/Profile";
import { EventManagementState } from "../../contexts/context";
import ManageAccounts from "../ManageAccounts/ManageAccounts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faTicketAlt,
  faHeart,
  faCog,
  faUsersCog,
} from "@fortawesome/free-solid-svg-icons";

export default function MyAccount({ handlelogout }) {
  const [selectedNavItem, setSelectedNavItem] = useState("profile");
  const { state, dispatch } = EventManagementState();

  const handleNavItemSelect = (selectedKey) => {
    setSelectedNavItem(selectedKey);
  };

  const profileContent = <Profile />;
  const ticketsContent = <MyTickets />;
  const favoritesContent = <Favorites />;
  const manageAccount = <ManageAccounts />;

  let pageContent;
  console.log("selected Nav Item : ", selectedNavItem);
  switch (selectedNavItem) {
    case "profile":
      pageContent = profileContent;
      break;
    case "tickets":
      pageContent = ticketsContent;
      break;
    case "favorites":
      pageContent = favoritesContent;
      break;
    case "manageAccounts":
      pageContent = manageAccount;
      break;
    default:
      pageContent = null;
  }

  const navContent = (
    <Nav className="d-flex flex-column-nav" onSelect={handleNavItemSelect}>
      <Nav.Item>
        <Nav.Link eventKey="profile">
          {" "}
          <FontAwesomeIcon icon={faUser} /> Profile
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="tickets">
          {" "}
          <FontAwesomeIcon icon={faTicketAlt} /> My Tickets
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="favorites">
          <FontAwesomeIcon icon={faHeart} /> Favorites
        </Nav.Link>
      </Nav.Item>
      {state.role === "admin" && (
        <Nav.Item>
          <Nav.Link eventKey="manageAccounts">
            {" "}
            <FontAwesomeIcon icon={faUsersCog} /> Manage Accounts
          </Nav.Link>
        </Nav.Item>
      )}
    </Nav>
  );

  return (
    <div>
      <Navbar handlelogout={handlelogout} />
      <div className="myAccount-page">
        <Container fluid>
          <div className="container">
            <div className="card" style="width: 18rem;">
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <a href="#" className="card-link">
                  Card link
                </a>
                <a href="#" className="card-link">
                  Another link
                </a>
              </div>
            </div>
          </div>
          <div className="display-6">Account Overview</div>
          <MyAccountCard navContent={navContent} pageContent={pageContent} />
        </Container>
      </div>

      <Footer />
    </div>
  );
}
