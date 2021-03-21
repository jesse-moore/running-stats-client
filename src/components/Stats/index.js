import React from "react";
import Header from "./Header";
import TextStat from "./TextStat";
import DaysChart from "./DaysChart";
import PeriodOfDay from "./PeriodOfDay";

export function Stats({ stat }) {
  return (
    <div className="px-1 md:px-8">
      <div className="flex flex-row flex-wrap justify-center mb-2">
        <TextStat title={"Runs"} stat={stat.count} />
        <TextStat title={"Distance"} stat={stat.total_distance} />
        <TextStat title={"Average Distance"} stat={stat.average_distance} />
        <TextStat title={"Elevation Gain"} stat={stat.total_elev_gain} />
        <TextStat
          title={"Average Elevation Gain"}
          stat={stat.average_elev_gain}
        />
        <TextStat title={"Moving Time"} stat={stat.total_moving_time} />
        <TextStat
          title={"Average Moving Time"}
          stat={stat.average_moving_time}
        />
        <TextStat title={"Average Speed"} stat={stat.average_speed} />
      </div>
      <div className="flex flex-row flex-wrap justify-center">
        <DaysChart data={stat.daysOfWeek} />
        <PeriodOfDay data={stat.periodOfDay} />
      </div>
    </div>
  );
}
