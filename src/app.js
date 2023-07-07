function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let weatherForecast = response.data.daily;
  let forecast = document.querySelector("#weather-forecast");
  let forecastHTML = `<div class="row align-items-end">`;
  weatherForecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
          <div class="col">
            <strong>${formatDay(forecastDay.dt)}</strong>
            <br />
            <span class="max-temp">${Math.round(forecastDay.temp.max)}°C</span>
            <span class="min-temp">${Math.round(forecastDay.temp.min)}°C</span>
            <br />
            <img
              src="https://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png"
              alt=""
              width="90"
            />
          </div>
        `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "7784a4cd4aa2e0c25ead7bd96d585b8a";
  let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(url).then(displayForecast);
}

function currentCityTemp(response) {
  celciusTemp = Math.round(response.data.main.temp);
  let humid = Math.round(response.data.main.humidity);
  let windy = Math.round(response.data.wind.speed);
  let condition = response.data.weather[0].description;
  let emoji = response.data.weather[0].icon;
  let temperature = document.querySelector("#current-temp");
  let humidity = document.querySelector("#precipitation");
  let wind = document.querySelector("#wind");
  let description = document.querySelector("#description");
  let icon = document.querySelector("#icon");
  temperature.innerHTML = celciusTemp;
  humidity.innerHTML = `${humid}`;
  wind.innerHTML = `${windy}`;
  description.innerHTML = `${condition}`;
  icon.setAttribute("src", `https://openweathermap.org/img/wn/${emoji}@2x.png`);
  icon.setAttribute("alt", condition);

  getForecast(response.data.coord);
}

function citySearch(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-search-box");
  let h1 = document.querySelector("#current-city");
  let apiKey = "7784a4cd4aa2e0c25ead7bd96d585b8a";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;
  h1.innerHTML = `${cityInput.value}`;
  axios.get(url).then(currentCityTemp);
}

function changeHeader(response) {
  celciusTemp = Math.round(response.data.main.temp);
  let city = response.data.name;
  let humid = Math.round(response.data.main.humidity);
  let windy = Math.round(response.data.wind.speed);
  let condition = response.data.weather[0].description;
  let emoji = response.data.weather[0].icon;
  let h1 = document.querySelector("#current-city");
  let temperature = document.querySelector("#current-temp");
  let humidity = document.querySelector("#precipitation");
  let wind = document.querySelector("#wind");
  let description = document.querySelector("#description");
  let icon = document.querySelector("#icon");
  h1.innerHTML = `${city}`;
  temperature.innerHTML = celciusTemp;
  humidity.innerHTML = `${humid}`;
  wind.innerHTML = `${windy}`;
  description.innerHTML = `${condition}`;
  icon.setAttribute("src", `https://openweathermap.org/img/wn/${emoji}@2x.png`);
  icon.setAttribute("alt", condition);

  getForecast(response.data.coord);
}

function myLocation(position) {
  let apiKey = "1ee4264117b73d2263eecd562f31ef5c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(changeHeader);
}

function clickButton(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(myLocation);
}

function changeToCelcius(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#current-temp");
  currentTemperature.innerHTML = celciusTemp;
  celciusButton.classList.add("active");
  fahrenheitButton.classList.remove("active");
}

function changeToFahrenheit(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#current-temp");
  let fahrenheit = (celciusTemp * 9) / 5 + 32;
  currentTemperature.innerHTML = Math.round(fahrenheit);
  celciusButton.classList.remove("active");
  fahrenheitButton.classList.add("active");
}

let celciusTemp = null;

let now = new Date();
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
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}
let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = `${day} ${hour}:${minute}`;

let button = document.querySelector("#geo-location-button");
button.addEventListener("click", clickButton);

let form = document.querySelector("#city-search-form");
form.addEventListener("submit", citySearch);

let celciusButton = document.querySelector("#celcius");
celciusButton.addEventListener("click", changeToCelcius);

let fahrenheitButton = document.querySelector("#fahrenheit");
fahrenheitButton.addEventListener("click", changeToFahrenheit);
