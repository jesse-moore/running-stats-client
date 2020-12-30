import React from "react";

const TextStat = ({ title, stat }) => {
  const { value, unit = "" } = stat;
  return (
    <div className="stat-card">
      <h3 className="stat-header">{title}</h3>
      <div className="stat-card-divider"></div>
      <div className="stat-value">{`${value} ${unit}`}</div>
    </div>
  );
};

export default TextStat;
