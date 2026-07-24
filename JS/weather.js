import { fetchWeather } from "./api.js";
import { errorMsg, weatherSection, weatherIcon } from "./dom.js";
import { weatherIcons } from "./icons.js";

export async function checkWeather(city) {

    if (!city) return;

    try {
        const data = await fetchWeather(city);

        if (data.cod === "404" || data.cod === 404) {
            errorMsg.style.display = "block";
            weatherSection.style.display = "none";
            return;
        }

        errorMsg.style.display = "none";
        weatherSection.style.display = "block";

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

        weatherIcon.src = weatherIcons[data.weather[0].main] || "assets/images/clear.png";

    } catch (error) {
        console.error("Weather fetch failed:", error);
        errorMsg.textContent = "Something went wrong. Try again.";
        errorMsg.style.display = "block";
        weatherSection.style.display = "none";
    }
}