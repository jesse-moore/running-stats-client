import React from "react";
import Header from "./Header";
import TextStat from "./TextStat";
import DaysChart from "./DaysChart";
import PeriodOfDay from "./PeriodOfDay";

export function Stats({ activeMonth, activeYear, stat }) {
  return (
    <div className="stats-container">
      <Header activeMonth={activeMonth} activeYear={activeYear} />
      <div className="stat-container">
        <TextStat title={"Total Runs"} stat={stat.count} />
        <TextStat title={"Total Distance"} stat={stat.total_distance} />
        <TextStat title={"Average Distance"} stat={stat.average_distance} />
        <TextStat title={"Total Elevation Gain"} stat={stat.total_elev_gain} />
        <TextStat
          title={"Average Elevation Gain"}
          stat={stat.average_elev_gain}
        />
        <TextStat title={"Total Moving Time"} stat={stat.total_moving_time} />
        <TextStat
          title={"Average Moving Time"}
          stat={stat.average_moving_time}
        />
        <TextStat title={"Average Speed"} stat={stat.average_speed} />
        <div className="stat-spacer" />
        <div className="stat-spacer" />
      </div>
      <div className="day-stat-container">
        <DaysChart data={stat.daysOfWeek} />
        <PeriodOfDay data={stat.periodOfDay} />
      </div>
    </div>
  );
}
