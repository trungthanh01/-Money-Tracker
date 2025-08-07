// js/theme.js
// Module quản lý giao diện sáng/tối (Theme Management)
// Chức năng: Chuyển đổi giữa light mode và dark mode
// Theo phương pháp Feynman: Giải thích từng dòng code một cách đơn giản

// === THEME CONSTANTS ===
// Định nghĩa các theme có sẵn
const THEMES = {
  LIGHT: 'light',
  DARK: 'dark'
};

// Theme mặc định là light mode
const DEFAULT_THEME = THEMES.LIGHT;

// === CSS CLASSES CHO DARK MODE ===
// Các class CSS sẽ được thêm vào body khi chuyển sang dark mode
const DARK_MODE_CLASSES = [
  'dark', // Class chính để trigger dark mode
  'bg-gray-900', // Nền tối
  'text-white' // Text trắng
];

// === FUNCTIONS QUẢN LÝ THEME ===

/**
 * Hàm lấy theme hiện tại từ localStorage
 * Nếu chưa có, trả về theme mặc định (light)
 * @returns {string} Theme hiện tại ('light' hoặc 'dark')
 */
export function getCurrentTheme() {
  try {
    // Lấy theme đã lưu từ localStorage
    const savedTheme = localStorage.getItem('money-tracker-theme');
    
    // Nếu có và hợp lệ, trả về theme đã lưu
    if (savedTheme && Object.values(THEMES).includes(savedTheme)) {
      return savedTheme;
    }
    
    // Nếu không có, kiểm tra system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return THEMES.DARK;
    }
    
    // Fallback về theme mặc định
    return DEFAULT_THEME;
    
  } catch (error) {
    console.error('Error getting current theme:', error);
    return DEFAULT_THEME;
  }
}

/**
 * Hàm đặt theme mới và lưu vào localStorage
 * @param {string} theme - Theme mới ('light' hoặc 'dark')
 */
export function setTheme(theme) {
  try {
    // Kiểm tra theme có hợp lệ không
    if (!Object.values(THEMES).includes(theme)) {
      throw new Error(`Theme '${theme}' not supported`);
    }
    
    // Lưu theme vào localStorage
    localStorage.setItem('money-tracker-theme', theme);
    
    // Áp dụng theme ngay lập tức
    applyTheme(theme);
    
    console.log(`Theme changed to: ${theme}`);
    
  } catch (error) {
    console.error('Error setting theme:', error);
  }
}

/**
 * Hàm áp dụng theme vào UI
 * @param {string} theme - Theme cần áp dụng
 */
export function applyTheme(theme) {
  try {
    const body = document.body;
    const html = document.documentElement;
    
    if (theme === THEMES.DARK) {
      // === ÁP DỤNG DARK MODE ===
      
      // Thêm class dark vào html element (cho Tailwind CSS)
      html.classList.add('dark');
      
      // Thêm các class dark mode vào body
      body.classList.add(...DARK_MODE_CLASSES);
      
      // Cập nhật background và text colors
      updateElementsForDarkMode();
      
      // Cập nhật meta theme-color cho mobile browsers
      updateMetaThemeColor('#1f2937'); // Gray-800
      
    } else {
      // === ÁP DỤNG LIGHT MODE ===
      
      // Remove class dark từ html element
      html.classList.remove('dark');
      
      // Remove các class dark mode từ body
      body.classList.remove(...DARK_MODE_CLASSES);
      
      // Cập nhật về light mode
      updateElementsForLightMode();
      
      // Cập nhật meta theme-color cho mobile browsers
      updateMetaThemeColor('#ffffff'); // White
    }
    
    // Cập nhật chart colors nếu có
    updateChartColors(theme);
    
    console.log(`Theme applied: ${theme}`);
    
  } catch (error) {
    console.error('Error applying theme:', error);
  }
}

/**
 * Hàm cập nhật elements cho dark mode
 */
