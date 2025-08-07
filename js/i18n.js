// js/i18n.js
// Internationalization - Hệ thống đa ngôn ngữ
// Mỗi function có trách nhiệm riêng biệt

// === CONSTANTS ===
const DEFAULT_LANGUAGE = 'vi'; // Mặc định tiếng Việt
const STORAGE_KEY = 'money-tracker-language';

// === GLOBAL VARIABLES ===
let currentTranslations = null; // Cache translations
let currentLanguage = DEFAULT_LANGUAGE;

// === SINGLE RESPONSIBILITY FUNCTIONS ===

/**
 * Function 1: Load language JSON file
 * Trách nhiệm duy nhất: Load và parse JSON
 */
async function loadLanguageFile(langCode) {
  try {
    const response = await fetch(`./lang/${langCode}.json`);
    if (!response.ok) {
      throw new Error(`Language file not found: ${langCode}`);
    }
    const translations = await response.json();
    console.log(`✅ Language ${langCode} loaded`);
    return translations;
  } catch (error) {
    console.error(`❌ Failed to load ${langCode}:`, error);
    // Fallback to default
    if (langCode !== DEFAULT_LANGUAGE) {
      return await loadLanguageFile(DEFAULT_LANGUAGE);
    }
    return null;
  }
}

/**
 * Function 2: Get current language from storage
 * Trách nhiệm duy nhất: Đọc setting từ localStorage
 */
function getCurrentLanguage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved || DEFAULT_LANGUAGE;
  } catch (error) {
    console.error('Error reading language setting:', error);
    return DEFAULT_LANGUAGE;
  }
}

/**
 * Function 3: Save language to storage  
 * Trách nhiệm duy nhất: Ghi setting vào localStorage
 */
function saveLanguage(langCode) {
  try {
    localStorage.setItem(STORAGE_KEY, langCode);
    console.log(`💾 Language saved: ${langCode}`);
  } catch (error) {
    console.error('Error saving language:', error);
  }
}

/**
 * Function 4: Get translated text by key path
 * Trách nhiệm duy nhất: Truy xuất text từ object theo đường dẫn
 */
function getTranslation(keyPath) {
  if (!currentTranslations) {
    console.warn('No translations loaded');
    return keyPath;
  }
  
  // Navigate object by dot notation: "header.title"
  const keys = keyPath.split('.');
  let value = currentTranslations;
  
  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key];
    } else {
      console.warn(`Translation missing: ${keyPath}`);
      return keyPath;
    }
  }
  
  return value;
}

/**
 * Function 5: Update header texts
 * Trách nhiệm duy nhất: Update header area
 */
function updateHeader() {
  const title = document.querySelector('h1');
  const subtitle = document.querySelector('header .text-sm');
  
  if (title) title.textContent = getTranslation('header.title');
  if (subtitle) subtitle.textContent = getTranslation('header.subtitle');
}

/**
 * Function 6: Update navigation tabs
 * Trách nhiệm duy nhất: Update nav tabs
 */
function updateNavigation() {
  const dashboardTab = document.querySelector('[data-tab="dashboard"]');
  const investmentTab = document.querySelector('[data-tab="investment"]');
  const learningTab = document.querySelector('[data-tab="learning"]');
  const settingsTab = document.querySelector('[data-tab="settings"]');
  
  if (dashboardTab) dashboardTab.innerHTML = `🏠 ${getTranslation('navigation.dashboard')}`;
  if (investmentTab) investmentTab.innerHTML = `💹 ${getTranslation('navigation.investment')}`;
  if (learningTab) learningTab.innerHTML = `📚 ${getTranslation('navigation.learning')}`;
  if (settingsTab) settingsTab.innerHTML = `⚙️ ${getTranslation('navigation.settings')}`;
}

/**
 * Function 7: Update dashboard area
 * Trách nhiệm duy nhất: Update dashboard texts
 */
function updateDashboard() {
  // Main labels
  const totalBalanceLabel = document.querySelector('.text-lg.font-semibold');
  if (totalBalanceLabel && totalBalanceLabel.textContent.includes('Tổng Số Dư')) {
    totalBalanceLabel.textContent = getTranslation('dashboard.totalBalance');
  }
  
  // Buttons
  const addIncomeBtn = document.getElementById('btn-add-income');
  const addExpenseBtn = document.getElementById('btn-add-expense');
  const editSalaryBtn = document.getElementById('btn-edit-salary');
  
  if (addIncomeBtn) addIncomeBtn.textContent = getTranslation('dashboard.addIncome');
  if (addExpenseBtn) addExpenseBtn.textContent = getTranslation('dashboard.addExpense');
  if (editSalaryBtn) editSalaryBtn.textContent = getTranslation('dashboard.editSalary');
  
  // Chart title
  const chartTitle = document.querySelector('h3');
  if (chartTitle && (chartTitle.textContent.includes('Phân Bổ') || chartTitle.textContent.includes('Asset'))) {
    chartTitle.textContent = getTranslation('dashboard.assetAllocation');
  }
  
  // Transactions title
  const transactionsTitles = document.querySelectorAll('h3');
  transactionsTitles.forEach(title => {
    if (title.textContent.includes('Giao Dịch') || title.textContent.includes('Recent')) {
      title.textContent = getTranslation('dashboard.recentTransactions');
    }
  });
  
  // Total salary label
  const salaryLabel = document.querySelector('.text-green-600');
  if (salaryLabel) {
    const amount = salaryLabel.querySelector('#total-salary')?.textContent || '0 ₫';
    salaryLabel.innerHTML = `${getTranslation('dashboard.totalSalary')}: <span id="total-salary">${amount}</span>`;
  }
}

/**
 * Function 8: Update jar cards
 * Trách nhiệm duy nhất: Update jar names và descriptions
 */
