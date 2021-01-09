import React, { useEffect, useState, useRef } from "react";
import { useLazyQuery } from "@apollo/client";
import { useLocation } from "react-router-dom";
import * as turf from "@turf/turf";
import mapboxgl from "mapbox-gl";
import { ROUTES } from "../queries/index";
import { mapBoxKey } from "../config";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";

const MapPage = ({ activeMonth, activeYear, Map }) => {
  const [fetchRoutes, { data, loading }] = useLazyQuery(ROUTES);
  const [map, setMap] = useState(null);
  const location = useLocation();
  const isActive = location.pathname === "/map";

  useEffect(() => {
    if (isActive && map) {
        map.resize();
        // fetchRoutes();
    }
    // mapboxgl.accessToken = mapBoxKey;
    // const map = new mapboxgl.Map({
    //   container: mapContainer.current,
    //   style: "mapbox://styles/mapbox/light-v10",
    //   center: [-94.146, 36.203],
    //   zoom: 14,
    //   maxZoom: 14,
    // });
    const canvas = document.getElementById;
  }, []);
  console.log("RENDERED");

  return (
    <div
      className={
        isActive
          ? `page-container mapContainer`
          : "page-container mapContainer hidden"
      }
      id="mapContainer"
    >
      <Map
        className="mapContainer"
        style="mapbox://styles/mapbox/light-v10"
        center={[-94.146, 36.203]}
        zoom={[14]}
        onStyleLoad={(_, event) => {
          setMap(event.target);
        }}
      />
    </div>
  );
};

// export default MapPage;
export default React.memo(
  ({ activeMonth, Map }) => {
    return <MapPage activeMonth={activeMonth} Map={Map} />;
  },
  () => true
);
