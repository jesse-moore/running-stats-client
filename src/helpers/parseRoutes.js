import polyUtil from "@mapbox/polyline";
import * as turf from "@turf/turf";

export default ({ activities }) => {
  const points = [];
  const polylines = [];
  activities.forEach((activity) => {
    const { map, start_latlng } = activity;
    if (!start_latlng || !start_latlng.lat || !start_latlng.lng) return;
    if (!map.summary_polyline) return;
    const { bbox, lineFeature } = parseRoute(map.summary_polyline);
    const point = parsePoint({ ...start_latlng, bbox });
    polylines.push(lineFeature);
    points.push(point);
  });

  const linesGeoJSON = {
    type: "FeatureCollection",
    features: polylines,
  };

  const pointsGeoJSON = {
    type: "FeatureCollection",
    features: points,
  };

  return { pointsGeoJSON, linesGeoJSON };
};

const parsePoint = ({ lat, lng, bbox }) => {
  return {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [lng, lat],
    },
    properties: {
      bbox,
    },
  };
};

const parseRoute = (summary_polyline) => {
  const polyline = polyUtil.toGeoJSON(summary_polyline);
  const lineFeature = {
    type: "Feature",
    geometry: polyline,
  };
  const bbox = turf.bbox(lineFeature);
  return { lineFeature, bbox };
};
