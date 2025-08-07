// js/app-simple.js
// Version đơn giản - chỉ focus vào core functions hoạt động

// Import từ data.js
import { 
  addTransaction, 
  editSalary, 
  getTotalBalance,
  getSalary,
  getJars,
  getTransactions,
  formatCurrency,
  formatCurrencyWithSymbol,
  JAR_INFO,
  CURRENCY_INFO,
  getRatios,
  getCurrency,
  setCurrency
} from './data.js';

// Import settings modules (không ảnh hưởng core)
import { 
  initializeI18n, 
  changeLanguage, 
  getCurrentLanguage,
  getTranslation 
} from './i18n.js';

import { 
  initializeTheme, 
  toggleTheme 
} from './theme.js';

// Import mobile responsive functions
import { 
  initializeMobileResponsive 
} from './mobile-responsive.js';

// === GLOBAL VARIABLES ===
let jarChart = null; // Chart instance

// === UTILITY FUNCTIONS ===

/**
 * Simple number formatting for salary input (theo đề xuất của user)
 * DEPRECATED: Now handled by mobile-responsive.js
 */
function setupSalaryInputFormatting() {
  // This function is now deprecated - mobile input is handled by mobile-responsive.js
  console.log('⚠️ setupSalaryInputFormatting is deprecated - use mobile-responsive.js instead');
}

// === BASIC UI FUNCTIONS ===

function updateUI() {
  console.log('🔄 Updating UI...');
  
  // 1. Update balance
  const totalBalanceEl = document.getElementById('total-balance');
  const totalSalaryEl = document.getElementById('total-salary');
  
  if (totalBalanceEl) totalBalanceEl.textContent = formatCurrencyWithSymbol(getTotalBalance());
  if (totalSalaryEl) totalSalaryEl.textContent = formatCurrencyWithSymbol(getSalary());
  
  // 2. Update jar cards
  updateJarCards();
  
  // 3. Update transactions
  updateTransactionsList();
  
  // 4. Update chart
  updateChart();
  
  console.log('✅ UI updated');
}

function updateJarCards() {
  const container = document.getElementById('jars-container');
  if (!container) return;
  
  container.innerHTML = '';
  const jars = getJars();
  
  Object.entries(jars).forEach(([jarKey, balance]) => {
    const jarInfo = JAR_INFO[jarKey];
    
    const cardEl = document.createElement('div');
    cardEl.className = 'bg-white rounded-lg shadow-sm p-4 border-l-4';
    cardEl.style.borderLeftColor = jarInfo.color;
    
    // Get translated jar name and description
    const jarName = window.t ? window.t(`jars.${jarKey}.name`) : jarInfo.name;
    const jarDescription = window.t ? window.t(`jars.${jarKey}.description`) : jarInfo.description;
    
    cardEl.innerHTML = `
      <div class="flex items-center justify-between mb-2">
        <h4 class="font-semibold text-gray-700">${jarName}</h4>
        <div class="w-4 h-4 rounded-full" style="background-color: ${jarInfo.color}"></div>
      </div>
      <div class="text-xl font-bold text-gray-900 mb-2">
        ${formatCurrencyWithSymbol(balance)}
      </div>
      <p class="text-sm text-gray-500">
        ${jarDescription}
      </p>
    `;
    
    container.appendChild(cardEl);
  });
}

function updateTransactionsList() {
  const container = document.getElementById('transactions-list');
  if (!container) return;
  
  const transactions = getTransactions().slice(-5); // 5 giao dịch gần nhất
  
  if (transactions.length === 0) {
    const noTransactionsText = window.t ? window.t('dashboard.noTransactions') : 'Chưa có giao dịch nào';
    container.innerHTML = `<p class="text-gray-500 text-center">${noTransactionsText}</p>`;
    return;
  }
  
  container.innerHTML = '';
  
  transactions.forEach(transaction => {
    const jarInfo = JAR_INFO[transaction.jar];
    const jarName = window.t ? window.t(`jars.${transaction.jar}.name`) : jarInfo.name;
    const itemEl = document.createElement('div');
    itemEl.className = 'flex items-center justify-between py-3 border-b border-gray-100';
    
    itemEl.innerHTML = `
      <div class="flex-1">
        <div class="font-medium text-gray-900">${transaction.desc}</div>
        <div class="text-sm text-gray-500">
          ${jarName} • ${transaction.date}
        </div>
      </div>
      <div class="text-right">
        <div class="font-semibold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}">
          ${transaction.type === 'income' ? '+' : '-'}${formatCurrencyWithSymbol(Math.abs(transaction.amount))}
        </div>
      </div>
    `;
    
    container.appendChild(itemEl);
  });
}

