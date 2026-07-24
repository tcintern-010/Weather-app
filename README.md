# Weather App

A simple, responsive weather app built with vanilla HTML, CSS, and JavaScript. Search any city to get current weather conditions, with live autocomplete suggestions, dark mode, and offline-friendly caching.

## Features

- 🔍 **City search** with debounced, real-time autocomplete suggestions (via OpenWeatherMap Geocoding API)
- 🌦️ **Current weather** — temperature, humidity, wind speed, and a condition icon
- 🌙 **Dark mode toggle** with preference saved across sessions
- 💾 **Local caching** — weather data is cached for 10 minutes to reduce redundant API calls
- 🕒 **Remembers last searched city** and auto-loads it on page load
- 🌍 **Disambiguates same-named cities** (e.g. multiple "Springfield"s) using state/country data
- 🔒 **API key kept server-side** via Vercel serverless functions — never exposed in the browser

## Tech Stack

- HTML5 / CSS3 (theme handled via `data-theme` attribute selectors)
- Vanilla JavaScript (ES Modules)
- [OpenWeatherMap Current Weather API](https://openweathermap.org/current)
- [OpenWeatherMap Geocoding API](https://openweathermap.org/api/geocoding-api)
- Browser `localStorage` for caching and persistence
- Vercel Serverless Functions (to keep the API key private)

## Project Structure

```
WeatherApp/
├── index.html
├── CSS/
│   └── style.css
├── api/
│   ├── weather.js        # Serverless function — calls OpenWeatherMap weather API using the private key
│   └── geocode.js        # Serverless function — calls OpenWeatherMap geocoding API using the private key
├── JS/
│   ├── main.js            # App entry point — wires up events
│   ├── weather.js          # Fetches + renders weather data
│   ├── api.js               # Calls our own /api/weather endpoint
│   ├── geocode.js          # Calls our own /api/geocode endpoint
│   ├── dom.js                # Shared DOM element references + suggestion rendering
│   ├── debounce.js          # Debounce utility for search input
│   ├── storage.js            # localStorage helpers (last city, weather cache)
│   └── theme.js               # Dark mode toggle logic
└── assets/
    └── images/              # Weather icons, search icon, etc.
```

## Setup

1. Clone or download this repository.
2. Get a free API key from [OpenWeatherMap](https://openweathermap.org/api).
3. Create a `.env` file in the project root (used for local development only) with:
   ```
   OPENWEATHER_API_KEY=your_actual_key_here
   ```
   This file is gitignored and never committed.
4. Install the [Vercel CLI](https://vercel.com/docs/cli) if you don't have it:
   ```bash
   npm i -g vercel
   ```
5. Run the app locally with Vercel's dev server (needed so the `/api` serverless functions work locally):
   ```bash
   vercel dev
   ```
6. Open the local URL it gives you in your browser.

### Deploying

1. Push the repo to GitHub and import it into [Vercel](https://vercel.com).
2. In your Vercel project, go to **Settings → Environment Variables** and add:
   - Key: `OPENWEATHER_API_KEY`
   - Value: your OpenWeatherMap API key
3. Deploy. The `/api/weather` and `/api/geocode` serverless functions will use this key automatically — it's never sent to the browser.
