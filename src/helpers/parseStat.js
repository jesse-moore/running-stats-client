import { parseDistance, parseElevation, parseTime, parseSpeed } from "../utils";

export default function parseStat(stat, unit) {
  const {
    total_distance,
    average_distance,
    total_elev_gain,
    average_elev_gain,
    total_moving_time,
    average_moving_time,
    average_speed,
    count,
  } = stat;

  return {
    ...stat,
    total_distance: parseDistance(total_distance, unit),
    average_distance: parseDistance(average_distance, unit),
    total_elev_gain: parseElevation(total_elev_gain, unit),
    average_elev_gain: parseElevation(average_elev_gain, unit),
    total_moving_time: parseTime(total_moving_time),
    average_moving_time: parseTime(average_moving_time),
    average_speed: parseSpeed(average_speed, unit),
    count: { value: count },
  };
}