function updateJarCards() {
  // Wait for jar cards to be rendered, then update them
  setTimeout(() => {
    const jarCards = document.querySelectorAll('#jars-container > div');
    const jarTypes = ['debt', 'expenses', 'emergency', 'savings', 'investment', 'learning'];
    
    jarCards.forEach((card, index) => {
      if (index < jarTypes.length) {
        const jarType = jarTypes[index];
        const titleElement = card.querySelector('h4');
        const descElement = card.querySelector('p');
        
        if (titleElement) titleElement.textContent = getTranslation(`jars.${jarType}.name`);
        if (descElement) descElement.textContent = getTranslation(`jars.${jarType}.description`);
      }
    });
  }, 100);
}

/**
 * Function 9: Update modals
 * Trách nhiệm duy nhất: Update modal forms
 */
function updateModals() {
  // Transaction modal
  const amountLabel = document.querySelector('label[for="amount-input"]');
  const descLabel = document.querySelector('label[for="description-input"]');
  const jarLabel = document.querySelector('label[for="jar-select"]');
  
  if (amountLabel) amountLabel.textContent = getTranslation('modals.amount');
  if (descLabel) descLabel.textContent = getTranslation('modals.description');
  if (jarLabel) jarLabel.textContent = getTranslation('modals.selectJar');
  
  // Jar select options
  const jarSelect = document.getElementById('jar-select');
  if (jarSelect && jarSelect.children.length > 1) {
    jarSelect.children[0].textContent = getTranslation('modals.selectJarPlaceholder');
    jarSelect.children[1].textContent = getTranslation('jars.debt.name');
    jarSelect.children[2].textContent = getTranslation('jars.expenses.name');
    jarSelect.children[3].textContent = getTranslation('jars.emergency.name');
    jarSelect.children[4].textContent = getTranslation('jars.savings.name');
    jarSelect.children[5].textContent = getTranslation('jars.investment.name');
    jarSelect.children[6].textContent = getTranslation('jars.learning.name');
  }
  
  // Salary modal
  const salaryLabel = document.querySelector('label[for="salary-input"]');
  if (salaryLabel) salaryLabel.textContent = getTranslation('modals.monthlySalary');
  
  // Buttons
  const cancelBtns = document.querySelectorAll('#cancel-btn, #cancel-salary-btn');
  const saveBtns = document.querySelectorAll('button[type="submit"]');
  
  cancelBtns.forEach(btn => {
    if (btn) btn.textContent = getTranslation('modals.cancel');
  });
  
  saveBtns.forEach(btn => {
    if (btn && !btn.id.includes('export') && !btn.id.includes('import')) {
      btn.textContent = getTranslation('modals.save');
    }
  });
}

/**
 * Function 10: Update placeholder tabs
 * Trách nhiệm duy nhất: Update investment và learning tabs
 */
function updatePlaceholderTabs() {
  // Investment tab
  const investmentTab = document.getElementById('investment-tab');
  if (investmentTab) {
    const title = investmentTab.querySelector('h2');
    const desc = investmentTab.querySelector('p');
    if (title) title.textContent = getTranslation('tabs.investmentTitle');
    if (desc) desc.textContent = getTranslation('tabs.investmentDescription');
  }
  
  // Learning tab
  const learningTab = document.getElementById('learning-tab');
  if (learningTab) {
    const title = learningTab.querySelector('h2');
    const desc = learningTab.querySelector('p');
    if (title) title.textContent = getTranslation('tabs.learningTitle');
    if (desc) desc.textContent = getTranslation('tabs.learningDescription');
  }
}

/**
 * Function 11: Update all UI elements
 * Trách nhiệm duy nhất: Gọi tất cả update functions
 */
function updateAllTexts() {
  updateHeader();
  updateNavigation();
  updateDashboard();
  updateJarCards();
  updateModals();
  updatePlaceholderTabs();
  console.log('🌐 All texts updated');
}

/**
 * Function 12: Initialize language system
 * Trách nhiệm duy nhất: Setup i18n lần đầu
 */
async function initializeI18n() {
  try {
    currentLanguage = getCurrentLanguage();
    currentTranslations = await loadLanguageFile(currentLanguage);
    
    if (currentTranslations) {
      updateAllTexts();
      console.log(`🚀 i18n initialized with ${currentLanguage}`);
    }
  } catch (error) {
    console.error('❌ i18n initialization failed:', error);
  }
}

/**
 * Function 13: Change language (main public function)
 * Trách nhiệm duy nhất: Thay đổi ngôn ngữ
 */
async function changeLanguage(langCode) {
  try {
    console.log(`🔄 Changing language to ${langCode}...`);
    
    // Load new translations
    const newTranslations = await loadLanguageFile(langCode);
    
    if (newTranslations) {
      currentLanguage = langCode;
      currentTranslations = newTranslations;
      
      // Save preference
      saveLanguage(langCode);
      
      // Update UI
      updateAllTexts();
      
      // Update language selector
      const languageSelect = document.getElementById('language-select');
      if (languageSelect) {
        languageSelect.value = langCode;
      }
      
      console.log(`✅ Language changed to ${langCode}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('❌ Language change failed:', error);
    return false;
  }
}

/**
 * Function 14: Get current language code
 * Trách nhiệm duy nhất: Trả về language hiện tại
 */
function getLanguageCode() {
  return currentLanguage;
}

/**
 * Function 15: Shorthand translation function
 * Trách nhiệm duy nhất: Alias cho getTranslation
 */
function t(keyPath) {
  return getTranslation(keyPath);
}

// === EXPORTS ===
export {
  initializeI18n,
  changeLanguage,
  getLanguageCode,
  getTranslation,
  t,
  updateAllTexts
};
