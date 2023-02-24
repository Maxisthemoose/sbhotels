
/**
 * 
 * @param {HTMLElement} parent 
 * @param {data[0]} dataValue 
 */
function appendResult(parent, dataValue) {

  const result = document.createElement("div");
  result.className = "restaurant-result";

  const title = document.createElement("h3");
  title.innerText = dataValue.properties.title;

  title.onclick = (ev) => {
    popup.classList.remove("open");
    popup.classList.add("closed");
    directions.setOrigin("Brisas Del Mar, Santa Barbara, California, United States");
    directions.setDestination(dataValue.properties.address + ", Santa Barbara, California, United States");
  }

  const style = document.createElement("p");
  style.innerText = dataValue.properties.style;

  const hours = document.createElement("p");
  hours.innerText = dataValue.properties.hours;

  const address = document.createElement("p");
  address.innerText = dataValue.properties.address;

  const website = document.createElement("a");
  website.innerText = dataValue.properties.website;
  website.href = `https://${dataValue.properties.website}`;
  website.target = "_blank";


  result.appendChild(title);
  result.appendChild(style);
  result.appendChild(hours);
  result.appendChild(address);
  result.appendChild(website);

  parent.appendChild(result);

}