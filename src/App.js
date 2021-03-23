import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import useCheckMobile from "./helpers/checkMobile";
import NavBar from "./components/NavBar";
import NavBarMobile from "./components/NavBarMobile";
import DateSelection from "./components/DateSelection";
import DateSelectionMobile from "./components/DateSelectionMobile";
import Overview from "./pages/Overview";
import MapPage from "./pages/Map";
import List from "./pages/List";
import mapboxMap from "./components/Mapbox";

const map = new mapboxMap();

function App() {
  const [activeMonth, setActiveMonth] = useState(null);
  const [activeYear, setActiveYear] = useState(null);
  const [unit, setUnit] = useState("metric");
  const isMobile = useCheckMobile();

  return (
    <Router>
      <div className="app bg-blueGray-100 relative flex flex-col max-w-4xl mt-2 mx-auto rounded shadow pb-8">
        {isMobile ? (
          <>
            <NavBarMobile unit={unit} setUnit={setUnit} />
            <DateSelectionMobile
              activeMonth={activeMonth}
              activeYear={activeYear}
              setActiveMonth={setActiveMonth}
              setActiveYear={setActiveYear}
            />
          </>
        ) : (
          <>
            <NavBar unit={unit} setUnit={setUnit} />
            <DateSelection
              activeMonth={activeMonth}
              activeYear={activeYear}
              setActiveMonth={setActiveMonth}
              setActiveYear={setActiveYear}
            />
          </>
        )}

        <Switch>
          <Route path="/map">
            <MapPage
              map={map}
              activeMonth={activeMonth}
              activeYear={activeYear}
            />
          </Route>
          <Route path="/list" exact>
            <List
              activeMonth={activeMonth}
              activeYear={activeYear}
              unit={unit}
            />
          </Route>
          <Route path="/" exact>
            <Overview
              activeMonth={activeMonth}
              activeYear={activeYear}
              unit={unit}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
