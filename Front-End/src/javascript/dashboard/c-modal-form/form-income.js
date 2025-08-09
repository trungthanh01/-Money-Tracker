// File: Front-End/src/javascript/dashboard/c-modal-form/form-income.js
// Xử lý sự kiện cho nút "Thêm Thu Nhập"

import { showModal } from './modal-handler.js';
import { populateJarSelect } from './form-helpers.js';

export function initializeAddIncomeButton() {
    const addIncomeBtn = document.getElementById('btn-add-income');
    if (addIncomeBtn) {
        addIncomeBtn.addEventListener('click', () => {
            setupTransactionModal('income');
        });
    }
}

function setupTransactionModal(type) {
    const modal = document.getElementById('transaction-modal');
    const title = document.getElementById('modal-title');
    const form = document.getElementById('transaction-form');
    if (!modal || !title || !form) return;

    // Reset form cũ
    form.reset();

    // Cập nhật tiêu đề modal
    const titleKey = 'modals.addIncome';
    title.textContent = window.t ? window.t(titleKey) : 'Thêm Thu Nhập';
    
    // Điền danh sách hủ vào thẻ select
    populateJarSelect();
    
    // Lưu loại giao dịch vào dataset để form submit biết cách xử lý
    modal.dataset.transactionType = type;

    showModal('transaction-modal');
}
