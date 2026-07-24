# Weather App

A simple, responsive weather app built with vanilla HTML, CSS, and JavaScript. Search any city to get current weather conditions, with live autocomplete suggestions, dark mode, and offline-friendly caching.

## Features

- 🔍 **City search** with debounced, real-time autocomplete suggestions (via OpenWeatherMap Geocoding API)
- 🌦️ **Current weather** — temperature, humidity, wind speed, and a condition icon
- 🌙 **Dark mode toggle** with preference saved across sessions
- 💾 **Local caching** — weather data is cached for 10 minutes to reduce redundant API calls
- 🕒 **Remembers last searched city** and auto-loads it on page load
- 🌍 **Disambiguates same-named cities** (e.g. multiple "Springfield"s) using state/country data

## Tech Stack

- HTML5 / CSS3 (CSS custom properties not required — theme handled via `data-theme` attribute selectors)
- Vanilla JavaScript (ES Modules)
- [OpenWeatherMap Current Weather API](https://openweathermap.org/current)
- [OpenWeatherMap Geocoding API](https://openweathermap.org/api/geocoding-api)
- Browser `localStorage` for caching and persistence

## Project Structure

```
WeatherApp/
├── index.html
├── CSS/
│   └── style.css
├── JS/
│   ├── main.js          # App entry point — wires up events
│   ├── weather.js        # Fetches + renders weather data
│   ├── api.js             # OpenWeatherMap weather API call
│   ├── geocode.js        # OpenWeatherMap geocoding/suggestions API call
│   ├── config.js          # API key (shared across api.js / geocode.js)
│   ├── dom.js              # Shared DOM element references + suggestion rendering
│   ├── debounce.js        # Debounce utility for search input
│   ├── storage.js          # localStorage helpers (last city, weather cache)
│   └── theme.js             # Dark mode toggle logic
└── assets/
    └── images/            # Weather icons, search icon, etc.
```

## Setup

1. Clone or download this repository.
2. Get a free API key from [OpenWeatherMap](https://openweathermap.org/api).
3. Add your key in `JS/config.js`:
   ```javascript
   export const apiKey = "YOUR_API_KEY_HERE";
   ```
4. Serve the project with a local server (required for ES modules to work), e.g.:
   - VS Code "Live Server" extension, or
   - `python -m http.server` in the project folder
5. Open `index.html` in your browser via the local server URL.

## How It Works

- Typing in the search box triggers a debounced (400ms) call to the geocoding API, showing up to 5 matching city suggestions.
- Selecting a suggestion (or submitting the form) fetches current weather for that city, using a cached result if available and still fresh (within 10 minutes).
- The selected city is saved to `localStorage` and automatically reloaded on the next visit.
- The dark mode toggle switches a `data-theme="dark"` attribute on `<html>`, which CSS rules key off of; the preference is saved to `localStorage`.
