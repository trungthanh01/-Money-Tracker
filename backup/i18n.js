// js/i18n.js
// Module quản lý đa ngôn ngữ (Internationalization)
// Chức năng: Chuyển đổi giữa tiếng Anh và tiếng Việt
// Theo phương pháp Feynman: Giải thích từng dòng code một cách đơn giản

// === NGÔN NGỮ MẶC ĐỊNH ===
// Đặt tiếng Anh làm ngôn ngữ mặc định như yêu cầu
const DEFAULT_LANGUAGE = 'en';

// === DỮ LIỆU NGÔN NGỮ ===
// Object chứa tất cả text trong app cho 2 ngôn ngữ
const TRANSLATIONS = {
  // === TIẾNG ANH (DEFAULT) ===
  en: {
    // Header
    appTitle: 'Personal Finance Manager',
    dataStorageNotice: 'Data stored locally on this browser',
    
    // Navigation
    dashboard: 'Dashboard',
    investment: 'Investment', 
    learning: 'Learning',
    
    // Main Actions
    totalBalance: 'Total Balance',
    totalSalary: 'Total Salary',
    addIncome: 'Add Income',
    addExpense: 'Add Expense',
    editSalary: 'Edit Salary',
    
    // Jar Names
    debt: 'Debt',
    expenses: 'Expenses',
    emergency: 'Emergency',
    savings: 'Savings',
    investment_jar: 'Investment',
    learning_jar: 'Learning',
    
    // Jar Descriptions
    debtDesc: 'Money for paying off debts and credit cards',
    expensesDesc: 'Daily expenses (food, transport, bills...)',
    emergencyDesc: 'Emergency fund for unexpected situations',
    savingsDesc: 'Savings for big goals (travel, shopping, vehicles...)',
    investmentDesc: 'Growing wealth through investments (stocks, crypto...)',
    learningDesc: 'Investment in knowledge and personal development',
    
    // Chart & Reports
    assetAllocation: 'Asset Allocation',
    recentTransactions: 'Recent Transactions',
    
    // Modals
    addTransaction: 'Add Transaction',
    addIncomeTitle: 'Add Income',
    addExpenseTitle: 'Add Expense',
    editSalaryTitle: 'Edit Salary & Ratios',
    
    // Form Fields
    amount: 'Amount (VND)',
    description: 'Description',
    selectJar: 'Select Jar',
    selectJarPlaceholder: '-- Select Jar --',
    monthlySalary: 'Monthly Salary (VND)',
    jarRatios: 'Jar Ratios (%)',
    total: 'Total',
    
    // Buttons
    cancel: 'Cancel',
    save: 'Save',
    
    // Settings
    settings: 'Settings',
    language: 'Language',
    theme: 'Theme',
    lightMode: 'Light Mode',
    darkMode: 'Dark Mode',
    support: 'Support',
    contactSupport: 'Contact Support',
    
    // Toast Messages
    incomeAdded: 'Income added successfully!',
    expenseAdded: 'Expense added successfully!',
    salaryUpdated: 'Salary updated successfully!',
    welcome: 'Welcome to Money Tracker! Please enter your salary to get started.',
    languageChanged: 'Language changed successfully!',
    themeChanged: 'Theme changed successfully!',
    exportSuccess: 'Data exported successfully!',
    exportError: 'Failed to export data',
    importSuccess: 'Data imported successfully!',
    importError: 'Failed to import data. Please check file format.',
    dataClearedSuccess: 'All data cleared successfully!',
    confirmClearData: 'Are you sure you want to delete all data? This action cannot be undone.',
    
    // Validation Messages
    pleaseEnterValidAmount: 'Please enter a valid amount',
    pleaseEnterDescription: 'Please enter a description',
    pleaseSelectJar: 'Please select a jar',
    descriptionTooLong: 'Description cannot exceed 100 characters',
    pleaseEnterValidSalary: 'Please enter a valid salary',
    totalRatioMustBe100: 'Total ratio must equal 100%',
    cannotAddTransaction: 'Cannot add transaction. Please try again.',
    cannotUpdateSalary: 'Cannot update salary. Please try again.',
    
    // Other
    noTransactions: 'No transactions yet',
    comingSoon: 'This feature will be developed in future versions'
  },
  
  // === TIẾNG VIỆT ===
  vi: {
    // Header
    appTitle: 'Trình Quản Lý Tài Chính',
    dataStorageNotice: 'Dữ liệu được lưu trên trình duyệt này',
    
    // Navigation
    dashboard: 'Bảng Tin',
    investment: 'Đầu Tư',
    learning: 'Học Tập',
    
    // Main Actions
    totalBalance: 'Tổng Số Dư',
    totalSalary: 'Tổng Lương',
    addIncome: 'Thêm Thu Nhập',
    addExpense: 'Thêm Chi Tiêu',
    editSalary: 'Nhập Lương',
    
    // Jar Names
    debt: 'Nợ',
    expenses: 'Chi tiêu',
    emergency: 'Khẩn cấp',
    savings: 'Tiết kiệm',
    investment_jar: 'Đầu tư',
    learning_jar: 'Học tập',
    
    // Jar Descriptions
    debtDesc: 'Tiền nợ của bạn',
    expensesDesc: 'Các khoản chi tiêu hàng ngày, ăn uống, đi lại, hóa đơn...',
    emergencyDesc: 'Quỹ dự phòng cho các trường hợp khẩn cấp (ốm đau, mất việc...)',
    savingsDesc: 'Dành cho các mục tiêu lớn (du lịch, mua sắm, xe cộ...)',
    investmentDesc: 'Gia tăng tài sản qua các kênh đầu tư (chứng khoán, crypto...)',
    learningDesc: 'Đầu tư cho kiến thức và phát triển bản thân.',
    
    // Chart & Reports
    assetAllocation: 'Phân Bổ Tài Sản',
    recentTransactions: 'Giao Dịch Gần Đây',
    
    // Modals
    addTransaction: 'Thêm Giao Dịch',
    addIncomeTitle: 'Thêm Thu Nhập',
    addExpenseTitle: 'Thêm Chi Tiêu',
    editSalaryTitle: 'Nhập Lương & Tỉ Lệ',
    
    // Form Fields
    amount: 'Số tiền (VND)',
    description: 'Mô tả',
    selectJar: 'Chọn hủ',
    selectJarPlaceholder: '-- Chọn hủ --',
    monthlySalary: 'Lương tháng (VND)',
    jarRatios: 'Tỉ lệ các hủ (%)',
    total: 'Tổng',
    
    // Buttons
    cancel: 'Hủy',
    save: 'Lưu',
    
    // Settings
    settings: 'Cài Đặt',
    language: 'Ngôn Ngữ',
    theme: 'Giao Diện',
    lightMode: 'Giao Diện Sáng',
    darkMode: 'Giao Diện Tối',
    support: 'Hỗ Trợ',
    contactSupport: 'Liên Hệ Hỗ Trợ',
    
    // Toast Messages
    incomeAdded: 'Đã thêm thu nhập thành công!',
    expenseAdded: 'Đã thêm chi tiêu thành công!',
    salaryUpdated: 'Đã cập nhật lương thành công!',
    welcome: 'Chào mừng bạn đến với Money Tracker! Hãy nhập lương để bắt đầu.',
    languageChanged: 'Đã thay đổi ngôn ngữ thành công!',
    themeChanged: 'Đã thay đổi giao diện thành công!',
    exportSuccess: 'Đã xuất dữ liệu thành công!',
    exportError: 'Không thể xuất dữ liệu',
    importSuccess: 'Đã nhập dữ liệu thành công!',
    importError: 'Không thể nhập dữ liệu. Vui lòng kiểm tra định dạng file.',
    dataClearedSuccess: 'Đã xóa tất cả dữ liệu thành công!',
    confirmClearData: 'Bạn có chắc chắn muốn xóa tất cả dữ liệu? Hành động này không thể hoàn tác.',
    
    // Validation Messages
    pleaseEnterValidAmount: 'Vui lòng nhập số tiền hợp lệ',
    pleaseEnterDescription: 'Vui lòng nhập mô tả',
    pleaseSelectJar: 'Vui lòng chọn hủ',
    descriptionTooLong: 'Mô tả không được quá 100 ký tự',
    pleaseEnterValidSalary: 'Vui lòng nhập lương hợp lệ',
    totalRatioMustBe100: 'Tổng tỉ lệ các hủ phải bằng 100%',
    cannotAddTransaction: 'Không thể thêm giao dịch. Vui lòng thử lại.',
    cannotUpdateSalary: 'Không thể cập nhật lương. Vui lòng thử lại.',
    
    // Other
    noTransactions: 'Chưa có giao dịch nào',
    comingSoon: 'Tính năng này sẽ được phát triển trong phiên bản tương lai'
  }
};

