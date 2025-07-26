// =================================================================
// PHẦN 3: OUTPUT - Hiển thị & Tương tác
// =================================================================
// Phần này chịu trách nhiệm "vẽ" dữ liệu từ 'state' lên màn hình HTML
// và gắn các sự kiện để người dùng có thể tương tác.

import { jarsConfig, state } from './data.js';
import { saveStateToLocalStorage, loadStateFromLocalStorage } from './process.js';

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
    totalBalanceEl.textContent = formatCurrency(state.totalBalance); // Cập nhật tổng số dư
    jarsContainer.innerHTML = ''; // Xóa nội dung cũ

    // Lặp qua từng hũ trong cấu hình và hiển thị ra giao diện
    Object.keys(jarsConfig).forEach(jarId => {
        const config = jarsConfig[jarId];                               // Lấy cấu hình từng hũ
        const balance = state.jars[jarId]?.balance || 0;               // Lấy số dư hiện tại

        const jarCard = document.createElement('div');                 // Tạo thẻ div cho hũ
        jarCard.className = "jar-card bg-white shadow-md rounded-xl p-6 cursor-pointer hover:shadow-lg transition-shadow";
        jarCard.dataset.jarId = jarId;                                 // Gắn id để xử lý sau

        jarCard.innerHTML = `
            <div class="flex justify-between items-center mb-2">
                <h3 class="font-bold text-lg">${config.name}</h3>
                <div class="w-4 h-4 rounded-full ${config.color}"></div>
            </div>
            <p class="text-2xl font-semibold text-gray-800">${formatCurrency(balance)}</p>
            <p class="text-sm text-gray-500 mt-1">${config.description}</p>
        `;

        jarsContainer.appendChild(jarCard); // Thêm card vào danh sách
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

// === Hàm hiển thị modal ===
export function showModal(modalId) {
    document.getElementById(modalId).classList.replace('hidden', 'flex');
}

// === Hàm ẩn modal ===
export function hideModal(modalId) {
    document.getElementById(modalId).classList.replace('flex', 'hidden');
}


function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}

// === Hàm gắn sự kiện cho các nút bấm ===
function setupEventListeners() {
    
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
}

// === Khi trang vừa tải xong: load data và gắn sự kiện ===
document.addEventListener('DOMContentLoaded', () => {
    loadStateFromLocalStorage();  // Lấy dữ liệu đã lưu
    renderOutput();               // Vẽ giao diện
    setupEventListeners();        // Gắn sự kiện cho các nút
});
