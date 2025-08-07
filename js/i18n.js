// js/i18n.js - Simple Internationalization System
// Hệ thống đa ngôn ngữ đơn giản với single responsibility

// === CONSTANTS ===
const DEFAULT_LANGUAGE = 'en';
const STORAGE_KEY = 'money-tracker-language';

// === GLOBAL STATE ===
let currentTranslations = null;
let currentLanguage = DEFAULT_LANGUAGE;

// === CORE FUNCTIONS ===

/**
 * Load language data from JSON file
 */
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

/**
 * Get translation by key path
 */
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

/**
 * Get current saved language
 */
function getCurrentLanguage() {
    try {
        return localStorage.getItem(STORAGE_KEY) || DEFAULT_LANGUAGE;
    } catch (error) {
        return DEFAULT_LANGUAGE;
    }
}

/**
 * Save language preference
 */
function saveLanguage(langCode) {
    try {
        localStorage.setItem(STORAGE_KEY, langCode);
        currentLanguage = langCode;
    } catch (error) {
        console.error('Error saving language:', error);
    }
}

/**
 * Update ALL elements with data-i18n attributes
 */
function updateAllTranslations() {
    try {
        // Find all elements with data-i18n attribute
        const elements = document.querySelectorAll('[data-i18n]');
        
        elements.forEach(element => {
            const keyPath = element.getAttribute('data-i18n');
            if (keyPath) {
                const translation = getTranslation(keyPath);
                
                // Update text content
                if (element.tagName === 'INPUT' && element.type === 'submit') {
                    element.value = translation;
                } else if (element.tagName === 'INPUT') {
                    element.placeholder = translation;
                } else {
                    // Special handling for jar names in salary modal (need colon)
                    if (keyPath.startsWith('jars.') && keyPath.endsWith('.name') && 
                        element.closest('#salary-modal')) {
                        element.textContent = translation + ':';
                    } else {
                        element.textContent = translation;
                    }
                }
            }
        });
        
        // Special handling for jar options in select
        updateJarSelectOptions();
        
        // Update theme toggle button
        updateThemeToggleButton();
        
        console.log(`✅ Updated translations for language: ${currentLanguage}`);
    } catch (error) {
        console.error('Error updating translations:', error);
    }
}

/**
 * Update jar options in select dropdown
 */
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

/**
 * Update theme toggle button text
 */
function updateThemeToggleButton() {
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (!themeBtn) return;
    
    const isDark = document.body.classList.contains('dark-theme');
    const buttonText = isDark ? 
        `☀️ ${getTranslation('settings.lightMode')}` : 
        `🌙 ${getTranslation('settings.darkMode')}`;
    
    themeBtn.textContent = buttonText;
}

/**
 * Change language and update UI
 */
async function changeLanguage(langCode) {
    try {
        console.log(`Changing language to: ${langCode}`);
        
        // Load new translations
        const translations = await loadLanguageFile(langCode);
        if (!translations) {
            throw new Error(`Failed to load ${langCode}`);
        }
        
        // Update global state
        currentTranslations = translations;
        currentLanguage = langCode;
        
        // Save preference
        saveLanguage(langCode);
        
        // Update all UI
        updateAllTranslations();
        
        // Update dynamic content (jar cards, etc.) if available
        if (window.SimpleMoneyTracker && window.SimpleMoneyTracker.updateUI) {
            window.SimpleMoneyTracker.updateUI();
        }
        
        // Update language select
        const langSelect = document.getElementById('language-select');
        if (langSelect) {
            langSelect.value = langCode;
        }
        
        console.log(`✅ Language changed to ${langCode}`);
        
        return true;
    } catch (error) {
        console.error('Error changing language:', error);
        return false;
    }
}

/**
 * Initialize i18n system
 */
async function initializeI18n() {
    try {
        console.log('Initializing i18n system...');
        
        // Get saved language
        currentLanguage = getCurrentLanguage();
        console.log(`Current language: ${currentLanguage}`);
        
        // Load translations
        currentTranslations = await loadLanguageFile(currentLanguage);
        if (!currentTranslations) {
            throw new Error(`Failed to load ${currentLanguage}`);
        }
        
        // Update UI
        updateAllTranslations();
        
        // Set up language selector
        const langSelect = document.getElementById('language-select');
        if (langSelect) {
            langSelect.value = currentLanguage;
            langSelect.addEventListener('change', (e) => {
                changeLanguage(e.target.value);
            });
        }
        
        console.log('✅ i18n system initialized');
        return true;
    } catch (error) {
        console.error('❌ Failed to initialize i18n:', error);
        return false;
    }
}

// === EXPORTS ===
window.i18n = {
    getTranslation,
    getCurrentLanguage,
    changeLanguage,
    initializeI18n,
    updateAllTranslations
};

// Short alias for convenience
window.t = getTranslation;

export {
    getTranslation,
    getCurrentLanguage, 
    changeLanguage,
    initializeI18n,
    updateAllTranslations
};