// === FUNCTIONS QUẢN LÝ NGÔN NGỮ ===

/**
 * Hàm lấy ngôn ngữ hiện tại từ localStorage
 * Nếu chưa có, trả về ngôn ngữ mặc định (English)
 * @returns {string} Mã ngôn ngữ ('en' hoặc 'vi')
 */
export function getCurrentLanguage() {
  try {
    // Lấy ngôn ngữ đã lưu từ localStorage
    const savedLang = localStorage.getItem('money-tracker-language');
    
    // Nếu có và hợp lệ, trả về ngôn ngữ đã lưu
    if (savedLang && TRANSLATIONS[savedLang]) {
      return savedLang;
    }
    
    // Nếu không có, trả về ngôn ngữ mặc định
    return DEFAULT_LANGUAGE;
    
  } catch (error) {
    // Nếu có lỗi, trả về ngôn ngữ mặc định
    console.error('Error getting current language:', error);
    return DEFAULT_LANGUAGE;
  }
}

/**
 * Hàm đặt ngôn ngữ mới và lưu vào localStorage
 * @param {string} language - Mã ngôn ngữ ('en' hoặc 'vi')
 */
export function setLanguage(language) {
  try {
    // Kiểm tra ngôn ngữ có hợp lệ không
    if (!TRANSLATIONS[language]) {
      throw new Error(`Language '${language}' not supported`);
    }
    
    // Lưu ngôn ngữ vào localStorage
    localStorage.setItem('money-tracker-language', language);
    
    // Cập nhật ngay lập tức UI
    updateAllTexts();
    
    console.log(`Language changed to: ${language}`);
    
  } catch (error) {
    console.error('Error setting language:', error);
  }
}

