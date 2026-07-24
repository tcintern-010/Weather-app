import { checkWeather } from "./weather.js";
import { form, searchBox } from "./dom.js";

form.addEventListener("submit", (e) => {
    e.preventDefault();
    checkWeather(searchBox.value.trim());
});