// File: Front-End/src/javascript/store/local-storage.js
// Đây là module lõi, chịu trách nhiệm quản lý tất cả dữ liệu của ứng dụng
// trong LocalStorage. Nó là "single source of truth".

// --- 1. CÁC HẰNG SỐ VÀ DỮ LIỆU MẶC ĐỊNH ---

const DB_KEY = 'moneyTrackerData';

// Cấu trúc dữ liệu mặc định khi người dùng sử dụng lần đầu
export const DEFAULT_DATA = {
    salary: 0,
    currency: 'VND',
    jars: {
        debt:       { name: "Trả Nợ",       balance: 0, ratio: 20 },
        expenses:   { name: "Chi Tiêu",     balance: 0, ratio: 40 },
        emergency:  { name: "Khẩn Cấp",     balance: 0, ratio: 10 },
        savings:    { name: "Tiết Kiệm",    balance: 0, ratio: 10 },
        investment: { name: "Đầu Tư",      balance: 0, ratio: 10 },
        learning:   { name: "Học Tập",      balance: 0, ratio: 10 },
    },
    transactions: [] // { id, type, amount, description, jar, date }
};

// Thông tin về các loại hủ để dễ dàng truy xuất
export const JAR_INFO = {
    debt:       { nameKey: "jars.debt.name",       color: "var(--color-jar-debt)",       icon: "💳" },
    expenses:   { nameKey: "jars.expenses.name",   color: "var(--color-jar-expenses)",   icon: "🛒" },
    emergency:  { nameKey: "jars.emergency.name",  color: "var(--color-jar-emergency)",  icon: "🚑" },
    savings:    { nameKey: "jars.savings.name",    color: "var(--color-jar-savings)",    icon: "💰" },
    investment: { nameKey: "jars.investment.name", color: "var(--color-jar-investment)", icon: "📈" },
    learning:   { nameKey: "jars.learning.name",   color: "var(--color-jar-learning)",   icon: "📚" }
};

// Thông tin về các đơn vị tiền tệ được hỗ trợ
export const CURRENCY_INFO = {
    VND: { symbol: '₫',  decimal: 0, position: 'after' },
    USD: { symbol: '$',  decimal: 2, position: 'before' },
    EUR: { symbol: '€',  decimal: 2, position: 'before' },
    GBP: { symbol: '£',  decimal: 2, position: 'before' },
    JPY: { symbol: '¥',  decimal: 0, position: 'before' },
    CNY: { symbol: '¥',  decimal: 2, position: 'before' },
    KRW: { symbol: '₩',  decimal: 0, position: 'before' },
    INR: { symbol: '₹',  decimal: 2, position: 'before' },
    AUD: { symbol: 'A$', decimal: 2, position: 'before' },
    CAD: { symbol: 'C$', decimal: 2, position: 'before' }
};


// --- 2. CÁC HÀM TRUY XUẤT VÀ LƯU TRỮ DỮ LIỆU ---

/**
 * Lấy toàn bộ dữ liệu từ LocalStorage.
 * Nếu không có dữ liệu, khởi tạo với giá trị mặc định.
 * @returns {object} Toàn bộ dữ liệu của ứng dụng.
 */
export function getData() {
    const data = localStorage.getItem(DB_KEY);
    return data ? JSON.parse(data) : { ...DEFAULT_DATA };
}

/**
 * Lưu toàn bộ dữ liệu vào LocalStorage.
 * @param {object} data - Dữ liệu mới cần lưu.
 */
export function setData(data) {
    try {
        localStorage.setItem(DB_KEY, JSON.stringify(data));
    } catch (error) {
        console.error("Error saving to localStorage:", error);
        // Trong tương lai có thể thêm thông báo cho người dùng
    }
}


// --- 3. CÁC HÀM TIỆN ÍCH (GETTERS) ---

export const getJars = () => getData().jars;
export const getSalary = () => getData().salary;
export const getTransactions = () => getData().transactions;
export const getCurrency = () => getData().currency;
export const getRatios = () => {
    const jars = getJars();
    return Object.keys(jars).reduce((acc, key) => {
        acc[key] = jars[key].ratio;
        return acc;
    }, {});
};


// --- 4. CÁC HÀM THAY ĐỔI DỮ LIỆU (SETTERS/MODIFIERS) ---