/**
 * Hàm lấy text theo key và ngôn ngữ hiện tại
 * @param {string} key - Key của text cần lấy
 * @returns {string} Text đã được dịch
 */
export function t(key) {
  try {
    // Lấy ngôn ngữ hiện tại
    const currentLang = getCurrentLanguage();
    
    // Lấy text từ object TRANSLATIONS
    const translation = TRANSLATIONS[currentLang][key];
    
    // Nếu không tìm thấy, fallback về tiếng Anh
    if (!translation) {
      const fallback = TRANSLATIONS[DEFAULT_LANGUAGE][key];
      console.warn(`Translation missing for key '${key}' in language '${currentLang}'`);
      return fallback || key; // Nếu cả tiếng Anh cũng không có, trả về key
    }
    
    return translation;
    
  } catch (error) {
    console.error('Error getting translation:', error);
    return key; // Trả về key gốc nếu có lỗi
  }
}

/**
 * Hàm cập nhật tất cả text trong UI theo ngôn ngữ hiện tại
 * Được gọi khi user thay đổi ngôn ngữ
 */
export function updateAllTexts() {
  try {
    // === HEADER ===
    const appTitle = document.querySelector('h1');
    if (appTitle) appTitle.textContent = t('appTitle');
    
    // Tìm data notice bằng nội dung thay vì class (vì có nhiều elements với class này)
    const headerTexts = document.querySelectorAll('.text-sm.text-gray-500');
    headerTexts.forEach(text => {
      if (text.textContent.includes('Dữ liệu được lưu') || text.textContent.includes('Data stored')) {
        text.textContent = t('dataStorageNotice');
      }
    });
    
    // === NAVIGATION TABS ===
    const dashboardTab = document.querySelector('[data-tab="dashboard"]');
    if (dashboardTab) dashboardTab.innerHTML = `🏠 ${t('dashboard')}`;
    
    const investmentTab = document.querySelector('[data-tab="investment"]');
    if (investmentTab) investmentTab.innerHTML = `💹 ${t('investment')}`;
    
    const learningTab = document.querySelector('[data-tab="learning"]');
    if (learningTab) learningTab.innerHTML = `📚 ${t('learning')}`;
    
    const settingsTab = document.querySelector('[data-tab="settings"]');
    if (settingsTab) settingsTab.innerHTML = `⚙️ ${t('settings')}`;
    
    // === MAIN DASHBOARD ===
    const totalBalanceLabel = document.querySelector('h2');
    if (totalBalanceLabel) totalBalanceLabel.textContent = t('totalBalance');
    
    const totalSalaryLabel = document.querySelector('.text-green-600');
    if (totalSalaryLabel) {
      const salaryAmount = totalSalaryLabel.querySelector('#total-salary')?.textContent || '0 ₫';
      totalSalaryLabel.innerHTML = `${t('totalSalary')}: <span id="total-salary">${salaryAmount}</span>`;
    }
    
    // === ACTION BUTTONS ===
    const addIncomeBtn = document.getElementById('btn-add-income');
    if (addIncomeBtn) addIncomeBtn.textContent = t('addIncome');
    
    const addExpenseBtn = document.getElementById('btn-add-expense');
    if (addExpenseBtn) addExpenseBtn.textContent = t('addExpense');
    
    const editSalaryBtn = document.getElementById('btn-edit-salary');
    if (editSalaryBtn) editSalaryBtn.textContent = t('editSalary');
    
    // === CHART & TRANSACTIONS TITLES ===
    updateChartAndTransactionTitles();
    
    // === JAR CARDS ===
    updateJarCards();
    
    // === MODAL FORMS ===
    updateModalTexts();
    
    // === SETTINGS TEXTS ===
    updateSettingsTexts();
    
    // === JAR OPTIONS IN SELECT ===
    updateJarSelectOptions();
    
    console.log('All texts updated for language:', getCurrentLanguage());
    
  } catch (error) {
    console.error('Error updating texts:', error);
  }
}

