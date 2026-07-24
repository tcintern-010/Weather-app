const geoUrl = "/api/geocode";

export async function fetchCitySuggestions(query) {
    if (!query) return [];

    const response = await fetch(`${geoUrl}?query=${encodeURIComponent(query)}`);
    return response.json();
}