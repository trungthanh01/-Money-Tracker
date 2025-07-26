// =================================================================
// PHẦN 2: PROCESS - Xử lý Logic
// =================================================================
// Phần này là "bộ não" tính toán. Các hàm ở đây nhận đầu vào,
// xử lý dữ liệu, và cập nhật lại biến 'state'.
// Chúng không trực tiếp thay đổi giao diện HTML.

// Nhập dữ liệu cấu hình và state
import { jarsConfig, state, updateState } from './data.js';

// Export các hàm để các module khác có thể dùng
export function handleTransactionSubmit(e) {
    e.preventDefault();

    const type = document.getElementById('transaction-type').value;
    const amount = parseFloat(document.getElementById('transaction-amount').value);
    const description = document.getElementById('transaction-description').value;
    const jarId = document.getElementById('transaction-jar').value;

    if (isNaN(amount) || amount <= 0 || !description || !jarId) {
        console.error("Dữ liệu giao dịch không hợp lệ");
        return;
    }

    const currentBalance = state.jars[jarId]?.balance || 0;
    if (type === 'expense' && currentBalance < amount) {
        console.error(`Số dư trong hũ "${jarsConfig[jarId].name}" không đủ.`);
        return;
    }

    state.jars[jarId].balance += (type === 'income' ? amount : -amount);

    const newTransaction = {
        id: Date.now().toString(),
        type,
        amount,
        description,
        jarId,
        createdAt: new Date().toISOString()
    };
    state.transactions.unshift(newTransaction);

    saveStateToLocalStorage();
    renderOutput();
    hideModal('transaction-modal');
    transactionForm.reset();
}

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
