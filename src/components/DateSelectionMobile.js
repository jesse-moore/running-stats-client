import React, { useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import dayjs from "dayjs";
import { AVAILABLE_STATS } from "../queries";

const DateSelectionMobile = ({
  activeMonth,
  activeYear,
  setActiveMonth,
  setActiveYear,
}) => {
  const [fetchAvailableStats, { data }] = useLazyQuery(AVAILABLE_STATS);

  useEffect(() => {
    fetchAvailableStats();
  }, []);

  const availableStats = data ? data.availableStats : {};

  function handleClickYear({ target }) {
    const value = Number(target.value);
    setActiveYear(value);
    setActiveMonth(0);
  }

  function handleClickMonth({ target }) {
    const value = Number(target.value);
    setActiveMonth(value);
  }

  const months = Array(12)
    .fill(0)
    .map((_m, i) => {
      const month = dayjs().month(i).format("MMM");
      const available =
        availableStats[activeYear] &&
        availableStats[activeYear].includes(i + 1);
      return { name: month, value: i + 1, disabled: !available };
    });

  const minYear = Number(
    Object.keys(availableStats).reduce((a, c) => {
      return Number(a) < Number(c) ? a : c;
    }, dayjs().year())
  );

  const years = Array(1 + dayjs().year() - minYear)
    .fill(0)
    .map((_y, i) => {
      const year = Number(
        dayjs()
          .year(minYear + i)
          .format("YYYY")
      );
      const available = availableStats.hasOwnProperty(year);
      return { name: year, value: year, disabled: !available };
    });
  return (
    <div className="flex py-2 mt-4 bg-gray-200 w-11/12 mx-auto justify-center rounded rounded-b-none shadow-md text-center">
      <Select
        options={years}
        activeValue={activeYear}
        setValue={handleClickYear}
        name="Year"
      />

      <Select
        options={months}
        activeValue={activeMonth}
        setValue={handleClickMonth}
        name="Month"
      />
    </div>
  );

  function Select({ options, activeValue, setValue, name }) {
    const elements = [
      { name: "All", value: 0, disabled: false },
      ...options,
    ].map(({ name, disabled, value }) => {
      return (
        <option
          className={disabled ? "bg-gray-300" : ""}
          value={value}
          disabled={disabled}
          key={name}
        >
          {name}
        </option>
      );
    });
    return (
      <div className="mx-2 my-2">
        {`${name}: `}
        <select
          className="w-24 rounded ml-2"
          value={activeValue}
          name={name}
          id={name}
          onChange={setValue}
        >
          {elements}
        </select>
      </div>
    );
  }
};

export default DateSelectionMobile;