function updateChart() {
  const canvas = document.getElementById('jar-chart');
  if (!canvas) {
    console.log('❌ Canvas not found');
    return;
  }
  
  // Kiểm tra Chart.js
  if (typeof Chart === 'undefined') {
    console.log('❌ Chart.js not loaded, retrying...');
    setTimeout(updateChart, 1000);
    return;
  }
  
  const ctx = canvas.getContext('2d');
  const jars = getJars();
  
  // Prepare data
  const chartData = [];
  const chartLabels = [];
  const chartColors = [];
  
  Object.entries(jars).forEach(([jarKey, balance]) => {
    if (balance > 0) {
      const jarInfo = JAR_INFO[jarKey];
      chartData.push(balance);
      // Use translated jar name
      const jarName = window.t ? window.t(`jars.${jarKey}.name`) : jarInfo.name;
      chartLabels.push(jarName);
      chartColors.push(jarInfo.color);
    }
  });
  
  // Destroy existing chart
  if (jarChart) {
    jarChart.destroy();
  }
  
  // Create new chart
  try {
    jarChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: chartLabels,
        datasets: [{
          data: chartData,
          backgroundColor: chartColors,
          borderWidth: 2,
          borderColor: '#ffffff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });
    console.log('✅ Chart created successfully');
  } catch (error) {
    console.error('❌ Chart creation failed:', error);
  }
}

// === MODAL FUNCTIONS ===

function showModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('hidden');
  }
}

function hideModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('hidden');
    // Reset form
    const form = modal.querySelector('form');
    if (form) form.reset();
  }
}

function setupTransactionModal(type) {
  const modal = document.getElementById('transaction-modal');
  const title = document.getElementById('modal-title');
  
  if (type === 'income') {
    title.textContent = 'Thêm Thu Nhập';
  } else {
    title.textContent = 'Thêm Chi Tiêu';
  }
  
  modal.dataset.transactionType = type;
  showModal('transaction-modal');
}

// === TAB FUNCTIONS ===

function switchTab(activeTabId) {
  // Hide all tabs
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.classList.add('hidden');
  });
  
  // Remove active from all buttons
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('border-blue-500', 'text-blue-600');
    btn.classList.add('border-transparent', 'text-gray-500');
  });
  
  // Show active tab
  const activeTab = document.getElementById(`${activeTabId}-tab`);
  if (activeTab) {
    activeTab.classList.remove('hidden');
  }
  
  // Activate button
  const activeBtn = document.querySelector(`[data-tab="${activeTabId}"]`);
  if (activeBtn) {
    activeBtn.classList.remove('border-transparent', 'text-gray-500');
    activeBtn.classList.add('border-blue-500', 'text-blue-600');
  }
}

// === EVENT HANDLERS ===

function handleTransactionSubmit(e) {
  e.preventDefault();
  
  try {
    const modal = document.getElementById('transaction-modal');
    const type = modal.dataset.transactionType;
    const amount = document.getElementById('amount-input').value;
    const description = document.getElementById('description-input').value;
    const jar = document.getElementById('jar-select').value;
    
    // Validation
    if (!amount || Number(amount) <= 0) {
      alert('Vui lòng nhập số tiền hợp lệ');
      return;
    }
    
    if (!description.trim()) {
      alert('Vui lòng nhập mô tả');
      return;
    }
    
    if (!jar) {
      alert('Vui lòng chọn hủ');
      return;
    }
    
    // Add transaction
    addTransaction(type, amount, jar, description);
    
    // Update UI
    updateUI();
    
    // Hide modal
    hideModal('transaction-modal');
    
    // Success message
    alert(type === 'income' ? 'Đã thêm thu nhập!' : 'Đã thêm chi tiêu!');
    
  } catch (error) {
    console.error('Transaction error:', error);
    alert('Có lỗi xảy ra: ' + error.message);
  }
}

