// =================================================================
// PHẦN 2: PROCESS - Xử lý Logic
// =================================================================
// Phần này là "bộ não" tính toán. Các hàm ở đây nhận đầu vào,
// xử lý dữ liệu, và cập nhật lại biến 'state'.
// Chúng không trực tiếp thay đổi giao diện HTML.

// Nhập dữ liệu cấu hình và state
import { jarsConfig, state, updateState, coinsList } from './data.js';
import { renderOutput, hideModal } from './output.js';

// Export các hàm để các module khác có thể dùng
// Hàm xử lý khi người dùng nhấn nút Lưu giao dịch
// Tính tổng lương còn lại (tổng lương - income - expense)
export function calculateSalaryLeft() {
    const totalSalary = calculateTotalSalary();
    const totalIncome = state.transactions.filter(tx => tx.type === 'income').reduce((sum, tx) => sum + tx.amount, 0);
    const totalExpense = state.transactions.filter(tx => tx.type === 'expense').reduce((sum, tx) => sum + tx.amount, 0);
    return totalSalary - totalIncome - totalExpense;
}
window.calculateSalaryLeft = calculateSalaryLeft;

// Hàm chỉnh sửa tổng lương
export function editTotalSalary(newSalary) {
    // Xóa toàn bộ transaction type income/expense
    state.transactions = state.transactions.filter(tx => tx.type !== 'income' && tx.type !== 'expense');
    // Xóa số dư các hũ
    Object.keys(state.jars).forEach(id => { state.jars[id].balance = 0; });
    // Cập nhật transaction salary (chỉ giữ 1 transaction salary mới nhất)
    state.transactions = state.transactions.filter(tx => tx.type !== 'salary');
    state.transactions.unshift({
        id: Date.now().toString(),
        type: 'salary',
        amount: newSalary,
        description: 'Lương tháng',
        jarId: '',
        createdAt: new Date().toISOString()
    });
    calculateTotalBalance();
    saveStateToLocalStorage();
    renderOutput();
}
window.editTotalSalary = editTotalSalary;

// Sửa handleTransactionSubmit để trừ vào tổng lương còn lại khi income/expense
export function handleTransactionSubmit(e) {
    e.preventDefault();
    const type = document.getElementById('transaction-type').value;
    let amount = document.getElementById('transaction-amount').value;
    amount = parseFloat(amount.replace(/[^\d]/g, ''));
    const description = document.getElementById('transaction-description').value;
    const jarId = document.getElementById('transaction-jar').value;
    if (type === 'salary') {
        if (isNaN(amount) || amount <= 0 || !description) {
            console.error("Dữ liệu lương không hợp lệ");
            return;
        }
        const newTransaction = {
            id: Date.now().toString(),
            type,
            amount,
            description,
            jarId: '',
            createdAt: new Date().toISOString()
        };
        state.transactions = state.transactions.filter(tx => tx.type !== 'salary');
        state.transactions.unshift(newTransaction);
        saveStateToLocalStorage();
        renderOutput();
        hideModal('transaction-modal');
        document.getElementById('transaction-form').reset();
        return;
    }
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
    // Đảm bảo hũ đã tồn tại
    if (!state.jars[jarId]) state.jars[jarId] = { balance: 0 };
    state.jars[jarId].balance += (type === 'income' ? amount : -amount);
    // Tạo object giao dịch mới
    const newTransaction = {
        id: Date.now().toString(),
        type,
        amount,
        description,
        jarId,
        createdAt: new Date().toISOString()
    };
    // Thêm giao dịch mới vào đầu danh sách
    state.transactions.unshift(newTransaction);
    calculateTotalBalance();
    saveStateToLocalStorage();
    renderOutput();
    hideModal('transaction-modal');
    document.getElementById('transaction-form').reset();
}


// Tính tổng số dư của tất cả các hũ
export function calculateTotalBalance() {
    // Lặp qua toàn bộ các hũ, cộng dồn số dư
    state.totalBalance = Object.values(state.jars).reduce((sum, jar) => sum + (jar.balance || 0), 0);
}

// Tính tổng lương đã nhập
export function calculateTotalSalary() {
    return state.transactions.filter(tx => tx.type === 'salary').reduce((sum, tx) => sum + tx.amount, 0);
}
window.calculateTotalSalary = calculateTotalSalary;

