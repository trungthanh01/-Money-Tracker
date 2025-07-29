// =================================================================
// PHẦN 3: OUTPUT - Hiển thị & Tương tác
// =================================================================
// Phần này chịu trách nhiệm "vẽ" dữ liệu từ 'state' lên màn hình HTML
// và gắn các sự kiện để người dùng có thể tương tác.

import { jarsConfig, state } from './data.js';
import { handleTransactionSubmit, loadStateFromLocalStorage } from './process.js';

// === Biến toàn cục DOM ===
const totalBalanceEl = document.getElementById('total-balance');        // Hiển thị tổng số dư
const jarsContainer = document.getElementById('jars-container');        // Khu vực hiển thị danh sách các hũ
const transactionForm = document.getElementById('transaction-form');    // Form giao dịch
let jarsChart = null; // Biến lưu biểu đồ Chart.js

// === Hàm chính để hiển thị toàn bộ UI ===
export function renderOutput() {
    renderDashboard(); // Vẽ danh sách hũ + số dư
    renderChart();     // Vẽ biểu đồ Doughnut
}

// === Vẽ phần dashboard gồm thông tin từng hũ ===
function renderDashboard() {
    // Hiển thị tổng số dư = tổng lương - tổng chi tiêu
    let totalSalary = 0;
    if (typeof window.calculateTotalSalary === 'function') {
        totalSalary = window.calculateTotalSalary();
    }
    const totalExpense = state.transactions.filter(tx => tx.type === 'expense').reduce((sum, tx) => sum + tx.amount, 0);
    totalBalanceEl.textContent = formatCurrency(totalSalary - totalExpense);
    jarsContainer.innerHTML = '';

    // Hiển thị tổng lương
    let salaryEl = document.getElementById('total-salary');
    if (!salaryEl) {
        salaryEl = document.createElement('p');
        salaryEl.id = 'total-salary';
        salaryEl.className = 'text-lg font-semibold text-green-600 cursor-pointer underline';
        totalBalanceEl.parentNode.appendChild(salaryEl);
    }
    salaryEl.textContent = 'Tổng Lương: ' + formatCurrency(totalSalary);
    salaryEl.onclick = showEditSalaryModal;

    Object.keys(jarsConfig).forEach(jarId => {
        const config = jarsConfig[jarId];
        const balance = state.jars[jarId]?.balance || 0;

        const jarCard = document.createElement('div');
        jarCard.className = "jar-card bg-white shadow-md rounded-xl p-6 cursor-pointer hover:shadow-lg transition-shadow";
        jarCard.dataset.jarId = jarId;
        jarCard.innerHTML = `
            <div class="flex justify-between items-center mb-2">
                <h3 class="font-bold text-lg">${config.name}</h3>
                <div class="w-4 h-4 rounded-full ${config.color}"></div>
            </div>
            <p class="text-2xl font-semibold text-gray-800">${formatCurrency(balance)}</p>
            <p class="text-sm text-gray-500 mt-1">${config.description}</p>
        `;
        // Gắn sự kiện click để xem lịch sử giao dịch của hũ
        jarCard.addEventListener('click', () => showJarDetailModal(jarId));
        jarsContainer.appendChild(jarCard);
    });
}


// === Hàm vẽ biểu đồ Chart Doughnut ===
function renderChart() {
    const ctx = document.getElementById('jars-chart').getContext('2d');

    const labels = Object.values(jarsConfig).map(j => j.name);                  // Tên hũ
    const data = Object.keys(jarsConfig).map(id => state.jars[id]?.balance || 0); // Dữ liệu số dư
    const colors = ['#3b82f6', '#ef4444', '#22c55e', '#8b5cf6', '#eab308'];     // Màu biểu đồ
    if (jarsChart) {
        // Nếu đã có biểu đồ → cập nhật
        jarsChart.data.labels = labels;
        jarsChart.data.datasets[0].data = data;
        jarsChart.update();
    } else {
        // Nếu chưa có → tạo mới
        jarsChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{ label: 'Số dư', data: data, backgroundColor: colors, hoverOffset: 4 }]
            },
            options: {
                responsive: true,
                plugins: { legend: { position: 'top' } }
            }
        });
    }
}
 // In ra để kiểm tra dữ liệu biểu đồ
// === Hàm hiển thị modal ===
export function showModal(modalId) {
    document.getElementById(modalId).classList.replace('hidden', 'flex');
}

// === Hàm ẩn modal ===
export function hideModal(modalId) {
    document.getElementById(modalId).classList.replace('flex', 'hidden');
}

