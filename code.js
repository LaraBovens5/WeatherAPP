// Date and hour changer
let now = new Date();
let dateTime = document.querySelector(".dayTime");
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

dateTime.innerHTML = `${day}, ${hours}:${minutes}`;

// Weather API
function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector(".searchBar");
  let city = document.querySelector(".city");
  if (searchInput.value) {
    city.innerHTML = `${searchInput.value}`;
  } else {
    city.innerHTML = null;
    alert("Please type your city");
  }

  let units = "metric";
  let apiKey = "07c827efc38dec62f78359db1f1b4e72";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=${units}`;

  function searchTemperature(response) {
    document.querySelector(".city").innerHTML = response.data.name;

    let country = response.data.sys.country;
    city.innerHTML = `${searchInput.value}, ${country}`;

    celsiusTemperature = response.data.main.temp;

    let currentCityTemperature = Math.round(response.data.main.temp);
    let currentTemperature = document.querySelector(".currentTemp");
    currentTemperature.innerHTML = `${currentCityTemperature}`;

    let inSky = response.data.weather[0].main;
    let inTheSky = document.querySelector(".description");
    inTheSky.innerHTML = inSky;

    let humid = response.data.main.humidity;
    let currentHumidity = document.querySelector(".humidity");
    currentHumidity.innerHTML = `Humidity: ${humid}%`;

    let windSpeed = Math.round(response.data.wind.speed);
    let currentWindSpeed = document.querySelector(".wind");
    currentWindSpeed.innerHTML = `Wind speed: ${windSpeed} km/hr`;

    let minTemp = Math.round(response.data.main.temp_min);
    let maxTemp = Math.round(response.data.main.temp_max);

    let currentMinTemp = document.querySelector(".min");
    let currentMaxTemp = document.querySelector(".max");

    currentMinTemp.innerHTML = `Min: ${minTemp}°C`;
    currentMaxTemp.innerHTML = `Max: ${maxTemp}°C`;

    let iconElement = document.querySelector(".icon");
    iconElement.setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  }
  axios.get(apiUrl).then(searchTemperature);
}

let form = document.querySelector("#search-bar");
form.addEventListener("submit", search);

// Unit conversion
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".currentTemp");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}
function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".currentTemp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector(".fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector(".celsius");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

// Geolocation API
function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "07c827efc38dec62f78359db1f1b4e72";

  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  axios.get(url).then(showWeather);
}

function showCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
let button = document.querySelector("#currentyCity");
button.addEventListener("click", showCurrentPosition);
