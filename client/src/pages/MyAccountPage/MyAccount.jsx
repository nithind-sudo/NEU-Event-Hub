import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./MyAccount.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Layout/Footer";
import MyAccountCard from "../../components/ui/MyAccountCard";
import { Nav } from "react-bootstrap";

export default function MyAccount({ handlelogout }) {
  const [selectedNavItem, setSelectedNavItem] = useState("profile");

  const handleNavItemSelect = (selectedKey) => {
    setSelectedNavItem(selectedKey);
  };

  const profileContent = <p>This is the profile content.</p>;
  const ticketsContent = <p>This is the tickets content.</p>;
  const favoritesContent = <p>This is the favorites content.</p>;
  const settingsContent = <p>This is the settings content.</p>;

  let pageContent;
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
    case "settings":
      pageContent = settingsContent;
      break;
    default:
      pageContent = null;
  }

  const navContent = (
    <Nav className="d-flex flex-column-nav">
      <Nav.Item>
        <Nav.Link eventKey="profile">Profile</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="tickets">My Tickets</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="favorites">Favorites</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="settings">Settings</Nav.Link>
      </Nav.Item>
    </Nav>
  );

  return (
    <>
      <Navbar handlelogout={handlelogout} onSelect={handleNavItemSelect} />
      <div className="myAccount-page">
        <Container>
          <h1>Account Overview</h1>
          <MyAccountCard navContent={navContent} pageContent={pageContent} />
        </Container>
      </div>

      <Footer />
    </>
  );
}
