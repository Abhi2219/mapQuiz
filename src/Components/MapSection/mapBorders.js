import indiaStatesGeoJSON from "./indiaState.json";
import indiaStatesCitysGeoJSON from "./indiaStateCitys.json";

export function mapBorders(map) {
  if (map.current) {
    map.current.addSource("india-states-citys-boundary", {
      type: "geojson",
      data: indiaStatesCitysGeoJSON,
    });

    map.current.addLayer({
      id: "india-states-citys-boundary",
      type: "line",
      source: "india-states-citys-boundary",
      paint: {
        "line-color": "#000000",
        "line-width": 0.5,
      },
    });

    map.current.addSource("india-states-boundary", {
      type: "geojson",
      data: indiaStatesGeoJSON,
    });

    map.current.addLayer({
      id: "india-states-boundary",
      type: "line",
      source: "india-states-boundary",
      paint: {
        "line-color": "#ffff00",
        "line-width": 1.5,
      },
    });
  }
}
