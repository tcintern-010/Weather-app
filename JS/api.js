const apiKey = "cd57eead2a7c633f085ff16061321d33";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

export async function fetchWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    return response.json();
}