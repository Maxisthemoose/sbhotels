import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Nav from './components/Nav/Nav';
import Map from "./components/Map/Map";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import LocationDropdown from './components/LocationDropdown/LocationDropdown';

function App() {

  const [accessToken, _] = useState("pk.eyJ1IjoibWF4aXN0aGVtb29zZSIsImEiOiJjbGU1eHpvM24wMDdxM3NtcmZvZm54c2NxIn0.T0BxaWkslBTuJCYPqxBZbA");
  const [directions, __] = useState(new MapboxDirections({
    accessToken: accessToken,
    interactive: false,
    flyTo: true,
  }));

  return (
    <div className="App">
      <Nav />
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
    </div>
  );

}

export default App;
