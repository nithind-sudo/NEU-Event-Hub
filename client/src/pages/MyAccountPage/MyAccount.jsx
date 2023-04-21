import React, { useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./MyAccount.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/footer";
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
import { fetchSession, fetchUserInfo } from "../../apiClient";
import { ACTIONS } from "../../contexts/constants";

export default function MyAccount({ handlelogout }) {
  const [selectedNavItem, setSelectedNavItem] = useState("profile");
  const { state, dispatch } = EventManagementState();

  const [firstName, setFirstName] = useState(state.first_name);
  const [lastName, setLastName] = useState(state.last_name);
  const [phoneNumber, setPhoneNumber] = useState(state.phone_number);
  const [username, setUsername] = useState(state.username);
  const [role, setRole] = useState(state.role);
  const navigate = useNavigate();

  useEffect(() => {
    // console.log("Hitting userInfo for user_id : ", state.user_id);
    fetchSession().then((sessionResponse) => {
      if (sessionResponse.data.success) {
        fetchUserInfo(sessionResponse.data.user_id)
          .then((response) => {
            // console.log("*** Response from GET User API : ", response);
            const userProfile = response.data[0];
            dispatch({
              type: ACTIONS.GET_USER,
              first_name: userProfile.first_name,
              last_name: userProfile.last_name,
              phone_number: userProfile.phone_number,
              role: userProfile.role,
              created_on: userProfile.created_time,
              events_booked: userProfile.events_booked,
              favorites: userProfile.favorites,
            });

            setFirstName(userProfile.first_name);
            setLastName(userProfile.last_name);
            setPhoneNumber(userProfile.phone_number);
            setRole(userProfile.role);
            setUsername(userProfile.username);
          })
          .catch((error) => {
            // console.log(
            //   "Error while fetching UserInfo inside useEffect ",
            //   error
            // );
          });
      } else {
        dispatch({ type: ACTIONS.LOG_OUT });
        navigate("/login");
      }
    });
  }, [firstName, lastName, phoneNumber, username, role]);

  const handleNavItemSelect = (selectedKey) => {
    setSelectedNavItem(selectedKey);
  };

  const profileContent = <Profile />;
  const ticketsContent = <MyTickets />;
  const manageAccount = <ManageAccounts />;

  let pageContent;
  // console.log("selected Nav Item : ", selectedNavItem);
  switch (selectedNavItem) {
    case "profile":
      pageContent = profileContent;
      break;
    case "tickets":
      pageContent = ticketsContent;
      break;
    case "manageAccounts":
      pageContent = manageAccount;
      break;
    default:
      pageContent = null;
  }

  const navContent = (
    <Nav onSelect={handleNavItemSelect}>
      <table className="table table-bordered border-warning">
        <Nav.Item>
          <tr className="text-center">
            <td className="setSizeForNavBox">
              <Nav.Link eventKey="profile">
                <span className="setNavText text-light">Profile</span>
              </Nav.Link>
            </td>
          </tr>
        </Nav.Item>
        <Nav.Item>
          <tr className="text-center">
            <td className="setSizeForNavBox">
              <Nav.Link eventKey="tickets">
                <span className="setNavText text-light">Tickets</span>
              </Nav.Link>
            </td>
          </tr>
        </Nav.Item>
        {state.role === "admin" && (
          <Nav.Item>
            <tr className="text-center">
              <td className="setSizeForNavBox">
                <Nav.Link eventKey="manageAccounts">
                  <span className="setNavText text-light">Manage Users</span>
                </Nav.Link>
              </td>
            </tr>
          </Nav.Item>
        )}
      </table>
    </Nav>
  );

  return (
    <div>
      <div className="py-5 makeBackgroundForMyAccount">
        <Navbar handlelogout={handlelogout} />
        <div className="myAccount-page">
          <Container fluid>
            <div className="container">
              <div className="card myCardColorAccount">
                <div className="card-body">
                  <div className="row">
                    <div className="text-center">
                      <div className="card-title h3">My Account</div>
                      <hr />
                    </div>
                  </div>

                  <div className="text-center">
                    <h6 className="card-subtitle mb-2 text-warning">
                      {role == "admin" ? "Admin" : "User"} Account
                    </h6>
                    <br />
                    <h6 className="card-subtitle mb-2 text-warning">
                      {firstName} {lastName}
                    </h6>
                    <br />
                    <h6 className="card-subtitle mb-2 text-warning">
                      Username: {username}
                    </h6>
                    <br />
                  </div>

                  <MyAccountCard
                    navContent={navContent}
                    pageContent={pageContent}
                  />
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>
      <Footer />
    </div>
  );
}
