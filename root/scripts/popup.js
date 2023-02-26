const popup = document.querySelector(".popup-shader");
const button = document.querySelector(".search-for");
const closeButton = document.querySelector(".popup-header");
const searchBar = document.querySelector(".search-bar");
const results = document.querySelector(".search-results");
const filterButton = document.querySelector(".filter-image-container");
const filterContainer = document.querySelector(".filter-container");
// const filterText = document.querySelector(".filter-text");

button.onclick = popupSwitchState;
closeButton.onclick = popupSwitchState;
filterButton.onclick = filterSwitchState;
filterText.onclick = filterSwitchState;

function popupSwitchState() {
  if (popup.classList.contains("open")) {
    popup.classList.remove("open");
    popup.classList.add("closed");
    searchBar.value = "";
    searchBar.removeEventListener("input", listen);
  } else {
    popup.classList.add("open");
    popup.classList.remove("closed");
    searchBar.addEventListener("input", listen);

    const res = filter("");
    res.forEach(v => appendResult(results, v));

  }
}

function listen(event) {
  const text = event.target.value;
  const arr = filter(text);

  while (results.firstChild)
    results.removeChild(results.firstChild);

  arr.forEach(v =>
    appendResult(results, v)
  )

}

function filterSwitchState(ev) {
  if (filterContainer.classList.contains("open")) {
    filterContainer.classList.remove("open");
    filterContainer.classList.add("closed");
  } else {
    filterContainer.classList.remove("closed");
    filterContainer.classList.add("open");
  }
}
