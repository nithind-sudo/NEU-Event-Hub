import React from "react";
import Login from "./pages/Login/Login";
import LandingPage from "./pages/LandingPage/LandingPage";
import SignUp from "./pages/SignUp/SignUp";
import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import CategoryView from "./components/CategoryView/CategoryView";
import Category from "./components/Category/Category";
import { EventManagementState } from "./contexts/context";
import { LOGIN_STATUS, ACTIONS } from "./contexts/constants";
import { fetchLogin, fetchLogOut } from "./apiClient";
import CreateEvent from "./pages/CreateEvent/CreateEvent";
import Footer from "./components/Layout/Footer";
import MyAccount from "./pages/MyAccountPage/MyAccount";
import AllEvents from "./pages/AllEvents/AllEvents";
import Favorites from "./pages/Favorites/Favorites";
import MyTickets from "./pages/MyTickets/MyTickets";
import MyToast from "./components/ui/Toast";
import LogoutContext from "./contexts/LogoutContext";

function Main() {
  const [error, setError] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const { state, dispatch } = EventManagementState();

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "NEU Events";
  }, []);

  async function onLogin(username, password) {
    try {
      const response = await fetchLogin(username, password);
      console.log("Got Data from RESPONSE : ", response);
      const fetchData = response.data;
      dispatch({ type: ACTIONS.PENDING });
      setTimeout(() => {
        console.log("Got Data from fetch LOGIN : ", fetchData);
        dispatch({
          type: ACTIONS.LOG_IN,
          username: fetchData.sessionData.username,
          user_id: fetchData.sessionData.user_id,
          events_booked: fetchData.sessionData.events_booked,
          favorites: fetchData.sessionData.favorites,
          listings: fetchData.sessionData.listings,
          role: fetchData.sessionData.role,
          isActivated: fetchData.sessionData.isActivated,
          isVerified: fetchData.sessionData.isVerified,
          first_name: fetchData.sessionData.first_name,
          last_name: fetchData.sessionData.last_name,
        });
      }, 1000);
      return fetchData;
    } catch (error) {
      console.log("**** Error while logging in MAIN COMPONENT:", error);
      throw new Error("Login Failed! Check your account details.");
    }
  }

  async function onLogout() {
    console.log("onLogout called"); // Add this line

    try {
      dispatch({ type: ACTIONS.PENDING });
      await new Promise((resolve) => setTimeout(resolve, 1500));
      dispatch({ type: ACTIONS.LOG_OUT });
      await fetchLogOut();
      navigate("/");
    } catch (error) {
      dispatch({ type: ACTIONS.REPORT_ERROR, error: error?.error });
    }
  }

  return (
    <React.Fragment>
      <LogoutContext.Provider value={onLogout}>
        <Routes>
          <Route
            path="/"
            element={
              state.loginStatus === LOGIN_STATUS.IS_LOGGED_IN ? (
                <LandingPage handlelogout={onLogout} />
              ) : (
                <Login
                  onLogin={onLogin}
                  error={error}
                  setError={setError}
                  showAlert={showAlert}
                  setShowAlert={setShowAlert}
                />
              )
            }
          ></Route>

          <Route
            path="/main"
            element={
              state.loginStatus === LOGIN_STATUS.IS_LOGGED_IN ? (
                <LandingPage handlelogout={onLogout} />
              ) : (
                <Login
                  onLogin={onLogin}
                  error={error}
                  setError={setError}
                  showAlert={showAlert}
                  setShowAlert={setShowAlert}
                />
              )
            }
          ></Route>

          <Route
            path="/category"
            element={<CategoryView handlelogout={onLogout} />}
          ></Route>
          <Route
            path="/category/:categoryName"
            element={<Category handlelogout={onLogout} />}
          ></Route>

          <Route
            path="/allEvents"
            element={<AllEvents handlelogout={onLogout} />}
          ></Route>

          <Route
            path="/login"
            element={
              state.loginStatus === LOGIN_STATUS.IS_LOGGED_IN ? (
                <LandingPage handlelogout={onLogout} />
              ) : (
                <Login
                  onLogin={onLogin}
                  error={error}
                  setError={setError}
                  showAlert={showAlert}
                  setShowAlert={setShowAlert}
                />
              )
            }
          ></Route>

          <Route path="/signup" element={<SignUp handlelogout={onLogout}
                error={error}
                setError={setError}
                showAlert={showAlert}
                setShowAlert={setShowAlert}/>}></Route>
          <Route
            path="/createEvent"
            element={
              <CreateEvent
                handlelogout={onLogout}
                error={error}
                setError={setError}
                showAlert={showAlert}
                setShowAlert={setShowAlert}
              />
            }
          ></Route>
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/tickets" element={<MyTickets />} />

          <Route
            path="/category"
            element={<CategoryView handlelogout={onLogout} />}
          ></Route>
          <Route
            path="/category/:categoryName"
            element={<Category handlelogout={onLogout} />}
          ></Route>
          <Route
            path="/account"
            element={<MyAccount handlelogout={onLogout} />}
          ></Route>
          <Route
            path="/login"
            element={
              <Login
                onLogin={onLogin}
                error={error}
                setError={setError}
                showAlert={showAlert}
                setShowAlert={setShowAlert}
              />
            }
          ></Route>
        </Routes>
      </LogoutContext.Provider>
    </React.Fragment>
  );
}

export default Main;
