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
      switchTab(tabId);
      closeMobileMenu();
      
      // Update mobile tab active state
      mobileTabBtns.forEach(b => {
        b.classList.remove('bg-blue-50', 'text-blue-600');
        b.classList.add('text-gray-600', 'hover:bg-gray-50');
      });
      btn.classList.remove('text-gray-600', 'hover:bg-gray-50');
      btn.classList.add('bg-blue-50', 'text-blue-600');
    });
  });

  console.log('✅ Mobile menu setup completed');
}

// === MOBILE INPUT FIX ===

function setupMobileFriendlySalaryInput() {
  const salaryInput = document.getElementById('salary-input');
  if (!salaryInput) return;

  let isFormatting = false;
  let timeoutId = null;
  
  function formatSalaryInput() {
    if (isFormatting) return;
    isFormatting = true;
    
    try {
      let value = salaryInput.value;
      value = value.replace(/[^\d]/g, '');
      
      if (value !== '') {
        const formattedValue = Number(value).toLocaleString();
        if (salaryInput.value !== formattedValue) {
          salaryInput.value = formattedValue;
        }
      } else {
        salaryInput.value = '';
      }
    } catch (error) {
      console.error('Salary formatting error:', error);
    } finally {
      isFormatting = false;
    }
  }
  
  // Input event với debounce
  salaryInput.addEventListener('input', (e) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
    timeoutId = setTimeout(() => {
      formatSalaryInput();
    }, 100);
  });
  
  // Blur event cho mobile
  salaryInput.addEventListener('blur', () => {
    formatSalaryInput();
  });
  
  // Focus event để clear formatting
  salaryInput.addEventListener('focus', () => {
    let value = salaryInput.value.replace(/,/g, '');
    if (value !== '') {
      salaryInput.value = value;
    }
  });
  
  console.log('✅ Mobile-friendly salary input setup completed');
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
  
  // Setup mobile-friendly input
  setupMobileFriendlySalaryInput();
  
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
