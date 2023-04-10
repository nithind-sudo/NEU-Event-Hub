import Login from "./pages/Login/Login";
import LandingPage from "./pages/LandingPage/LandingPage";
import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CategoryView from "./components/CategoryView/CategoryView";
import Category from "./components/Category/Category";

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
      {isLoggedIn && <LandingPage />}
      <Routes>
        <Route path="/" element={<Login handleLogin={handleLogin} />}></Route>
        <Route path="/login" element={<Login handleLogin={handleLogin} />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/category" element={<CategoryView />}></Route>
        <Route path="/category/:categoryName" element={<Category />}></Route>
        <Route
          path="/login"
          element={<Login handleLogin={handleLogin} />}></Route>
        
        {isLoggedIn && (
          <>Need to Add paths here to multiple pages for navigation</>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
