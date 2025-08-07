// js/theme.js  
// Theme Management - Hệ thống toggle sáng/tối
// Mỗi function có trách nhiệm riêng biệt

// === CONSTANTS ===
const THEME_STORAGE_KEY = 'money-tracker-theme';
const THEMES = {
  LIGHT: 'light',
  DARK: 'dark'
};

// === GLOBAL STATE ===
let currentTheme = THEMES.LIGHT; // Default light

// === SINGLE RESPONSIBILITY FUNCTIONS ===

/**
 * Function 1: Get saved theme from storage
 * Trách nhiệm duy nhất: Đọc theme preference
 */
function getSavedTheme() {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    return saved || THEMES.LIGHT;
  } catch (error) {
    console.error('Error reading theme:', error);
    return THEMES.LIGHT;
  }
}

/**
 * Function 2: Save theme to storage
 * Trách nhiệm duy nhất: Lưu theme preference
 */
function saveTheme(theme) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
    console.log(`💾 Theme saved: ${theme}`);
  } catch (error) {
    console.error('Error saving theme:', error);
  }
}

/**
 * Function 3: Apply light theme styles
 * Trách nhiệm duy nhất: Set light mode classes
 */
function applyLightTheme() {
  const body = document.body;
  const html = document.documentElement;
  
  // Remove dark classes
  html.classList.remove('dark');
  body.classList.remove('dark', 'bg-gray-900', 'text-white');
  
  // Ensure light classes
  body.classList.add('bg-gray-50');
  
  console.log('☀️ Light theme applied');
}

/**
 * Function 4: Apply dark theme styles  
 * Trách nhiệm duy nhất: Set dark mode classes
 */
function applyDarkTheme() {
  const html = document.documentElement;
  const body = document.body;
  
  // Add dark classes
  html.classList.add('dark');
  body.classList.remove('bg-gray-50');
  body.classList.add('dark', 'bg-gray-900', 'text-white');
  
  console.log('🌙 Dark theme applied');
}

/**
 * Function 5: Update header for dark theme
 * Trách nhiệm duy nhất: Theme cho header area
 */
function updateHeaderTheme(isDark) {
  const header = document.querySelector('header');
  const nav = document.querySelector('nav');
  
  if (header) {
    if (isDark) {
      header.classList.remove('bg-white', 'border-gray-200');
      header.classList.add('bg-gray-800', 'border-gray-700');
    } else {
      header.classList.remove('bg-gray-800', 'border-gray-700');
      header.classList.add('bg-white', 'border-gray-200');
    }
  }
  
  if (nav) {
    if (isDark) {
      nav.classList.remove('bg-white', 'border-gray-200');
      nav.classList.add('bg-gray-800', 'border-gray-700');
    } else {
      nav.classList.remove('bg-gray-800', 'border-gray-700');
      nav.classList.add('bg-white', 'border-gray-200');
    }
  }
}

/**
 * Function 6: Update cards for theme
 * Trách nhiệm duy nhất: Theme cho cards
 */
function updateCardsTheme(isDark) {
  const cards = document.querySelectorAll('.bg-white');
  
  cards.forEach(card => {
    if (isDark) {
      card.classList.remove('bg-white');
      card.classList.add('bg-gray-800', 'border-gray-700');
      
      // Update text colors
      const texts = card.querySelectorAll('.text-gray-700, .text-gray-900');
      texts.forEach(text => {
        text.classList.remove('text-gray-700', 'text-gray-900');
        text.classList.add('text-gray-100');
      });
      
      const subtexts = card.querySelectorAll('.text-gray-500');
      subtexts.forEach(text => {
        text.classList.remove('text-gray-500');
        text.classList.add('text-gray-400');
      });
    } else {
      card.classList.remove('bg-gray-800', 'border-gray-700');
      card.classList.add('bg-white');
      
      // Restore text colors
      const texts = card.querySelectorAll('.text-gray-100');
      texts.forEach(text => {
        text.classList.remove('text-gray-100');
        text.classList.add('text-gray-700');
      });
      
      const subtexts = card.querySelectorAll('.text-gray-400');
      subtexts.forEach(text => {
        text.classList.remove('text-gray-400');
        text.classList.add('text-gray-500');
      });
    }
  });
}

/**
 * Function 7: Update forms for theme
 * Trách nhiệm duy nhất: Theme cho form elements
 */
function updateFormsTheme(isDark) {
  const inputs = document.querySelectorAll('input, select, textarea');
  
  inputs.forEach(input => {
    if (isDark) {
      input.classList.remove('bg-white', 'border-gray-300', 'text-gray-900');
      input.classList.add('bg-gray-700', 'border-gray-600', 'text-white', 'placeholder-gray-400');
    } else {
      input.classList.remove('bg-gray-700', 'border-gray-600', 'text-white', 'placeholder-gray-400');
      input.classList.add('bg-white', 'border-gray-300', 'text-gray-900');
    }
  });
  
  const labels = document.querySelectorAll('label');
  labels.forEach(label => {
    if (isDark) {
      label.classList.remove('text-gray-700', 'text-gray-900');
      label.classList.add('text-gray-200');
    } else {
      label.classList.remove('text-gray-200');
      label.classList.add('text-gray-700');
    }
  });
}

/**
 * Function 8: Update modals for theme
 * Trách nhiệm duy nhất: Theme cho modals
 */
