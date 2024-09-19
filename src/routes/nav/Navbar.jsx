import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faSignInAlt,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { Layout, ConfigProvider } from "antd";
import "./Navbar.css";

const { Sider } = Layout;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#28a745",
          colorBgBase: "#1d1d1d",
          colorText: "#fff",
        },
      }}
    >
      <Sider
        className={`custom-sidebar ${isOpen ? "open" : ""} ${
          !isOpen ? "icons-only" : ""
        }`}
        width={isOpen ? 200 : 80}
        style={{
          backgroundColor: "rgba(29, 29, 29, 0.7)",
          color: "#fff",
          transition: "all 0.2s ease",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
        }}
        collapsible
        collapsed={!isOpen}
        trigger={null}
      >
        <ul className="navbar-list">
          <li>
            <NavLink
              to="/"
              exact
              activeClassName="active"
              className="nav-link"
              onClick={toggleSidebar}
            >
              <FontAwesomeIcon icon={faHome} className="nav-icon" />
              {isOpen && <span className="nav-text">Home</span>}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile"
              activeClassName="active"
              className="nav-link"
              onClick={toggleSidebar}
            >
              <FontAwesomeIcon icon={faUser} className="nav-icon" />
              {isOpen && <span className="nav-text">Profile</span>}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/auth/login"
              activeClassName="active"
              className="nav-link"
              onClick={toggleSidebar}
            >
              <FontAwesomeIcon icon={faSignInAlt} className="nav-icon" />
              {isOpen && <span className="nav-text">Login</span>}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/auth/signup"
              activeClassName="active"
              className="nav-link"
              onClick={toggleSidebar}
            >
              <FontAwesomeIcon icon={faUserPlus} className="nav-icon" />
              {isOpen && <span className="nav-text">Sign Up</span>}
            </NavLink>
          </li>
        </ul>
      </Sider>

      {isOpen && <div className="overlay" onClick={toggleSidebar}></div>}
    </ConfigProvider>
  );
};

export default Navbar;
