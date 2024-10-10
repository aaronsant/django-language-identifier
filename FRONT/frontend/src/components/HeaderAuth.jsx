import React, { useState, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "../styles/Header.css";
import { AuthContext } from "../Contexts/AuthContext";

function HeaderAuth() {
  const [showNavbar, setShowNavbar] = useState(false);
  const navigate = useNavigate()
  const { logout } = useContext(AuthContext)

  function handleShowNavbar() {
    setShowNavbar(!showNavbar);
  }

  function handleLogout(){
    logout()
    navigate('/')
    window.location.reload()
  }

  return (
    <div className="container">
      <Link to="/" className="site-title">
        DJANGOLANGO
      </Link>
      <div className="menu-icon" onClick={handleShowNavbar}>
        <h1> menu</h1>
      </div>
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
            to="/account"
            className={({ isActive, isPending, isTransitioning }) =>
              [
                isPending ? "pending" : "",
                isActive ? "active" : "",
                isTransitioning ? "transitioning" : "",
              ].join(" ")
            }
          >
            Account
          </NavLink>
          <Link onClick={handleLogout}>
            Logout
          </Link>

        </ul>
      </div>
    </div>
  );
}

export default HeaderAuth;