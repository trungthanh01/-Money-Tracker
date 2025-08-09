// File: Front-End/src/javascript/dashboard/a-ui/render-ui.js
// Chứa tất cả các hàm chịu trách nhiệm "vẽ" dữ liệu lên giao diện.

import { getData, getJars, getTransactions, formatCurrencyWithSymbol, JAR_INFO, getSalary } from '../../store/local-storage.js';
import { updateChart } from '../f-chart/chart.js';

/**
 * Hàm tổng hợp, gọi tất cả các hàm render khác để cập nhật toàn bộ dashboard.
 */
export function updateDashboardUI() {
    const data = getData();
    const salary = getSalary();
    const jars = getJars();
    const transactions = getTransactions();
    
    updateTotalBalance(jars, salary);
    updateJarCards(jars);
    updateTransactionsList(transactions.slice(0, 5)); // Chỉ hiển thị 5 giao dịch gần nhất
    updateChart(jars);
}

/**
 * Cập nhật hiển thị tổng số dư và tổng lương.
 * @param {object} jars - Dữ liệu các hủ.
 * @param {number} salary - Lương.
 */
function updateTotalBalance(jars, salary) {
    const totalBalanceEl = document.getElementById('total-balance');
    const totalSalaryEl = document.getElementById('total-salary');
    
    const totalBalance = Object.values(jars).reduce((sum, jar) => sum + jar.balance, 0);
    
    if (totalBalanceEl) {
        totalBalanceEl.textContent = formatCurrencyWithSymbol(totalBalance);
    }
    if (totalSalaryEl) {
        totalSalaryEl.textContent = formatCurrencyWithSymbol(salary);
    }
}

/**
 * Render lại các card hủ tiền.
 * @param {object} jars - Dữ liệu các hủ.
 */
function updateJarCards(jars) {
    const container = document.getElementById('jars-container');
    if (!container) return;

    container.innerHTML = Object.keys(jars).map(key => {
        const jar = jars[key];
        const jarInfo = JAR_INFO[key];
        const jarName = window.t ? window.t(jarInfo.nameKey) : jar.name;

        return `
            <div class="jar-card" style="border-left-color: ${jarInfo.color};">
                <div class="jar-card-header">
                    <span>${jarInfo.icon} ${jarName}</span>
                    <span class="jar-card-percentage">${jar.ratio}%</span>
                </div>
                <div class="jar-card-balance">${formatCurrencyWithSymbol(jar.balance)}</div>
            </div>
        `;
    }).join('');
}

/**
 * Render lại danh sách các giao dịch gần đây.
 * @param {Array<object>} transactions - Mảng các giao dịch.
 */
function updateTransactionsList(transactions) {
    const listEl = document.getElementById('transactions-list');
    if (!listEl) return;

    if (transactions.length === 0) {
        listEl.innerHTML = `<p class="text-center text-gray-400" data-i18n="dashboard.noTransactions">${window.t ? window.t('dashboard.noTransactions') : 'Chưa có giao dịch nào.'}</p>`;
        return;
    }

    listEl.innerHTML = transactions.map(tx => {
        const jarInfo = JAR_INFO[tx.jar];
        const jarName = window.t ? window.t(jarInfo.nameKey) : tx.jar;
        const amountClass = tx.type === 'income' ? 'transaction-income' : 'transaction-expense';
        const amountPrefix = tx.type === 'income' ? '+' : '-';
        
        return `
            <div class="transaction-item ${amountClass}">
                <div class="transaction-details">
                    <div class="transaction-icon">${jarInfo.icon}</div>
                    <div>
                        <div class="transaction-description">${tx.description}</div>
                        <div class="transaction-jar">${jarName}</div>
                    </div>
                </div>
                <div class="transaction-amount">
                    ${amountPrefix}${formatCurrencyWithSymbol(tx.amount)}
                </div>
            </div>
        `;
    }).join('');
}
