import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { INIT_STATS } from "./queries";
import Overview from "./pages/overview";

function App() {
  const { loading } = useQuery(INIT_STATS, {
    variables: { year: 0, month: 0 },
  });
  return (
    <div className="app">
      <header className="app-header">Activity Stats</header>
      <Overview initLoading={loading} />
    </div>
  );
}
export default App;
