const LAST_CITY_KEY = "lastCity";
const CACHE_PREFIX = "weatherCache_";
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

export function saveLastCity(city) {
    localStorage.setItem(LAST_CITY_KEY, city);
}

export function getLastCity() {
    return localStorage.getItem(LAST_CITY_KEY);
}

export function cacheWeather(city, data) {
    const entry = {
        data: data,
        timestamp: Date.now()
    };
    localStorage.setItem(CACHE_PREFIX + city.toLowerCase(), JSON.stringify(entry));
}

export function getCachedWeather(city) {
    const raw = localStorage.getItem(CACHE_PREFIX + city.toLowerCase());
    if (!raw) return null;

    try {
        const entry = JSON.parse(raw);
        const isExpired = Date.now() - entry.timestamp > CACHE_TTL;
        return isExpired ? null : entry.data;
    } catch {
        return null;
    }
}