/**
 * Hàm cập nhật chart và transaction titles
 */
function updateChartAndTransactionTitles() {
  // Chart title trong right column
  const chartTitles = document.querySelectorAll('h3');
  chartTitles.forEach(title => {
    if (title.textContent.includes('Phân Bổ') || title.textContent.includes('Asset')) {
      title.textContent = t('assetAllocation');
    }
    if (title.textContent.includes('Giao Dịch') || title.textContent.includes('Recent')) {
      title.textContent = t('recentTransactions');
    }
  });
}

/**
 * Hàm cập nhật jar cards (được gọi từ ui.js)
 */
export function updateJarCards() {
  // Jar cards sẽ được re-render từ ui.js với ngôn ngữ mới
  // Function này sẽ được gọi từ ui.js
  const jarCards = document.querySelectorAll('.jar-card');
  jarCards.forEach(card => {
    const jarType = card.dataset.jarType;
    if (jarType) {
      const titleElement = card.querySelector('h4');
      const descElement = card.querySelector('p');
      
      if (titleElement) titleElement.textContent = t(jarType);
      if (descElement) descElement.textContent = t(`${jarType}Desc`);
    }
  });
}

/**
 * Hàm cập nhật text trong các modal
 */
function updateModalTexts() {
  // === TRANSACTION MODAL ===
  const transactionModal = document.getElementById('transaction-modal');
  if (transactionModal) {
    // Modal title
    const modalTitle = document.getElementById('modal-title');
    if (modalTitle) {
      // Kiểm tra modal đang ở mode nào
      if (modalTitle.textContent.includes('Thu Nhập') || modalTitle.textContent.includes('Income')) {
        modalTitle.textContent = t('addIncomeTitle');
      } else if (modalTitle.textContent.includes('Chi Tiêu') || modalTitle.textContent.includes('Expense')) {
        modalTitle.textContent = t('addExpenseTitle');
      } else {
        modalTitle.textContent = t('addTransaction');
      }
    }
    
    // Form labels
    const amountLabel = transactionModal.querySelector('label[for="amount-input"]');
    if (amountLabel) amountLabel.textContent = t('amount');
    
    const descLabel = transactionModal.querySelector('label[for="description-input"]');
    if (descLabel) descLabel.textContent = t('description');
    
    const jarLabel = transactionModal.querySelector('label[for="jar-select"]');
    if (jarLabel) jarLabel.textContent = t('selectJar');
    
    // Placeholder
    const amountInput = document.getElementById('amount-input');
    if (amountInput) amountInput.placeholder = t('amount');
    
    const descInput = document.getElementById('description-input');
    if (descInput) descInput.placeholder = t('description');
  }
  
  // === SALARY MODAL ===
  const salaryModal = document.getElementById('salary-modal');
  if (salaryModal) {
    // Modal title
    const salaryModalTitle = salaryModal.querySelector('h3');
    if (salaryModalTitle) salaryModalTitle.textContent = t('editSalaryTitle');
    
    // Form labels
    const salaryLabel = salaryModal.querySelector('label[for="salary-input"]');
    if (salaryLabel) salaryLabel.textContent = t('monthlySalary');
    
    // Jar ratios labels
    const ratiosLabels = salaryModal.querySelectorAll('.grid label');
    ratiosLabels.forEach(label => {
      const forAttr = label.getAttribute('for');
      if (forAttr && forAttr.includes('-ratio')) {
        const jarType = forAttr.replace('-ratio', '');
        label.textContent = `${t(jarType)} (%)`;
      }
    });
    
    // Total label
    const totalLabel = salaryModal.querySelector('.font-semibold');
    if (totalLabel && (totalLabel.textContent.includes('Tổng') || totalLabel.textContent.includes('Total'))) {
      totalLabel.textContent = `${t('total')}: `;
    }
  }
  
  // === BUTTONS ===
  const cancelBtns = document.querySelectorAll('#cancel-btn, #cancel-salary-btn');
  cancelBtns.forEach(btn => {
    if (btn) btn.textContent = t('cancel');
  });
  
  const saveBtns = document.querySelectorAll('button[type="submit"]');
  saveBtns.forEach(btn => {
    if (btn && btn.textContent.includes('Lưu') || btn.textContent.includes('Save')) {
      btn.textContent = t('save');
    }
  });
}

