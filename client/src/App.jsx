import Login from "./pages/Login/Login";
import LandingPage from "./pages/LandingPage/LandingPage";
import { useState } from "react";

function App() {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return <div className="App">
    {/* { isLoggedIn && <Login />} */}
    <Login />
  </div>;
}

export default App;
