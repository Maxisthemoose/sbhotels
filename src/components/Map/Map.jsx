import React from "react";
import "./Map.css";
import mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import "@mapbox/mapbox-gl-directions/src/mapbox-gl-directions.css";
mapboxgl.accessToken = "pk.eyJ1IjoibWF4aXN0aGVtb29zZSIsImEiOiJjbGU1eHpvM24wMDdxM3NtcmZvZm54c2NxIn0.T0BxaWkslBTuJCYPqxBZbA";
export default class Map extends React.Component {

  /**
   * 
   * @param {{ directions: Object }} props 
   */
  constructor(props) {
    super(props);

    const mq = window.matchMedia("(max-width: 767.98px)");

    this.state = {
      lng: -119.69714560273233,
      lat: 34.409949895900375,
      zoom: mq.matches ? 16 : 18,
    }

    this.mapContainer = React.createRef();
  }

  componentDidMount() {
    const { lng, lat, zoom } = this.state;
    const map = new mapboxgl.Map({
      container: this.mapContainer.current,
      style: "mapbox://styles/maxisthemoose/cle97249j000i01qrk9by7zkf",
      center: [lng, lat],
      zoom,
    });

    map.addControl(this.props.directions, "top-left");

    map.on("load", (ev) => {
      map.on("click", (ev) => {

        const features = map.queryRenderedFeatures(ev.point, {
          layers: ["brisas-restaurants", "brisas-attractions", "brisas-group"],
        });
        if (features.length < 1) return;
        const feature = features[0];


        const popupDiv = document.createElement("div");
        const title = document.createElement("h3");
        title.innerText = feature.properties.title;

        const style = document.createElement("p");
        style.innerText = feature.properties.style;

        const hours = document.createElement("p");
        hours.innerText = feature.properties.hours;

        const address = document.createElement("p");
        address.innerText = feature.properties.address;

        const website = document.createElement("a");
        website.innerText = feature.properties.website;
        website.href = `https://${feature.properties.website}`;
        website.target = "_blank";



        if (feature.properties.title !== undefined)
          popupDiv.appendChild(title);

        if (feature.properties.style !== undefined)
          popupDiv.appendChild(style);

        if (feature.properties.hours !== undefined)
          popupDiv.appendChild(hours);

        if (feature.properties.address !== undefined)
          popupDiv.appendChild(address);

        if (feature.properties.website !== undefined)
          popupDiv.appendChild(website);

        popupDiv.appendChild(document.createElement("br"));

        const directionDiv = document.createElement("a");
        directionDiv.innerText = "Get Directions";
        directionDiv.onclick = (ev) => {
          this.props.directions.setOrigin("Brisas Del Mar, Santa Barbara, California, United States");
          this.props.directions.setDestination(feature.properties.address + ", Santa Barbara, California, United States");
        }

        popupDiv.appendChild(directionDiv);


        new mapboxgl.Popup({ offset: [0, -10], closeOnMove: true })
          .setLngLat(feature.geometry.coordinates)
          .setDOMContent(popupDiv)
          .addTo(map);

      });

    });

  }

  render() {
    return (
      <div ref={this.mapContainer} className="map-container" />
    )
  }

}