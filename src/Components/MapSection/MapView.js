import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { mapLayers } from "./mapLayers";
import { mapBorders } from "./mapBorders";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const MapView = ({ quizData, currentQuestion, handleAnswer, quizStart }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (quizData.length > 0 && !map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: process.env.REACT_APP_STYLE,
        // style: "mapbox://styles/mapbox/satellite-streets-v11",
        center: JSON.parse(process.env.REACT_APP_COORDINATE),
        zoom: 3.5,
      });
      map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

      map.current.on("load", () => {
        // This function blurs other countries
        mapLayers(map);
        // This function adds borders to cities and states
        mapBorders(map);
        map.current.addSource("places", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: quizData.map((item) => ({
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: item.answerCoordinates,
              },
              properties: {
                title: item.name,
                description: item.question,
              },
            })),
          },
        });

        map.current.addLayer({
          id: "places-layer",
          type: "symbol",
          source: "places",
          layout: {
            "icon-image": "marker-15",
            "text-field": ["get", "title"],
            "text-font": ["Open Sans Medium", "Arial Unicode MS Regular"],
            "text-offset": [0, 1.5],
            "text-size": 8,
            "text-anchor": "top",
          },
          paint: {
            "text-color": "#000000",
            "text-halo-color": "#ffffff",
            "text-halo-width": 2,
          },
        });
      });
    }
  }, [quizData]);

  useEffect(() => {
    if (map.current && quizData.length > 0 && quizStart) {
      const handleMapClick = async (e) => {
        const { lng, lat } = e.lngLat;

        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`
        );
        const data = await response.json();

        const city = data.features.find((feature) =>
          feature.place_type.includes("place")
        );
        handleAnswer(city.text);
      };

      map.current.on("click", handleMapClick);

      return () => {
        map.current.off("click", handleMapClick);
      };
    }
  }, [quizData, currentQuestion, handleAnswer, quizStart]);

  return <div className="map-container" ref={mapContainer} />;
};

export default MapView;
