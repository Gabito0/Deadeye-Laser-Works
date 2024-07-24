import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";
import logo from "../assets/logo3.png";
import UserContext from "../auth/UserContext";

/**
 * Navigation Component
 *
 * Renders the navigation bar and adjusts links based on user status.
 */
const Navigation = ({ logout }) => {
  const { currentUser } = useContext(UserContext);
  console.debug("Navigation", "current=", currentUser);

  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleNavLinkClick = () => {
    setIsCollapsed(true);
  };

  const toggleNavbar = () => {
    setIsCollapsed(!isCollapsed);
  };

  function loggedInNav() {
    return (
      <>
        {currentUser.status === "admin" && (
          <li className="nav-item dropdown">
            <Link
              className="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
              href="#"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Admin
            </Link>
            <div
              className="dropdown-menu dropdown-menu-center mb-1 rounded-bottom"
              style={{ width: "2rem" }}
            >
              <Link
                className="dropdown-item"
                to={"/admin/services"}
                onClick={handleNavLinkClick}
              >
                Services
              </Link>
              <Link
                className="dropdown-item"
                to={"/admin/orders"}
                onClick={handleNavLinkClick}
              >
                Orders
              </Link>
            </div>
          </li>
        )}
        <li className="nav-item dropdown">
          <Link
            className="nav-link dropdown-toggle"
            data-bs-toggle="dropdown"
            href="#"
            role="button"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Account
          </Link>
          <div
            className="dropdown-menu dropdown-menu-center mb-1 rounded-bottom"
            style={{ width: "2rem" }}
          >
            <Link
              className="dropdown-item"
              to={"/user/profile"}
              onClick={handleNavLinkClick}
            >
              Profile
            </Link>
            <Link
              className="dropdown-item"
              to={"/user/orders"}
              onClick={handleNavLinkClick}
            >
              Orders
            </Link>
            <Link
              className="dropdown-item"
              onClick={() => {
                logout();
                handleNavLinkClick();
              }}
            >
              Logout
            </Link>
          </div>
        </li>
      </>
    );
  }
  function loggedOutNav() {
    return (
      <>
        <li className="nav-item">
          <Link className="nav-link" to={"/login"} onClick={handleNavLinkClick}>
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link"
            to={"/signup"}
            onClick={handleNavLinkClick}
          >
            Sign up
          </Link>
        </li>
      </>
    );
  }
  return (
    <nav
      className="navbar navbar-expand-lg bg-dark py-0 sticky-top"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to={"/"}>
          <img src={logo} alt="logo" className="logo" />
        </Link>
        <button
          className="navbar-toggler rounded"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor02"
          aria-controls="navbarColor02"
          aria-expanded={!isCollapsed}
          onClick={toggleNavbar}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse ${!isCollapsed ? "show" : ""}`}
          id="navbarColor02"
        >
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to={"/"} onClick={handleNavLinkClick}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to={"/services"}
                onClick={handleNavLinkClick}
              >
                Services
              </Link>
            </li>
            {currentUser ? loggedInNav() : loggedOutNav()}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
