import { apiKey } from "./config.js";

const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

export async function fetchWeather(city) {
    const response = await fetch(apiUrl + encodeURIComponent(city) + `&appid=${apiKey}`);
    return response.json();
}