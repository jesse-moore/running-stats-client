import cloudy from "./wi-cloudy.svg";
import sunny from "./wi-day-sunny.svg";
import partlyCloudy from "./wi-cloudy.svg";
import rain from "./wi-rain.svg";
import na from "./wi-na.svg";

const weatherIcons = { cloudy, sunny, partlyCloudy, rain };

const WeatherIcon = ({ type }) => {
  const weather = weatherIcons[type] || na;
  return <img className="w-8 -mt-1" src={weather} />;
};

export { WeatherIcon };
