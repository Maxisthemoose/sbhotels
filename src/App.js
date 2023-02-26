import { Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Nav from './components/Nav/Nav';
import Map from "./components/Map/Map";
import MapboxDirections from "mapbox-gl";
console.log(MapboxDirections);

function App() {
  return (
    <div className="App">
      <Nav />
      <div className="content">
        <Map />
      </div>
    </div>
  );
}

export default App;
