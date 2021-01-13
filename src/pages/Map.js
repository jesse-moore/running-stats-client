import React, { useEffect, useRef } from "react";
import { useLazyQuery } from "@apollo/client";
import { ROUTES } from "../queries/index";
import parseRoutes from "../helpers/parseRoutes";

import Loading from "../components/Loading";

const MapPage = ({ activeMonth, activeYear, map }) => {
  const [fetchRoutes, { data, loading, error }] = useLazyQuery(ROUTES, {
    variables: {
      year: activeYear,
      month: activeMonth,
    },
  });

  const mapContainer = useRef(null);

  useEffect(async () => {
    mapContainer.current.appendChild(map.element);
  }, []);

  useEffect(async () => {
    if (loading || error || !data) return;
    const { pointsGeoJSON, linesGeoJSON } = parseRoutes(data);
    if (!map.isLoaded) {
      await map.loadMap({ pointsGeoJSON, linesGeoJSON });
    } else {
      map.loadSource({ pointsGeoJSON, linesGeoJSON });
    }
  }, [data, error, loading]);

  useEffect(() => {
    fetchRoutes();
  }, [activeYear, activeMonth]);

  return (
    <div className="page-container">
      {loading && <Loading />}
      <div className="map-container" ref={mapContainer}>
        <button
          onClick={() => map.fitBounds()}
          id="btn-fit-bounds"
          className="btn-dflt"
        >
          Fit All Activities
        </button>
      </div>
    </div>
  );
};

export default MapPage;
