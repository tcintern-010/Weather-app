import { apiKey } from "./config.js";

const geoUrl = "https://api.openweathermap.org/geo/1.0/direct";

export async function fetchCitySuggestions(query) {
    if (!query) return [];

    const response = await fetch(`${geoUrl}?q=${encodeURIComponent(query)}&limit=5&appid=${apiKey}`);
    return response.json();
}