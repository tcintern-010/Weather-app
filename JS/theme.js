const THEME_KEY = "theme";
const toggleBtn = document.querySelector("#themeToggle");

function applyTheme(theme) {
    if (theme === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
        toggleBtn.textContent = "☀️";
    } else {
        document.documentElement.removeAttribute("data-theme");
        toggleBtn.textContent = "🌙";
    }
}

const savedTheme = localStorage.getItem(THEME_KEY) || "light";
applyTheme(savedTheme);

toggleBtn.addEventListener("click", () => {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    const newTheme = isDark ? "light" : "dark";
    localStorage.setItem(THEME_KEY, newTheme);
    applyTheme(newTheme);
});