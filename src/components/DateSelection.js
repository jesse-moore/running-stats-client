import React, { useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import dayjs from "dayjs";
import { AVAILABLE_STATS } from "../queries";

export const DateSelection = ({
  initLoading,
  activeMonth,
  activeYear,
  setActiveMonth,
  setActiveYear,
}) => {
  const [fetchAvailableStats, { data, loading }] = useLazyQuery(
    AVAILABLE_STATS,
    {
      fetchPolicy: "cache-only",
    }
  );

  useEffect(() => {
    if (!initLoading) {
      fetchAvailableStats();
    }
  }, [initLoading]);

  const availableStats = data ? data.availableStats : {};

  function handleClick({ target }) {
    const { type } = target.dataset;
    const value = Number(target.dataset.value);
    if (value === 0 && type === "year") {
      setActiveMonth(0);
      setActiveYear(0);
    } else if (type === "year") {
      setActiveYear(value);
      setActiveMonth(0);
    } else {
      setActiveMonth(value);
    }
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
      <Buttons
        buttons={years}
        activeButton={activeYear}
        setActiveButton={handleClick}
        type="year"
      />
      <Buttons
        buttons={months}
        activeButton={activeMonth}
        setActiveButton={handleClick}
        type="month"
      />
    </div>
  );

  function Buttons({ buttons, activeButton, setActiveButton, type }) {
    const buttonElements = [
      { name: "All", value: 0, disabled: false },
      ...buttons,
    ].map(({ name, disabled, value }) => {
      let className = "btn-dflt";
      if (disabled) {
        className = `${className}  btn-dsbld`;
      }
      if (value === activeButton) {
        className = `${className}  btn-actv`;
      }
      return (
        <button
          data-value={value}
          data-type={type}
          className={className}
          onClick={setActiveButton}
          key={name}
          disabled={disabled}
        >
          {name}
        </button>
      );
    });
    return <div>{buttonElements}</div>;
  }
};
