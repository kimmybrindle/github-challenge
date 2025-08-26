function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
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

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);

function getWeather(response) {
  let cityElement = document.querySelector("#current-city");
  let tempElement = document.querySelector("#current-temp-value");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector(".current-temperature-icon");

  cityElement.innerHTML = response.data.city;
  tempElement.innerHTML = Math.round(response.data.temperature.current);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = response.data.temperature.humidity;
  windElement.innerHTML = response.data.wind.speed;
  iconElement.innerHTML = response.data.condition.description.includes("clouds")
    ? "☁️"
    : "☀️";
}

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value;

  if (city) {
    let apiKey = "5c04157d3b5bt2eeaa66db333fod0d64";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

    axios.get(apiUrl).then(getWeather);
  }
}