function updateElementsForDarkMode() {
  // === HEADER ===
  const header = document.querySelector('header');
  if (header) {
    header.classList.remove('bg-white', 'border-gray-200');
    header.classList.add('bg-gray-800', 'border-gray-700');
    
    // Update header text colors
    const headerTexts = header.querySelectorAll('.text-gray-900, .text-gray-700');
    headerTexts.forEach(text => {
      text.classList.remove('text-gray-900', 'text-gray-700');
      text.classList.add('text-white');
    });
    
    const headerSubtexts = header.querySelectorAll('.text-gray-500');
    headerSubtexts.forEach(text => {
      text.classList.remove('text-gray-500');
      text.classList.add('text-gray-300');
    });
  }
  
  // === NAVIGATION ===
  const nav = document.querySelector('nav');
  if (nav) {
    nav.classList.remove('bg-white', 'border-gray-200');
    nav.classList.add('bg-gray-800', 'border-gray-700');
    
    // Update nav tab colors
    const navTabs = nav.querySelectorAll('.tab-btn');
    navTabs.forEach(tab => {
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
    });
  }
  
  // === MAIN CONTENT ===
  const main = document.querySelector('main');
  if (main) {
    main.classList.remove('bg-gray-50');
    main.classList.add('bg-gray-900');
  }
  
  // === CARDS ===
  const cards = document.querySelectorAll('.bg-white');
  cards.forEach(card => {
    card.classList.remove('bg-white', 'border-gray-200');
    card.classList.add('bg-gray-800', 'border-gray-700');
    
    // Update text colors trong cards
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
    
    // Update headings
    const headings = card.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headings.forEach(heading => {
      heading.classList.remove('text-gray-700', 'text-gray-900');
      heading.classList.add('text-white');
    });
  });
  
  // === JAR CARDS ===
  updateJarCardsForDarkMode();
  
  // === MODALS ===
  updateModalsForDarkMode();
  
  // === FORM ELEMENTS ===
  updateFormElementsForDarkMode();
  
  // === BUTTONS (giữ nguyên colors vì đã có theme riêng) ===
  // Buttons giữ nguyên màu sắc brand (green, red, blue)
}

/**
 * Hàm cập nhật elements cho light mode
 */
function updateElementsForLightMode() {
  // === HEADER ===
  const header = document.querySelector('header');
  if (header) {
    header.classList.remove('bg-gray-800', 'border-gray-700');
    header.classList.add('bg-white', 'border-gray-200');
    
    // Restore header text colors
    const headerTexts = header.querySelectorAll('.text-white');
    headerTexts.forEach(text => {
      text.classList.remove('text-white');
      text.classList.add('text-gray-900');
    });
    
    const headerSubtexts = header.querySelectorAll('.text-gray-300');
    headerSubtexts.forEach(text => {
      text.classList.remove('text-gray-300');
      text.classList.add('text-gray-500');
    });
  }
  
  // === NAVIGATION ===
  const nav = document.querySelector('nav');
  if (nav) {
    nav.classList.remove('bg-gray-800', 'border-gray-700');
    nav.classList.add('bg-white', 'border-gray-200');
    
    // Restore nav tab colors
    const navTabs = nav.querySelectorAll('.tab-btn');
    navTabs.forEach(tab => {
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
    });
  }
  
  // === MAIN CONTENT ===
  const main = document.querySelector('main');
  if (main) {
    main.classList.remove('bg-gray-900');
    main.classList.add('bg-gray-50');
  }
  
  // === CARDS ===
  const cards = document.querySelectorAll('.bg-gray-800');
  cards.forEach(card => {
    card.classList.remove('bg-gray-800', 'border-gray-700');
    card.classList.add('bg-white', 'border-gray-200');
    
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
    
    // Restore headings
    const headings = card.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headings.forEach(heading => {
      heading.classList.remove('text-white');
      heading.classList.add('text-gray-700');
    });
  });
  
  // === JAR CARDS ===
  updateJarCardsForLightMode();
  
  // === MODALS ===
  updateModalsForLightMode();
  
  // === FORM ELEMENTS ===
  updateFormElementsForLightMode();
}

/**
 * Hàm cập nhật jar cards cho dark mode
 */
