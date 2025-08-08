// frontend/src/app.js
// Entry của ứng dụng: khởi tạo settings, responsive, bind events, update UI

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
  setCurrency,
  exportData,
  importData,
  clearAllData
} from './core/data.js';

import {
  initializeI18n,
  changeLanguage,
  getCurrentLanguage,
  getTranslation
} from './features/settings/i18n.js';

import { initializeTheme } from './features/settings/theme.js';

import {
  initializeMobileResponsive
} from './features/navigation/mobile-responsive.js';

let jarChart = null;

function updateUI() {
  const totalBalanceEl = document.getElementById('total-balance');
  const totalSalaryEl = document.getElementById('total-salary');
  if (totalBalanceEl) totalBalanceEl.textContent = formatCurrencyWithSymbol(getTotalBalance());
  if (totalSalaryEl) totalSalaryEl.textContent = formatCurrencyWithSymbol(getSalary());
  updateJarCards();
  updateTransactionsList();
  updateChart();
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
  const transactions = getTransactions().slice(-5);
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
        <div class="text-sm text-gray-500">${jarName} • ${transaction.date}</div>
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
  if (!canvas) return;
  if (typeof Chart === 'undefined') { setTimeout(updateChart, 500); return; }
  const ctx = canvas.getContext('2d');
  const jars = getJars();
  const chartData = [], chartLabels = [], chartColors = [];
  Object.entries(jars).forEach(([jarKey, balance]) => {
    if (balance > 0) {
      const jarInfo = JAR_INFO[jarKey];
      chartData.push(balance);
      const jarName = window.t ? window.t(`jars.${jarKey}.name`) : jarInfo.name;
      chartLabels.push(jarName);
      chartColors.push(jarInfo.color);
    }
  });
  if (jarChart) jarChart.destroy();
  jarChart = new Chart(ctx, {
    type: 'doughnut',
    data: { labels: chartLabels, datasets: [{ data: chartData, backgroundColor: chartColors, borderWidth: 2, borderColor: '#ffffff' }] },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
  });
  // Build legend
  const legend = document.getElementById('chart-legend');
  if (legend) {
    legend.innerHTML = '';
    chartLabels.forEach((label, idx) => {
      const item = document.createElement('div');
      item.className = 'flex items-center space-x-2 text-sm text-gray-300';
      item.innerHTML = `<span class="w-3 h-3 inline-block rounded-full" style="background:${chartColors[idx]}"></span><span>${label}</span>`;
      legend.appendChild(item);
    });
  }
}

function showModal(id) { const m = document.getElementById(id); if (m) m.classList.remove('hidden'); }
function hideModal(id) { const m = document.getElementById(id); if (m) { m.classList.add('hidden'); const f = m.querySelector('form'); if (f) f.reset(); } }

function setupTransactionModal(type) {
  const modal = document.getElementById('transaction-modal');
  const title = document.getElementById('modal-title');
  title.textContent = type === 'income' ? 'Thêm Thu Nhập' : 'Thêm Chi Tiêu';
  modal.dataset.transactionType = type;
  showModal('transaction-modal');
}

function switchTab(activeTabId) {
  document.querySelectorAll('.tab-content').forEach(tab => tab.classList.add('hidden'));
  const activeTab = document.getElementById(`${activeTabId}-tab`);
  if (activeTab) activeTab.classList.remove('hidden');
  document.querySelectorAll('.tab-btn').forEach(btn => {
    const isMatched = btn.dataset.tab === activeTabId;
    btn.classList.toggle('border-blue-500', isMatched);
    btn.classList.toggle('text-blue-600', isMatched);
    btn.classList.toggle('border-transparent', !isMatched);
    btn.classList.toggle('text-gray-500', !isMatched);
  });
  document.querySelectorAll('.mobile-tab-btn').forEach(btn => {
    const isMatched = btn.dataset.tab === activeTabId;
    btn.classList.toggle('bg-blue-50', isMatched);
    btn.classList.toggle('text-blue-600', isMatched);
    btn.classList.toggle('text-gray-600', !isMatched);
    btn.classList.toggle('hover:bg-gray-50', !isMatched);
  });
}

