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
  hour = `0${hours}`;
}
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}
let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = `${day} ${hour}:${minute}`;

function currentCityTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let humid = Math.round(response.data.main.humidity);
  let windy = Math.round(response.data.wind.speed);
  let condition = response.data.weather[0].description;
  let emoji = response.data.weather[0].icon;
  let temp = document.querySelector("#current-temp");
  let humidity = document.querySelector("#precipitation");
  let wind = document.querySelector("#wind");
  let description = document.querySelector("#description");
  let icon = document.querySelector("#icon");
  temp.innerHTML = `${temperature}`;
  humidity.innerHTML = `${humid}`;
  wind.innerHTML = `${windy}`;
  description.innerHTML = `${condition}`;
  icon.setAttribute("src", `https://openweathermap.org/img/wn/${emoji}@2x.png`);
  icon.setAttribute("alt", condition);
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
  let h1 = document.querySelector("#current-city");
  let temperature = document.querySelector("#current-temp");
  let humidity = document.querySelector("#precipitation");
  let wind = document.querySelector("#wind");
  let description = document.querySelector("#description");
  let icon = document.querySelector("#icon");
  let temp = Math.round(response.data.main.temp);
  let city = response.data.name;
  let humid = Math.round(response.data.main.humidity);
  let windy = Math.round(response.data.wind.speed);
  let condition = response.data.weather[0].description;
  let emoji = response.data.weather[0].icon;
  h1.innerHTML = `${city}`;
  temperature.innerHTML = `${temp}`;
  humidity.innerHTML = `${humid}`;
  wind.innerHTML = `${windy}`;
  description.innerHTML = `${condition}`;
  icon.setAttribute("src", `https://openweathermap.org/img/wn/${emoji}@2x.png`);
  icon.setAttribute("alt", condition);
}
function myLocation(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(changeHeader);
}
function clickButton(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(myLocation);
}
let button = document.querySelector("#geo-location-button");
button.addEventListener("click", clickButton);

let form = document.querySelector("#city-search-form");
form.addEventListener("submit", citySearch);

function changeToCelcius(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#current-temp");
  currentTemperature.innerHTML = "18";
}
function changeToFarenheit(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#current-temp");
  currentTemperature.innerHTML = "64";
}
let celciusButton = document.querySelector("#celcius");
celciusButton.addEventListener("click", changeToCelcius);

let farenheitButton = document.querySelector("#farenheit");
farenheitButton.addEventListener("click", changeToFarenheit);
