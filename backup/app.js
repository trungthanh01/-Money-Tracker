// js/app.js  
// Module chính khởi động Money Tracker App
// Chức năng: Khởi tạo app, bind events, điều phối giữa UI và Data
// Theo phương pháp Feynman: Giải thích từng function một cách đơn giản

// Import các functions cần thiết từ data và ui modules
import { 
  addTransaction, 
  editSalary, 
  getRatios,
  getSalary,
  exportData,
  importData,
  clearAllData
} from './data.js';

import { 
  updateAllUI, 
  showModal, 
  hideModal, 
  setupTransactionModal,
  switchTab,
  updateTotalRatio,
  loadSalaryData,
  showToast
} from './ui.js';

// Import modules cho i18n và theme
import { 
  setLanguage, 
  getCurrentLanguage, 
  t,
  updateAllTexts
} from './i18n.js';

import { 
  setTheme, 
  getCurrentTheme, 
  THEMES,
  initTheme
} from './theme.js';

// === APP INITIALIZATION ===

/**
 * Hàm khởi tạo ứng dụng
 * Được gọi khi DOM đã load xong
 */
function initApp() {
  console.log('🚀 Money Tracker App Starting...');
  
  // Debug: Kiểm tra elements quan trọng
  debugElementsExistence();
  
  // Initialize theme system
  initTheme();
  
  // Initialize i18n system  
  updateAllTexts();
  
  // Render UI lần đầu với dữ liệu hiện có
  updateAllUI();
  
  // Bind events cho các buttons và forms
  bindEvents();
  
  // Hiển thị tab dashboard mặc định
  switchTab('dashboard');
  
  console.log('✅ Money Tracker App Started Successfully!');
}

/**
 * Debug function để kiểm tra DOM elements có tồn tại không
 */
function debugElementsExistence() {
  const criticalElements = [
    'btn-add-income',
    'btn-add-expense', 
    'btn-edit-salary',
    'transaction-modal',
    'salary-modal',
    'jar-chart',
    'language-select',
    'light-mode-btn',
    'dark-mode-btn',
    'settings-tab'
  ];
  
  console.log('🔍 Checking critical elements...');
  criticalElements.forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      console.log(`✅ ${id}: Found`);
    } else {
      console.error(`❌ ${id}: NOT FOUND`);
    }
  });
  
  // Kiểm tra Chart.js
  if (typeof Chart !== 'undefined') {
    console.log('✅ Chart.js: Loaded');
  } else {
    console.error('❌ Chart.js: NOT LOADED');
  }
}

// === EVENT BINDING ===

/**
 * Hàm bind tất cả events cho app
 * Gán các event listeners cho buttons, forms, inputs
 */
