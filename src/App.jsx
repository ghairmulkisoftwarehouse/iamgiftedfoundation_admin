// src/App.jsx
import React from "react";
import { useRoutes } from "react-router-dom";
import ScrollToTop from "./components/global/ScrollToTop";
import Router from "./routes/Router";

function App() {
  const routing = useRoutes(Router);

  return (
    <ScrollToTop>
      {routing}
    </ScrollToTop>
  );
}

export default App;
