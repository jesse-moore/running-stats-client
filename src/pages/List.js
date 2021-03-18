import React, { useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { ACTIVITIES } from "../queries";
import Header from "../components/Stats/Header";
import { WeatherIcon } from "../icons";

const List = ({ activeMonth, activeYear }) => {
  const [fetchActivities, { data, loading }] = useLazyQuery(ACTIVITIES);

  useEffect(() => {
    fetchActivities({
      variables: { page: 0, perPage: 10, year: activeYear, month: activeMonth },
    });
  }, [activeMonth, activeYear]);

  const activities = data ? data.activities : null;
  console.log(activities);

  return (
    <div className="page-container">
      <div className="text-center">
        <Header activeMonth={activeMonth} activeYear={activeYear} />
      </div>
      <div className="mx-auto w-max">
        <div className="flex justify-center py-2">
          <div className="px-4 py-4 bg-white shadow rounded flex flex-row w-full">
            <div className="pr-2">
              <div className="text-lg">Afternoon Run</div>
              <div className="text-gray-500">March 4, 2021 at 3:34 PM</div>
            </div>
            <div className="">
              <div className="flex flex-row text-2xl">
                <div className="px-2">10.4 km</div>
                <div className="px-2">6.09 /km</div>
                <div className="px-2">45m 02s</div>
              </div>
              <div className="flex flex-row">
                <div className="pl-1">
                  <WeatherIcon type="rain" />
                </div>
                <div className="px-2">22 °C</div>
                <div className="px-2">13 m/s</div>
                <div className="px-2">66% rh</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center py-2">
          <div className="px-4 py-4 bg-white shadow rounded flex flex-row w-full">
            <div className="pr-2">
              <div className="text-lg">Afternoon Run</div>
              <div className="text-gray-500">March 4, 2021 at 3:34 PM</div>
            </div>
            <div className="">
              <div className="flex flex-row text-2xl">
                <div className="px-2">100.4 km</div>
                <div className="px-2">10.09 /km</div>
                <div className="px-2">10h 45m 02s</div>
              </div>
              <div className="flex flex-row">
                <div className="px-2">ICON</div>
                <div className="px-2">22 °C</div>
                <div className="px-2">13 m/s</div>
                <div className="px-2">66% rh</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