// === Modal chi tiết giao dịch từng hũ (cập nhật nút xóa) ===
export function showJarDetailModal(jarId) {
    const modal = document.getElementById('jar-detail-modal');
    const config = jarsConfig[jarId];
    const transactions = state.transactions.filter(tx => tx.jarId === jarId);
    modal.innerHTML = `
        <div class="modal-backdrop fixed inset-0" onclick="hideJarDetailModal()"></div>
        <div class="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md z-10 m-4 relative flex flex-col">
            <button class="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-2xl font-bold" onclick="hideJarDetailModal()">&times;</button>
            <h2 class="text-2xl font-bold mb-4">Lịch sử - ${config?.name || jarId}</h2>
            <div class="overflow-y-auto max-h-96">
                ${transactions.length === 0 ? '<p class="text-gray-500">Chưa có giao dịch nào.</p>' :
                    transactions.map(tx => `
                        <div class="flex justify-between items-center border-b py-2">
                            <div>
                                <span class="${tx.type === 'income' ? 'text-green-600' : 'text-red-600'} font-bold">${tx.type === 'income' ? '+' : '-'}${formatCurrency(tx.amount)}</span>
                                <span class="ml-2 text-xs text-gray-500">${tx.description}</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <span class="text-xs text-gray-400">${new Date(tx.createdAt).toLocaleString('vi-VN')}</span>
                                <button class="delete-transaction-btn text-red-500 font-bold" data-id="${tx.id}" title="Xóa">&times;</button>
                            </div>
                        </div>
                    `).join('')
                }
            </div>
        </div>
    `;
    modal.classList.replace('hidden', 'flex');
    // Gắn event xóa cho các nút X
    modal.querySelectorAll('.delete-transaction-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.dataset.id;
            window.deleteTransaction(id);
            // Sau khi xóa, render lại modal
            showJarDetailModal(jarId);
        });
    });
}

export function hideJarDetailModal() {
    const modal = document.getElementById('jar-detail-modal');
    modal.classList.replace('flex', 'hidden');
}
window.showJarDetailModal = showJarDetailModal;
window.hideJarDetailModal = hideJarDetailModal;

// === Hàm định dạng số thành tiền tệ VND ===
function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}

// === Hàm gắn sự kiện cho các nút bấm ===
function setupEventListeners() {
    // Khi bấm Thêm Thu Nhập → mở modal
    document.getElementById('add-income-btn').addEventListener('click', () => {
        document.getElementById('transaction-modal-title').textContent = 'Thêm Thu Nhập';
        document.getElementById('transaction-type').value = 'income';
        showModal('transaction-modal');
    });

    // Khi bấm Thêm Chi Tiêu → mở modal
    document.getElementById('add-expense-btn').addEventListener('click', () => {
        document.getElementById('transaction-modal-title').textContent = 'Thêm Chi Tiêu';
        document.getElementById('transaction-type').value = 'expense';
        showModal('transaction-modal');
    });

    // Thêm nút nhập lương
    const addSalaryBtn = document.getElementById('add-salary-btn');
    if (addSalaryBtn) {
        addSalaryBtn.addEventListener('click', () => {
            document.getElementById('transaction-modal-title').textContent = 'Nhập Lương';
            document.getElementById('transaction-type').value = 'salary';
            document.getElementById('transaction-jar').parentElement.style.display = 'none';
            let salaryLeftEl = document.getElementById('salary-left-info');
            if (salaryLeftEl) salaryLeftEl.textContent = '';
            showModal('transaction-modal');
        });
    }
    // Khi mở modal giao dịch bình thường, hiện lại dropdown chọn hũ
    document.getElementById('add-income-btn').addEventListener('click', () => {
        document.getElementById('transaction-jar').parentElement.style.display = '';
    });
    document.getElementById('add-expense-btn').addEventListener('click', () => {
        document.getElementById('transaction-jar').parentElement.style.display = '';
    });
    // Khi đóng modal giao dịch, hiện lại dropdown chọn hũ
    document.getElementById('cancel-transaction-btn').addEventListener('click', () => {
        document.getElementById('transaction-jar').parentElement.style.display = '';
    });

    // Khi nhấn nút submit form (Lưu giao dịch)
    transactionForm.addEventListener('submit', handleTransactionSubmit);

    // Khi bấm Hủy → ẩn modal
    document.getElementById('cancel-transaction-btn').addEventListener('click', () => hideModal('transaction-modal'));

    // Khi bấm nút Lưu (nếu không phải type="submit") → gửi form thủ công
    document.getElementById('save-transaction-btn')?.addEventListener('click', () => {
        transactionForm.requestSubmit(); // Triggers 'submit' event
    });

    // Lặp qua cấu hình jars để gán dropdown lựa chọn hũ
    const jarSelect = document.getElementById('transaction-jar');
    jarSelect.innerHTML = Object.keys(jarsConfig)
        .map(id => `<option value="${id}">${jarsConfig[id].name}</option>`)
        .join('');

    // Format input số tiền
    setupMoneyInputFormatting();
    // Khi mở modal giao dịch, hiển thị tổng lương còn lại
    document.getElementById('add-income-btn').addEventListener('click', () => {
        document.getElementById('transaction-jar').parentElement.style.display = '';
        showSalaryLeftInTransactionModal();
    });
    document.getElementById('add-expense-btn').addEventListener('click', () => {
        document.getElementById('transaction-jar').parentElement.style.display = '';
        showSalaryLeftInTransactionModal();
    });
    // Khi mở modal nhập lương, ẩn salary left
    // (đã xử lý ở trên với addSalaryBtn)
}

