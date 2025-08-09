// File: Front-End/src/javascript/dashboard/d-logic/logic-editSalary.js
// Xử lý logic khi submit form nhập lương.

import { hideModal } from '../c-modal-form/modal-handler.js';
import { showToast } from '../a-ui/toast.js';
import { editSalary } from '../../store/local-storage.js';
import { updateDashboardUI } from '../a-ui/render-ui.js';
import { parseFormattedNumber } from '../c-modal-form/form-helpers.js';

/**
 * Khởi tạo event listener cho form nhập lương.
 */
export function initializeSalaryForm() {
    const form = document.getElementById('salary-form');
    if (form) {
        form.addEventListener('submit', handleSalarySubmit);
    }
}

/**
 * Xử lý khi người dùng submit form nhập lương.
 * @param {Event} event - Sự kiện submit.
 */
function handleSalarySubmit(event) {
    event.preventDefault();

    const newSalary = parseFormattedNumber(document.getElementById('salary-input').value);
    
    const ratioInputs = document.querySelectorAll('.ratio-input');
    const newRatios = {};
    let totalRatio = 0;
    ratioInputs.forEach(input => {
        const key = input.id.replace('-ratio', '');
        const value = Number(input.value) || 0;
        newRatios[key] = value;
        totalRatio += value;
    });

    // --- Validation ---
    if (totalRatio !== 100) {
        showToast(window.t('modals.totalRatioError'), 'error');
        return;
    }
    if (newSalary <= 0) {
        showToast(window.t('toast.invalidAmount'), 'error');
        return;
    }

    // --- Lưu dữ liệu ---
    editSalary(newSalary, newRatios);
    
    // --- Phản hồi cho người dùng ---
    showToast(window.t('toast.salaryUpdated'), 'success');
    hideModal('salary-modal');
    updateDashboardUI();
}
