import { checkWeather } from "./weather.js";
import { form, searchBox, suggestionsList, renderSuggestions, clearSuggestions } from "./dom.js";
import { debounce } from "./debounce.js";
import { fetchCitySuggestions } from "./geocode.js";
import { saveLastCity, getLastCity } from "./storage.js";
import "./theme.js";

// Handle manual search (Enter key or search button)
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const city = searchBox.value.trim();
    clearSuggestions();

    if (city) {
        saveLastCity(city);
        checkWeather(city);
    }
});

// Handle typing — fetch and show suggestions, debounced
const handleInput = debounce(async () => {
    const query = searchBox.value.trim();

    if (!query) {
        clearSuggestions();
        return;
    }

    try {
        const cities = await fetchCitySuggestions(query);

        renderSuggestions(cities, (place) => {
            const query = place.country
                ? `${place.name},${place.state ? place.state + "," : ""}${place.country}`
                : place.name;

            searchBox.value = place.name;
            clearSuggestions();
            saveLastCity(query);
            checkWeather(query);
        });

    } catch (error) {
        console.error("Suggestion fetch failed:", error);
    }
}, 400);

searchBox.addEventListener("input", handleInput);

// Close suggestions when clicking outside of them
document.addEventListener("click", (e) => {
    if (!suggestionsList.contains(e.target) && e.target !== searchBox) {
        clearSuggestions();
    }
});

// On page load, auto-search the last city if one was saved
const lastCity = getLastCity();
if (lastCity) {
    searchBox.value = lastCity;
    checkWeather(lastCity);
}