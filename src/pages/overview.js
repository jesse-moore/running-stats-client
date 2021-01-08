import React, { useState, useEffect } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
import { INIT_STATS } from "../queries";
import { DateSelection } from "../components/DateSelection";
import { Stats } from "../components/Stats";
import Loading from "../components/Loading";

const Overview = ({ initLoading, activeYear, activeMonth }) => {
  return (
    <div className="page-container">
      {initLoading && <Loading />}
      <Stats
        activeMonth={activeMonth}
        activeYear={activeYear}
        initLoading={initLoading}
      />
    </div>
  );
};

export default Overview;
