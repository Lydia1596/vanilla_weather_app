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

function citySearch(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-search-box");
  let h1 = document.querySelector("#current-city");
  h1.innerHTML = `${cityInput.value}`;
}

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
