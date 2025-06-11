const API_key = "e52aafe5fff37ef227983c52cd946709";
const container1 = document.getElementById("container-1");
const container3 = document.getElementById("container-3");

//--------------------------------------------------------------------------------------------

const cityInput = document.getElementById("search-city");
const searchButton = document.getElementById("search-button");

searchButton.addEventListener("click", printGeocoding);

//--------------------------------------------------------------------------------------------

async function printGeocoding() {
  const city_name = cityInput.value;
  let limit = "1";
  const GEOCODING_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${city_name}&limit=${limit}&appid=${API_key}`;

  let response = await fetch(GEOCODING_URL, { method: "GET" });
  let json = await response.json();

  console.log(json);

  printWeather(json[0]);
}

//--------------------------------------------------------------------------------------------

async function printWeather(geocoding_json) {
  const lat = geocoding_json.lat;
  const lon = geocoding_json.lon;

  const OPENWEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}&units=metric`;

  let response = await fetch(OPENWEATHER_URL, { method: "GET" });
  let json = await response.json();

  console.log(json);

  const cityNameLabel = document.getElementById("city-name");
  const countryNameLabel = document.getElementById("country-name");
  const tempLabel = document.getElementById("temp");
  const conditionLabel = document.getElementById("condition");

  cityNameLabel.innerText = geocoding_json.name;
  countryNameLabel.innerText = geocoding_json.state;
  tempLabel.innerText = Math.round(json.main.temp) + "°C";
  conditionLabel.innerText = json.weather[0].description;

  setBG(json.weather[0].description);
}

function setBG(condition) {
  const bg = document.getElementById("container-3");
  const weatherIcon = document.getElementById("weather-icon");
  const conditionLower = condition.toLowerCase();

  weatherIcon.className = "weather-icon";

  if (conditionLower.includes("thunderstorm")) {
    bg.style.background = `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url("./graphics/Thunderstorms.png")`;
    weatherIcon.innerHTML = '<i class="fas fa-bolt"></i>';
    weatherIcon.classList.add("thunderstorm");
  } else if (conditionLower.includes("rain")) {
    bg.style.background = `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url("./graphics/Rainy.png")`;
    weatherIcon.innerHTML = '<i class="fas fa-cloud-rain"></i>';
    weatherIcon.classList.add("rainy");
  } else if (conditionLower.includes("cloud")) {
    bg.style.background = `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url("./graphics/Cloudy.png")`;
    weatherIcon.innerHTML = '<i class="fas fa-cloud"></i>';
    weatherIcon.classList.add("cloudy");
  } else {
    bg.style.background = `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url("./graphics/Sunny.png")`;
    weatherIcon.innerHTML = '<i class="fas fa-sun"></i>';
    weatherIcon.classList.add("sunny");
  }

  weatherIcon.style.animation = "none";
  weatherIcon.style.animation = null;
}
