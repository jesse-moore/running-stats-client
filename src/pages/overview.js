import React, { useState, useEffect } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
import { INIT_STATS } from "../queries";
import { DateSelection } from "../components/DateSelection";
import { Stats } from "../components/Stats";

const Overview = ({ initLoading }) => {
  const [activeMonth, setActiveMonth] = useState(0);
  const [activeYear, setActiveYear] = useState(0);
  return (
    <div>
      <DateSelection
        initLoading={initLoading}
        activeMonth={activeMonth}
        activeYear={activeYear}
        setActiveMonth={setActiveMonth}
        setActiveYear={setActiveYear}
      />
      <Stats
        activeMonth={activeMonth}
        activeYear={activeYear}
        initLoading={initLoading}
      />
    </div>
  );
};

export default Overview;
