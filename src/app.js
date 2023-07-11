function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let weatherForecast = response.data.daily;
  console.log(response);
  let forecast = document.querySelector("#weather-forecast");
  let forecastHTML = `<div class="row align-items-end">`;
  weatherForecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
          <div class="col">
            <strong>${formatDay(forecastDay.time)}</strong>
            <br />
            <span class="max-temp">${Math.round(
              forecastDay.temperature.maximum
            )}°C</span>
            <span class="min-temp">${Math.round(
              forecastDay.temperature.minimum
            )}°C</span>
            <br />
            <img
            src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
              forecastDay.condition.icon
            }.png"
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
  let apiKey = "34f2a007t4073b7ac44010a0e7f0b6co";
  let url = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
  axios.get(url).then(displayForecast);
}

function currentCityTemp(response) {
  celciusTemp = Math.round(response.data.temperature.current);
  let humid = Math.round(response.data.temperature.humidity);
  let windy = Math.round(response.data.wind.speed);
  let condition = response.data.condition.description;
  let emoji = response.data.condition.icon;
  let temperature = document.querySelector("#current-temp");
  let humidity = document.querySelector("#precipitation");
  let wind = document.querySelector("#wind");
  let description = document.querySelector("#description");
  let icon = document.querySelector("#icon");
  temperature.innerHTML = celciusTemp;
  humidity.innerHTML = `${humid}`;
  wind.innerHTML = `${windy}`;
  description.innerHTML = `${condition}`;
  icon.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${emoji}.png`
  );
  icon.setAttribute("alt", condition);

  getForecast(response.data.coordinates);
}

function citySearch(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-search-box");
  let h1 = document.querySelector("#current-city");
  let apiKey = "34f2a007t4073b7ac44010a0e7f0b6co";
  let url = `https://api.shecodes.io/weather/v1/current?query=${cityInput.value}&key=${apiKey}&units=metric`;
  h1.innerHTML = `${cityInput.value}`;
  axios.get(url).then(currentCityTemp);
}

function changeHeader(response) {
  celciusTemp = Math.round(response.data.temperature.current);
  let city = response.data.city;
  let humid = Math.round(response.data.temperature.humidity);
  let windy = Math.round(response.data.wind.speed);
  let condition = response.data.condition.description;
  let emoji = response.data.condition.icon;
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
  icon.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${emoji}.png`
  );
  icon.setAttribute("alt", condition);

  getForecast(response.data.coordinates);
}

function myLocation(position) {
  let apiKey = "34f2a007t4073b7ac44010a0e7f0b6co";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;
  axios.get(url).then(changeHeader);
}

function clickButton(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(myLocation);
}

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
