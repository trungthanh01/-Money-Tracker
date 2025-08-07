// data.js
// Module quản lý dữ liệu cho Money Tracker
// Sử dụng LocalStorage để lưu trữ dữ liệu người dùng
// Định nghĩa các hàm thao tác với dữ liệu: lấy, lưu, thêm giao dịch, chỉnh sửa lương, lấy danh sách hủ và giao dịch

// Khởi tạo dữ liệu mặc định nếu chưa có trong LocalStorage
const DEFAULT_DATA = {
  salary: 0, // Lương hiện tại
  ratios: { debt: 20, expenses: 40, emergency: 10, savings: 10, investment: 10, learning: 10 }, // Tỉ lệ các hủ
  jars: { // Số dư từng hủ
    debt: 0,
    expenses: 0,
    emergency: 0,
    savings: 0,
    investment: 0,
    learning: 0
  },
  transactions: [] // Danh sách giao dịch
};

// Hàm lấy dữ liệu từ LocalStorage hoặc trả về mặc định
export function getData() {
  // Lấy chuỗi JSON từ LocalStorage
  const raw = localStorage.getItem('money-tracker-data');
  // Nếu chưa có dữ liệu, trả về bản sao DEFAULT_DATA
  if (!raw) return JSON.parse(JSON.stringify(DEFAULT_DATA));
  // Nếu có, parse và trả về object
  return JSON.parse(raw);
}

// Hàm lưu dữ liệu vào LocalStorage
export function setData(data) {
  // Chuyển object thành JSON và lưu lại
  localStorage.setItem('money-tracker-data', JSON.stringify(data));
}

// Hàm thêm giao dịch mới
export function addTransaction(type, amount, jar, desc, date) {
  // Lấy dữ liệu hiện tại
  const data = getData();
  // Tạo object giao dịch mới
  const transaction = {
    id: 'txn_' + Date.now(), // ID duy nhất dựa trên timestamp
    type, // 'income' hoặc 'expense'
    amount: Number(amount),
    jar,
    desc,
    date: date || new Date().toISOString().slice(0, 10) // yyyy-mm-dd
  };
  // Thêm vào danh sách giao dịch
  data.transactions.unshift(transaction);
  // Cập nhật số dư hủ tương ứng
  if (type === 'income') {
    data.jars[jar] += transaction.amount;
  } else if (type === 'expense') {
    data.jars[jar] -= transaction.amount;
  }
  // Lưu lại dữ liệu
  setData(data);
  return transaction;
}

// Hàm chỉnh sửa lương và tỉ lệ các hủ
export function editSalary(newSalary, newRatios) {
  const data = getData();
  data.salary = Number(newSalary);
  data.ratios = { ...newRatios };
  // Tính lại số dư các hủ dựa trên lương mới và tỉ lệ mới
  Object.keys(data.jars).forEach(jar => {
    data.jars[jar] = Math.round(data.salary * data.ratios[jar] / 100);
  });
  setData(data);
}

// Hàm lấy danh sách hủ (jars)
export function getJars() {
  return getData().jars;
}

// Hàm lấy danh sách giao dịch
export function getTransactions() {
  return getData().transactions;
}
