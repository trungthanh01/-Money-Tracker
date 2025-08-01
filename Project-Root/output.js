// =================================================================
// PHẦN 3: OUTPUT - Hiển thị & Tương tác
// =================================================================
// Phần này chịu trách nhiệm "vẽ" dữ liệu từ 'state' lên màn hình HTML
// và gắn các sự kiện để người dùng có thể tương tác.

import { jarsConfig, state, coinsList } from './data.js';
import { handleTransactionSubmit, loadStateFromLocalStorage } from './process.js';

// === Biến toàn cục DOM ===
let totalBalanceEl = null;        // Hiển thị tổng số dư
let jarsContainer = null;        // Khu vực hiển thị danh sách các hũ
let transactionForm = null;    // Form giao dịch
let jarsChart = null; // Biến lưu biểu đồ Chart.js

// === Hàm chính để hiển thị toàn bộ UI ===
export function renderOutput() {
    renderDashboard(); // Vẽ danh sách hũ + số dư
    renderChart();     // Vẽ biểu đồ Doughnut
}

// === Vẽ phần dashboard gồm thông tin từng hũ ===
function renderDashboard() {
    // Lấy elements khi cần thiết
    totalBalanceEl = document.getElementById('total-balance');
    jarsContainer = document.getElementById('jars-container');
    
    if (!totalBalanceEl || !jarsContainer) {
        console.error('Required elements not found for dashboard');
        return;
    }
    
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
export function setupEventListeners() {
    // Lấy elements khi cần thiết
    transactionForm = document.getElementById('transaction-form');
    // Khi bấm Thêm Thu Nhập → mở modal
    const addIncomeBtn = document.getElementById('add-income-btn');
    if (addIncomeBtn) {
        addIncomeBtn.addEventListener('click', () => {
            document.getElementById('transaction-modal-title').textContent = 'Thêm Thu Nhập';
            document.getElementById('transaction-type').value = 'income';
            document.getElementById('transaction-jar').parentElement.style.display = '';
            showModal('transaction-modal');
            showSalaryLeftInTransactionModal();
        });
    }

    // Khi bấm Thêm Chi Tiêu → mở modal
    const addExpenseBtn = document.getElementById('add-expense-btn');
    if (addExpenseBtn) {
        addExpenseBtn.addEventListener('click', () => {
            document.getElementById('transaction-modal-title').textContent = 'Thêm Chi Tiêu';
            document.getElementById('transaction-type').value = 'expense';
            document.getElementById('transaction-jar').parentElement.style.display = '';
            showModal('transaction-modal');
            showSalaryLeftInTransactionModal();
        });
    }

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

    // Khi đóng modal giao dịch, hiện lại dropdown chọn hũ
    const cancelTransactionBtn = document.getElementById('cancel-transaction-btn');
    if (cancelTransactionBtn) {
        cancelTransactionBtn.addEventListener('click', () => {
            hideModal('transaction-modal');
            document.getElementById('transaction-jar').parentElement.style.display = '';
        });
    }

    // Khi nhấn nút submit form (Lưu giao dịch)
    if (transactionForm) {
        transactionForm.addEventListener('submit', handleTransactionSubmit);
    }

    // Khi bấm nút Lưu (nếu không phải type="submit") → gửi form thủ công
    const saveTransactionBtn = document.getElementById('save-transaction-btn');
    if (saveTransactionBtn) {
        saveTransactionBtn.addEventListener('click', () => {
            transactionForm.requestSubmit(); // Triggers 'submit' event
        });
    }

    // Lặp qua cấu hình jars để gán dropdown lựa chọn hũ
    const jarSelect = document.getElementById('transaction-jar');
    if (jarSelect) {
        jarSelect.innerHTML = Object.keys(jarsConfig)
            .map(id => `<option value="${id}">${jarsConfig[id].name}</option>`)
            .join('');
    }

    // Format input số tiền
    setupMoneyInputFormatting();
}

// === Khi trang vừa tải xong: load data và gắn sự kiện ===
document.addEventListener('DOMContentLoaded', () => {
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







// =================================================================
// PHẦN RENDER ĐẦU TƯ
// =================================================================

//=============================================== Render trang đầu tư ===============================================
export function renderInvestmentView() {
    const investmentView = document.getElementById('investment-view');
    if (!investmentView) {
        console.error('investment-view element not found');
        return;
    }

    // Đảm bảo state.investmentPortfolio tồn tại
    if (!state.investmentPortfolio) {
        state.investmentPortfolio = {
            transactions: [],
            holdings: {},
            totalValue: 0,
            totalPnL: 0,
            currency: 'USD'
        };
        
        // Thêm dữ liệu mẫu để test (chỉ thêm nếu chưa có)
        if (state.investmentPortfolio.transactions.length === 0) {
            state.investmentPortfolio.transactions.push({
                id: 'sample-1',
                coinId: 'bitcoin',
                type: 'buy',
                totalSpend: 1000,
                quantity: 0.025,
                pricePerCoin: 40000,
                currency: 'USD',
                dateTime: new Date().toISOString(),
                createdAt: new Date().toISOString()
            });
        }
    }

    // Cập nhật dữ liệu portfolio
    if (typeof window.updatePortfolioHoldings === 'function') {
        window.updatePortfolioHoldings();
    }
    if (typeof window.calculatePortfolioValue === 'function') {
        window.calculatePortfolioValue();
    }

    const portfolio = state.investmentPortfolio;
    const holdings = portfolio.holdings;
    const holdingsArray = Object.keys(holdings).map(coinId => ({
        coinId,
        ...holdings[coinId],
        coin: coinsList.find(c => c.id === coinId)
    })).filter(item => item.coin);

    investmentView.innerHTML = `
        <div class="space-y-6">
            <h2 class="text-2xl font-bold text-gray-900">Investment Portfolio</h2>
            
            <!-- Portfolio Overview -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div class="bg-white rounded-xl p-6 shadow-md">
                    <h3 class="text-gray-500 text-sm font-medium">Current Balance</h3>
                    <p class="text-2xl font-bold text-gray-900">$${portfolio.totalValue.toFixed(2)}</p>
                </div>
                <div class="bg-white rounded-xl p-6 shadow-md">
                    <h3 class="text-gray-500 text-sm font-medium">Total Profit/Loss</h3>
                    <p class="text-2xl font-bold ${portfolio.totalPnL >= 0 ? 'text-green-600' : 'text-red-600'}">
                        ${portfolio.totalPnL >= 0 ? '+' : ''}$${portfolio.totalPnL.toFixed(2)}
                    </p>
                </div>
                <div class="bg-white rounded-xl p-6 shadow-md">
                    <button id="add-investment-btn" class="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
                        Add Transaction
                    </button>
                </div>
            </div>

            <!-- Portfolio Table -->
            <div class="bg-white rounded-xl shadow-md overflow-hidden">
                <div class="px-6 py-4 border-b">
                    <h3 class="text-lg font-semibold">My Portfolio</h3>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead class="bg-gray-50">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Token</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Holding</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PnL</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            ${holdingsArray.length === 0 ? `
                                <tr>
                                    <td colspan="5" class="px-6 py-4 text-center text-gray-500">
                                        No holdings yet. Add your first transaction!
                                    </td>
                                </tr>
                            ` : holdingsArray.map(item => `
                                <tr class="hover:bg-gray-50">
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="flex items-center">
                                            <img class="h-8 w-8 rounded-full" src="${item.coin.image}" alt="${item.coin.name}">
                                            <div class="ml-4">
                                                <div class="text-sm font-medium text-gray-900">${item.coin.symbol}</div>
                                                <div class="text-sm text-gray-500">${item.coin.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm text-gray-900">$${item.currentPrice?.toFixed(2) || '0.00'}</div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm text-gray-900">${item.totalQuantity.toFixed(6)}</div>
                                        <div class="text-sm text-gray-500">$${item.currentValue?.toFixed(2) || '0.00'}</div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm ${item.pnl >= 0 ? 'text-green-600' : 'text-red-600'}">
                                            ${item.pnl >= 0 ? '+' : ''}$${item.pnl?.toFixed(2) || '0.00'}
                                        </div>
                                        <div class="text-sm ${item.pnlPercentage >= 0 ? 'text-green-600' : 'text-red-600'}">
                                            ${item.pnlPercentage >= 0 ? '+' : ''}${item.pnlPercentage?.toFixed(2) || '0.00'}%
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div class="flex space-x-2">
                                            <button onclick="showAddTransactionModal('${item.coinId}')" class="text-indigo-600 hover:text-indigo-900 font-bold">+</button>
                                            <button onclick="showTransactionHistory('${item.coinId}')" class="text-gray-600 hover:text-gray-900">:</button>
                                        </div>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;

    // Render biểu đồ holdings
    renderHoldingsChart(holdingsArray);
    
    // Gắn event listener cho nút Add Transaction
    const addBtn = document.getElementById('add-investment-btn');
    if (addBtn) {
        addBtn.addEventListener('click', () => showAddTransactionModal());
    }
}

// Render biểu đồ phân bổ holdings
function renderHoldingsChart(holdingsArray) {
    const ctx = document.getElementById('holdings-chart');
    if (!ctx) return;

    if (holdingsArray.length === 0) {
        ctx.style.display = 'none';
        return;
    }

    ctx.style.display = 'block';
    
    const labels = holdingsArray.map(item => item.coin.symbol);
    const data = holdingsArray.map(item => item.currentValue || 0);
    const colors = ['#3b82f6', '#ef4444', '#22c55e', '#8b5cf6', '#eab308', '#06b6d4', '#f97316', '#8b5a2b', '#ec4899', '#10b981'];

    if (window.holdingsChart) {
        window.holdingsChart.destroy();
    }

    window.holdingsChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: colors,
                borderWidth: 2,
                borderColor: '#ffffff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true
                    }
                }
            }
        }
    });
}

