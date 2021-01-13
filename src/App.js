import React, { useState, useMemo } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import { useQuery } from "@apollo/client";
import { INIT_STATS } from "./queries";
import NavBar from "./components/NavBar";
import { DateSelection } from "./components/DateSelection";
import Overview from "./pages/Overview";
import MapPage from "./pages/Map";
import mapboxMap from "./components/Mapbox";

const map = new mapboxMap();

function App() {
  const [activeMonth, setActiveMonth] = useState(0);
  const [activeYear, setActiveYear] = useState(0);

  return (
    <Router>
      <div className="app">
        <header className="app-header">Activity Stats</header>
        <DateSelection
          activeMonth={activeMonth}
          activeYear={activeYear}
          setActiveMonth={setActiveMonth}
          setActiveYear={setActiveYear}
        />
        <NavBar />
        <Switch>
          <Route path="/map">
            <MapPage
              map={map}
              activeMonth={activeMonth}
              activeYear={activeYear}
            />
          </Route>
          <Route path="/" exact>
            <Overview activeMonth={activeMonth} activeYear={activeYear} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
