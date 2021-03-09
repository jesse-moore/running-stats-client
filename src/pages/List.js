import React from "react";
import Header from "../components/Stats/Header";

export default ({ activeMonth, activeYear }) => {
  return (
    <div className="page-container">
      <div className="text-center">
        <Header activeMonth={activeMonth} activeYear={activeYear} />
      </div>
      LIST
    </div>
  );
};
