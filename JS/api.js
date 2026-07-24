const apiUrl = "/api/weather?city=";

export async function fetchWeather(city) {
    const response = await fetch(apiUrl + encodeURIComponent(city));
    return response.json();
}