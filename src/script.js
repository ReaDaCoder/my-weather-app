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

function showCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".temperatureText");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsius = document.querySelector("#celsuis-link");
celsius.addEventListener("click", showCelsius);

function showFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".temperatureText");
  let fahrenheitValue = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitValue);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheit);

let apiKey = "64469ac67e6dc941feb5b50915a18dc7";
let city = document.querySelector("#city");
let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;

function searchCity(city) {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;

  axios.get(`${url}&appid=${apiKey}`).then(giveTemperature);
}

function search(event) {
  event.preventDefault();
  let input = document.querySelector("#city");

  let h1 = document.querySelector("h1");
  if (input.value) {
    h1.innerHTML = `${input.value}`;
    searchCity(input.value);
  } else {
    h1.innerHTML = null;
    alert("please enter a city");
  }
}
let form = document.querySelector("#enter-city-form");
form.addEventListener("submit", search);

let celsiusTemperature = null;

function showForecast() {
  let forecastElement = document.querySelector("#forecast");
  let days = ["Tues", "Wed", "Thurs", "Fri"];
  let forecastHTML = `<div class="row">`;
  forecastHTML =
    forecastHTML +
    `
  <div class="col-2">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">
                  <span class="forecast-day">Mon</span>
                </h5>
                <img
                  src="https://w7.pngwing.com/pngs/955/496/png-transparent-sun-and-cloud-digital-illustration-weather-forecasting-rain-icon-shower-weather-icon-material-company-cloud-camera-icon.png"
                  class="card-img-top"
                />
                <br />
                <h6 class="card-subtitle mb-2 text-body-secondary">
                  <span class="forecast-max">22°</span>
                  <span class="forecast-min">7°</span>
                </h6>
              </div>
            </div>
          </div>
  </div>
  `;
  forecastHTML = forecastHTML + ` </div>`;
  forecastElement.innerHTML = forecastHTML;
}

showForecast();

function giveTemperature(response) {
  let temperatureElement = document.querySelector(".temperatureText");
  celsiusTemperature = Math.round(response.data.main.temp);
  temperatureElement = Math.round(celsiusTemperature);
  let conditions = document.querySelector(".temperatureText");
  conditions.innerHTML = `${celsiusTemperature}`;
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
  let apiPoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiPoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(giveTemperature);
}
navigator.geolocation.getCurrentPosition(getPosition);
