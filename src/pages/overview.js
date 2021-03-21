import React, { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { STAT } from "../queries";
import parseStat from "../helpers/parseStat";
import emptyStat from "../helpers/emptyStat";
import { Stats } from "../components/Stats";
import Loading from "../components/Loading";

const Overview = ({ activeYear, activeMonth, unit }) => {
  const [fetchStat, { data, loading }] = useLazyQuery(STAT);

  useEffect(() => {
    if (activeMonth === null || activeYear === null) return;
    fetchStat({
      variables: { year: activeYear, month: activeMonth },
    });
  }, [activeMonth, activeYear, unit]);

  const stat = data ? data.stat : emptyStat;
  const parsedStat = parseStat(stat, unit);

  return (
    <div className="relative flex-grow">
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
