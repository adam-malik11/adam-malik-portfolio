const root = document.documentElement;
const toggle = document.querySelector("#theme-toggle");
const icon = toggle.querySelector(".theme-icon");
const label = toggle.querySelector(".theme-label");
const themeColor = document.querySelector('meta[name="theme-color"]');
const preferenceKey = "adam-portfolio-theme";
const systemPreference = window.matchMedia("(prefers-color-scheme: dark)");

let savedTheme;
try {
  savedTheme = window.localStorage.getItem(preferenceKey);
} catch (error) {
  console.warn("The saved theme preference is unavailable.", error);
}

if (savedTheme === "light" || savedTheme === "dark") {
  root.dataset.theme = savedTheme;
}

function currentTheme() {
  return root.dataset.theme || (systemPreference.matches ? "dark" : "light");
}

function updateToggle() {
  const nextTheme = currentTheme() === "dark" ? "light" : "dark";
  const action = `Switch to ${nextTheme} theme`;

  toggle.setAttribute("aria-label", action);
  toggle.title = action;
  icon.textContent = nextTheme === "light" ? "☼" : "☾";
  label.textContent = nextTheme === "light" ? "Light" : "Dark";
  themeColor.content = currentTheme() === "dark" ? "#101412" : "#f5f7f1";
}

toggle.addEventListener("click", () => {
  root.dataset.theme = currentTheme() === "dark" ? "light" : "dark";
  updateToggle();

  try {
    window.localStorage.setItem(preferenceKey, root.dataset.theme);
  } catch (error) {
    console.warn("The theme preference could not be saved.", error);
  }
});

systemPreference.addEventListener("change", () => {
  if (!root.hasAttribute("data-theme")) {
    updateToggle();
  }
});

updateToggle();
