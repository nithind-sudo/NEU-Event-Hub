import Login from "./pages/Login/Login";
import LandingPage from "./pages/LandingPage/LandingPage";
import Navbar from "./components/Navbar/Navbar";
import { useState } from "react";
import SignUp from "./pages/SignUp/SignUp";
import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    document.title = "NEU Events";
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <BrowserRouter>
      <Navbar />
      {isLoggedIn && <LandingPage />}
      <Routes>
        <Route path="/" element={<Login handleLogin={handleLogin} />}></Route>
        <Route
          path="/login"
          element={<Login handleLogin={handleLogin} />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        {isLoggedIn && (
          <>Need to Add paths here to multiple pages for navigation</>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