function updateModalsTheme(isDark) {
  const modals = document.querySelectorAll('.fixed.inset-0');
  
  modals.forEach(modal => {
    const content = modal.querySelector('.bg-white, .bg-gray-800');
    if (content) {
      if (isDark) {
        content.classList.remove('bg-white');
        content.classList.add('bg-gray-800', 'border-gray-700');
        
        const headings = content.querySelectorAll('h1, h2, h3, h4, h5, h6');
        headings.forEach(h => {
          h.classList.remove('text-gray-700', 'text-gray-900');
          h.classList.add('text-white');
        });
      } else {
        content.classList.remove('bg-gray-800', 'border-gray-700');
        content.classList.add('bg-white');
        
        const headings = content.querySelectorAll('h1, h2, h3, h4, h5, h6');
        headings.forEach(h => {
          h.classList.remove('text-white');
          h.classList.add('text-gray-700');
        });
      }
    }
  });
}

/**
 * Function 9: Update navigation tabs for theme
 * Trách nhiệm duy nhất: Theme cho nav tabs
 */
function updateNavigationTheme(isDark) {
  const tabs = document.querySelectorAll('.tab-btn');
  
  tabs.forEach(tab => {
    if (isDark) {
      // Active tab
      if (tab.classList.contains('text-blue-600')) {
        tab.classList.remove('text-blue-600');
        tab.classList.add('text-blue-400');
      }
      // Inactive tabs
      if (tab.classList.contains('text-gray-500')) {
        tab.classList.remove('text-gray-500', 'hover:text-gray-700');
        tab.classList.add('text-gray-400', 'hover:text-gray-200');
      }
    } else {
      // Active tab
      if (tab.classList.contains('text-blue-400')) {
        tab.classList.remove('text-blue-400');
        tab.classList.add('text-blue-600');
      }
      // Inactive tabs
      if (tab.classList.contains('text-gray-400')) {
        tab.classList.remove('text-gray-400', 'hover:text-gray-200');
        tab.classList.add('text-gray-500', 'hover:text-gray-700');
      }
    }
  });
}

/**
 * Function 10: Update all themed elements
 * Trách nhiệm duy nhất: Gọi tất cả theme update functions
 */
function updateAllThemedElements(isDark) {
  updateHeaderTheme(isDark);
  updateCardsTheme(isDark);
  updateFormsTheme(isDark);
  updateModalsTheme(isDark);
  updateNavigationTheme(isDark);
  console.log(`🎨 All elements themed for ${isDark ? 'dark' : 'light'} mode`);
}

/**
 * Function 11: Apply theme completely
 * Trách nhiệm duy nhất: Apply theme + update all elements
 */
function applyTheme(theme) {
  const isDark = theme === THEMES.DARK;
  
  if (isDark) {
    applyDarkTheme();
  } else {
    applyLightTheme();
  }
  
  updateAllThemedElements(isDark);
  currentTheme = theme;
}

/**
 * Function 12: Update theme toggle button state
 * Trách nhiệm duy nhất: Update toggle button appearance
 */
function updateThemeToggleButton() {
  const toggleBtn = document.getElementById('theme-toggle-btn');
  if (toggleBtn) {
    const isDark = currentTheme === THEMES.DARK;
    
    if (isDark) {
      toggleBtn.innerHTML = '☀️ Switch to Light';
      toggleBtn.classList.remove('bg-gray-200');
      toggleBtn.classList.add('bg-gray-700', 'text-white');
    } else {
      toggleBtn.innerHTML = '🌙 Switch to Dark';
      toggleBtn.classList.remove('bg-gray-700', 'text-white');
      toggleBtn.classList.add('bg-gray-200');
    }
  }
}

/**
 * Function 13: Toggle theme (main public function)
 * Trách nhiệm duy nhất: Chuyển đổi theme
 */
function toggleTheme() {
  const newTheme = currentTheme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT;
  
  console.log(`🔄 Toggling theme from ${currentTheme} to ${newTheme}`);
  
  // Apply new theme
  applyTheme(newTheme);
  
  // Save preference
  saveTheme(newTheme);
  
  // Update toggle button
  updateThemeToggleButton();
  
  console.log(`✅ Theme toggled to ${newTheme}`);
  return newTheme;
}

/**
 * Function 14: Initialize theme system
 * Trách nhiệm duy nhất: Setup theme lần đầu
 */
function initializeTheme() {
  try {
    // Load saved theme
    currentTheme = getSavedTheme();
    
    // Apply theme
    applyTheme(currentTheme);
    
    // Update toggle button
    updateThemeToggleButton();
    
    console.log(`🚀 Theme initialized: ${currentTheme}`);
  } catch (error) {
    console.error('❌ Theme initialization failed:', error);
    // Fallback to light theme
    applyTheme(THEMES.LIGHT);
  }
}

/**
 * Function 15: Get current theme
 * Trách nhiệm duy nhất: Trả về theme hiện tại
 */
function getCurrentTheme() {
  return currentTheme;
}

/**
 * Function 16: Check if dark mode
 * Trách nhiệm duy nhất: Kiểm tra dark mode
 */
function isDarkMode() {
  return currentTheme === THEMES.DARK;
}

// === EXPORTS ===
export {
  initializeTheme,
  toggleTheme,
  getCurrentTheme,
  isDarkMode,
  THEMES
};
