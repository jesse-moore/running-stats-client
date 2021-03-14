import React from "react";
import Header from "../components/Stats/Header";

export default ({ activeMonth, activeYear }) => {
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
                <div className="px-2">ICON</div>
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