// Ghi toàn bộ trạng thái hiện tại vào LocalStorage
export function saveStateToLocalStorage() {
    calculateTotalBalance(); // Đảm bảo totalBalance được cập nhật đúng trước khi lưu
    localStorage.setItem('financeAppData', JSON.stringify(state)); // Ghi state dưới dạng chuỗi JSON
}

// Tải dữ liệu đã lưu khi người dùng mở lại trang
export function loadStateFromLocalStorage() {
    const savedData = localStorage.getItem('financeAppData');
    if (savedData) {
        updateState(JSON.parse(savedData));
        // Đảm bảo tất cả các hũ đều có trong state.jars
        Object.keys(jarsConfig).forEach(id => {
            if (!state.jars[id]) state.jars[id] = { balance: 0 };
        });
    } else {
        Object.keys(jarsConfig).forEach(id => {
            state.jars[id] = { balance: 0 };
        });
    }
}

// Thêm sau renderChart()
function renderTransactionList() {
    const container = document.getElementById('transaction-list');
    if (!container) return;
    container.innerHTML = '';
    state.transactions.forEach(tx => {
        const div = document.createElement('div');
        div.className = 'transaction-item flex justify-between items-center p-2 border-b';
        div.innerHTML = `
            <div>
                <span class="font-bold">${jarsConfig[tx.jarId]?.name || tx.jarId}</span>:
                <span>${tx.type === 'income' ? '+' : '-'}${formatCurrency(tx.amount)}</span>
                <span class="text-xs text-gray-500">(${tx.description})</span>
            </div>
            <button class="delete-transaction-btn text-red-500" data-id="${tx.id}">Xóa</button>
        `;
        container.appendChild(div);
    });
    // Gắn event xóa
    container.querySelectorAll('.delete-transaction-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.dataset.id;
            window.deleteTransaction(id);
        });
    });
}

export function deleteTransaction(id) {
    const txIndex = state.transactions.findIndex(tx => tx.id === id);
    if (txIndex === -1) return;
    const tx = state.transactions[txIndex];
    // Hoàn lại số dư cho hũ
    if (state.jars[tx.jarId]) {
        state.jars[tx.jarId].balance += (tx.type === 'income' ? -tx.amount : tx.amount);
    }
    state.transactions.splice(txIndex, 1);
    calculateTotalBalance();
    saveStateToLocalStorage();
    renderOutput();
}

window.deleteTransaction = deleteTransaction;

// =================================================================
// PHẦN XỬ LÝ ĐẦU TƯ
// =================================================================

// Hàm thêm giao dịch đầu tư mới
export function addInvestmentTransaction(transactionData) {
    const {
        coinId,
        type, // 'buy' hoặc 'sell'
        totalSpend,
        quantity,
        pricePerCoin,
        currency,
        dateTime
    } = transactionData;

    const newTransaction = {
        id: Date.now().toString(),
        coinId,
        type,
        totalSpend: parseFloat(totalSpend),
        quantity: parseFloat(quantity),
        pricePerCoin: parseFloat(pricePerCoin),
        currency,
        dateTime: new Date(dateTime).toISOString(),
        createdAt: new Date().toISOString()
    };

    state.investmentPortfolio.transactions.push(newTransaction);
    updatePortfolioHoldings();
    calculatePortfolioValue();
    saveStateToLocalStorage();
}

// Cập nhật số lượng coin đang nắm giữ
export function updatePortfolioHoldings() {
    // Đảm bảo state.investmentPortfolio tồn tại
    if (!state.investmentPortfolio) {
        state.investmentPortfolio = {
            transactions: [],
            holdings: {},
            totalValue: 0,
            totalPnL: 0,
            currency: 'USD'
        };
    }
    
    const holdings = {};
    
    state.investmentPortfolio.transactions.forEach(tx => {
        if (!holdings[tx.coinId]) {
            holdings[tx.coinId] = {
                totalQuantity: 0,
                totalCost: 0,
                averagePrice: 0
            };
        }
        
        if (tx.type === 'buy') {
            holdings[tx.coinId].totalQuantity += tx.quantity;
            holdings[tx.coinId].totalCost += tx.totalSpend;
        } else if (tx.type === 'sell') {
            holdings[tx.coinId].totalQuantity -= tx.quantity;
            holdings[tx.coinId].totalCost -= tx.totalSpend;
        }
        
        // Tính giá trung bình
        if (holdings[tx.coinId].totalQuantity > 0) {
            holdings[tx.coinId].averagePrice = holdings[tx.coinId].totalCost / holdings[tx.coinId].totalQuantity;
        } else {
            holdings[tx.coinId].averagePrice = 0;
        }
    });
    
    // Xóa các coin có số lượng = 0
    Object.keys(holdings).forEach(coinId => {
        if (holdings[coinId].totalQuantity <= 0) {
            delete holdings[coinId];
        }
    });
    
    state.investmentPortfolio.holdings = holdings;
}

