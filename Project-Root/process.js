// =================================================================
// PHẦN 2: PROCESS - Xử lý Logic
// =================================================================
// Phần này là "bộ não" tính toán. Các hàm ở đây nhận đầu vào,
// xử lý dữ liệu, và cập nhật lại biến 'state'.
// Chúng không trực tiếp thay đổi giao diện HTML.

// Nhập dữ liệu cấu hình và state
import { jarsConfig, state, updateState } from './data.js';
import { renderOutput, hideModal } from './output.js';

// Export các hàm để các module khác có thể dùng
// Hàm xử lý khi người dùng nhấn nút Lưu giao dịch
export function handleTransactionSubmit(e) {
    e.preventDefault(); // Ngăn hành vi mặc định của form (reload trang)

    // Lấy thông tin từ các trường trong modal
    const type = document.getElementById('transaction-type').value;           // 'income' hoặc 'expense'
    const amount = parseFloat(document.getElementById('transaction-amount').value);  // Chuyển số tiền từ chuỗi sang float
    const description = document.getElementById('transaction-description').value;    // Nội dung mô tả giao dịch
    const jarId = document.getElementById('transaction-jar').value;           // ID của hũ mà người dùng chọn

    // Kiểm tra hợp lệ: phải có số tiền > 0, có mô tả và đã chọn hũ
    if (isNaN(amount) || amount <= 0 || !description || !jarId) {
        console.error("Dữ liệu giao dịch không hợp lệ");
        return;
    }

    // Kiểm tra số dư nếu là chi tiêu: không cho phép vượt quá số dư hiện có
    const currentBalance = state.jars[jarId]?.balance || 0;
    if (type === 'expense' && currentBalance < amount) {
        console.error(`Số dư trong hũ "${jarsConfig[jarId].name}" không đủ.`);
        return;
    }

    // Cập nhật số dư của hũ: cộng nếu là thu nhập, trừ nếu là chi tiêu
    state.jars[jarId].balance += (type === 'income' ? amount : -amount);

    // Tạo object giao dịch mới
    const newTransaction = {
        id: Date.now().toString(),             // ID duy nhất theo timestamp
        type,                                  // Loại giao dịch ('income' hoặc 'expense')
        amount,                                // Số tiền
        description,                           // Nội dung mô tả
        jarId,                                 // Hũ liên quan
        createdAt: new Date().toISOString()    // Thời gian tạo giao dịch
    };

    // Thêm giao dịch mới vào đầu danh sách
    state.transactions.unshift(newTransaction);
    calculateTotalBalance(); // Cập nhật tổng số dư
    // Lưu toàn bộ state vào Local Storage
    saveStateToLocalStorage();

    // Vẽ lại toàn bộ giao diện (Dashboard, Biểu đồ...)
    renderOutput();

    // Ẩn modal sau khi lưu xong
    hideModal('transaction-modal');

    // Reset lại toàn bộ form
    document.getElementById('transaction-form').reset();
}


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