function bindEvents() {
  
  // === TAB NAVIGATION EVENTS ===
  // Bind events cho các tab buttons
  const tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tabId = button.dataset.tab;
      switchTab(tabId);
    });
  });
  
  // === MAIN ACTION BUTTONS ===
  
  // Button "Thêm Thu Nhập"
  const addIncomeBtn = document.getElementById('btn-add-income');
  if (addIncomeBtn) {
    addIncomeBtn.addEventListener('click', () => {
      setupTransactionModal('income');
    });
  } else {
    console.error('Button "btn-add-income" not found');
  }
  
  // Button "Thêm Chi Tiêu"  
  const addExpenseBtn = document.getElementById('btn-add-expense');
  if (addExpenseBtn) {
    addExpenseBtn.addEventListener('click', () => {
      setupTransactionModal('expense');
    });
  } else {
    console.error('Button "btn-add-expense" not found');
  }
  
  // Button "Nhập Lương"
  const editSalaryBtn = document.getElementById('btn-edit-salary');
  if (editSalaryBtn) {
    editSalaryBtn.addEventListener('click', () => {
      loadSalaryData(); // Load dữ liệu hiện tại vào form
      showModal('salary-modal');
    });
  } else {
    console.error('Button "btn-edit-salary" not found');
  }
  
  // === TRANSACTION MODAL EVENTS ===
  
  // Form submit: Thêm giao dịch
  document.getElementById('transaction-form').addEventListener('submit', handleTransactionSubmit);
  
  // Button Cancel trong transaction modal
  document.getElementById('cancel-btn').addEventListener('click', () => {
    hideModal('transaction-modal');
  });
  
  // Click outside modal để đóng
  document.getElementById('transaction-modal').addEventListener('click', (e) => {
    if (e.target.id === 'transaction-modal') {
      hideModal('transaction-modal');
    }
  });
  
  // === SALARY MODAL EVENTS ===
  
  // Form submit: Cập nhật lương
  document.getElementById('salary-form').addEventListener('submit', handleSalarySubmit);
  
  // Button Cancel trong salary modal
  document.getElementById('cancel-salary-btn').addEventListener('click', () => {
    hideModal('salary-modal');
  });
  
  // Click outside modal để đóng
  document.getElementById('salary-modal').addEventListener('click', (e) => {
    if (e.target.id === 'salary-modal') {
      hideModal('salary-modal');
    }
  });
  
  // Bind events cho ratio inputs để cập nhật tổng real-time
  const ratioInputs = [
    'debt-ratio', 'expenses-ratio', 'emergency-ratio',
    'savings-ratio', 'investment-ratio', 'learning-ratio'
  ];
  
  ratioInputs.forEach(inputId => {
    document.getElementById(inputId).addEventListener('input', updateTotalRatio);
  });
  
  // === SETTINGS TAB EVENTS ===
  
  // Language change
  const languageSelect = document.getElementById('language-select');
  if (languageSelect) {
    languageSelect.addEventListener('change', (e) => {
      setLanguage(e.target.value);
      showToast(t('languageChanged') || 'Language changed successfully!', 'success');
    });
  } else {
    console.error('Element "language-select" not found');
  }
  
  // Theme change buttons
  const lightModeBtn = document.getElementById('light-mode-btn');
  if (lightModeBtn) {
    lightModeBtn.addEventListener('click', () => {
      setTheme(THEMES.LIGHT);
      updateThemeButtons();
      showToast(t('themeChanged') || 'Theme changed to light mode!', 'success');
    });
  } else {
    console.error('Element "light-mode-btn" not found');
  }
  
  const darkModeBtn = document.getElementById('dark-mode-btn');
  if (darkModeBtn) {
    darkModeBtn.addEventListener('click', () => {
      setTheme(THEMES.DARK);
      updateThemeButtons();
      showToast(t('themeChanged') || 'Theme changed to dark mode!', 'success');
    });
  } else {
    console.error('Element "dark-mode-btn" not found');
  }
  
  // Data management buttons
  const exportBtn = document.getElementById('export-data-btn');
  if (exportBtn) {
    exportBtn.addEventListener('click', handleExportData);
  } else {
    console.error('Element "export-data-btn" not found');
  }
  
  const importBtn = document.getElementById('import-data-btn');
  if (importBtn) {
    importBtn.addEventListener('click', handleImportData);
  } else {
    console.error('Element "import-data-btn" not found');
  }
  
  const clearBtn = document.getElementById('clear-data-btn');
  if (clearBtn) {
    clearBtn.addEventListener('click', handleClearData);
  } else {
    console.error('Element "clear-data-btn" not found');
  }
  
  // File input for import
  const fileInput = document.getElementById('import-file-input');
  if (fileInput) {
    fileInput.addEventListener('change', handleFileImport);
  } else {
    console.error('Element "import-file-input" not found');
  }
  
  // === KEYBOARD SHORTCUTS ===
  
  // ESC để đóng modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      hideModal('transaction-modal');
      hideModal('salary-modal');
    }
  });
  
  console.log('📌 All events bound successfully');
}

