import { Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Nav from './components/Nav/Nav';
import Map from "./components/Map/Map";
import MapboxDirections from "mapbox-gl";
import LocationDropdown from './components/LocationDropdown/LocationDropdown';
console.log(MapboxDirections);

function App() {
  return (
    <div className="App">
      <Nav />
      <div className="content">
        <Map />
        <div className="attractions-dropdown-container">
          {
            ["Restaurants", "Attractions", "Landmarks"].map((value, i) => (
              <LocationDropdown type={value} />
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default App;
