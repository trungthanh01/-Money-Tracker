// File: Front-End/src/javascript/dashboard/c-modal-form/form-expenses.js
// Xử lý sự kiện cho nút "Thêm Chi Tiêu"

import { showModal } from './modal-handler.js';
import { populateJarSelect } from './form-helpers.js';

export function initializeAddExpenseButton() {
    const addExpenseBtn = document.getElementById('btn-add-expense');
    if (addExpenseBtn) {
        addExpenseBtn.addEventListener('click', () => {
            setupTransactionModal('expense');
        });
    }
}

function setupTransactionModal(type) {
    const modal = document.getElementById('transaction-modal');
    const title = document.getElementById('modal-title');
    const form = document.getElementById('transaction-form');
    if (!modal || !title || !form) return;

    form.reset();

    const titleKey = 'modals.addExpense';
    title.textContent = window.t ? window.t(titleKey) : 'Thêm Chi Tiêu';
    
    populateJarSelect();
    
    modal.dataset.transactionType = type;

    showModal('transaction-modal');
}
