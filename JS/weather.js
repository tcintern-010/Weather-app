import { fetchWeather } from "./api.js";
import { errorMsg, weatherSection, weatherIcon } from "./dom.js";
import { weatherIcons } from "./icons.js";
import { cacheWeather, getCachedWeather } from "./storage.js";

export async function checkWeather(city) {

    if (!city) return;

    try {
        let data = getCachedWeather(city);

        if (!data) {
            data = await fetchWeather(city);

            if (data.cod === "404" || data.cod === 404) {
                errorMsg.style.display = "block";
                weatherSection.style.display = "none";
                return;
            }

            cacheWeather(city, data);
        }
        errorMsg.style.display = "none";
        weatherSection.style.display = "block";

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = Math.round(data.wind.speed * 3.6) + " km/h";

        weatherIcon.src = weatherIcons[data.weather[0].main] || "assets/images/mist.png";
    } catch (error) {
        console.error("Weather fetch failed:", error);
        errorMsg.textContent = "Something went wrong. Try again.";
        errorMsg.style.display = "block";
        weatherSection.style.display = "none";
    }
}