// js/data.js (moved to frontend/src/core/data.js)
// Module quản lý dữ liệu cho Money Tracker Web App
// Chức năng: Lưu trữ và thao tác dữ liệu sử dụng LocalStorage
// Theo phương pháp Feynman: Giải thích từng dòng code một cách đơn giản

// === CẤU TRÚC DỮ LIỆU MẶC ĐỊNH ===
const DEFAULT_DATA = {
  salary: 0,
  currency: 'VND',
  ratios: {
    debt: 20,
    expenses: 40,
    emergency: 10,
    savings: 10,
    investment: 10,
    learning: 10
  },
  jars: {
    debt: 0,
    expenses: 0,
    emergency: 0,
    savings: 0,
    investment: 0,
    learning: 0
  },
  transactions: []
};

// === CURRENCY INFORMATION ===
export const CURRENCY_INFO = {
  VND: { symbol: '₫', name: 'Vietnamese Dong', flag: '🇻🇳' },
  USD: { symbol: '$', name: 'US Dollar', flag: '🇺🇸' },
  EUR: { symbol: '€', name: 'Euro', flag: '🇪🇺' },
  GBP: { symbol: '£', name: 'British Pound', flag: '🇬🇧' },
  JPY: { symbol: '¥', name: 'Japanese Yen', flag: '🇯🇵' },
  CNY: { symbol: '¥', name: 'Chinese Yuan', flag: '🇨🇳' },
  KRW: { symbol: '₩', name: 'Korean Won', flag: '🇰🇷' },
  INR: { symbol: '₹', name: 'Indian Rupee', flag: '🇮🇳' },
  AUD: { symbol: 'A$', name: 'Australian Dollar', flag: '🇦🇺' },
  CAD: { symbol: 'C$', name: 'Canadian Dollar', flag: '🇨🇦' }
};

// === THÔNG TIN HIỂN THỊ CỦA CÁC HỦ ===
export const JAR_INFO = {
  debt: { name: 'Nợ', color: '#ef4444', description: 'Tiền nợ của bạn' },
  expenses: { name: 'Chi tiêu', color: '#3b82f6', description: 'Các khoản chi tiêu hàng ngày, ăn uống, đi lại, hóa đơn...' },
  emergency: { name: 'Khẩn cấp', color: '#f59e0b', description: 'Quỹ dự phòng cho các trường hợp khẩn cấp (ốm đau, mất việc...)' },
  savings: { name: 'Tiết kiệm', color: '#10b981', description: 'Dành cho các mục tiêu lớn (du lịch, mua sắm, xe cộ...)' },
  investment: { name: 'Đầu tư', color: '#8b5cf6', description: 'Gia tăng tài sản qua các kênh đầu tư (chứng khoán, crypto...)' },
  learning: { name: 'Học tập', color: '#f97316', description: 'Đầu tư cho kiến thức và phát triển bản thân.' }
};

// === CORE DATA FUNCTIONS ===
export function getData() {
  try {
    const rawData = localStorage.getItem('money-tracker-data');
    if (!rawData) return JSON.parse(JSON.stringify(DEFAULT_DATA));
    return JSON.parse(rawData);
  } catch (error) {
    console.error('Error loading data from localStorage:', error);
    return JSON.parse(JSON.stringify(DEFAULT_DATA));
  }
}

export function setData(data) {
  try {
    localStorage.setItem('money-tracker-data', JSON.stringify(data));
  } catch (error) {
    console.error('Error saving data to localStorage:', error);
  }
}

export function addTransaction(type, amount, jar, desc, date) {
  const data = getData();
  const numAmount = Number(amount);
  if (numAmount <= 0) throw new Error('Số tiền phải lớn hơn 0');
  if (!JAR_INFO[jar]) throw new Error('Hủ không hợp lệ');
  if (type === 'expense' && numAmount > data.jars[jar]) {
    throw new Error('Số dư hủ không đủ');
  }
  const transaction = {
    id: 'txn_' + Date.now(),
    type,
    amount: numAmount,
    jar,
    desc,
    date: date || new Date().toISOString().slice(0, 10)
  };
  data.transactions.unshift(transaction);
  if (type === 'income') data.jars[jar] += numAmount; else if (type === 'expense') data.jars[jar] -= numAmount;
  setData(data);
  return transaction;
}

export function editSalary(newSalary, newRatios) {
  const data = getData();
  const totalRatio = Object.values(newRatios).reduce((s, r) => s + Number(r), 0);
  if (totalRatio !== 100) throw new Error('Tổng tỉ lệ các hủ phải bằng 100%');
  data.salary = Number(newSalary);
  data.ratios = { ...newRatios };
  Object.keys(data.jars).forEach(jarName => {
    data.jars[jarName] = Math.round(data.salary * data.ratios[jarName] / 100);
  });
  setData(data);
}

export function getJars() { return getData().jars; }
export function getTransactions(limit = null) {
  const tx = getData().transactions;
  return limit ? tx.slice(0, limit) : tx;
}
export function getTotalBalance() { return Object.values(getJars()).reduce((t, b) => t + b, 0); }
export function getSalary() { return getData().salary; }
export function getRatios() { return getData().ratios; }

export function formatCurrency(amount) { return amount.toLocaleString('vi-VN') + ' ₫'; }
export function clearAllData() { localStorage.removeItem('money-tracker-data'); }
export function exportData() { return JSON.stringify(getData(), null, 2); }
export function importData(jsonString) {
  try {
    const data = JSON.parse(jsonString);
    if (!data.jars || !data.transactions || typeof data.salary !== 'number') throw new Error('Cấu trúc dữ liệu không hợp lệ');
    setData(data);
  } catch (e) {
    console.error('Error importing data:', e);
    throw new Error('File dữ liệu không hợp lệ');
  }
}

// === CURRENCY FUNCTIONS ===
export function getCurrency() { return getData().currency || 'VND'; }
export function setCurrency(currencyCode) {
  if (!CURRENCY_INFO[currencyCode]) throw new Error('Đơn vị tiền tệ không hợp lệ');
  const data = getData();
  data.currency = currencyCode;
  setData(data);
}
export function formatCurrencyWithSymbol(amount) {
  const currency = getCurrency();
  const currencyInfo = CURRENCY_INFO[currency];
  if (!currencyInfo) return formatCurrency(amount);
  const formattedNumber = Math.abs(amount).toLocaleString();
  return currency === 'VND' ? `${formattedNumber} ${currencyInfo.symbol}` : `${currencyInfo.symbol}${formattedNumber}`;
}


