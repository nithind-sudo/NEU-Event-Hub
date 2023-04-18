// App.js
import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Main from "./Main";
import "./styles/Colors/Colors.css"

function App() {
  useEffect(() => {
    document.title = "NEU Events";
  }, []);

  return (
    <div className="backgroundAdjust">
      <Main />
    </div>
  );
}

export default App;
