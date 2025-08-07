// js/app.js  
// Module chính khởi động Money Tracker App
// Chức năng: Khởi tạo app, bind events, điều phối giữa UI và Data
// Theo phương pháp Feynman: Giải thích từng function một cách đơn giản

// Import các functions cần thiết từ data và ui modules
import { 
  addTransaction, 
  editSalary, 
  getRatios,
  getSalary
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

// === APP INITIALIZATION ===

/**
 * Hàm khởi tạo ứng dụng
 * Được gọi khi DOM đã load xong
 */
function initApp() {
  console.log('🚀 Money Tracker App Starting...');
  
  // Render UI lần đầu với dữ liệu hiện có
  updateAllUI();
  
  // Bind events cho các buttons và forms
  bindEvents();
  
  // Hiển thị tab dashboard mặc định
  switchTab('dashboard');
  
  console.log('✅ Money Tracker App Started Successfully!');
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
  document.getElementById('btn-add-income').addEventListener('click', () => {
    setupTransactionModal('income');
  });
  
  // Button "Thêm Chi Tiêu"  
  document.getElementById('btn-add-expense').addEventListener('click', () => {
    setupTransactionModal('expense');
  });
  
  // Button "Nhập Lương"
  document.getElementById('btn-edit-salary').addEventListener('click', () => {
    loadSalaryData(); // Load dữ liệu hiện tại vào form
    showModal('salary-modal');
  });
  
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
      throw new Error('Vui lòng nhập số tiền hợp lệ');
    }
    
    if (!description.trim()) {
      throw new Error('Vui lòng nhập mô tả');
    }
    
    if (!jar) {
      throw new Error('Vui lòng chọn hủ');
    }
    
    if (description.length > 100) {
      throw new Error('Mô tả không được quá 100 ký tự');
    }
    
    // Thêm giao dịch vào dữ liệu
    const transaction = addTransaction(type, amount, jar, description);
    
    // Đóng modal
    hideModal('transaction-modal');
    
    // Cập nhật UI
    updateAllUI();
    
    // Hiển thị thông báo thành công
    const typeText = type === 'income' ? 'thu nhập' : 'chi tiêu';
    showToast(`Đã thêm ${typeText} thành công!`, 'success');
    
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
      throw new Error('Vui lòng nhập lương hợp lệ');
    }
    
    // Kiểm tra tổng tỉ lệ = 100%
    const totalRatio = Object.values(ratios).reduce((sum, ratio) => sum + ratio, 0);
    if (totalRatio !== 100) {
      throw new Error('Tổng tỉ lệ các hủ phải bằng 100%');
    }
    
    // Cập nhật lương và tỉ lệ
    editSalary(salary, ratios);
    
    // Đóng modal
    hideModal('salary-modal');
    
    // Cập nhật UI
    updateAllUI();
    
    // Hiển thị thông báo thành công
    showToast('Đã cập nhật lương thành công!', 'success');
    
    console.log('✅ Salary updated:', { salary, ratios });
    
  } catch (error) {
    // Hiển thị lỗi cho user
    showToast(error.message, 'error');
    console.error('❌ Error updating salary:', error);
  }
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
      showToast('Chào mừng bạn đến với Money Tracker! Hãy nhập lương để bắt đầu.', 'info');
      
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
  showToast('Đã xảy ra lỗi. Vui lòng thử lại.', 'error');
});

/**
 * Unhandled promise rejection handler
 */
window.addEventListener('unhandledrejection', (e) => {
  console.error('💥 Unhandled Promise Rejection:', e.reason);
  showToast('Đã xảy ra lỗi. Vui lòng thử lại.', 'error');
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
