// =================================================================
// PHẦN 3: OUTPUT - Hiển thị & Tương tác
// =================================================================
// Phần này chịu trách nhiệm "vẽ" dữ liệu từ 'state' lên màn hình HTML
// và gắn các sự kiện để người dùng có thể tương tác.

import { jarsConfig, state } from './data.js';
import { saveStateToLocalStorage, loadStateFromLocalStorage } from './process.js';

// Biến toàn cục DOM
const totalBalanceEl = document.getElementById('total-balance');
const jarsContainer = document.getElementById('jars-container');
const transactionForm = document.getElementById('transaction-form');
let jarsChart = null;

// Hàm tổng hợp để vẽ lại toàn bộ giao diện
export function renderOutput() {
    renderDashboard();
    renderChart();
}

function renderDashboard() {
    totalBalanceEl.textContent = formatCurrency(state.totalBalance);
    jarsContainer.innerHTML = '';

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
        jarsContainer.appendChild(jarCard);
    });
}

function renderChart() {
    const ctx = document.getElementById('jars-chart').getContext('2d');
    const labels = Object.values(jarsConfig).map(j => j.name);
    const data = Object.keys(jarsConfig).map(id => state.jars[id]?.balance || 0);
    const colors = ['#3b82f6', '#ef4444', '#22c55e', '#8b5cf6', '#eab308'];

    if (jarsChart) {
        jarsChart.data.labels = labels;
        jarsChart.data.datasets[0].data = data;
        jarsChart.update();
    } else {
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

export function showModal(modalId) {
    document.getElementById(modalId).classList.replace('hidden', 'flex');
}

export function hideModal(modalId) {
    document.getElementById(modalId).classList.replace('flex', 'hidden');
}

function handleTransactionSubmit(e) {
    e.preventDefault();

    const type = document.getElementById('transaction-type').value;
    const amount = parseFloat(document.getElementById('transaction-amount').value);
    const description = document.getElementById('transaction-description').value;
    const jarId = document.getElementById('transaction-jar').value;

    if (isNaN(amount) || amount <= 0 || !description || !jarId) {
        console.error('Dữ liệu giao dịch không hợp lệ');
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
        createdAt: new Date().toISOString(),
    };
    state.transactions.unshift(newTransaction);

    saveStateToLocalStorage();
    renderOutput();
    hideModal('transaction-modal');
    document.getElementById('transaction-form').reset();
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}

function setupEventListeners() {
    document.getElementById('add-income-btn').addEventListener
        ('click', () => {
        document.getElementById('transaction-modal-title').textContent 
            = 'Thêm Thu Nhập';
        document.getElementById('transaction-type').value 
            = 'income';
        showModal('transaction-modal');
    });

    document.getElementById('add-expense-btn').addEventListener
        ('click', () => {
        document.getElementById('transaction-modal-title').textContent 
            = 'Thêm Chi Tiêu';
        document.getElementById('transaction-type').value 
            = 'expense';
        showModal('transaction-modal');
    });

    transactionForm.addEventListener('submit', handleTransactionSubmit);
    document.getElementById('cancel-transaction-btn').addEventListener
        ('click', () => hideModal('transaction-modal')
    );
    //sau khi nhất nút lưu thì input value sẽ được update vào jar
    // Cập nhật giá trị input khi lưu giao dịch

   
    document.getElementById('save-transaction-btn')?.addEventListener(
        'click', () => {
            transactionForm.requestSubmit();
        }
    );


    const jarSelect = document.getElementById('transaction-jar');
    jarSelect.innerHTML = Object.keys(jarsConfig)
        .map(id => `<option value="${id}">${jarsConfig[id].name}</option>`)
        .join('');
}

// Khởi động ứng dụng khi DOM sẵn sàng
document.addEventListener('DOMContentLoaded', () => {
    loadStateFromLocalStorage();
    renderOutput();
    setupEventListeners();
});