function handleSalarySubmit(e) {
  e.preventDefault();
  
  try {
    const salaryInput = document.getElementById('salary-input');
    const salary = salaryInput.value.replace(/,/g, ''); // Xóa dấu phẩy đơn giản
    
    // Get ratios
    const ratios = {
      debt: Number(document.getElementById('debt-ratio').value),
      expenses: Number(document.getElementById('expenses-ratio').value),
      emergency: Number(document.getElementById('emergency-ratio').value),
      savings: Number(document.getElementById('savings-ratio').value),
      investment: Number(document.getElementById('investment-ratio').value),
      learning: Number(document.getElementById('learning-ratio').value)
    };
    
    // Validation
    if (!salary || Number(salary) <= 0) {
      alert('Vui lòng nhập lương hợp lệ');
      return;
    }
    
    const totalRatio = Object.values(ratios).reduce((sum, ratio) => sum + ratio, 0);
    if (totalRatio !== 100) {
      alert('Tổng tỉ lệ phải bằng 100%');
      return;
    }
    
    // Update salary
    editSalary(salary, ratios);
    
    // Update UI
    updateUI();
    
    // Hide modal
    hideModal('salary-modal');
    
    alert('Đã cập nhật lương!');
    
  } catch (error) {
    console.error('Salary error:', error);
    alert('Có lỗi xảy ra: ' + error.message);
  }
}

function loadSalaryData() {
  const salary = getSalary();
  const ratios = getRatios();
  
  // Format salary với toLocaleString() đơn giản
  const salaryInput = document.getElementById('salary-input');
  salaryInput.value = salary > 0 ? salary.toLocaleString() : '';
  document.getElementById('debt-ratio').value = ratios.debt;
  document.getElementById('expenses-ratio').value = ratios.expenses;
  document.getElementById('emergency-ratio').value = ratios.emergency;
  document.getElementById('savings-ratio').value = ratios.savings;
  document.getElementById('investment-ratio').value = ratios.investment;
  document.getElementById('learning-ratio').value = ratios.learning;
  
  updateTotalRatio();
}

function updateTotalRatio() {
  const ratios = [
    'debt-ratio', 'expenses-ratio', 'emergency-ratio',
    'savings-ratio', 'investment-ratio', 'learning-ratio'
  ];
  
  const total = ratios.reduce((sum, id) => {
    const value = Number(document.getElementById(id).value) || 0;
    return sum + value;
  }, 0);
  
  const totalEl = document.getElementById('total-ratio');
  if (totalEl) {
    totalEl.textContent = total + '%';
    totalEl.className = total === 100 ? 'text-green-600' : 'text-red-600';
  }
}

// === SETTINGS FUNCTIONS (riêng lẻ, không ảnh hưởng core) ===

/**
 * Function: Handle language change
 * Trách nhiệm duy nhất: Xử lý thay đổi ngôn ngữ
 */
async function handleLanguageChange(e) {
  try {
    const langCode = e.target.value;
    console.log(`🌐 Changing language to: ${langCode}`);
    
    const success = await changeLanguage(langCode);
    
    if (success) {
      // Simple success message
      alert(langCode === 'vi' ? 'Đã thay đổi ngôn ngữ!' : 'Language changed!');
    } else {
      alert('Language change failed');
    }
  } catch (error) {
    console.error('Language change error:', error);
    alert('Language change failed');
  }
}

/**
 * Function: Handle theme toggle
 * Trách nhiệm duy nhất: Xử lý toggle theme
 */
function handleThemeToggle() {
  try {
    console.log('🎨 Toggling theme...');
    
    const newTheme = toggleTheme();
    
    // Simple success message
    const message = newTheme === 'dark' ? 'Đã chuyển sang giao diện tối!' : 'Đã chuyển sang giao diện sáng!';
    alert(message);
    
  } catch (error) {
    console.error('Theme toggle error:', error);
    alert('Theme change failed');
  }
}

/**
 * Handle currency change event
 */
function handleCurrencyChange(e) {
  try {
    const newCurrency = e.target.value;
    console.log(`💱 Changing currency to: ${newCurrency}`);
    
    // Update currency
    setCurrency(newCurrency);
    
    // Update UI to reflect new currency
    updateUI();
    
    // Success message
    const currencyInfo = CURRENCY_INFO[newCurrency];
    const message = `Đã chuyển sang ${currencyInfo.name} (${currencyInfo.symbol})`;
    alert(message);
    
  } catch (error) {
    console.error('Currency change error:', error);
    alert('Có lỗi xảy ra khi thay đổi đơn vị tiền tệ');
  }
}

/**
 * Initialize currency settings
 */
