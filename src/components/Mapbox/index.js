import mapboxgl from "mapbox-gl";
import { mapBoxKey } from "../../config";
import * as turf from "@turf/turf";

mapboxgl.accessToken = mapBoxKey;

class mapboxMap {
  constructor() {
    this.element = document.createElement("div");
    this.map = {};
    this.bounds = {};
    this.isLoaded = false;
  }

  loadMap({ pointsGeoJSON, linesGeoJSON }) {
    return new Promise((resolve) => {
      this.map = new mapboxgl.Map({
        container: this.element,
        style: "mapbox://styles/mapbox/light-v10",
        maxZoom: 14,
      });

      this.bounds = getBounds(pointsGeoJSON);
      this.fitBounds();

      this.map.on("load", () => {
        this.map.addSource("points", {
          type: "geojson",
          data: pointsGeoJSON,
          cluster: true,
          clusterRadius: 60,
        });

        this.map.addSource("routes", {
          type: "geojson",
          data: linesGeoJSON,
        });

        this.map.addLayer({
          id: "routes",
          type: "line",
          source: "routes",
          layout: {
            "line-join": "round",
            "line-cap": "round",
            visibility: "visible",
          },
          paint: {
            "line-color": "rgba(255, 145, 0,.5)",
            "line-width": ["interpolate", ["linear"], ["zoom"], 10, 1, 14, 3],
          },
          minzoom: 9,
        });

        this.map.addLayer({
          id: "clusters-back",
          type: "circle",
          source: "points",
          paint: {
            "circle-color": [
              "step",
              ["number", ["get", "point_count"], 1],
              "rgba(181, 226, 140, 0.6)",
              10,
              "rgba(241, 211, 87, 0.6)",
              50,
              "rgba(253, 156, 115, 0.6)",
            ],
            "circle-radius": [
              "interpolate",
              ["linear"],
              ["number", ["get", "point_count"], 1],
              1,
              13,
              150,
              25,
            ],
            "circle-blur": 0.1,
          },
          maxzoom: 12,
        });

        this.map.addLayer({
          id: "clusters",
          type: "circle",
          source: "points",
          paint: {
            "circle-color": [
              "step",
              ["number", ["get", "point_count"], 1],
              "rgba(181, 226, 140, 0.6)",
              10,
              "rgba(241, 211, 87, 0.6)",
              50,
              "rgba(253, 156, 115, 0.6)",
            ],
            "circle-radius": [
              "interpolate",
              ["linear"],
              ["number", ["get", "point_count"], 1],
              1,
              11,
              50,
              23,
            ],
          },
          maxzoom: 12,
        });

        this.map.addLayer({
          id: "cluster-count",
          type: "symbol",
          source: "points",
          layout: {
            "text-field": ["to-string", ["number", ["get", "point_count"], 1]],
            "text-font": ["Arial Unicode MS Bold"],
            "text-size": 12,
          },
          maxzoom: 12,
        });

        this.isLoaded = true;
        resolve();
      });

      this.map.on("click", async (e) => {
        const features = this.map.queryRenderedFeatures(e.point, {
          layers: ["clusters"],
        });
        if (features.length === 0) return;
        if (features[0].properties.cluster) {
          const clusterId = features[0].properties.cluster_id;
          const clusterLeaves = await this.getClusterLeaves(clusterId);
          const clusterFC = turf.featureCollection(clusterLeaves);
          this.map.fitBounds(getBounds(clusterFC), { padding: 100 });
        } else {
          const bbox = features[0].properties.bbox;
          if (typeof bbox === "string") {
            features[0].properties.bbox = bbox
              .replace(/[\[\]]/g, "")
              .split(",")
              .map((num) => Number(num).valueOf());
          }
          const bounds = getBounds(features[0]);
          this.map.fitBounds(bounds, { padding: 100 });
        }
      });

      this.map.on("mousemove", "clusters", function (e) {
        this.getCanvas().style.cursor = "pointer";
      });

      this.map.on("mouseleave", "clusters", function () {
        this.getCanvas().style.cursor = "";
      });
    });
  }

  fitBounds() {
    this.map.fitBounds(this.bounds, { padding: 100 });
  }

  loadSource({ pointsGeoJSON, linesGeoJSON }) {
    this.map.getSource("points").setData(pointsGeoJSON);
    this.map.getSource("routes").setData(linesGeoJSON);
    this.bounds = getBounds(pointsGeoJSON);
    this.fitBounds();
  }

  getClusterLeaves(clusterId) {
    return new Promise((resolve) => {
      const source = this.map.getSource("points");
      source.getClusterLeaves(clusterId, 1000, 0, (err, aFeatures) => {
        if (err) resolve(null);
        resolve(aFeatures);
      });
    });
  }
}

const getBounds = (geojson) => {
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

export default mapboxMap;
