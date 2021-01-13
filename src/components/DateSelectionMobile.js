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
    <div className="date-selection-container">
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
        <option value={value} disabled={disabled} key={name}>
          {name}
        </option>
      );
    });
    return (
      <div>
        <select value={activeValue} name={name} id={name} onChange={setValue}>
          {elements}
        </select>
      </div>
    );
  }
};

export default DateSelectionMobile;
