// This app uses Open-Meteo — a free weather API that requires NO API key.
// Docs: https://open-meteo.com/

const searchForm = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");
const statusEl = document.getElementById("status");
const weatherCard = document.getElementById("weather-card");

const cityNameEl = document.getElementById("city-name");
const countryNameEl = document.getElementById("country-name");
const temperatureEl = document.getElementById("temperature");
const weatherDescEl = document.getElementById("weather-desc");
const feelsLikeEl = document.getElementById("feels-like");
const humidityEl = document.getElementById("humidity");
const windEl = document.getElementById("wind");

// Maps Open-Meteo's numeric weather codes to readable descriptions
const weatherCodeMap = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Depositing rime fog",
  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Dense drizzle",
  61: "Slight rain",
  63: "Moderate rain",
  65: "Heavy rain",
  71: "Slight snow fall",
  73: "Moderate snow fall",
  75: "Heavy snow fall",
  80: "Rain showers",
  81: "Moderate rain showers",
  82: "Violent rain showers",
  95: "Thunderstorm",
  96: "Thunderstorm with hail",
  99: "Thunderstorm with heavy hail",
};

searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (!city) return;

  weatherCard.classList.add("hidden");
  setStatus("Searching...", false);

  try {
    const location = await getCoordinates(city);
    if (!location) {
      setStatus(`No results found for "${city}". Try another city.`, true);
      return;
    }

    const weather = await getWeather(location.latitude, location.longitude);
    displayWeather(location, weather);
    setStatus("", false);
  } catch (err) {
    console.error(err);
    setStatus("Something went wrong. Please try again.", true);
  }
});

// Step 1: convert city name -> latitude/longitude using Open-Meteo's geocoding API
async function getCoordinates(city) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
    city
  )}&count=1`;
  const res = await fetch(url);
  const data = await res.json();

  if (!data.results || data.results.length === 0) return null;

  const result = data.results[0];
  return {
    name: result.name,
    country: result.country,
    latitude: result.latitude,
    longitude: result.longitude,
  };
}

// Step 2: fetch current weather for those coordinates
async function getWeather(lat, lon) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m`;
  const res = await fetch(url);
  const data = await res.json();
  return data.current;
}

function displayWeather(location, current) {
  cityNameEl.textContent = location.name;
  countryNameEl.textContent = location.country || "";

  temperatureEl.textContent = `${Math.round(current.temperature_2m)}°C`;
  weatherDescEl.textContent =
    weatherCodeMap[current.weather_code] || "Unknown conditions";

  feelsLikeEl.textContent = `${Math.round(current.apparent_temperature)}°C`;
  humidityEl.textContent = `${current.relative_humidity_2m}%`;
  windEl.textContent = `${current.wind_speed_10m} km/h`;

  weatherCard.classList.remove("hidden");
}

function setStatus(message, isError) {
  statusEl.textContent = message;
  statusEl.classList.toggle("error", isError);
}
