// Mobile responsive: hamburger menu + mobile-friendly inputs

function setupMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenuClose = document.getElementById('mobile-menu-close');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
  const mobileTabBtns = document.querySelectorAll('.mobile-tab-btn');

  function openMenu() {
    mobileMenu.classList.add('open');
    mobileMenuOverlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    mobileMenu.classList.remove('open');
    mobileMenuOverlay.classList.add('hidden');
    document.body.style.overflow = '';
  }
  if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMenu);
  if (mobileMenuClose) mobileMenuClose.addEventListener('click', closeMenu);
  if (mobileMenuOverlay) mobileMenuOverlay.addEventListener('click', closeMenu);

  mobileTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.dataset.tab;
      if (window.SimpleMoneyTracker && typeof window.SimpleMoneyTracker.switchTab === 'function') {
        window.SimpleMoneyTracker.switchTab(tabId);
      }
      // Auto-close mobile menu after tab selection
      setTimeout(closeMenu, 100);
    });
  });
}

function setupMobileFriendlyInput(inputId) {
  const input = document.getElementById(inputId);
  if (!input) return;
  let isFormatting = false; let timeoutId = null;
  function formatInput() {
    if (isFormatting) return; isFormatting = true;
    try {
      let value = input.value || '';
      value = value.replace(/[^\d]/g, '');
      input.value = value ? Number(value).toLocaleString() : '';
    } finally { isFormatting = false; }
  }
  input.addEventListener('input', () => { if (timeoutId) clearTimeout(timeoutId); timeoutId = setTimeout(formatInput, 100); });
  input.addEventListener('blur', formatInput);
  input.addEventListener('focus', () => { const v = (input.value || '').replace(/,/g, ''); if (v) input.value = v; });
}

function initializeMobileResponsive() {
  setupMobileMenu();
  setupMobileFriendlyInput('salary-input');
  setupMobileFriendlyInput('amount-input');
}

export { initializeMobileResponsive };


