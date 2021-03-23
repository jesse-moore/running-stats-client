import React from "react";
import { Link, useLocation } from "react-router-dom";

const NavBar = ({ unit, setUnit }) => {
  const { pathname } = useLocation();
  const unitDivBaseClass =
    "mx-2 px-2 mt-1 h-8 font-semibold focus:outline-none rounded hover:bg-blueGray-100 hover:text-blue-500";
  const unitDivInactiveClass = `${unitDivBaseClass} bg-blueGray-300 text-gray-800`;
  const unitDivActiveClass = `${unitDivBaseClass} bg-blueGray-100 text-blue-500`;
  const getClassName = (path) => {
    let divClass = "mx-4 pt-4 pb-3 font-semibold focus:outline-none";
    divClass +=
      path === pathname
        ? " border-b-4  border-blue-500 text-gray-50"
        : " text-blueGray-300";
    return divClass;
  };
  return (
    <div className="mb-4 bg-darkBlue w-full rounded rounded-b-none shadow flex flex-col justify-items-start">
      <div className="font-bold text-gray-50 flex flex-row">
        <div className="mx-4 my-3">Activity Stats</div>
        <div className="flex-grow"></div>
        <div className="my-1 mr-2">
          <button
            className={
              unit === "metric" ? unitDivActiveClass : unitDivInactiveClass
            }
            onClick={() => setUnit("metric")}
          >
            Metric
          </button>
          <button
            className={
              unit === "imperial" ? unitDivActiveClass : unitDivInactiveClass
            }
            onClick={() => setUnit("imperial")}
          >
            Imperial
          </button>
        </div>
      </div>
      <div className="flex flex-row">
        <Link to="/">
          <div className={getClassName("/")}>Overview</div>
        </Link>
        <Link to="/list">
          <div className={getClassName("/list")}>List</div>
        </Link>
        <Link to="/map">
          <div className={getClassName("/map")}>Map</div>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
