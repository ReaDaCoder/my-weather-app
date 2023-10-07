let now = new Date();
let hours = now.getHours();
let minutes = now.getMinutes();

let h2 = document.querySelector("h2");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednsday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

h2.innerHTML = `${day} ${hours}:${minutes}`;

function search(event) {
  event.preventDefault();
  let input = document.querySelector("#city");

  let h1 = document.querySelector("h1");
  if (input.value) {
    h1.innerHTML = `${input.value}`;
  } else {
    h1.innerHTML = null;
    alert("please enter a city");
  }
}
let form = document.querySelector("#enter-city-form");
form.addEventListener("submit", search);

function showCelsuis(event) {
  event.preventDefault();
  let celsuis = `${"#temperature"}`;
  return celsuis;
}

let celsuis = document.querySelector("#celsuis-link");
celsuis.addEventListener("click", showCelsuis);

function showFahrenheit(event) {
  event.preventDefault();
  let fahrenheitValue = 51;
  document.querySelector("#temperature").textContent = `${fahrenheitValue} °F`;
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheit);

let apiKey = "64469ac67e6dc941feb5b50915a18dc7";
let city = document.querySelector("#city");
let url = `http//api.openweathermap.org/data/2.5/weather?q=$
{city}&units=metric`;

function searchCity(city) {
  let apiKey = "64469ac67e6dc941feb5b50915a18dc7";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axiox.get(`${url}&appid=${apiKey}`).then(giveTemperature);
}

function giveTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let conditions = document.querySelector(".temperature");
  conditions.innerHTML = `${temperature}°C`;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}
let searchButton = document.querySelector(".temperature");
searchButton.addEventListener("submit", search);

function getPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "64469ac67e6dc941feb5b50915a18dc7";
  let apiPoint = "http://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiPoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(giveTemperature);
}
navigator.geolocation.getCurrentPosition(getPosition);
