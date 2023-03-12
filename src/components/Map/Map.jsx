import React, { useEffect, useRef, useState } from "react";
import "./Map.css";
import mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import "@mapbox/mapbox-gl-directions/src/mapbox-gl-directions.css";

/**
 * 
 * @param {{ directions: Object }} props 
 */
export default function Map(props) {


  const mapref = useRef();

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767.98px)");
    mapboxgl.accessToken = "pk.eyJ1IjoibWF4aXN0aGVtb29zZSIsImEiOiJjbGU1eHpvM24wMDdxM3NtcmZvZm54c2NxIn0.T0BxaWkslBTuJCYPqxBZbA";


    const map = new mapboxgl.Map({
      container: mapref.current,
      style: "mapbox://styles/maxisthemoose/cle97249j000i01qrk9by7zkf",
      center: [-119.69714560273233, 34.409949895900375],
      zoom: mq.matches ? 16 : 18,
    });

    map.addControl(props.directions, "top-left");

    map.on("load", (__) => {
      map.on("click", (ev) => {
        mapClick(map, ev);
      });
    });

  }, []);


  function mapClick(map, ev) {

    const features = map.queryRenderedFeatures(ev.point, {
      layers: ["brisas-restaurants", "brisas-attractions", "brisas-group"],
    });
    if (features.length < 1) return;
    const feature = features[0];


    const popupDiv = document.createElement("div");
    popupDiv.className = "map-popup-div";

    const title = document.createElement("h4");
    title.className = "popup-title title";
    title.innerText = feature.properties.title;

    const style = document.createElement("p");
    style.innerText = feature.properties.style;
    style.className = "text style";

    const hours = document.createElement("p");
    hours.innerText = feature.properties.hours;
    hours.className = "text hours";

    const address = document.createElement("p");
    address.innerText = feature.properties.address;
    address.className = 'text address';

    const website = document.createElement("a");
    website.innerText = feature.properties.website;
    website.href = `https://${feature.properties.website}`;
    website.target = "_blank";
    website.className = "text website";

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

    // popupDiv.appendChild(document.createElement("br"));

    const directionDiv = document.createElement("button");
    directionDiv.innerText = "Directions";
    directionDiv.className = "popup-directions-button directions-button";
    directionDiv.onclick = (_) => {
      props.directions.setOrigin("Brisas Del Mar, Santa Barbara, California, United States");
      props.directions.setDestination(feature.properties.address + ", Santa Barbara, California, United States");
    }

    popupDiv.appendChild(directionDiv);


    new mapboxgl.Popup({ offset: [0, -10], closeOnMove: true })
      .setLngLat(feature.geometry.coordinates)
      .setDOMContent(popupDiv)
      .addTo(map);
  }


  return (
    <div ref={mapref} className="map-container" />
  )


}