/**
 * Thêm một giao dịch mới và cập nhật số dư các hủ.
 * @param {'income' | 'expense'} type - Loại giao dịch.
 * @param {number} amount - Số tiền.
 * @param {string} description - Mô tả.
 * @param {string} jarKey - Key của hủ (ví dụ: 'expenses').
 */
export function addTransaction(type, amount, description, jarKey) {
    const data = getData();
    const newTransaction = {
        id: `txn_${new Date().getTime()}`,
        type,
        amount,
        description,
        jar: jarKey,
        date: new Date().toISOString()
    };
    
    // Thêm giao dịch vào đầu danh sách
    data.transactions.unshift(newTransaction);
    
    // Cập nhật số dư của hủ tương ứng
    if (type === 'income') {
        data.jars[jarKey].balance += amount;
    } else {
        data.jars[jarKey].balance -= amount;
    }
    
    setData(data);
}

/**
 * Cập nhật lương và tỉ lệ, sau đó phân bổ lại tiền vào các hủ.
 * @param {number} newSalary - Mức lương mới.
 * @param {object} newRatios - Object chứa các tỉ lệ mới (vd: { debt: 20, ... }).
 */
export function editSalary(newSalary, newRatios) {
    const data = getData();
    data.salary = newSalary;
    
    let totalBalance = 0;
    Object.keys(data.jars).forEach(key => {
        const newRatio = newRatios[key] || 0;
        data.jars[key].ratio = newRatio;
        const newBalance = Math.round(newSalary * (newRatio / 100));
        data.jars[key].balance = newBalance;
        totalBalance += newBalance;
    });

    // Xử lý làm tròn: cộng phần chênh lệch vào hủ có tỉ lệ lớn nhất
    const roundingDifference = newSalary - totalBalance;
    if (roundingDifference !== 0) {
        const largestJar = Object.keys(data.jars).reduce((a, b) => data.jars[a].ratio > data.jars[b].ratio ? a : b);
        data.jars[largestJar].balance += roundingDifference;
    }
    
    setData(data);
}

/**
 * Cập nhật đơn vị tiền tệ.
 * @param {string} currencyCode - Mã tiền tệ (VND, USD,...).
 */
export function setCurrency(currencyCode) {
    const data = getData();
    if (CURRENCY_INFO[currencyCode]) {
        data.currency = currencyCode;
        setData(data);
    }
}

/**
 * Xóa toàn bộ dữ liệu và quay về trạng thái mặc định.
 */
export function clearAllData() {
    setData({ ...DEFAULT_DATA });
}

/**
 * Xuất dữ liệu hiện tại ra một object.
 * @returns {object} Dữ liệu ứng dụng.
 */
export function exportData() {
    return getData();
}

/**
 * Nhập dữ liệu từ một object và ghi đè lên dữ liệu hiện tại.
 * @param {object} importedData - Dữ liệu cần nhập.
 * @returns {boolean} - Trả về true nếu import thành công, ngược lại là false.
 */
export function importData(importedData) {
    // Thêm một bước kiểm tra cấu trúc đơn giản
    if (importedData && importedData.salary !== undefined && importedData.jars) {
        setData(importedData);
        return true;
    }
    return false;
}


// --- 5. HÀM ĐỊNH DẠNG ---

/**
 * Định dạng một số thành chuỗi tiền tệ theo đơn vị hiện tại.
 * @param {number} amount - Số tiền cần định dạng.
 * @returns {string} Chuỗi tiền tệ đã định dạng (ví dụ: "1.500.000 ₫" hoặc "$1,500.00").
 */
export function formatCurrencyWithSymbol(amount) {
    const currencyCode = getCurrency();
    const { symbol, decimal, position } = CURRENCY_INFO[currencyCode] || CURRENCY_INFO.VND;

    // Sử dụng Intl.NumberFormat để định dạng số cho đúng chuẩn
    const formattedAmount = new Intl.NumberFormat('vi-VN', {
        minimumFractionDigits: decimal,
        maximumFractionDigits: decimal,
    }).format(amount);
    
    return position === 'before'
        ? `${symbol}${formattedAmount}`
        : `${formattedAmount} ${symbol}`;
}
    