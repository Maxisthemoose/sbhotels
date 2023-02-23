window.onload = (_) => {
  mapboxgl.accessToken = 'pk.eyJ1IjoibWF4aXN0aGVtb29zZSIsImEiOiJjbGU1eHpvM24wMDdxM3NtcmZvZm54c2NxIn0.T0BxaWkslBTuJCYPqxBZbA';
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



  const searchBox = document.querySelector(".search");
  const resultsDiv = document.querySelector(".results");

  searchBox.addEventListener("submit", (ev) => {
    ev.preventDefault();
  });

  searchBox.addEventListener("input", (ev) => {
    while (resultsDiv.firstChild) {
      resultsDiv.removeChild(resultsDiv.firstChild);
    }
    const searchValue = ev.target.value;
    if (searchValue.trim() === "") return;
    let values = data.filter(v => v.properties.title.toLowerCase().includes(searchValue.toLowerCase()));

    values = values.slice(0, 7);

    if (values.length > 0) {
      for (const v of values) {
        const result = document.createElement("div");
        result.className = "restaurant-result";

        const title = document.createElement("h3");
        title.innerText = v.properties.title;

        title.onclick = (ev) => {
          directions.setOrigin("Brisas Del Mar, Santa Barbara, California, United States");
          directions.setDestination(v.properties.address + ", Santa Barbara, California, United States");
        }

        const style = document.createElement("p");
        style.innerText = v.properties.style;

        const hours = document.createElement("p");
        hours.innerText = v.properties.hours;

        const address = document.createElement("p");
        address.innerText = v.properties.address;

        const website = document.createElement("a");
        website.innerText = v.properties.website;
        website.href = `https://${v.properties.website}`;
        website.target = "_blank";


        result.appendChild(title);
        result.appendChild(style);
        result.appendChild(hours);
        result.appendChild(address);
        result.appendChild(website);

        resultsDiv.appendChild(result);

      }
    } else {
      const noResults = document.createElement("p");
      noResults.innerText = "No Results Found";
    }
  });



}