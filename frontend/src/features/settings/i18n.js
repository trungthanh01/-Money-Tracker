// Copied from js/i18n.js
const DEFAULT_LANGUAGE = 'en';
const STORAGE_KEY = 'money-tracker-language';

let currentTranslations = null;
let currentLanguage = DEFAULT_LANGUAGE;

async function loadLanguageFile(langCode) {
  try {
    const response = await fetch(`./lang/${langCode}.json`);
    if (!response.ok) throw new Error(`Failed to load ${langCode}`);
    return await response.json();
  } catch (error) {
    console.error(`Error loading ${langCode}:`, error);
    return null;
  }
}

function getTranslation(keyPath) {
  if (!currentTranslations) return keyPath;
  const keys = keyPath.split('.');
  let value = currentTranslations;
  for (const key of keys) {
    if (!value || typeof value !== 'object') return keyPath;
    value = value[key];
  }
  return value || keyPath;
}

function getCurrentLanguage() {
  try { return localStorage.getItem(STORAGE_KEY) || DEFAULT_LANGUAGE; } catch { return DEFAULT_LANGUAGE; }
}

function saveLanguage(langCode) {
  try { localStorage.setItem(STORAGE_KEY, langCode); currentLanguage = langCode; } catch (e) { console.error('Error saving language:', e); }
}

function updateJarSelectOptions() {
  const jarSelect = document.getElementById('jar-select');
  if (!jarSelect) return;
  const options = jarSelect.querySelectorAll('option[value]:not([value=""])');
  options.forEach(option => {
    const jarKey = option.value;
    if (jarKey) {
      const jarName = getTranslation(`jars.${jarKey}.name`);
      option.textContent = jarName;
    }
  });
}

function updateThemeToggleButton() {
  const themeBtn = document.getElementById('theme-toggle-btn');
  if (!themeBtn) return;
  const isDark = document.body.classList.contains('dark-theme');
  const buttonText = isDark ? `☀️ ${getTranslation('settings.lightMode')}` : `🌙 ${getTranslation('settings.darkMode')}`;
  themeBtn.textContent = buttonText;
}

function updateAllTranslations() {
  try {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
      const keyPath = element.getAttribute('data-i18n');
      if (keyPath) {
        const translation = getTranslation(keyPath);
        if (element.tagName === 'INPUT' && element.type === 'submit') {
          element.value = translation;
        } else if (element.tagName === 'INPUT') {
          element.placeholder = translation;
        } else {
          if (keyPath.startsWith('jars.') && keyPath.endsWith('.name') && element.closest('#salary-modal')) {
            element.textContent = translation + ':';
          } else {
            element.textContent = translation;
          }
        }
      }
    });
    updateJarSelectOptions();
    updateThemeToggleButton();
  } catch (error) {
    console.error('Error updating translations:', error);
  }
}

async function changeLanguage(langCode) {
  try {
    const translations = await loadLanguageFile(langCode);
    if (!translations) throw new Error(`Failed to load ${langCode}`);
    currentTranslations = translations;
    currentLanguage = langCode;
    saveLanguage(langCode);
    updateAllTranslations();
    if (window.SimpleMoneyTracker && window.SimpleMoneyTracker.updateUI) {
      window.SimpleMoneyTracker.updateUI();
    }
    const langSelect = document.getElementById('language-select');
    if (langSelect) langSelect.value = langCode;
    return true;
  } catch (e) {
    console.error('Error changing language:', e);
    return false;
  }
}

async function initializeI18n() {
  try {
    currentLanguage = getCurrentLanguage();
    currentTranslations = await loadLanguageFile(currentLanguage);
    if (!currentTranslations) throw new Error(`Failed to load ${currentLanguage}`);
    updateAllTranslations();
    const langSelect = document.getElementById('language-select');
    if (langSelect) {
      langSelect.value = currentLanguage;
      langSelect.addEventListener('change', (e) => changeLanguage(e.target.value));
    }
    return true;
  } catch (e) {
    console.error('Failed to initialize i18n:', e);
    return false;
  }
}

export { getTranslation, getCurrentLanguage, changeLanguage, initializeI18n, updateAllTranslations };


