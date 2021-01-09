import React, { useState, useMemo } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import { useQuery } from "@apollo/client";
import { INIT_STATS } from "./queries";
import NavBar from "./components/NavBar";
import { DateSelection } from "./components/DateSelection";
import Overview from "./pages/Overview";
import MapPage from "./pages/Map";
import { mapBoxKey } from "./config";

const Map = ReactMapboxGl({
  accessToken: mapBoxKey,
  maxZoom: 14,
});

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
        <MapPage Map={Map} />
        <Switch>
          <Route path="/" exact>
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

// const MemoMap = React.memo(
//   function ({ Map }) {
//     return <MapPage Map={Map} />;
//   },
//   () => true
// );
export default App;
