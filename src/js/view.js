import { getCurrentWeather, getSearchSuggestions } from "./main";

// create background and search box
(async function createView() {
	const body = document.querySelector("body");

	let searchBar = document.createElement("input");
	searchBar.classList = "search-bar";
	searchBar.setAttribute("type", "search");
	searchBar.setAttribute("placeholder", "Search");

	let card = document.createElement("div");
	body.append(searchBar, card);
})();

// Load the default city and add event listener to the search box for input
window.addEventListener("load", (event) => {
	const searchbar = document.querySelector('input[type="search"]');
	searchbar.addEventListener("search", function (e) {
		renderWeatherCard(searchbar.value);
	});
	// default city
	renderWeatherCard("lagos");
});

// Render the card with city data or show card with error
async function renderWeatherCard(city) {
	const card = document.querySelector("body > div");
	let data = await getCurrentWeather(city);
	card.innerHTML = loadingAnimation();

	if (data && data.status == "found") {
		card.innerHTML = createWeatherCard(data);
	} else if (data && data.status !== "not_found") {
		card.innerHTML = loadErrorInfo(data.message);
	}
}

// Weather Info Card
function createWeatherCard(data) {
	console.log(data);
	return `
    <div class="weathercard">
      <div>
      <div class="weathercard__condition-text">${data.condition_text}</div>
      <div class="weathercard__name">${data.name}, ${data.region}, <span>${data.country}</span></div>
      <div class="weathercard__time">${data.time}</div>
      </div>

      <div>
        <div class="weathercard__condition-icon">
          <img src="${data.condition_icon}" alt="Weather Icon">
        </div>
        <div class="div_wrapper">
          <div class="weathercard__temp">${data.temp_c}<sup>oC</sup></div>
          <div></div>
          <div>
            <div class="weathercard__humidity">Humidity: <span>${data.humidity}</span></div>
            <div class="weathercard__wind">Wind: <span>${data.wind_kph}kph</span></div>
            <div class="weathercard__pressure">Pressure: <span>${data.pressure_in} in</span></div>
            <div class="weathercard__feelslike">Feels like <span>${data.feelslike} deg</span></div>
          </div>
        </div>
      </div>

      <div class="weathercard__footer">
      <div class="weathercard__maxtemp">Max Temp: <span>${data.maxtemp_c}</span></div>
      <div class="weathercard__mintemp">Min Temp: <span>${data.mintemp_c}</span></div>
      <div class="weathercard__date">Date: <span>${data.date}</span></div>
      </div>

    </div>
    `;
}
// Loading Animation
function loadingAnimation() {
	return `<div class="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`;
}
// Error Card
function loadErrorInfo(info) {
	return `<div class="error_info">${info}</div>`;
}
