# Weather App

A simple, responsive weather lookup app built with **vanilla HTML, CSS, and JavaScript**. Search any city and get live current weather conditions — no API key, no signup, no backend required.

🔗 **Live Demo:** [add your GitHub Pages link here]

---

## Features

- Search weather by city name
- Displays current temperature, "feels like" temperature, humidity, and wind speed
- Human-readable weather condition text (e.g. "Partly cloudy", "Light rain") mapped from weather codes
- Clean error handling for cities that aren't found
- Fully responsive dark-themed UI

---

## Tech Stack

- **HTML5** — page structure
- **CSS3** — custom dark theme, responsive layout, no external UI framework
- **JavaScript (ES6+)** — `fetch` API, `async/await`, DOM manipulation
- **[Open-Meteo](https://open-meteo.com/)** — free weather API with no API key or signup required

No build tools, no npm dependencies — open `index.html` and it runs.

---

## Project Structure

```
weather-app/
├── index.html      # Page structure
├── style.css       # Styling
└── script.js       # Geocoding, weather fetch, and rendering logic
```

---

## How It Works

1. **City → coordinates:** The city name entered is sent to Open-Meteo's free Geocoding API, which returns latitude/longitude for the closest match.
2. **Coordinates → weather:** Those coordinates are used to call Open-Meteo's Forecast API, which returns current temperature, humidity, wind speed, and a numeric weather code.
3. **Weather code → readable text:** A lookup object (`weatherCodeMap` in `script.js`) converts Open-Meteo's numeric codes (e.g. `61`) into readable labels (e.g. "Slight rain").

Both API calls are free and require no authentication, so the app works immediately with zero configuration.

---

## How to Run Locally

**Option 1 — Just open it:**
Double-click `index.html` to open it directly in your browser.

**Option 2 — Run a local server:**
```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

---

## What This Project Demonstrates

- Working with external REST APIs using `fetch` and `async/await`
- Chaining two dependent API calls (geocoding → forecast)
- Handling API errors and empty/invalid search results gracefully
- Mapping raw API data into clean, user-facing UI text
- Manual testing of edge cases (invalid city names, empty input) to verify correct error states

---

## Author

**Momin Zaid**
📧 mominzaid004@gmail.com
🔗 [LinkedIn](#) · [GitHub](#)