// === EVENT HANDLERS ===

/**
 * Handler xử lý submit form thêm giao dịch
 * @param {Event} e - Event object từ form submit
 */
function handleTransactionSubmit(e) {
  // Ngăn form submit mặc định (reload page)
  e.preventDefault();
  
  try {
    // Lấy dữ liệu từ form
    const modal = document.getElementById('transaction-modal');
    const type = modal.dataset.transactionType; // 'income' hoặc 'expense'
    const amount = document.getElementById('amount-input').value;
    const description = document.getElementById('description-input').value;
    const jar = document.getElementById('jar-select').value;
    
    // Validate dữ liệu đầu vào
    if (!amount || Number(amount) <= 0) {
      throw new Error(t('pleaseEnterValidAmount'));
    }
    
    if (!description.trim()) {
      throw new Error(t('pleaseEnterDescription'));
    }
    
    if (!jar) {
      throw new Error(t('pleaseSelectJar'));
    }
    
    if (description.length > 100) {
      throw new Error(t('descriptionTooLong'));
    }
    
    // Thêm giao dịch vào dữ liệu
    const transaction = addTransaction(type, amount, jar, description);
    
    // Đóng modal
    hideModal('transaction-modal');
    
    // Cập nhật UI
    updateAllUI();
    
    // Hiển thị thông báo thành công với i18n
    if (type === 'income') {
      showToast(t('incomeAdded'), 'success');
    } else {
      showToast(t('expenseAdded'), 'success');
    }
    
    console.log('✅ Transaction added:', transaction);
    
  } catch (error) {
    // Hiển thị lỗi cho user
    showToast(error.message, 'error');
    console.error('❌ Error adding transaction:', error);
  }
}

/**
 * Handler xử lý submit form cập nhật lương
 * @param {Event} e - Event object từ form submit  
 */
function handleSalarySubmit(e) {
  // Ngăn form submit mặc định
  e.preventDefault();
  
  try {
    // Lấy dữ liệu từ form
    const salary = document.getElementById('salary-input').value;
    const ratios = {
      debt: Number(document.getElementById('debt-ratio').value),
      expenses: Number(document.getElementById('expenses-ratio').value),
      emergency: Number(document.getElementById('emergency-ratio').value),
      savings: Number(document.getElementById('savings-ratio').value),
      investment: Number(document.getElementById('investment-ratio').value),
      learning: Number(document.getElementById('learning-ratio').value)
    };
    
    // Validate dữ liệu
    if (!salary || Number(salary) <= 0) {
      throw new Error(t('pleaseEnterValidSalary'));
    }
    
    // Kiểm tra tổng tỉ lệ = 100%
    const totalRatio = Object.values(ratios).reduce((sum, ratio) => sum + ratio, 0);
    if (totalRatio !== 100) {
      throw new Error(t('totalRatioMustBe100'));
    }
    
    // Cập nhật lương và tỉ lệ
    editSalary(salary, ratios);
    
    // Đóng modal
    hideModal('salary-modal');
    
    // Cập nhật UI
    updateAllUI();
    
    // Hiển thị thông báo thành công với i18n
    showToast(t('salaryUpdated'), 'success');
    
    console.log('✅ Salary updated:', { salary, ratios });
    
  } catch (error) {
    // Hiển thị lỗi cho user
    showToast(error.message, 'error');
    console.error('❌ Error updating salary:', error);
  }
}

// === SETTINGS HANDLERS ===

/**
 * Handler xuất dữ liệu ra file JSON
 */
