import "./navbar.css";
import { NavLink } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/auth/AuthContext";
import logo from "../../static/assets/logo.png";
import close from "../../static/assets/close.png";

const userNavLinks = [
  { title: "HOME", path: "/" },
  {
    title: "THE JOURNEY",
    path: "/journey",
  },
  {
    title: "STORE",
    path: "/store",
  },
  {
    title: "TEAM",
    path: "/team",
  },
  {
    title: "CONTACT",
    path: "/contact",
  },
];
const noUserNavLinks = [
  {
    title: "LOGIN",
    path: "/login",
  },
  {
    title: "REGISTER",
    path: "/register",
  },
];
const Navbar = () => {
  const { user, logoutRequest } = useContext(AuthContext);
  const [sidebarVisibility, setSidebarVisibility] = useState(false);

  const handleLogout = async () => {
    try {
      logoutRequest();
      setSidebarVisibility(false);
    } catch (err) {
      //console.log(err);
    }
  };

  return (
    <>
      {" "}
      <header className="navbar">
        <div className="logo-container">
          {" "}
          <img className="logo" src={logo} alt="logo" />
        </div>
        <ul className="nav-list">
          {user &&
            userNavLinks.map((navItem, index) => (
              <NavLink
                to={navItem.path}
                className={({ isActive }) =>
                  isActive ? "link link-active" : "link"
                }
                key={index}
              >
                <b>{navItem.title}</b>
              </NavLink>
            ))}
        </ul>
        <ul className="nav-list">
          {!user &&
            noUserNavLinks.map((navItem, index) => (
              <NavLink
                to={navItem.path}
                className={({ isActive }) =>
                  isActive ? "link link-active" : "link"
                }
                key={index}
              >
                <b>{navItem.title}</b>
              </NavLink>
            ))}
        </ul>
        <div className="user-tile">
          {user && (
            <>
              <img
                src="https://img.icons8.com/material-outlined/24/null/user--v1.png"
                alt="nav"
              />
              <span
                onClick={() => setSidebarVisibility(true)}
                style={{ cursor: "pointer" }}
                className="text"
              >
                {user.username}
              </span>
            </>
          )}
        </div>
      </header>
      <div className="sidebar" data-visible={sidebarVisibility}>
        <div className="close">
          <img
            onClick={() => setSidebarVisibility(false)}
            src={close}
            alt="close"
            className="closeIcon"
          />
        </div>
        <div className="wrapper">
          <span className="logout sbItem" onClick={handleLogout}>
            Logout
          </span>
          <span className="sbItem" onClick={() => setSidebarVisibility(false)}>
            Orders
          </span>
        </div>
      </div>
    </>
  );
};

export default Navbar;