function updateJarCardsForDarkMode() {
  const jarCards = document.querySelectorAll('.jar-card, [data-jar-type]');
  jarCards.forEach(card => {
    // Card background
    card.classList.remove('bg-white', 'border-gray-200');
    card.classList.add('bg-gray-800', 'border-gray-700');
    
    // Text colors trong jar cards
    const jarTexts = card.querySelectorAll('.text-gray-700, .text-gray-900');
    jarTexts.forEach(text => {
      text.classList.remove('text-gray-700', 'text-gray-900');
      text.classList.add('text-gray-100');
    });
    
    const jarSubtexts = card.querySelectorAll('.text-gray-500');
    jarSubtexts.forEach(text => {
      text.classList.remove('text-gray-500');
      text.classList.add('text-gray-400');
    });
  });
}

/**
 * Hàm cập nhật jar cards cho light mode
 */
function updateJarCardsForLightMode() {
  const jarCards = document.querySelectorAll('.jar-card, [data-jar-type]');
  jarCards.forEach(card => {
    // Card background
    card.classList.remove('bg-gray-800', 'border-gray-700');
    card.classList.add('bg-white', 'border-gray-200');
    
    // Restore text colors
    const jarTexts = card.querySelectorAll('.text-gray-100');
    jarTexts.forEach(text => {
      text.classList.remove('text-gray-100');
      text.classList.add('text-gray-700');
    });
    
    const jarSubtexts = card.querySelectorAll('.text-gray-400');
    jarSubtexts.forEach(text => {
      text.classList.remove('text-gray-400');
      text.classList.add('text-gray-500');
    });
  });
}

/**
 * Hàm cập nhật form elements cho dark mode
 */
function updateFormElementsForDarkMode() {
  // === INPUT FIELDS ===
  const inputs = document.querySelectorAll('input, select, textarea');
  inputs.forEach(input => {
    input.classList.remove('bg-white', 'border-gray-300', 'text-gray-900');
    input.classList.add('bg-gray-700', 'border-gray-600', 'text-white', 'placeholder-gray-400');
    
    // Focus states
    input.classList.remove('focus:ring-blue-500', 'focus:border-blue-500');
    input.classList.add('focus:ring-blue-400', 'focus:border-blue-400');
  });
  
  // === FORM LABELS ===
  const labels = document.querySelectorAll('label');
  labels.forEach(label => {
    label.classList.remove('text-gray-700', 'text-gray-900');
    label.classList.add('text-gray-200');
  });
}

/**
 * Hàm cập nhật form elements cho light mode
 */
function updateFormElementsForLightMode() {
  // === INPUT FIELDS ===
  const inputs = document.querySelectorAll('input, select, textarea');
  inputs.forEach(input => {
    input.classList.remove('bg-gray-700', 'border-gray-600', 'text-white', 'placeholder-gray-400');
    input.classList.add('bg-white', 'border-gray-300', 'text-gray-900');
    
    // Focus states
    input.classList.remove('focus:ring-blue-400', 'focus:border-blue-400');
    input.classList.add('focus:ring-blue-500', 'focus:border-blue-500');
  });
  
  // === FORM LABELS ===
  const labels = document.querySelectorAll('label');
  labels.forEach(label => {
    label.classList.remove('text-gray-200');
    label.classList.add('text-gray-700');
  });
}

/**
 * Hàm cập nhật modals cho dark mode
 */
function updateModalsForDarkMode() {
  const modals = document.querySelectorAll('.fixed.inset-0');
  modals.forEach(modal => {
    // Modal overlay - làm đậm hơn cho dark mode
    modal.classList.add('bg-opacity-80');
    
    // Modal content
    const content = modal.querySelector('.bg-white');
    if (content) {
      content.classList.remove('bg-white', 'border-gray-200');
      content.classList.add('bg-gray-800', 'border-gray-700');
      
      // Modal headings
      const modalHeadings = content.querySelectorAll('h1, h2, h3, h4, h5, h6');
      modalHeadings.forEach(heading => {
        heading.classList.remove('text-gray-700', 'text-gray-900');
        heading.classList.add('text-white');
      });
      
      // Modal text
      const modalTexts = content.querySelectorAll('.text-gray-700, .text-gray-900');
      modalTexts.forEach(text => {
        text.classList.remove('text-gray-700', 'text-gray-900');
        text.classList.add('text-gray-100');
      });
      
      const modalSubtexts = content.querySelectorAll('.text-gray-500');
      modalSubtexts.forEach(text => {
        text.classList.remove('text-gray-500');
        text.classList.add('text-gray-400');
      });
    }
  });
}

