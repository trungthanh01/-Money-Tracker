// =================================================================
// PHẦN 2: PROCESS - Xử lý Logic
// =================================================================
// Phần này là "bộ não" tính toán. Các hàm ở đây nhận đầu vào,
// xử lý dữ liệu, và cập nhật lại biến 'state'.
// Chúng không trực tiếp thay đổi giao diện HTML.

// Nhập dữ liệu cấu hình và state
import { jarsConfig, state, updateState } from './data.js';

// Export các hàm để các module khác có thể dùng

export function calculateTotalBalance() {
    state.totalBalance = Object.values(state.jars).reduce((sum, jar) => sum + (jar.balance || 0), 0);
}

export function saveStateToLocalStorage() {
    calculateTotalBalance();
    localStorage.setItem('financeAppData', JSON.stringify(state));
}

export function loadStateFromLocalStorage() {
    const savedData = localStorage.getItem('financeAppData');
    if (savedData) {
        updateState(JSON.parse(savedData));
    } else {
        Object.keys(jarsConfig).forEach(id => {
            state.jars[id] = { balance: 0 };
        });
    }
}
