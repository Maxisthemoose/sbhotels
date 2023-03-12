import React, { useState } from "react";
import Map from "../components/Map/Map";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import LocationDropdown from '../components/LocationDropdown/LocationDropdown';
// import { Outlet } from "react-router-dom";

export default function DirectionsMap(props) {

  const [accessToken, _] = useState("pk.eyJ1IjoibWF4aXN0aGVtb29zZSIsImEiOiJjbGU1eHpvM24wMDdxM3NtcmZvZm54c2NxIn0.T0BxaWkslBTuJCYPqxBZbA");
  const [directions, __] = useState(new MapboxDirections({
    accessToken: accessToken,
    interactive: false,
    flyTo: true,
  }));

  return (
    <div className="content">
      <div className="mapbox-container">
        <Map directions={directions} />
      </div>
      <div className="attractions-dropdown-container">
        {
          ["Restaurants", "Attractions", "Activities"].map((value, i) => (
            <LocationDropdown type={value} directions={directions} />
          ))
        }
      </div>
    </div>
  )
}