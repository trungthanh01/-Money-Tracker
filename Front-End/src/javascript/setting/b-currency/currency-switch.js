// File: Front-End/src/javascript/setting/b-currency/currency-switch.js
// Module quản lý việc thay đổi đơn vị tiền tệ.

import { getCurrency, setCurrency, CURRENCY_INFO } from '../../store/local-storage.js';
import { updateDashboardUI } from '../../dashboard/a-ui/render-ui.js';
import { showToast } from '../../dashboard/a-ui/toast.js';

/**
 * Khởi tạo chức năng chuyển đổi tiền tệ.
 */
export function initializeCurrency() {
    const currencySelect = document.getElementById('currency-select');
    if (!currencySelect) return;

    // Điền các lựa chọn tiền tệ vào dropdown
    Object.keys(CURRENCY_INFO).forEach(code => {
        const info = CURRENCY_INFO[code];
        const option = document.createElement('option');
        option.value = code;
        // Lấy tên từ i18n nếu có, nếu không dùng tên mặc định
        const currencyName = window.t ? window.t(`currency.${code}`) : `${info.symbol} - ${code}`;
        option.textContent = currencyName;
        currencySelect.appendChild(option);
    });

    // Chọn giá trị hiện tại
    currencySelect.value = getCurrency();

    // Gắn event listener
    currencySelect.addEventListener('change', handleCurrencyChange);
}

/**
 * Xử lý khi người dùng thay đổi đơn vị tiền tệ.
 * @param {Event} event - Sự kiện change.
 */
function handleCurrencyChange(event) {
    const newCurrency = event.target.value;
    setCurrency(newCurrency);
    
    // Cập nhật lại toàn bộ UI để hiển thị đơn vị tiền tệ mới
    updateDashboardUI();
    
    showToast(window.t('toast.currencyChanged'), 'success');
}