// Tính tổng giá trị portfolio (giả lập giá hiện tại)
export function calculatePortfolioValue() {
    // Đảm bảo state.investmentPortfolio tồn tại
    if (!state.investmentPortfolio) {
        state.investmentPortfolio = {
            transactions: [],
            holdings: {},
            totalValue: 0,
            totalPnL: 0,
            currency: 'USD'
        };
    }
    
    let totalValue = 0;
    let totalPnL = 0;
    
    Object.keys(state.investmentPortfolio.holdings).forEach(coinId => {
        const holding = state.investmentPortfolio.holdings[coinId];
        const coin = coinsList.find(c => c.id === coinId);
        
        if (coin) {
            // Giả lập giá hiện tại (trong thực tế sẽ lấy từ API)
            const currentPrice = holding.averagePrice * (0.8 + Math.random() * 0.4); // ±20% từ giá trung bình
            const currentValue = holding.totalQuantity * currentPrice;
            const pnl = currentValue - holding.totalCost;
            
            totalValue += currentValue;
            totalPnL += pnl;
            
            // Cập nhật thông tin holding
            holding.currentPrice = currentPrice;
            holding.currentValue = currentValue;
            holding.pnl = pnl;
            holding.pnlPercentage = (pnl / holding.totalCost) * 100;
        }
    });
    
    state.investmentPortfolio.totalValue = totalValue;
    state.investmentPortfolio.totalPnL = totalPnL;
}

// Xóa giao dịch đầu tư
export function deleteInvestmentTransaction(transactionId) {
    const index = state.investmentPortfolio.transactions.findIndex(tx => tx.id === transactionId);
    if (index !== -1) {
        state.investmentPortfolio.transactions.splice(index, 1);
        updatePortfolioHoldings();
        calculatePortfolioValue();
        saveStateToLocalStorage();
    }
}

// Cập nhật giao dịch đầu tư
export function updateInvestmentTransaction(transactionId, updatedData) {
    const index = state.investmentPortfolio.transactions.findIndex(tx => tx.id === transactionId);
    if (index !== -1) {
        state.investmentPortfolio.transactions[index] = {
            ...state.investmentPortfolio.transactions[index],
            ...updatedData,
            totalSpend: parseFloat(updatedData.totalSpend),
            quantity: parseFloat(updatedData.quantity),
            pricePerCoin: parseFloat(updatedData.pricePerCoin),
            dateTime: new Date(updatedData.dateTime).toISOString()
        };
        
        updatePortfolioHoldings();
        calculatePortfolioValue();
        saveStateToLocalStorage();
    }
}

// Lấy danh sách giao dịch theo coin
export function getTransactionsByCoin(coinId) {
    return state.investmentPortfolio.transactions
        .filter(tx => tx.coinId === coinId)
        .sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));
}

// Tính toán thống kê 24h (giả lập)
export function calculate24hChange() {
    // Giả lập thay đổi 24h từ -10% đến +10%
    const change = (Math.random() - 0.5) * 0.2;
    const changeValue = state.investmentPortfolio.totalValue * change;
    return {
        percentage: change * 100,
        value: changeValue
    };
}

// Export các hàm để sử dụng trong window
window.addInvestmentTransaction = addInvestmentTransaction;
window.deleteInvestmentTransaction = deleteInvestmentTransaction;
window.updateInvestmentTransaction = updateInvestmentTransaction;
window.getTransactionsByCoin = getTransactionsByCoin;
window.calculate24hChange = calculate24hChange;
window.updatePortfolioHoldings = updatePortfolioHoldings;
window.calculatePortfolioValue = calculatePortfolioValue;