// === Khi trang vừa tải xong: load data và gắn sự kiện ===
document.addEventListener('DOMContentLoaded', () => {
    loadStateFromLocalStorage();  // Lấy dữ liệu đã lưu
    renderOutput();               // Vẽ giao diện
    setupEventListeners();        // Gắn sự kiện cho các nút

    // Logic cho modal chỉnh sửa tổng lương
    const saveEditSalaryBtn = document.getElementById('save-edit-salary-btn');
    const cancelEditSalaryBtn = document.getElementById('cancel-edit-salary-btn');
    if (saveEditSalaryBtn) {
        saveEditSalaryBtn.addEventListener('click', () => {
            const input = document.getElementById('edit-salary-amount');
            let value = input.value.replace(/[^\d]/g, '');
            if (!value) value = '0';
            const salary = parseInt(value, 10);
            if (!isNaN(salary) && salary >= 0) {
                window.editTotalSalary(salary);
                hideEditSalaryModal();
            }
        });
    }
    if (cancelEditSalaryBtn) {
        cancelEditSalaryBtn.addEventListener('click', () => {
            hideEditSalaryModal();
        });
    }
});

// === Format input số tiền ===
function setupMoneyInputFormatting() {
    const moneyInputs = [
        document.getElementById('transaction-amount'),
        document.getElementById('edit-salary-amount')
    ];
    moneyInputs.forEach(input => {
        if (!input) return;
        input.addEventListener('input', (e) => {
            let value = e.target.value.replace(/[^\d]/g, '');
            if (!value) {
                e.target.value = '';
                return;
            }
            // Lưu vị trí con trỏ
            const selectionStart = e.target.selectionStart;
            const oldLength = e.target.value.length;
            e.target.value = parseInt(value, 10).toLocaleString('vi-VN');
            // Tính vị trí con trỏ mới
            const newLength = e.target.value.length;
            e.target.setSelectionRange(selectionStart + (newLength - oldLength), selectionStart + (newLength - oldLength));
        });
        // Khi focus, bỏ format để nhập dễ hơn
        input.addEventListener('focus', (e) => {
            let value = e.target.value.replace(/[^\d]/g, '');
            e.target.value = value;
        });
        // Khi blur, format lại
        input.addEventListener('blur', (e) => {
            let value = e.target.value.replace(/[^\d]/g, '');
            if (!value) e.target.value = '';
            else e.target.value = parseInt(value, 10).toLocaleString('vi-VN');
        });
    });
}

// === Mở modal chỉnh sửa tổng lương ===
export function showEditSalaryModal() {
    const modal = document.getElementById('edit-salary-modal');
    const input = document.getElementById('edit-salary-amount');
    if (typeof window.calculateTotalSalary === 'function') {
        input.value = window.calculateTotalSalary().toLocaleString('vi-VN');
    }
    modal.classList.replace('hidden', 'flex');
}
export function hideEditSalaryModal() {
    document.getElementById('edit-salary-modal').classList.replace('flex', 'hidden');
}
window.showEditSalaryModal = showEditSalaryModal;
window.hideEditSalaryModal = hideEditSalaryModal;

// === Hiển thị tổng lương còn lại trong modal giao dịch ===
function showSalaryLeftInTransactionModal() {
    let salaryLeft = 0;
    const type = document.getElementById('transaction-type').value;
    if (typeof window.calculateSalaryLeft === 'function') {
        if (type === 'expense') {
            // Tổng lương còn lại = tổng lương - tổng chi tiêu
            const totalSalary = window.calculateTotalSalary ? window.calculateTotalSalary() : 0;
            const totalExpense = state.transactions.filter(tx => tx.type === 'expense').reduce((sum, tx) => sum + tx.amount, 0);
            salaryLeft = totalSalary - totalExpense;
        } else {
            // income hoặc mặc định: tổng lương - income - expense
            salaryLeft = window.calculateSalaryLeft();
        }
    }
    let salaryLeftEl = document.getElementById('salary-left-info');
    if (!salaryLeftEl) {
        salaryLeftEl = document.createElement('div');
        salaryLeftEl.id = 'salary-left-info';
        salaryLeftEl.className = 'mb-2 text-sm text-blue-600 font-semibold';
        const form = document.getElementById('transaction-form');
        form.insertBefore(salaryLeftEl, form.firstChild);
    }
    salaryLeftEl.textContent = 'Tổng lương còn lại: ' + formatCurrency(salaryLeft);
}