function handleExportData() {
  try {
    const data = exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `money-tracker-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showToast(t('exportSuccess') || 'Data exported successfully!', 'success');
  } catch (error) {
    console.error('Export error:', error);
    showToast(t('exportError') || 'Failed to export data', 'error');
  }
}

/**
 * Handler kích hoạt input file để import
 */
function handleImportData() {
  document.getElementById('import-file-input').click();
}

/**
 * Handler xử lý file được chọn để import
 */
function handleFileImport(e) {
  const file = e.target.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      importData(event.target.result);
      updateAllUI();
      showToast(t('importSuccess') || 'Data imported successfully!', 'success');
    } catch (error) {
      console.error('Import error:', error);
      showToast(t('importError') || 'Failed to import data. Please check file format.', 'error');
    }
  };
  reader.readAsText(file);
  
  // Reset input
  e.target.value = '';
}

/**
 * Handler xóa tất cả dữ liệu
 */
function handleClearData() {
  if (confirm(t('confirmClearData') || 'Are you sure you want to delete all data? This action cannot be undone.')) {
    clearAllData();
    updateAllUI();
    showToast(t('dataClearedSuccess') || 'All data cleared successfully!', 'success');
  }
}

/**
 * Hàm cập nhật trạng thái buttons theme
 */
function updateThemeButtons() {
  const currentTheme = getCurrentTheme();
  const lightBtn = document.getElementById('light-mode-btn');
  const darkBtn = document.getElementById('dark-mode-btn');
  
  // Reset classes
  lightBtn.classList.remove('border-blue-500', 'bg-blue-50');
  darkBtn.classList.remove('border-blue-500', 'bg-blue-50');
  
  // Apply active state
  if (currentTheme === THEMES.LIGHT) {
    lightBtn.classList.add('border-blue-500', 'bg-blue-50');
  } else {
    darkBtn.classList.add('border-blue-500', 'bg-blue-50');
  }
}

/**
 * Hàm load current settings vào UI
 */
function loadCurrentSettings() {
  // Load language
  const currentLang = getCurrentLanguage();
  document.getElementById('language-select').value = currentLang;
  
  // Load theme
  updateThemeButtons();
}

// === FIRST TIME USER SETUP ===

/**
 * Hàm kiểm tra và hướng dẫn user mới
 * Nếu chưa có lương được setup, hiển thị modal nhập lương
 */
function checkFirstTimeUser() {
  const salary = getSalary();
  
  // Nếu chưa có lương (= 0), đây là user mới
  if (salary === 0) {
    setTimeout(() => {
      // Hiển thị thông báo chào mừng
      showToast(t('welcome'), 'info');
      
      // Hiển thị modal nhập lương sau 1 giây
      setTimeout(() => {
        loadSalaryData();
        showModal('salary-modal');
      }, 1000);
    }, 500);
  }
}

// === UTILITY FUNCTIONS ===

/**
 * Hàm log thông tin debug (chỉ trong development)
 */
function debugLog() {
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('=== DEBUG INFO ===');
    console.log('Salary:', getSalary());
    console.log('Ratios:', getRatios());
    console.log('==================');
  }
}

// === ERROR HANDLING ===

/**
 * Global error handler
 */
window.addEventListener('error', (e) => {
  console.error('💥 Global Error:', e.error);
  
});

/**
 * Unhandled promise rejection handler
 */
window.addEventListener('unhandledrejection', (e) => {
  console.error('💥 Unhandled Promise Rejection:', e.reason);
  
});

// === APP STARTUP ===

/**
 * Khởi động app khi DOM ready
 * Sử dụng DOMContentLoaded để đảm bảo tất cả HTML đã load
 */
document.addEventListener('DOMContentLoaded', () => {
  console.log('📄 DOM Content Loaded');
  
  // Khởi tạo app
  initApp();
  
  // Load current settings
  loadCurrentSettings();
  
  // Kiểm tra user mới
  checkFirstTimeUser();
  
  // Debug info (chỉ trong development)
  debugLog();
});

// === EXPORTS FOR CONSOLE DEBUGGING ===
// Export một số functions để có thể test trong console

window.MoneyTracker = {
  updateUI: updateAllUI,
  showModal,
  hideModal,
  debugLog
};

console.log('🎯 Money Tracker App Module Loaded');
