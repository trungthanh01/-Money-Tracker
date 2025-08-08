// Theme Management - Hệ thống toggle sáng/tối (ES Module)

const THEME_STORAGE_KEY = 'money-tracker-theme';
const THEMES = { LIGHT: 'light', DARK: 'dark' };
let currentTheme = THEMES.DARK; // Force dark by default

function getSavedTheme() {
  try { return localStorage.getItem(THEME_STORAGE_KEY) || THEMES.LIGHT; } catch { return THEMES.LIGHT; }
}

function saveTheme(theme) {
  try { localStorage.setItem(THEME_STORAGE_KEY, theme); } catch (e) { console.error('Error saving theme:', e); }
}

function applyLightTheme() {
  const body = document.body; const html = document.documentElement;
  html.classList.remove('dark');
  body.classList.remove('dark', 'bg-gray-900', 'text-white', 'dark-theme');
  body.classList.add('bg-gray-50');
}

function applyDarkTheme() {
  const html = document.documentElement; const body = document.body;
  html.classList.add('dark');
  body.classList.remove('bg-gray-50');
  body.classList.add('dark', 'bg-gray-900', 'text-white', 'dark-theme');
}

function updateHeaderTheme(isDark) {
  const header = document.querySelector('header');
  const nav = document.querySelector('nav');
  const mobileMenu = document.getElementById('mobile-menu');
  if (header) {
    if (isDark) { header.classList.remove('bg-white','border-gray-200'); header.classList.add('bg-gray-800','border-gray-700'); }
    else { header.classList.remove('bg-gray-800','border-gray-700'); header.classList.add('bg-white','border-gray-200'); }
    const headerTitle = header.querySelector('h1'); const headerSubtitle = header.querySelector('.text-sm');
    if (headerTitle) { if (isDark) { headerTitle.classList.remove('text-gray-900'); headerTitle.classList.add('text-white'); } else { headerTitle.classList.remove('text-white'); headerTitle.classList.add('text-gray-900'); } }
    if (headerSubtitle) { if (isDark) { headerSubtitle.classList.remove('text-gray-500'); headerSubtitle.classList.add('text-gray-300'); } else { headerSubtitle.classList.remove('text-gray-300'); headerSubtitle.classList.add('text-gray-500'); } }
  }
  if (nav) {
    if (isDark) { nav.classList.remove('bg-white','border-gray-200'); nav.classList.add('bg-gray-800','border-gray-700'); }
    else { nav.classList.remove('bg-gray-800','border-gray-700'); nav.classList.add('bg-white','border-gray-200'); }
  }
  if (mobileMenu) {
    if (isDark) {
      mobileMenu.classList.remove('bg-white'); mobileMenu.classList.add('bg-gray-800');
      const menuTexts = mobileMenu.querySelectorAll('h2, button');
      menuTexts.forEach(el => { el.classList.remove('text-gray-900','text-gray-600'); el.classList.add('text-white'); });
    } else {
      mobileMenu.classList.remove('bg-gray-800'); mobileMenu.classList.add('bg-white');
      const menuTexts = mobileMenu.querySelectorAll('h2, button');
      menuTexts.forEach(el => { el.classList.remove('text-white'); if (el.tagName === 'H2') el.classList.add('text-gray-900'); else el.classList.add('text-gray-600'); });
    }
  }
}

function updateCardsTheme(isDark) {
  const cards = document.querySelectorAll('.bg-white, .bg-gray-800');
  cards.forEach(card => {
    if (isDark) {
      card.classList.remove('bg-white'); card.classList.add('bg-gray-800','border-gray-700');
      const texts = card.querySelectorAll('.text-gray-700, .text-gray-900'); texts.forEach(t => { t.classList.remove('text-gray-700','text-gray-900'); t.classList.add('text-gray-100'); });
      const subtexts = card.querySelectorAll('.text-gray-500'); subtexts.forEach(t => { t.classList.remove('text-gray-500'); t.classList.add('text-gray-400'); });
    } else {
      card.classList.remove('bg-gray-800','border-gray-700'); card.classList.add('bg-white');
      const texts = card.querySelectorAll('.text-gray-100'); texts.forEach(t => { t.classList.remove('text-gray-100'); t.classList.add('text-gray-700'); });
      const subtexts = card.querySelectorAll('.text-gray-400'); subtexts.forEach(t => { t.classList.remove('text-gray-400'); t.classList.add('text-gray-500'); });
    }
  });
}

