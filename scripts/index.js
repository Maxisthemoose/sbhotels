// window.onload = (_) => {
mapboxgl.accessToken = secret;
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/maxisthemoose/cle97249j000i01qrk9by7zkf',
  center: [-119.69714560273233, 34.409949895900375],
  zoom: 18
});

const directions = new MapboxDirections({
  accessToken: mapboxgl.accessToken,
  unit: 'imperial',
  interactive: false,
});

map.addControl(directions, "top-left");

map.on("click", (ev) => {
  const features = map.queryRenderedFeatures(ev.point, {
    layers: ["brisas-restaurants"],
  });
  if (features.length < 1)
    // return directions.removeRoutes();
    return;

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

  popupDiv.appendChild(title);
  popupDiv.appendChild(style);
  popupDiv.appendChild(hours);
  popupDiv.appendChild(address);
  popupDiv.appendChild(website);
  popupDiv.appendChild(document.createElement("br"));

  const directionDiv = document.createElement("a");
  directionDiv.innerText = "Get Directions";
  directionDiv.onclick = (ev) => {
    directions.setOrigin("Brisas Del Mar, Santa Barbara, California, United States");
    directions.setDestination(feature.properties.address + ", Santa Barbara, California, United States");
  }

  popupDiv.appendChild(directionDiv);

  const popup = new mapboxgl.Popup({ offset: [0, -10], closeOnMove: true })
    .setLngLat(feature.geometry.coordinates)
    .setDOMContent(popupDiv)
    .addTo(map);

});