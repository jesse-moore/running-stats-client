import React from "react";

const TextStat = ({ title, stat }) => {
  const { value, unit = "" } = stat;
  return (
    <div className="w-60 px-2 py-4 flex-shrink-0">
      <h3 className="font-thin text-xl">{title}</h3>
      <div className="stat-card-divider"></div>
      <div className="font-semibold text-4xl whitespace-nowrap">{`${value} ${unit}`}</div>
    </div>
  );
};

export default TextStat;
