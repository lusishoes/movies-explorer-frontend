import React from "react";
import { useLocation } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import "./Header.css";
function Header({ isLoggedIn }) {
  const location = useLocation();

  return (
    <header
      className={`header ${location.pathname !== "/" ? "header_white" : ""}`}
    >
      <Navigation isLoggedIn={isLoggedIn} />
    </header>
  );
}

export default Header;
