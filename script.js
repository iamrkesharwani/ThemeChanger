// DOM Elements
const themeButtons = document.querySelectorAll('.theme-btn');
const body = document.querySelector('body');
const notification = document.querySelector('#notification');
const notificationText = document.querySelector('#notificationText');
const quickToggle = document.querySelector('#quickToggle');
const quickToggleBall = document.querySelector('#quickToggleBall');

// Theme Mappings
const THEME_CLASS_MAP = {
  light: 'light-theme',
  dark: 'dark-theme',
  nature: 'nature-theme',
  sunset: 'sunset-theme',
  ocean: 'ocean-theme',
  purple: 'purple-theme',
};

const ALL_THEME_CLASSES = [
  'light-theme',
  'dark-theme',
  'nature-theme',
  'sunset-theme',
  'ocean-theme',
  'purple-theme',
];

const KEY_THEME_MAP = {
  1: 'light',
  2: 'dark',
  3: 'nature',
  4: 'sunset',
  5: 'ocean',
  6: 'purple',
};

// Load saved theme from storage
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  mainThemeUpdate(savedTheme);
}

// Theme Selection Buttons
themeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const selectedTheme = button.getAttribute('data-theme');
    onClickTheme(selectedTheme);
  });
});

// Quick Toggle Switch
quickToggle.addEventListener('click', () => {
  const currentTheme = localStorage.getItem('theme') || 'light';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  onClickTheme(newTheme);
  if (quickToggleBall.classList.contains('active')) {
    quickToggleBall.classList.remove('active');
  } else {
    quickToggleBall.classList.add('active');
  }
});

// Keyboard Shortcuts
document.addEventListener('keydown', (e) => {
  const key = e.key.toLowerCase();

  if (KEY_THEME_MAP[key]) {
    onClickTheme(KEY_THEME_MAP[key]);
    return;
  }

  if (key === 't') {
    onClickTheme('dark');
  }
});

// Update theme and show toast
function onClickTheme(themeName) {
  mainThemeUpdate(themeName);
  showToast(`Theme changed to ${themeName}`);
}

// Apply classes and update active state
function mainThemeUpdate(themeName) {
  ALL_THEME_CLASSES.forEach((cls) => body.classList.remove(cls));
  const themeClass = THEME_CLASS_MAP[themeName];
  if (themeClass) {
    body.classList.add(themeClass);
  }
  themeButtons.forEach((button) => button.classList.remove('active'));
  document.querySelector(`[data-theme="${themeName}"]`).classList.add('active');
  localStorage.setItem('theme', themeName);
}

// Show notification toast
function showToast(message) {
  notificationText.textContent = message;
  notification.classList.add('show');
  setTimeout(() => {
    notification.classList.remove('show');
  }, 2000);
}
