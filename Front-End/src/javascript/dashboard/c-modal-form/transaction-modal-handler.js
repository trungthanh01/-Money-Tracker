// File: Front-End/src/javascript/dashboard/c-modal-form/transaction-modal-handler.js
// Chứa logic chung để thiết lập và hiển thị modal giao dịch (cả thu nhập và chi tiêu).

import { showModal } from './modal-handler.js';

/**
 * Cấu hình và hiển thị modal giao dịch.
 * @param {'income' | 'expense'} type - Loại giao dịch.
 */
export function setupTransactionModal(type) {
    const modal = document.getElementById('transaction-modal');
    const title = document.getElementById('modal-title');
    if (!modal || !title) {
        console.error("Transaction modal elements not found!");
        return;
    }

    const titleKey = type === 'income' ? 'modals.addIncome' : 'modals.addExpense';
    title.textContent = window.t ? window.t(titleKey) : (type === 'income' ? 'Thêm Thu Nhập' : 'Thêm Chi Tiêu');
    
    // Lưu loại giao dịch vào dataset để form submit biết cách xử lý
    modal.dataset.transactionType = type;

    showModal('transaction-modal');
}
