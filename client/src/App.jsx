// App.js
import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Main from "./Main";

function App() {
  useEffect(() => {
    document.title = "NEU Events";
  }, []);

  return <Main />;
}

export default App;
