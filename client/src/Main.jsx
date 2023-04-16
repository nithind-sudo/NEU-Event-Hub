import Login from "./pages/Login/Login";
import LandingPage from "./pages/LandingPage/LandingPage";
import Navbar from "./components/Navbar/Navbar";
import SignUp from "./pages/SignUp/SignUp";
import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import CategoryView from "./components/CategoryView/CategoryView";
import Category from "./components/Category/Category";
import {
  useAuthState,
  useAuthDispatch,
  loginUser,
  logoutUser,
} from "./contexts/AuthContext";

function Main() {
  const { isLoggedIn } = useAuthState();
  const authDispatch = useAuthDispatch();
  const navigate = useNavigate();

  const handleLogin = (user) => {
    authDispatch(loginUser(user));
  };

  const handleLogout = () => {
    authDispatch(logoutUser());
    navigate("/login");
  };

  useEffect(() => {
    document.title = "NEU Events";
  }, []);

  return (
    <>
      {/* <Navbar /> */}
      {isLoggedIn && <LandingPage handleLogout={handleLogout} />}
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <LandingPage handleLogout={handleLogout} />
            ) : (
              <Login handleLogin={handleLogin} />
            )
          }
        ></Route>
        <Route path="/category" element={<CategoryView />}></Route>
        <Route path="/category/:categoryName" element={<Category />}></Route>
        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <LandingPage handleLogout={handleLogout} />
            ) : (
              <Login handleLogin={handleLogin} />
            )
          }
        ></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/category" element={<CategoryView />}></Route>
        <Route path="/category/:categoryName" element={<Category />}></Route>
        <Route
          path="/login"
          element={<Login handleLogin={handleLogin} />}
        ></Route>
      </Routes>
    </>
  );
}

export default Main;
