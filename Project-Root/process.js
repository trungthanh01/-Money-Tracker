// =================================================================
// PHẦN 2: PROCESS - Xử lý Logic
// =================================================================
// Phần này là "bộ não" tính toán. Các hàm ở đây nhận đầu vào,
// xử lý dữ liệu, và cập nhật lại biến 'state'.
// Chúng không trực tiếp thay đổi giao diện HTML.

// Nhập dữ liệu cấu hình và state
import { jarsConfig, state, updateState } from './data.js';

// Export các hàm để các module khác có thể dùng



// Tính tổng số dư của tất cả các hũ
export function calculateTotalBalance() {
    // Lặp qua toàn bộ các hũ, cộng dồn số dư
    state.totalBalance = Object.values(state.jars).reduce((sum, jar) => sum + (jar.balance || 0), 0);
}

// Ghi toàn bộ trạng thái hiện tại vào LocalStorage
export function saveStateToLocalStorage() {
    calculateTotalBalance(); // Đảm bảo totalBalance được cập nhật đúng trước khi lưu
    localStorage.setItem('financeAppData', JSON.stringify(state)); // Ghi state dưới dạng chuỗi JSON
}

// Tải dữ liệu đã lưu khi người dùng mở lại trang
export function loadStateFromLocalStorage() {
    const savedData = localStorage.getItem('financeAppData');
    if (savedData) {
        // Nếu có dữ liệu, khôi phục lại toàn bộ state
        updateState(JSON.parse(savedData));
    } else {
        // Nếu chưa có gì, khởi tạo số dư = 0 cho tất cả các hũ
        Object.keys(jarsConfig).forEach(id => {
            state.jars[id] = { balance: 0 };
        });
    }
}