function handleTransactionSubmit(e) {
  e.preventDefault();
  try {
    const modal = document.getElementById('transaction-modal');
    const type = modal.dataset.transactionType;
    const amountRaw = document.getElementById('amount-input').value || '';
    const amount = amountRaw.replace(/[^\d]/g, '');
    const description = document.getElementById('description-input').value;
    const jar = document.getElementById('jar-select').value;
    if (!amount || Number(amount) <= 0) { alert('Vui lòng nhập số tiền hợp lệ'); return; }
    if (!description.trim()) { alert('Vui lòng nhập mô tả'); return; }
    if (!jar) { alert('Vui lòng chọn hủ'); return; }
    addTransaction(type, amount, jar, description);
    updateUI();
    hideModal('transaction-modal');
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
    const salary = (salaryInput.value || '').replace(/[^\d]/g, '');
    const ratios = {
      debt: Number(document.getElementById('debt-ratio').value),
      expenses: Number(document.getElementById('expenses-ratio').value),
      emergency: Number(document.getElementById('emergency-ratio').value),
      savings: Number(document.getElementById('savings-ratio').value),
      investment: Number(document.getElementById('investment-ratio').value),
      learning: Number(document.getElementById('learning-ratio').value)
    };
    if (!salary || Number(salary) <= 0) { alert('Vui lòng nhập lương hợp lệ'); return; }
    const totalRatio = Object.values(ratios).reduce((s, r) => s + r, 0);
    if (totalRatio !== 100) { alert('Tổng tỉ lệ phải bằng 100%'); return; }
    editSalary(salary, ratios);
    updateUI();
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
  const ids = ['debt-ratio','expenses-ratio','emergency-ratio','savings-ratio','investment-ratio','learning-ratio'];
  const total = ids.reduce((sum, id) => sum + (Number(document.getElementById(id).value) || 0), 0);
  const totalEl = document.getElementById('total-ratio');
  if (totalEl) {
    totalEl.textContent = total + '%';
    totalEl.className = total === 100 ? 'text-green-600' : 'text-red-600';
  }
}

function handleLanguageChange(e) {
  const langCode = e.target.value; changeLanguage(langCode).then(success => {
    if (success) alert(langCode === 'vi' ? 'Đã thay đổi ngôn ngữ!' : 'Language changed!');
  });
}

function handleCurrencyChange(e) {
  const newCurrency = e.target.value;
  setCurrency(newCurrency);
  updateUI();
  const currencyInfo = CURRENCY_INFO[newCurrency];
  alert(`Đã chuyển sang ${currencyInfo.name} (${currencyInfo.symbol})`);
}

// Data management handlers
function handleExportData() {
  try {
    const data = exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `money-tracker-backup-${new Date().toISOString().slice(0,10)}.json`;
    document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
    alert('Export thành công');
  } catch (e) { console.error('Export error:', e); alert('Export thất bại'); }
}

function handleImportData() {
  const input = document.getElementById('import-file-input');
  if (input) input.click();
}

function handleFileImport(e) {
  const file = e.target.files && e.target.files[0]; if (!file) return;
  const reader = new FileReader();
  reader.onload = (event) => {
    try { importData(event.target.result); updateUI(); alert('Import thành công'); }
    catch (err) { console.error('Import error:', err); alert('Import thất bại: file không hợp lệ'); }
  };
  reader.readAsText(file);
  e.target.value = '';
}

function handleResetData() {
  if (confirm('Xóa toàn bộ dữ liệu? Hành động không thể hoàn tác.')) { clearAllData(); updateUI(); alert('Đã xóa dữ liệu'); }
}

function initializeCurrency() {
  try {
    const current = getCurrency();
    const select = document.getElementById('currency-select');
    if (select) select.value = current;
  } catch (e) {
    console.error('Init currency failed:', e);
  }
}

function bindEvents() {
  document.querySelectorAll('.tab-btn').forEach(btn => btn.addEventListener('click', () => switchTab(btn.dataset.tab)));
  const addIncomeBtn = document.getElementById('btn-add-income'); if (addIncomeBtn) addIncomeBtn.addEventListener('click', () => setupTransactionModal('income'));
  const addExpenseBtn = document.getElementById('btn-add-expense'); if (addExpenseBtn) addExpenseBtn.addEventListener('click', () => setupTransactionModal('expense'));
  const editSalaryBtn = document.getElementById('btn-edit-salary'); if (editSalaryBtn) editSalaryBtn.addEventListener('click', () => { loadSalaryData(); showModal('salary-modal'); });
  const transactionForm = document.getElementById('transaction-form'); if (transactionForm) transactionForm.addEventListener('submit', handleTransactionSubmit);
  const salaryForm = document.getElementById('salary-form'); if (salaryForm) salaryForm.addEventListener('submit', handleSalarySubmit);
  document.querySelectorAll('#cancel-btn, #cancel-salary-btn').forEach(btn => btn.addEventListener('click', () => { hideModal('transaction-modal'); hideModal('salary-modal'); }));
  const languageSelect = document.getElementById('language-select'); if (languageSelect) languageSelect.addEventListener('change', handleLanguageChange);
  const currencySelect = document.getElementById('currency-select'); if (currencySelect) currencySelect.addEventListener('change', handleCurrencyChange);
  const exportBtn = document.getElementById('export-data-btn'); if (exportBtn) exportBtn.addEventListener('click', handleExportData);
  const importBtn = document.getElementById('import-data-btn'); if (importBtn) importBtn.addEventListener('click', handleImportData);
  const resetBtn = document.getElementById('reset-data-btn'); if (resetBtn) resetBtn.addEventListener('click', handleResetData);
  const importFileInput = document.getElementById('import-file-input'); if (importFileInput) importFileInput.addEventListener('change', handleFileImport);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { hideModal('transaction-modal'); hideModal('salary-modal'); } });
}

async function initApp() {
  await initializeI18n();
  // Expose translator for dynamic texts
  window.t = getTranslation;
  await initializeTheme();
  initializeCurrency();
  initializeMobileResponsive();
  updateUI();
  bindEvents();
  switchTab('dashboard');
  if (getSalary() === 0) {
    setTimeout(() => { alert('Chào mừng! Hãy nhập lương để bắt đầu.'); loadSalaryData(); showModal('salary-modal'); }, 800);
  }
}

document.addEventListener('DOMContentLoaded', initApp);

window.SimpleMoneyTracker = { updateUI, showModal, hideModal, switchTab };