import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { STAT } from "../../queries";
import parseStat from "../../helpers/parseStat";
import Header from "./Header";
import TextStat from "./TextStat";
import DaysChart from "./DaysChart";
import PeriodOfDay from "./PeriodOfDay";

const defaultStat = {
  total_distance: 0,
  average_distance: 0,
  total_elev_gain: 0,
  average_elev_gain: 0,
  total_moving_time: 0,
  average_moving_time: 0,
  count: 0,
  average_speed: 0,
  daysOfWeek: {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
  },
  periodOfDay: {
    earlyMorning: 0,
    morning: 0,
    afternoon: 0,
    evening: 0,
    night: 0,
  },
};

export function Stats({ activeMonth, activeYear, initLoading }) {
  const [units, setUnits] = useState("metric");
  const [fetchStat, { data, loading }] = useLazyQuery(STAT);

  useEffect(() => {
    if (!initLoading) {
      fetchStat({
        variables: { year: activeYear, month: activeMonth },
      });
    }
  }, [initLoading, activeMonth, activeYear]);

  const stat = data ? data.stat : defaultStat;
  const parsedStat = parseStat(stat, units);

  return (
    <div className="stats-container">
      <Header activeMonth={activeMonth} activeYear={activeYear} />
      <div className="stat-container">
        <TextStat title={"Total Runs"} stat={parsedStat.count} />
        <TextStat title={"Total Distance"} stat={parsedStat.total_distance} />
        <TextStat
          title={"Average Distance"}
          stat={parsedStat.average_distance}
        />
        <TextStat
          title={"Total Elevation Gain"}
          stat={parsedStat.total_elev_gain}
        />
        <TextStat
          title={"Average Elevation Gain"}
          stat={parsedStat.average_elev_gain}
        />
        <TextStat
          title={"Total Moving Time"}
          stat={parsedStat.total_moving_time}
        />
        <TextStat
          title={"Average Moving Time"}
          stat={parsedStat.average_moving_time}
        />
        <TextStat title={"Average Speed"} stat={parsedStat.average_speed} />
        <div className="stat-spacer" />
        <div className="stat-spacer" />
      </div>
      <div className="day-stat-container">
        <DaysChart data={parsedStat.daysOfWeek} />
        <PeriodOfDay data={parsedStat.periodOfDay} />
      </div>
    </div>
  );
}
