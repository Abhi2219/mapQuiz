import geoJSONExceptIndia from "./geoJsonExceptIndia.json";
import oceansGeoJSON from "./geoJsonOceans.json";

export function mapLayers(map) {
  if (map.current) {
    map.current.addSource("blur-boundary", {
      type: "geojson",
      data: geoJSONExceptIndia,
    });

    map.current.addLayer({
      id: "blur-boundary",
      type: "fill",
      source: "blur-boundary",
      paint: {
        "fill-color": "#ffffff",
        "fill-opacity": 0.8,
      },
    });

    map.current.addSource("blur-oceans", {
      type: "geojson",
      data: oceansGeoJSON,
    });

    map.current.addLayer({
      id: "blur-oceans",
      type: "fill",
      source: "blur-oceans",
      paint: {
        "fill-color": "#ffffff",
        "fill-opacity": 0.8,
      },
    });
  }
}
