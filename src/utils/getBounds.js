import mapboxgl from "mapbox-gl";

export const getBounds = (geojson) => {
  let north = -90;
  let west = 180;
  let south = 90;
  let east = -180;
  if (geojson.features) {
    geojson.features.forEach((point) => {
      const [minX, minY, maxX, maxY] = point.properties.bbox;
      north = north > maxY ? north : maxY;
      west = west < minX ? west : minX;
      south = south < minY ? south : minY;
      east = east > maxX ? east : maxX;
    });
  } else {
    [west, south, east, north] = geojson.properties.bbox;
  }
  const sw = new mapboxgl.LngLat(west, south);
  const ne = new mapboxgl.LngLat(east, north);
  const bounds = new mapboxgl.LngLatBounds(sw, ne);
  return bounds;
};
