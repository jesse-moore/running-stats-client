import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { INIT_STATS } from "./queries";
import NavBar from "./components/NavBar";
import { DateSelection } from "./components/DateSelection";
import Overview from "./pages/Overview";
import Map from "./pages/Map";

function App() {
  const [activeMonth, setActiveMonth] = useState(0);
  const [activeYear, setActiveYear] = useState(0);
  const { loading } = useQuery(INIT_STATS, {
    variables: { year: 0, month: 0 },
  });
  return (
    <Router>
      <div className="app">
        <header className="app-header">Activity Stats</header>
        <DateSelection
          initLoading={loading}
          activeMonth={activeMonth}
          activeYear={activeYear}
          setActiveMonth={setActiveMonth}
          setActiveYear={setActiveYear}
        />
        <NavBar />
        <Switch>
          <Route path="/map">
            <Map />
          </Route>
          <Route path="/">
            <Overview
              initLoading={loading}
              activeMonth={activeMonth}
              activeYear={activeYear}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
export default App;
