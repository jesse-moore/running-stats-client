import React from "react";
import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
  const { pathname } = useLocation();
  const getClassName = (path) => {
    if (path === pathname) return "btn-dflt bg-blue-400";
    return "btn-dflt bg-gray-100";
  };
  return (
    <div className="pb-2 mb-4 bg-gray-200 w-11/12 mx-auto rounded rounded-t-none shadow-md">
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
