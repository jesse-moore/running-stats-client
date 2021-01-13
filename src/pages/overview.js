import React, { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { STAT } from "../queries";
import parseStat from "../helpers/parseStat";
import emptyStat from "../helpers/emptyStat";

import { Stats } from "../components/Stats";
import Loading from "../components/Loading";

const Overview = ({ activeYear, activeMonth }) => {
  const [units, setUnits] = useState("metric");
  const [fetchStat, { data, loading }] = useLazyQuery(STAT);

  useEffect(() => {
    fetchStat({
      variables: { year: activeYear, month: activeMonth },
    });
  }, [activeMonth, activeYear]);

  const stat = data ? data.stat : emptyStat;
  const parsedStat = parseStat(stat, units);

  return (
    <div className="page-container">
      {loading && <Loading />}
      <Stats
        activeMonth={activeMonth}
        activeYear={activeYear}
        stat={parsedStat}
      />
    </div>
  );
};

export default Overview;
