import React from "react";
import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
  const { pathname } = useLocation();
  const getClassName = (path) => {
    if (path === pathname) return "btn-dflt btn-actv";
    return "btn-dflt";
  };
  return (
    <div className="navbar-container">
      <Link to="/">
        <button className={getClassName("/")}>Overview</button>
      </Link>
      <Link to="/map">
        <button className={getClassName("/map")}>Map</button>
      </Link>
    </div>
  );
};

export default NavBar;
