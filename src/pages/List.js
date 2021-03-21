import React, { useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { ACTIVITIES } from "../queries";
import parseActivities from "../helpers/parseActivities";
import { mapBoxKey } from "../config";
import { WeatherIcon } from "../icons";
import Loading from "../components/Loading";

const List = ({ activeMonth, activeYear, unit }) => {
  const [fetchActivities, { data, loading, error }] = useLazyQuery(ACTIVITIES);

  if (error) console.log(error);
  useEffect(() => {
    if (activeMonth === null || activeYear === null) return;
    fetchActivities({
      variables: { page: 0, perPage: 10, year: activeYear, month: activeMonth },
    });
  }, [activeMonth, activeYear]);

  let activities =
    data && data.activities ? parseActivities(data.activities, unit) : [];

  activities = activities.sort((a, b) => {
    return a.dateUnix <= b.dateUnix ? 1 : -1;
  });

  return (
    <div className="relative">
      {loading && <Loading />}
      <div className="mx-auto w-max">
        {activities.map((activity) => {
          const {
            name,
            distance,
            date,
            elevationGain,
            averageSpeed,
            movingTime,
            map,
            location,
            weather,
          } = activity;
          return (
            <div className="my-4 px-4 py-4 bg-white shadow rounded flex flex-row justify-between w-full">
              <div className="flex flex-col mr-4">
                <div className="pr-2 mb-2 flex flex-col items-baseline">
                  <div className="text-lg">{name}</div>
                  {location && <Location location={location} />}
                  <div className="text-sm text-gray-500">{date}</div>
                </div>
                <div className="flex flex-row text-lg mb-2">
                  <div className="pr-2">{`${distance.value}${distance.unit}`}</div>
                  <div className="px-2">{`${averageSpeed.value}${averageSpeed.unit}`}</div>
                  <div className="px-2">{movingTime.value}</div>
                  <div className="px-2">
                    {elevationGain.value}
                    {elevationGain.unit}
                  </div>
                </div>
                {weather && <WeatherData weather={weather} />}
              </div>
              <div>
                <img
                  src={`https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/static/path-2+c40000-1(${encodeURIComponent(
                    map.summary_polyline
                  )})/auto/200x200?access_token=${mapBoxKey}&padding=30`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Location = ({ location }) => {
  return <div className="text-sm text-gray-500">{location}</div>;
};

const WeatherData = ({ weather }) => {
  return (
    <div className="flex flex-row">
      <div className="">
        <WeatherIcon type={weather.condition} />
      </div>
      <div className="px-2">{`${weather.temp.value}${weather.temp.unit}`}</div>
      <div className="px-2">{`${weather.windSpeed.value}${weather.windSpeed.unit}`}</div>
      <div className="px-2">{weather.humidity}% rh</div>
    </div>
  );
};

export default List;
