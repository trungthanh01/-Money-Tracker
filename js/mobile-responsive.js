// js/mobile-responsive.js
// Mobile responsive functionality và hamburger menu

// === MOBILE MENU FUNCTIONS ===

function setupMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenuClose = document.getElementById('mobile-menu-close');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
  const mobileTabBtns = document.querySelectorAll('.mobile-tab-btn');

  // Open mobile menu
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.add('open');
      mobileMenuOverlay.classList.remove('hidden');
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    });
  }

  // Close mobile menu
  function closeMobileMenu() {
    mobileMenu.classList.remove('open');
    mobileMenuOverlay.classList.add('hidden');
    document.body.style.overflow = ''; // Restore scroll
  }

  if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', closeMobileMenu);
  }

  if (mobileMenuOverlay) {
    mobileMenuOverlay.addEventListener('click', closeMobileMenu);
  }

  // Mobile tab navigation
  mobileTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.dataset.tab;
      // Sử dụng `window.SimpleMoneyTracker` để gọi hàm từ scope global
      if (window.SimpleMoneyTracker && typeof window.SimpleMoneyTracker.switchTab === 'function') {
        window.SimpleMoneyTracker.switchTab(tabId);
      } else {
        console.error('switchTab function is not available on window.SimpleMoneyTracker');
      }
      closeMobileMenu();
      

    });
  });

  console.log('✅ Mobile menu setup completed');
}

// === MOBILE INPUT FIX ===

function setupMobileFriendlyInput(inputId) {
  const input = document.getElementById(inputId);
  if (!input) return;

  let isFormatting = false;
  let timeoutId = null;

  function formatInput() {
    if (isFormatting) return;
    isFormatting = true;
    
    try {
      let value = input.value;
      value = value.replace(/[^\d]/g, '');
      
      if (value !== '') {
        const formattedValue = Number(value).toLocaleString();
        if (input.value !== formattedValue) {
          input.value = formattedValue;
        }
      } else {
        input.value = '';
      }
    } catch (error) {
      console.error(`Formatting error for ${inputId}:`, error);
    } finally {
      isFormatting = false;
    }
  }

  input.addEventListener('input', () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(formatInput, 100);
  });

  input.addEventListener('blur', formatInput);

  input.addEventListener('focus', () => {
    let value = input.value.replace(/,/g, '');
    if (value !== '') {
      input.value = value;
    }
  });

  console.log(`✅ Mobile-friendly input for #${inputId} setup completed`);
}

function setupMobileFriendlySalaryInput() {
  setupMobileFriendlyInput('salary-input');
}

function setupMobileFriendlyTransactionInput() {
  setupMobileFriendlyInput('amount-input');
}

// === RESPONSIVE UTILITIES ===

function updateMobileLayout() {
  const isMobile = window.innerWidth < 1024; // lg breakpoint
  
  // Update chart height for mobile
  const chartContainer = document.querySelector('#jar-chart').parentElement;
  if (chartContainer) {
    if (isMobile) {
      chartContainer.style.height = '12rem'; // h-48
    } else {
      chartContainer.style.height = '16rem'; // h-64
    }
  }
  
  // Update jar cards grid for mobile
  const jarsContainer = document.getElementById('jars-container');
  if (jarsContainer) {
    if (isMobile) {
      jarsContainer.className = 'grid grid-cols-1 sm:grid-cols-2 gap-4';
    } else {
      jarsContainer.className = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4';
    }
  }
}

// === INITIALIZATION ===

function initializeMobileResponsive() {
  console.log('🚀 Initializing mobile responsive features...');
  
  // Setup mobile menu
  setupMobileMenu();
  
  // Setup mobile-friendly inputs
  setupMobileFriendlySalaryInput();
  setupMobileFriendlyTransactionInput();
  
  // Initial layout update
  updateMobileLayout();
  
  // Listen for window resize
  window.addEventListener('resize', updateMobileLayout);
  
  console.log('✅ Mobile responsive features initialized');
}

// Export functions
export {
  setupMobileMenu,
  setupMobileFriendlySalaryInput,
  updateMobileLayout,
  initializeMobileResponsive
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeMobileResponsive);
} else {
  initializeMobileResponsive();
}