/**
 * Hàm cập nhật options trong jar select
 */
function updateJarSelectOptions() {
  const jarSelect = document.getElementById('jar-select');
  if (jarSelect) {
    // Update placeholder
    jarSelect.children[0].textContent = t('selectJarPlaceholder');
    
    // Update jar options
    jarSelect.children[1].textContent = t('debt');
    jarSelect.children[2].textContent = t('expenses');
    jarSelect.children[3].textContent = t('emergency');
    jarSelect.children[4].textContent = t('savings');
    jarSelect.children[5].textContent = t('investment_jar');
    jarSelect.children[6].textContent = t('learning_jar');
  }
}

/**
 * Hàm cập nhật text cho settings tab
 */
function updateSettingsTexts() {
  const settingsTab = document.getElementById('settings-tab');
  if (!settingsTab) return;
  
  // === LANGUAGE SECTION ===
  const langSection = settingsTab.querySelector('h3');
  if (langSection && langSection.textContent.includes('🌐')) {
    langSection.textContent = `🌐 ${t('language')}`;
  }
  
  const langLabel = settingsTab.querySelector('label');
  if (langLabel && langLabel.textContent.includes('ngôn ngữ') || langLabel.textContent.includes('language')) {
    langLabel.textContent = t('language');
  }
  
  // === THEME SECTION ===
  const themeSections = settingsTab.querySelectorAll('h3');
  themeSections.forEach(section => {
    if (section.textContent.includes('🎨')) {
      section.textContent = `🎨 ${t('theme')}`;
    }
    if (section.textContent.includes('🆘')) {
      section.textContent = `🆘 ${t('support')}`;
    }
    if (section.textContent.includes('💾')) {
      section.textContent = `💾 Quản Lý Dữ Liệu`;
    }
    if (section.textContent.includes('ℹ️')) {
      section.textContent = `ℹ️ Thông Tin App`;
    }
  });
  
  // Theme buttons
  const lightModeText = settingsTab.querySelector('#light-mode-btn .font-medium');
  if (lightModeText) lightModeText.textContent = t('lightMode');
  
  const darkModeText = settingsTab.querySelector('#dark-mode-btn .font-medium');
  if (darkModeText) darkModeText.textContent = t('darkMode');
  
  // === SUPPORT SECTION ===
  const supportButton = document.getElementById('contact-support-btn');
  if (supportButton) supportButton.textContent = t('contactSupport');
  
  // === DATA MANAGEMENT BUTTONS ===
  const exportBtn = document.getElementById('export-data-btn');
  if (exportBtn) exportBtn.innerHTML = '📤 ' + (getCurrentLanguage() === 'vi' ? 'Xuất Dữ Liệu' : 'Export Data');
  
  const importBtn = document.getElementById('import-data-btn');
  if (importBtn) importBtn.innerHTML = '📥 ' + (getCurrentLanguage() === 'vi' ? 'Nhập Dữ Liệu' : 'Import Data');
  
  const clearBtn = document.getElementById('clear-data-btn');
  if (clearBtn) clearBtn.innerHTML = '🗑️ ' + (getCurrentLanguage() === 'vi' ? 'Xóa Tất Cả Dữ Liệu' : 'Clear All Data');
}

/**
 * Hàm lấy danh sách ngôn ngữ có sẵn
 * @returns {Array} Mảng các object {code, name}
 */
export function getAvailableLanguages() {
  return [
    { code: 'en', name: 'English' },
    { code: 'vi', name: 'Tiếng Việt' }
  ];
}

// === INITIALIZATION ===
// DISABLED: Tự động cập nhật UI khi module được load
// Để tránh conflict với app.js DOMContentLoaded
// document.addEventListener('DOMContentLoaded', () => {
//   setTimeout(() => {
//     updateAllTexts();
//   }, 100);
// });

console.log('🌐 i18n module loaded with default language:', DEFAULT_LANGUAGE);
