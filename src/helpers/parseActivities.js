import { parseDistance, parseElevation, parseTime, parseSpeed } from "../utils";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

export default function parseActivity(activities, unit) {
  if (activities === null) return null;
  return activities.map((activity) => {
    const {
      distance,
      moving_time,
      total_elevation_gain,
      start_date_local,
      average_speed,
      elev_high,
      elev_low,
      location_city,
      location_state,
      location_country,
      location_country_code,
      map,
      weather,
    } = activity;
    return {
      ...activity,
      distance: parseDistance(distance, unit),
      movingTime: parseTime(moving_time),
      elevationGain: parseElevation(total_elevation_gain, unit),
      date: parseDate(start_date_local),
      averageSpeed: parseSpeed(average_speed, unit),
      dateUnix: Number(start_date_local),
      map,
      location: parseLocation({
        location_city,
        location_state,
        location_country,
        location_country_code,
      }),
      weather: parseWeather(weather, unit),
    };
  });
}

function parseWeather(weather, unit) {
  if (!weather) return null;
  return {
    temp: parseTemp(weather, unit),
    humidity: Math.round(weather.humidity),
    windSpeed: parseWindSpeed(weather.windSpeed, unit),
    condition: weather.conditions[0],
  };
}

function parseTemp(weather, unit) {
  if (unit === "metric") {
    return {
      value: Math.round(average([weather.maxTemp, weather.minTemp])),
      unit: "°C",
    };
  } else {
    return {
      value: Math.round(
        average([weather.maxTemp, weather.minTemp]) * (9 / 5) + 32
      ),
      unit: "°F",
    };
  }
}

function parseWindSpeed(value, unit) {
  if (unit === "metric") {
    return { value: value, unit: "km/h" };
  } else {
    return {
      value: Math.round(value / 0.1609) / 10,
      unit: "mph",
    };
  }
}

function parseLocation({
  location_city,
  location_state,
  location_country,
  location_country_code,
}) {
  if (location_country_code === "us") {
    return `${location_city}, ${location_state}`;
  } else if (location_country_code === "au") {
    return `${location_city}, ${location_state}, ${location_country}`;
  } else {
    return `${location_city}, ${location_country}`;
  }
}

function parseDate(dateUnix) {
  return dayjs(Number(dateUnix)).utc().format("MMMM D, YYYY [at] HH:mm");
}

function average(nums) {
  return nums.reduce((a, c) => (a += c)) / nums.length;
}