function updateFormsTheme(isDark) {
  const inputs = document.querySelectorAll('input, select, textarea');
  inputs.forEach(input => {
    if (isDark) { input.classList.remove('bg-white','border-gray-300','text-gray-900'); input.classList.add('bg-gray-700','border-gray-600','text-white','placeholder-gray-400'); }
    else { input.classList.remove('bg-gray-700','border-gray-600','text-white','placeholder-gray-400'); input.classList.add('bg-white','border-gray-300','text-gray-900'); }
  });
  const labels = document.querySelectorAll('label');
  labels.forEach(label => { if (isDark) { label.classList.remove('text-gray-700','text-gray-900'); label.classList.add('text-gray-200'); } else { label.classList.remove('text-gray-200'); label.classList.add('text-gray-700'); } });
}

function updateModalsTheme(isDark) {
  const modals = document.querySelectorAll('.fixed.inset-0');
  modals.forEach(modal => {
    const content = modal.querySelector('.bg-white, .bg-gray-800');
    if (!content) return;
    if (isDark) {
      content.classList.remove('bg-white'); content.classList.add('bg-gray-800','border-gray-700');
      const headings = content.querySelectorAll('h1,h2,h3,h4,h5,h6'); headings.forEach(h => { h.classList.remove('text-gray-700','text-gray-900'); h.classList.add('text-white'); });
    } else {
      content.classList.remove('bg-gray-800','border-gray-700'); content.classList.add('bg-white');
      const headings = content.querySelectorAll('h1,h2,h3,h4,h5,h6'); headings.forEach(h => { h.classList.remove('text-white'); h.classList.add('text-gray-700'); });
    }
  });
}

function updateNavigationTheme(isDark) {
  const tabs = document.querySelectorAll('.tab-btn');
  tabs.forEach(tab => {
    if (isDark) {
      if (tab.classList.contains('text-blue-600')) { tab.classList.remove('text-blue-600'); tab.classList.add('text-blue-400'); }
      if (tab.classList.contains('text-gray-500')) { tab.classList.remove('text-gray-500','hover:text-gray-700'); tab.classList.add('text-gray-400','hover:text-gray-200'); }
    } else {
      if (tab.classList.contains('text-blue-400')) { tab.classList.remove('text-blue-400'); tab.classList.add('text-blue-600'); }
      if (tab.classList.contains('text-gray-400')) { tab.classList.remove('text-gray-400','hover:text-gray-200'); tab.classList.add('text-gray-500','hover:text-gray-700'); }
    }
  });
}

function updateAllThemedElements(isDark) {
  updateHeaderTheme(isDark); updateCardsTheme(isDark); updateFormsTheme(isDark); updateModalsTheme(isDark); updateNavigationTheme(isDark);
}

function applyTheme(theme) {
  const isDark = theme === THEMES.DARK;
  if (isDark) applyDarkTheme(); else applyLightTheme();
  updateAllThemedElements(isDark);
  currentTheme = theme;
}

function updateThemeToggleButton() {
  const toggleBtn = document.getElementById('theme-toggle-btn');
  if (!toggleBtn) return;
  const isDark = currentTheme === THEMES.DARK;
  if (isDark) { toggleBtn.innerHTML = '☀️ Switch to Light'; toggleBtn.classList.remove('bg-gray-200'); toggleBtn.classList.add('bg-gray-700','text-white'); }
  else { toggleBtn.innerHTML = '🌙 Switch to Dark'; toggleBtn.classList.remove('bg-gray-700','text-white'); toggleBtn.classList.add('bg-gray-200'); }
}

function toggleTheme() {
  const newTheme = currentTheme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT;
  applyTheme(newTheme); saveTheme(newTheme); updateThemeToggleButton();
  return newTheme;
}

function initializeTheme() {
  try {
    // Force dark mode regardless of saved preference
    currentTheme = THEMES.DARK;
    saveTheme(currentTheme);
    applyTheme(currentTheme);
    updateThemeToggleButton();
  } catch (e) {
    console.error('Theme init failed:', e);
    applyTheme(THEMES.DARK);
  }
}

function getCurrentTheme() { return currentTheme; }
function isDarkMode() { return currentTheme === THEMES.DARK; }

export { initializeTheme, toggleTheme, getCurrentTheme, isDarkMode, THEMES };