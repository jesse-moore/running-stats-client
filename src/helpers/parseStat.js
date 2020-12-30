import dayjs from "dayjs";

export default function parseStat(stat, units) {
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
    total_distance: parseDistance(total_distance, units),
    average_distance: parseDistance(average_distance, units),
    total_elev_gain: parseElevation(total_elev_gain, units),
    average_elev_gain: parseElevation(average_elev_gain, units),
    total_moving_time: parseTime(total_moving_time),
    average_moving_time: parseTime(average_moving_time),
    average_speed: parseSpeed(average_speed),
    count: { value: count },
  };
}

function parseSpeed(value) {
  if (value === 0) return { value: 0, unit: "min/km" };
  const mpk = Math.round(100 / (value * 0.06)) / 100;
  return { value: mpk, unit: "min/km" };
}

function parseTime(value) {
  const hours = toTimeString(Math.floor(value / 3600));
  const minutes = toTimeString(Math.floor((value - hours * 3600) / 60));
  const seconds = toTimeString(Math.floor(value - hours * 3600 - minutes * 60));
  return { value: `${hours}:${minutes}:${seconds}` };
}

function parseDistance(value, units) {
  if (units === "metric") {
    return { value: toKilometers(value), unit: "km" };
  } else {
    return value;
  }
}

function parseElevation(value, units) {
  if (units === "metric") {
    return { value: toMeters(value), unit: "m" };
  } else {
    return value;
  }
}

function toTimeString(value) {
  if (`${value}`.length === 1) {
    return `0${value}`;
  } else {
    return `${value}`;
  }
}

function toKilometers(value) {
  return Number(Math.round(value / 1000)).toLocaleString();
}

function toMeters(value) {
  return Number(Math.round(value)).toLocaleString();
}
