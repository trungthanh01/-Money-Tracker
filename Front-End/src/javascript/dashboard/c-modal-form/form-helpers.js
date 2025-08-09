// File: Front-End/src/javascript/dashboard/c-modal-form/form-helpers.js
// Chứa các hàm hỗ trợ dùng chung cho các form.

import { JAR_INFO } from '../../store/local-storage.js';

/**
 * Điền danh sách các hủ vào thẻ <select>.
 */
export function populateJarSelect() {
    const select = document.getElementById('jar-select');
    if (!select) return;

    // Lấy giá trị đã chọn (nếu có) để không bị reset khi mở lại
    const selectedValue = select.value;

    select.innerHTML = `<option value="" data-i18n="modals.selectJarPlaceholder">${window.t('modals.selectJarPlaceholder')}</option>`;
    
    Object.keys(JAR_INFO).forEach(key => {
        const jarInfo = JAR_INFO[key];
        const option = document.createElement('option');
        option.value = key;
        option.textContent = window.t(jarInfo.nameKey);
        select.appendChild(option);
    });

    // Khôi phục lại giá trị đã chọn
    if(selectedValue) {
        select.value = selectedValue;
    }
}

/**
 * Định dạng số khi người dùng nhập (thêm dấu phẩy).
 * @param {string} value - Giá trị từ input.
 * @returns {string} - Giá trị đã định dạng.
 */
export function formatNumberInput(value) {
    if (!value) return '';
    // Loại bỏ tất cả ký tự không phải số
    const numberString = value.replace(/[^0-9]/g, '');
    if (numberString === '') return '';
    // Định dạng lại với dấu phẩy
    return new Intl.NumberFormat('vi-VN').format(numberString);
}

/**
 * Chuyển đổi chuỗi số có dấu phẩy về dạng số.
 * @param {string} value - Chuỗi có dấu phẩy.
 * @returns {number} - Số.
 */
export function parseFormattedNumber(value) {
    if (!value) return 0;
    return Number(value.replace(/[^0-9]/g, ''));
}

/**
 * Gắn sự kiện tự động định dạng số cho một input.
 * @param {string} inputId - ID của input.
 */
export function autoFormatNumberInput(inputId) {
    const input = document.getElementById(inputId);
    if(input) {
        input.addEventListener('input', (e) => {
            const cursorPosition = e.target.selectionStart;
            const originalLength = e.target.value.length;
            
            e.target.value = formatNumberInput(e.target.value);
            
            const newLength = e.target.value.length;
            const newCursorPosition = cursorPosition + (newLength - originalLength);
            
            e.target.setSelectionRange(newCursorPosition, newCursorPosition);
        });
    }
}