// Hiển thị modal thêm giao dịch
export function showAddTransactionModal(coinId = null) {
    const modal = document.getElementById('investment-transaction-modal');
    if (!modal) {
        createInvestmentTransactionModal();
    }
    
    const modalInstance = document.getElementById('investment-transaction-modal');
    const coinSelect = document.getElementById('investment-coin-select');
    const typeSelect = document.getElementById('investment-type-select');
    
    if (coinId && coinSelect) {
        coinSelect.value = coinId;
    }
    
    if (typeSelect) {
        typeSelect.value = 'buy';
    }
    
    modalInstance.classList.replace('hidden', 'flex');
}

// Tạo modal giao dịch đầu tư
function createInvestmentTransactionModal() {
    const modalHTML = `
        <div id="investment-transaction-modal" class="fixed inset-0 z-50 items-center justify-center hidden">
            <div class="modal-backdrop fixed inset-0"></div>
            <div class="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md z-10 m-4">
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-2xl font-bold">Add Transaction</h2>
                    <button onclick="hideInvestmentTransactionModal()" class="text-gray-400 hover:text-red-500 text-2xl font-bold">&times;</button>
                </div>
                <form id="investment-transaction-form">
                    <div class="mb-4">
                        <label class="block text-gray-700 font-medium mb-2">Type</label>
                        <select id="investment-type-select" class="w-full p-3 border rounded-lg bg-white" required>
                            <option value="buy">Buy</option>
                            <option value="sell">Sell</option>
                        </select>
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700 font-medium mb-2">Select Coin</label>
                        <select id="investment-coin-select" class="w-full p-3 border rounded-lg bg-white" required>
                            <option value="">Select a coin</option>
                            ${coinsList.map(coin => `
                                <option value="${coin.id}">${coin.symbol} - ${coin.name}</option>
                            `).join('')}
                        </select>
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700 font-medium mb-2">Total Spend</label>
                        <div class="flex">
                            <input type="text" id="investment-total-spend" class="flex-1 p-3 border rounded-l-lg" placeholder="0" required>
                            <select id="investment-currency" class="p-3 border border-l-0 rounded-r-lg bg-white">
                                <option value="USD">USD</option>
                                <option value="VND">VND</option>
                            </select>
                        </div>
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700 font-medium mb-2">Quantity</label>
                        <input type="text" id="investment-quantity" class="w-full p-3 border rounded-lg" placeholder="0" required>
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700 font-medium mb-2">Price per Coin</label>
                        <input type="text" id="investment-price-per-coin" class="w-full p-3 border rounded-lg" placeholder="0" required>
                    </div>
                    <div class="mb-6">
                        <label class="block text-gray-700 font-medium mb-2">Date & Time</label>
                        <input type="datetime-local" id="investment-datetime" class="w-full p-3 border rounded-lg" required>
                    </div>
                    <div class="flex justify-end gap-4">
                        <button type="button" onclick="hideInvestmentTransactionModal()" class="px-6 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 font-semibold">Cancel</button>
                        <button type="submit" class="px-6 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 font-semibold">Add Transaction</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Gắn event listener cho form
    const form = document.getElementById('investment-transaction-form');
    if (form) {
        form.addEventListener('submit', handleInvestmentTransactionSubmit);
    }
    
    // Gắn event listeners cho các input
    setupInvestmentFormListeners();
}

// Xử lý submit form giao dịch đầu tư
function handleInvestmentTransactionSubmit(e) {
    e.preventDefault();
    
    const formData = {
        coinId: document.getElementById('investment-coin-select').value,
        type: document.getElementById('investment-type-select').value,
        totalSpend: document.getElementById('investment-total-spend').value,
        quantity: document.getElementById('investment-quantity').value,
        pricePerCoin: document.getElementById('investment-price-per-coin').value,
        currency: document.getElementById('investment-currency').value,
        dateTime: document.getElementById('investment-datetime').value
    };
    
    if (typeof window.addInvestmentTransaction === 'function') {
        window.addInvestmentTransaction(formData);
        hideInvestmentTransactionModal();
        renderInvestmentView();
    }
}

// Ẩn modal giao dịch đầu tư
export function hideInvestmentTransactionModal() {
    const modal = document.getElementById('investment-transaction-modal');
    if (modal) {
        modal.classList.replace('flex', 'hidden');
    }
}

// Hiển thị lịch sử giao dịch của coin
export function showTransactionHistory(coinId) {
    const transactions = window.getTransactionsByCoin ? window.getTransactionsByCoin(coinId) : [];
    const coin = coinsList.find(c => c.id === coinId);
    
    const modalHTML = `
        <div id="transaction-history-modal" class="fixed inset-0 z-50 items-center justify-center flex">
            <div class="modal-backdrop fixed inset-0"></div>
            <div class="bg-white rounded-xl shadow-2xl p-8 w-full max-w-2xl z-10 m-4 max-h-[80vh] overflow-y-auto">
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-2xl font-bold">Transaction History - ${coin?.symbol || coinId}</h2>
                    <button onclick="hideTransactionHistoryModal()" class="text-gray-400 hover:text-red-500 text-2xl font-bold">&times;</button>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead class="bg-gray-50">
                            <tr>
                                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date & Time</th>
                                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cost</th>
                                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            ${transactions.length === 0 ? `
                                <tr>
                                    <td colspan="6" class="px-4 py-4 text-center text-gray-500">
                                        No transactions found
                                    </td>
                                </tr>
                            ` : transactions.map(tx => `
                                <tr>
                                    <td class="px-4 py-4 whitespace-nowrap">
                                        <span class="px-2 py-1 text-xs font-semibold rounded-full ${tx.type === 'buy' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                                            ${tx.type.toUpperCase()}
                                        </span>
                                    </td>
                                    <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">$${tx.pricePerCoin.toFixed(2)}</td>
                                    <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">${tx.quantity.toFixed(6)}</td>
                                    <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500">${new Date(tx.dateTime).toLocaleString()}</td>
                                    <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">$${tx.totalSpend.toFixed(2)}</td>
                                    <td class="px-4 py-4 whitespace-nowrap text-sm font-medium">
                                        <div class="flex space-x-2">
                                            <button onclick="editTransaction('${tx.id}')" class="text-indigo-600 hover:text-indigo-900">Edit</button>
                                            <button onclick="removeTransaction('${tx.id}')" class="text-red-600 hover:text-red-900">Remove</button>
                                        </div>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
    
    // Xóa modal cũ nếu có
    const oldModal = document.getElementById('transaction-history-modal');
    if (oldModal) {
        oldModal.remove();
    }
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// Ẩn modal lịch sử giao dịch
export function hideTransactionHistoryModal() {
    const modal = document.getElementById('transaction-history-modal');
    if (modal) {
        modal.remove();
    }
}

// Setup event listeners cho form đầu tư
function setupInvestmentFormListeners() {
    const totalSpendInput = document.getElementById('investment-total-spend');
    const quantityInput = document.getElementById('investment-quantity');
    const pricePerCoinInput = document.getElementById('investment-price-per-coin');
    
    // Auto calculate quantity when total spend and price per coin change
    if (totalSpendInput && pricePerCoinInput) {
        const calculateQuantity = () => {
            const totalSpend = parseFloat(totalSpendInput.value) || 0;
            const pricePerCoin = parseFloat(pricePerCoinInput.value) || 0;
            if (pricePerCoin > 0) {
                quantityInput.value = (totalSpend / pricePerCoin).toFixed(6);
            }
        };
        
        totalSpendInput.addEventListener('input', calculateQuantity);
        pricePerCoinInput.addEventListener('input', calculateQuantity);
    }
    
    // Auto calculate price per coin when total spend and quantity change
    if (totalSpendInput && quantityInput) {
        const calculatePrice = () => {
            const totalSpend = parseFloat(totalSpendInput.value) || 0;
            const quantity = parseFloat(quantityInput.value) || 0;
            if (quantity > 0) {
                pricePerCoinInput.value = (totalSpend / quantity).toFixed(2);
            }
        };
        
        quantityInput.addEventListener('input', calculatePrice);
    }
    
    // Set default datetime to now
    const datetimeInput = document.getElementById('investment-datetime');
    if (datetimeInput) {
        const now = new Date();
        now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
        datetimeInput.value = now.toISOString().slice(0, 16);
    }
}

// Export các hàm để sử dụng trong window
window.showAddTransactionModal = showAddTransactionModal;
window.hideInvestmentTransactionModal = hideInvestmentTransactionModal;
window.showTransactionHistory = showTransactionHistory;
window.hideTransactionHistoryModal = hideTransactionHistoryModal;

// Hàm edit transaction
export function editTransaction(transactionId) {
    const transaction = state.investmentPortfolio.transactions.find(tx => tx.id === transactionId);
    if (!transaction) return;
    
    const coin = coinsList.find(c => c.id === transaction.coinId);
    
    const modalHTML = `
        <div id="edit-transaction-modal" class="fixed inset-0 z-50 items-center justify-center flex">
            <div class="modal-backdrop fixed inset-0"></div>
            <div class="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md z-10 m-4">
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-2xl font-bold">Edit Transaction</h2>
                    <button onclick="hideEditTransactionModal()" class="text-gray-400 hover:text-red-500 text-2xl font-bold">&times;</button>
                </div>
                <form id="edit-transaction-form">
                    <input type="hidden" id="edit-transaction-id" value="${transaction.id}">
                    <div class="mb-4">
                        <label class="block text-gray-700 font-medium mb-2">Type</label>
                        <select id="edit-type-select" class="w-full p-3 border rounded-lg bg-white" required>
                            <option value="buy" ${transaction.type === 'buy' ? 'selected' : ''}>Buy</option>
                            <option value="sell" ${transaction.type === 'sell' ? 'selected' : ''}>Sell</option>
                        </select>
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700 font-medium mb-2">Select Coin</label>
                        <select id="edit-coin-select" class="w-full p-3 border rounded-lg bg-white" required>
                            ${coinsList.map(coin => `
                                <option value="${coin.id}" ${transaction.coinId === coin.id ? 'selected' : ''}>${coin.symbol} - ${coin.name}</option>
                            `).join('')}
                        </select>
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700 font-medium mb-2">Total Spend</label>
                        <div class="flex">
                            <input type="text" id="edit-total-spend" class="flex-1 p-3 border rounded-l-lg" value="${transaction.totalSpend}" required>
                            <select id="edit-currency" class="p-3 border border-l-0 rounded-r-lg bg-white">
                                <option value="USD" ${transaction.currency === 'USD' ? 'selected' : ''}>USD</option>
                                <option value="VND" ${transaction.currency === 'VND' ? 'selected' : ''}>VND</option>
                            </select>
                        </div>
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700 font-medium mb-2">Quantity</label>
                        <input type="text" id="edit-quantity" class="w-full p-3 border rounded-lg" value="${transaction.quantity}" required>
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700 font-medium mb-2">Price per Coin</label>
                        <input type="text" id="edit-price-per-coin" class="w-full p-3 border rounded-lg" value="${transaction.pricePerCoin}" required>
                    </div>
                    <div class="mb-6">
                        <label class="block text-gray-700 font-medium mb-2">Date & Time</label>
                        <input type="datetime-local" id="edit-datetime" class="w-full p-3 border rounded-lg" value="${transaction.dateTime.slice(0, 16)}" required>
                    </div>
                    <div class="flex justify-end gap-4">
                        <button type="button" onclick="hideEditTransactionModal()" class="px-6 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 font-semibold">Cancel</button>
                        <button type="submit" class="px-6 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 font-semibold">Save</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    // Xóa modal cũ nếu có
    const oldModal = document.getElementById('edit-transaction-modal');
    if (oldModal) {
        oldModal.remove();
    }
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Gắn event listener cho form
    const form = document.getElementById('edit-transaction-form');
    if (form) {
        form.addEventListener('submit', handleEditTransactionSubmit);
    }
    
    // Setup auto calculation
    setupEditFormListeners();
}

// Xử lý submit form edit transaction
function handleEditTransactionSubmit(e) {
    e.preventDefault();
    
    const transactionId = document.getElementById('edit-transaction-id').value;
    const formData = {
        coinId: document.getElementById('edit-coin-select').value,
        type: document.getElementById('edit-type-select').value,
        totalSpend: document.getElementById('edit-total-spend').value,
        quantity: document.getElementById('edit-quantity').value,
        pricePerCoin: document.getElementById('edit-price-per-coin').value,
        currency: document.getElementById('edit-currency').value,
        dateTime: document.getElementById('edit-datetime').value
    };
    
    if (typeof window.updateInvestmentTransaction === 'function') {
        window.updateInvestmentTransaction(transactionId, formData);
        hideEditTransactionModal();
        renderInvestmentView();
    }
}

// Ẩn modal edit transaction
export function hideEditTransactionModal() {
    const modal = document.getElementById('edit-transaction-modal');
    if (modal) {
        modal.remove();
    }
}

// Hàm remove transaction
export function removeTransaction(transactionId) {
    const modalHTML = `
        <div id="remove-transaction-modal" class="fixed inset-0 z-50 items-center justify-center flex">
            <div class="modal-backdrop fixed inset-0"></div>
            <div class="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md z-10 m-4">
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-2xl font-bold">Remove Transaction</h2>
                    <button onclick="hideRemoveTransactionModal()" class="text-gray-400 hover:text-red-500 text-2xl font-bold">&times;</button>
                </div>
                <div class="mb-6">
                    <p class="text-gray-700">Are you sure you want to remove this transaction? This cannot be undone.</p>
                </div>
                <div class="flex justify-end gap-4">
                    <button onclick="hideRemoveTransactionModal()" class="px-6 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 font-semibold">Cancel</button>
                    <button onclick="confirmRemoveTransaction('${transactionId}')" class="px-6 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 font-semibold">Confirm</button>
                </div>
            </div>
        </div>
    `;
    
    // Xóa modal cũ nếu có
    const oldModal = document.getElementById('remove-transaction-modal');
    if (oldModal) {
        oldModal.remove();
    }
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// Xác nhận xóa transaction
export function confirmRemoveTransaction(transactionId) {
    if (typeof window.deleteInvestmentTransaction === 'function') {
        window.deleteInvestmentTransaction(transactionId);
        hideRemoveTransactionModal();
        renderInvestmentView();
    }
}

// Ẩn modal remove transaction
export function hideRemoveTransactionModal() {
    const modal = document.getElementById('remove-transaction-modal');
    if (modal) {
        modal.remove();
    }
}

// Setup event listeners cho form edit
function setupEditFormListeners() {
    const totalSpendInput = document.getElementById('edit-total-spend');
    const quantityInput = document.getElementById('edit-quantity');
    const pricePerCoinInput = document.getElementById('edit-price-per-coin');
    
    // Auto calculate quantity when total spend and price per coin change
    if (totalSpendInput && pricePerCoinInput) {
        const calculateQuantity = () => {
            const totalSpend = parseFloat(totalSpendInput.value) || 0;
            const pricePerCoin = parseFloat(pricePerCoinInput.value) || 0;
            if (pricePerCoin > 0) {
                quantityInput.value = (totalSpend / pricePerCoin).toFixed(6);
            }
        };
        
        totalSpendInput.addEventListener('input', calculateQuantity);
        pricePerCoinInput.addEventListener('input', calculateQuantity);
    }
    
    // Auto calculate price per coin when total spend and quantity change
    if (totalSpendInput && quantityInput) {
        const calculatePrice = () => {
            const totalSpend = parseFloat(totalSpendInput.value) || 0;
            const quantity = parseFloat(quantityInput.value) || 0;
            if (quantity > 0) {
                pricePerCoinInput.value = (totalSpend / quantity).toFixed(2);
            }
        };
        
        quantityInput.addEventListener('input', calculatePrice);
    }
}

// Export thêm các hàm mới
window.editTransaction = editTransaction;
window.hideEditTransactionModal = hideEditTransactionModal;
window.removeTransaction = removeTransaction;
window.confirmRemoveTransaction = confirmRemoveTransaction;
window.hideRemoveTransactionModal = hideRemoveTransactionModal;
