// File: Front-End/src/javascript/dashboard/d-logic/save-logic.js
// Xử lý logic khi submit form giao dịch.

import { hideModal } from '../c-modal-form/modal-handler.js';
import { showToast } from '../a-ui/toast.js';
import { addTransaction, getJars } from '../../store/local-storage.js';
import { updateDashboardUI } from '../a-ui/render-ui.js';
import { parseFormattedNumber } from '../c-modal-form/form-helpers.js';

/**
 * Khởi tạo event listener cho form giao dịch.
 */
export function initializeTransactionForm() {
    const form = document.getElementById('transaction-form');
    if (form) {
        form.addEventListener('submit', handleTransactionSubmit);
    }
}

/**
 * Xử lý khi người dùng submit form giao dịch.
 * @param {Event} event - Sự kiện submit.
 */
function handleTransactionSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const modal = form.closest('.modal-overlay');
    const type = modal.dataset.transactionType;

    const amount = parseFormattedNumber(document.getElementById('amount-input').value);
    const description = document.getElementById('description-input').value;
    const jarKey = document.getElementById('jar-select').value;
    
    // --- Validation ---
    if (amount <= 0 || !description || !jarKey) {
        showToast(window.t('toast.invalidAmount'), 'error');
        return;
    }
    
    if (type === 'expense') {
        const jars = getJars();
        if (amount > jars[jarKey].balance) {
            showToast(window.t('toast.insufficientBalance'), 'error');
            return;
        }
    }
    
    // --- Lưu dữ liệu ---
    addTransaction(type, amount, description, jarKey);
    
    // --- Phản hồi cho người dùng ---
    showToast(window.t('toast.transactionAdded'), 'success');
    hideModal('transaction-modal');
    updateDashboardUI(); // Cập nhật lại toàn bộ UI
}
