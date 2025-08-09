// File: Front-End/src/javascript/dashboard/dashboard.js
// Đây là file "entry point" chính của ứng dụng, chịu trách nhiệm khởi tạo và kết nối tất cả các module.

// --- 1. IMPORT MODULES ---

// Module UI
import { updateDashboardUI } from './a-ui/render-ui.js';
import { showToast } from './a-ui/toast.js';

// Modules Form & Modal
import { initializeAddIncomeButton } from './c-modal-form/form-income.js';
import { initializeAddExpenseButton } from './c-modal-form/form-expenses.js';
import { initializeEditSalaryButton, updateTotalRatioDisplay } from './c-modal-form/form-editSalary.js';
import { initializeCommonModalHandlers } from './c-modal-form/modal-handler.js';
import { autoFormatNumberInput } from './c-modal-form/form-helpers.js';

// Modules Logic
import { initializeTransactionForm } from './d-logic/save-logic.js';
import { initializeSalaryForm } from './d-logic/logic-editSalary.js';

// Modules Settings
import { initializeI18n, changeLanguage } from '../setting/c-lang/lang-switch.js';
import { initializeCurrency } from '../setting/b-currency/currency-switch.js';
import { initializeExportData } from '../setting/d-data-manage/export-data.js';
import { initializeImportData } from '../setting/d-data-manage/import-data.js';
import { initializeResetData } from '../setting/d-data-manage/reset-data.js';

// Data module
import { getSalary } from '../store/local-storage.js';


// --- 2. MAIN APP INITIALIZATION ---

/**
 * Hàm khởi tạo chính của ứng dụng.
 */
async function main() {
    // Luôn khởi tạo i18n trước để các text được dịch đúng.
    // Truyền `updateDashboardUI` vào làm callback để i18n có thể re-render UI khi đổi ngôn ngữ.
    await initializeI18n(updateDashboardUI);

    // Khởi tạo tất cả các event listener và chức năng.
    bindEventListeners();

    // Render giao diện lần đầu.
    updateDashboardUI();

    // Kiểm tra nếu chưa có lương thì hiện modal nhập lương và thông báo chào mừng.
    if (getSalary() === 0) {
        setTimeout(() => {
            showToast(window.t('dashboard.welcomeMessage'), 'warning', 5000);
            document.getElementById('btn-edit-salary')?.click(); 
        }, 800);
    }
}

/**
 * Hàm gom tất cả các event listener lại một nơi cho dễ quản lý.
 */
function bindEventListeners() {
    // --- Modals & Forms ---
    initializeAddIncomeButton();
    initializeAddExpenseButton();
    initializeEditSalaryButton();
    initializeCommonModalHandlers();
    initializeTransactionForm();
    initializeSalaryForm();

    // Tự động format số cho các ô nhập tiền
    autoFormatNumberInput('amount-input');
    autoFormatNumberInput('salary-input');

    // Listener cho các input ratio để cập nhật tổng %
    // Cần dùng event delegation vì các input này được tạo động
    document.getElementById('jar-ratios-grid')?.addEventListener('input', (e) => {
        if (e.target.classList.contains('ratio-input')) {
            updateTotalRatioDisplay();
        }
    });

    // --- Settings ---
    initializeCurrency();
    initializeExportData();
    initializeImportData();
    initializeResetData();
    
    // Listener cho language select
    document.getElementById('language-select')?.addEventListener('change', (e) => {
        changeLanguage(e.target.value, updateDashboardUI);
        showToast(window.t('toast.languageChanged'), 'success');
    });

    // --- Navigation (Tabs & Mobile Menu) ---
    document.querySelectorAll('.tab-btn, .mobile-tab-btn').forEach(btn => {
        btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });

    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    
    document.getElementById('mobile-menu-btn')?.addEventListener('click', () => {
        mobileMenu?.classList.add('open');
        mobileMenuOverlay.style.display = 'block';
    });

    const closeMenu = () => {
        mobileMenu?.classList.remove('open');
        if(mobileMenuOverlay) mobileMenuOverlay.style.display = 'none';
    };

    document.getElementById('mobile-menu-close')?.addEventListener('click', closeMenu);
    mobileMenuOverlay?.addEventListener('click', closeMenu);
}

/**
 * Xử lý việc chuyển đổi giữa các tab.
 * @param {string} activeTabId - ID của tab cần hiển thị.
 */
function switchTab(activeTabId) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.toggle('hidden', tab.id !== `${activeTabId}-tab`);
    });

    document.querySelectorAll('.tab-btn, .mobile-tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === activeTabId);
    });
    
    // Đóng menu mobile sau khi chọn tab
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu?.classList.contains('open')) {
        mobileMenu.classList.remove('open');
        document.getElementById('mobile-menu-overlay').style.display = 'none';
    }
}


// --- 3. START THE APP ---
document.addEventListener('DOMContentLoaded', main);