/**
 * Hàm cập nhật modals cho light mode
 */
function updateModalsForLightMode() {
  const modals = document.querySelectorAll('.fixed.inset-0');
  modals.forEach(modal => {
    // Modal overlay
    modal.classList.remove('bg-opacity-80');
    
    // Modal content
    const content = modal.querySelector('.bg-gray-800');
    if (content) {
      content.classList.remove('bg-gray-800', 'border-gray-700');
      content.classList.add('bg-white', 'border-gray-200');
      
      // Modal headings
      const modalHeadings = content.querySelectorAll('h1, h2, h3, h4, h5, h6');
      modalHeadings.forEach(heading => {
        heading.classList.remove('text-white');
        heading.classList.add('text-gray-700');
      });
      
      // Modal text
      const modalTexts = content.querySelectorAll('.text-gray-100');
      modalTexts.forEach(text => {
        text.classList.remove('text-gray-100');
        text.classList.add('text-gray-700');
      });
      
      const modalSubtexts = content.querySelectorAll('.text-gray-400');
      modalSubtexts.forEach(text => {
        text.classList.remove('text-gray-400');
        text.classList.add('text-gray-500');
      });
    }
  });
}

/**
 * Hàm cập nhật meta theme-color cho mobile browsers
 * @param {string} color - Màu hex
 */
function updateMetaThemeColor(color) {
  let metaThemeColor = document.querySelector('meta[name="theme-color"]');
  
  if (!metaThemeColor) {
    // Tạo meta tag nếu chưa có
    metaThemeColor = document.createElement('meta');
    metaThemeColor.setAttribute('name', 'theme-color');
    document.head.appendChild(metaThemeColor);
  }
  
  metaThemeColor.setAttribute('content', color);
}

/**
 * Hàm cập nhật màu sắc chart theo theme
 * @param {string} theme - Theme hiện tại
 */
function updateChartColors(theme) {
  // TODO: Implement chart color update when chart is re-rendered
  // Sẽ được integrate với ui.js để update chart colors
  console.log(`Chart colors updated for theme: ${theme}`);
}

/**
 * Hàm toggle theme (chuyển đổi giữa light và dark)
 */
export function toggleTheme() {
  const currentTheme = getCurrentTheme();
  const newTheme = currentTheme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT;
  setTheme(newTheme);
  return newTheme;
}

/**
 * Hàm check xem có đang ở dark mode không
 * @returns {boolean} True nếu đang ở dark mode
 */
export function isDarkMode() {
  return getCurrentTheme() === THEMES.DARK;
}

/**
 * Hàm lắng nghe system color scheme changes
 */
export function setupSystemThemeListener() {
  try {
    // Chỉ listen nếu user chưa manually set theme
    const savedTheme = localStorage.getItem('money-tracker-theme');
    
    if (!savedTheme && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      // Initial check
      if (mediaQuery.matches) {
        applyTheme(THEMES.DARK);
      }
      
      // Listen for changes
      mediaQuery.addEventListener('change', (e) => {
        if (e.matches) {
          applyTheme(THEMES.DARK);
        } else {
          applyTheme(THEMES.LIGHT);
        }
      });
      
      console.log('System theme listener setup complete');
    }
  } catch (error) {
    console.error('Error setting up system theme listener:', error);
  }
}

/**
 * Hàm khởi tạo theme khi app load
 */
export function initTheme() {
  try {
    // Lấy theme hiện tại và áp dụng
    const currentTheme = getCurrentTheme();
    applyTheme(currentTheme);
    
    // Setup system theme listener
    setupSystemThemeListener();
    
    console.log('Theme initialized:', currentTheme);
    
  } catch (error) {
    console.error('Error initializing theme:', error);
    // Fallback to default theme
    applyTheme(DEFAULT_THEME);
  }
}

// === EXPORTS ===
export { THEMES };

// === AUTO INITIALIZATION ===
// DISABLED: Tự động khởi tạo theme khi module được load
// Để tránh conflict với app.js DOMContentLoaded
// document.addEventListener('DOMContentLoaded', () => {
//   setTimeout(() => {
//     initTheme();
//   }, 50);
// });

console.log('🎨 Theme module loaded with default theme:', DEFAULT_THEME);