function initializeCurrency() {
  try {
    const currentCurrency = getCurrency();
    console.log(`💱 Current currency: ${currentCurrency}`);
    
    // Set currency selector value
    const currencySelect = document.getElementById('currency-select');
    if (currencySelect) {
      currencySelect.value = currentCurrency;
    }
    
    console.log('✅ Currency initialized');
  } catch (error) {
    console.error('❌ Currency initialization failed:', error);
  }
}

/**
 * Function: Initialize settings
 * Trách nhiệm duy nhất: Khởi tạo settings modules
 */


// === INITIALIZATION ===

function bindEvents() {
  console.log('🔗 Binding events...');
  
  // Tab buttons
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.dataset.tab;
      switchTab(tabId);
    });
  });
  
  // Main buttons
  const addIncomeBtn = document.getElementById('btn-add-income');
  if (addIncomeBtn) {
    addIncomeBtn.addEventListener('click', () => setupTransactionModal('income'));
  }
  
  const addExpenseBtn = document.getElementById('btn-add-expense');
  if (addExpenseBtn) {
    addExpenseBtn.addEventListener('click', () => setupTransactionModal('expense'));
  }
  
  const editSalaryBtn = document.getElementById('btn-edit-salary');
  if (editSalaryBtn) {
    editSalaryBtn.addEventListener('click', () => {
      loadSalaryData();
      showModal('salary-modal');
    });
  }
  
  // Forms
  const transactionForm = document.getElementById('transaction-form');
  if (transactionForm) {
    transactionForm.addEventListener('submit', handleTransactionSubmit);
  }
  
  const salaryForm = document.getElementById('salary-form');
  if (salaryForm) {
    salaryForm.addEventListener('submit', handleSalarySubmit);
  }
  
  // Setup simple salary formatting theo đề xuất của user
  // Salary input formatting - now handled by mobile-responsive.js
  // setupSalaryInputFormatting(); // DEPRECATED
  
  // Cancel buttons
  const cancelBtns = document.querySelectorAll('#cancel-btn, #cancel-salary-btn');
  cancelBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      hideModal('transaction-modal');
      hideModal('salary-modal');
    });
  });
  
  // Ratio inputs
  const ratioInputs = [
    'debt-ratio', 'expenses-ratio', 'emergency-ratio',
    'savings-ratio', 'investment-ratio', 'learning-ratio'
  ];
  
  ratioInputs.forEach(inputId => {
    const input = document.getElementById(inputId);
    if (input) {
      input.addEventListener('input', updateTotalRatio);
    }
  });
  
  // === SETTINGS EVENTS (riêng lẻ) ===
  
  // Language selector
  const languageSelect = document.getElementById('language-select');
  if (languageSelect) {
    languageSelect.addEventListener('change', handleLanguageChange);
    console.log('✅ Language selector bound');
  }
  
  // Theme toggle button
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', handleThemeToggle);
    console.log('✅ Theme toggle bound');
  }
  
  // Currency selector
  const currencySelect = document.getElementById('currency-select');
  if (currencySelect) {
    currencySelect.addEventListener('change', handleCurrencyChange);
    console.log('✅ Currency selector bound');
  }
  
  // ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      hideModal('transaction-modal');
      hideModal('salary-modal');
    }
  });
  
  console.log('✅ All events bound');
}

async function initApp() {
  console.log('🚀 Starting Money Tracker with Settings...');
  
  // 1. Initialize settings first (không ảnh hưởng core)
  await initializeI18n();
  await initializeTheme();
  initializeCurrency();
  initializeMobileResponsive(); // Thêm mobile responsive
  
  // 2. Update UI
  updateUI();
  
  // 3. Bind events
  bindEvents();
  
  // 4. Show dashboard
  switchTab('dashboard');
  
  // 5. Check first time user
  if (getSalary() === 0) {
    setTimeout(() => {
      // Use translated welcome message
      const welcomeMsg = window.t ? window.t('messages.welcome') : 'Chào mừng! Hãy nhập lương để bắt đầu.';
      alert(welcomeMsg);
      loadSalaryData();
      showModal('salary-modal');
    }, 1000);
  }
  
  console.log('✅ Money Tracker with Settings Started!');
}

// === APP START ===
document.addEventListener('DOMContentLoaded', initApp);

// Export for debugging
window.SimpleMoneyTracker = {
  updateUI,
  showModal,
  hideModal,
  switchTab
};
