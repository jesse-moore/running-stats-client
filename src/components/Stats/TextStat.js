import React from "react";

const TextStat = ({ title, stat }) => {
  const { value, unit = "" } = stat;
  return (
    <div className="flex flex-col w-40 h-28 md:w-48 md:h-28 justify-center shadow rounded bg-white m-2 p-2">
      <div className="mx-auto">
        <span className="text-xl md:text-2xl font-medium text-center">
          {value}
        </span>
        <span className="text-lg md:text-lg font-medium text-center">
          {unit}
        </span>
      </div>
      <span className="text-base md:text-base text-center">{title}</span>
    </div>
  );
};

export default TextStat;
