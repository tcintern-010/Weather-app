export const form = document.querySelector(".search");
export const searchBox = document.querySelector("#cityInput");
export const errorMsg = document.querySelector(".error");
export const weatherSection = document.querySelector(".weather");
export const weatherIcon = document.querySelector(".weather-icon");

export const suggestionsList = document.querySelector(".suggestions");

export function renderSuggestions(cities, onSelect) {
    suggestionsList.innerHTML = "";

    cities.forEach(place => {
        const li = document.createElement("li");
        li.textContent = place.name + (place.state ? ", " + place.state : "") + ", " + place.country;

        li.addEventListener("click", () => {
            onSelect(place);
        });

        suggestionsList.appendChild(li);
    });
}

export function clearSuggestions() {
    suggestionsList.innerHTML = "";
}