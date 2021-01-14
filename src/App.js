import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import useCheckMobile from "./helpers/checkMobile";
import NavBar from "./components/NavBar";
import DateSelection from "./components/DateSelection";
import DateSelectionMobile from "./components/DateSelectionMobile";
import Overview from "./pages/Overview";
import MapPage from "./pages/Map";
import mapboxMap from "./components/Mapbox";

const map = new mapboxMap();

function App() {
  const [activeMonth, setActiveMonth] = useState(0);
  const [activeYear, setActiveYear] = useState(0);
  const isMobile = useCheckMobile();

  return (
    <Router>
      <div className="app bg-gray-300 relative flex flex-col max-w-screen-lg my-2 mx-auto rounded">
        <header className="py-2 text-3xl rounded rounded-b-none text-center">
          Activity Stats
        </header>
        {isMobile ? (
          <DateSelectionMobile
            activeMonth={activeMonth}
            activeYear={activeYear}
            setActiveMonth={setActiveMonth}
            setActiveYear={setActiveYear}
          />
        ) : (
          <DateSelection
            activeMonth={activeMonth}
            activeYear={activeYear}
            setActiveMonth={setActiveMonth}
            setActiveYear={setActiveYear}
          />
        )}

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
