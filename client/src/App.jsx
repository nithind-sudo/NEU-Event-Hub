import Login from "./pages/Login/Login";
import LandingPage from "./pages/LandingPage/LandingPage";
import Navbar from "./components/Navbar/Navbar";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <BrowserRouter>
      <Navbar />
      {
        /*
          {isLoggedIn && <LandingPage />}
          <Routes>
          <Route path="/" element={<Login handleLogin={handleLogin} />}></Route>
          {isLoggedIn && <>
            Need to Add paths here to multiple pages for navigation
          </>}
          </Routes>
        */
      }
    </BrowserRouter>
  );
}

export default App;
