import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "../styles/Header.css";


function HeaderUnauth() {
  const [showNavbar, setShowNavbar] = useState(false);

  function handleShowNavbar() {
    setShowNavbar(!showNavbar);
  }

  return (
    <div className="container">
      <Link to="/" className="site-title">
        DJANGOLANGO
      </Link>
      <div className={`nav-elements ${showNavbar ? "active" : ""}`}>
        <ul>
          <NavLink
            onClick={() => {
              setShowNavbar(false);
            }}
            to="/"
            className={({ isActive, isPending, isTransitioning }) =>
              [
                isPending ? "pending" : "",
                isActive ? "active" : "",
                isTransitioning ? "transitioning" : "",
              ].join(" ")
            }
          >
            Home
          </NavLink>
          <NavLink
            onClick={() => {
              setShowNavbar(false);
            }}
            to="/login"
            className={({ isActive, isPending, isTransitioning }) =>
              [
                isPending ? "pending" : "",
                isActive ? "active" : "",
                isTransitioning ? "transitioning" : "",
              ].join(" ")
            }
          >
            Login
          </NavLink>
          <NavLink
            onClick={() => {
              setShowNavbar(false);
            }}
            to="/register"
            className={({ isActive, isPending, isTransitioning }) =>
              [
                isPending ? "pending" : "",
                isActive ? "active" : "",
                isTransitioning ? "transitioning" : "",
              ].join(" ")
            }
          >
            Register
          </NavLink>
        </ul>
      </div>
    </div>
  );
}

export default HeaderUnauth;