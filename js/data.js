// js/data.js
// Module quản lý dữ liệu cho Money Tracker Web App
// Chức năng: Lưu trữ và thao tác dữ liệu sử dụng LocalStorage
// Theo phương pháp Feynman: Giải thích từng dòng code một cách đơn giản

// === CẤU TRÚC DỮ LIỆU MẶC ĐỊNH ===
// Định nghĩa cấu trúc dữ liệu ban đầu khi app chưa có data
const DEFAULT_DATA = {
  // Lương hiện tại của user (VND)
  salary: 0,
  
  // Tỉ lệ phần trăm cho từng hủ (tổng phải = 100%)
  ratios: {
    debt: 20,        // Hủ nợ: 20% lương
    expenses: 40,    // Hủ chi tiêu: 40% lương  
    emergency: 10,   // Hủ khẩn cấp: 10% lương
    savings: 10,     // Hủ tiết kiệm: 10% lương
    investment: 10,  // Hủ đầu tư: 10% lương
    learning: 10     // Hủ học tập: 10% lương
  },
  
  // Số dư hiện tại trong từng hủ (VND)
  jars: {
    debt: 0,
    expenses: 0,
    emergency: 0,
    savings: 0,
    investment: 0,
    learning: 0
  },
  
  // Danh sách tất cả giao dịch (mảng các object)
  transactions: []
};

// === THÔNG TIN HIỂN THỊ CỦA CÁC HỦ ===
// Object chứa tên hiển thị, màu sắc, mô tả cho từng hủ
export const JAR_INFO = {
  debt: {
    name: 'Nợ',
    color: '#ef4444',
    description: 'Tiền chi tiêu hàng ngày (ăn uống, đi lại, hóa đơn...)'
  },
  expenses: {
    name: 'Chi tiêu', 
    color: '#3b82f6',
    description: 'Quỹ dự phòng cho các trường hợp bất ngờ, mục tiêu 6 tháng chi tiêu.'
  },
  emergency: {
    name: 'Khẩn cấp',
    color: '#f59e0b', 
    description: 'Quỹ dự phòng cho các trường hợp khẩn cấp (ốm đau, mất việc...)'
  },
  savings: {
    name: 'Tiết kiệm',
    color: '#10b981',
    description: 'Dành cho các mục tiêu lớn (du lịch, mua sắm, xe cộ...)'
  },
  investment: {
    name: 'Đầu tư',
    color: '#8b5cf6',
    description: 'Gia tăng tài sản qua các kênh đầu tư (chứng khoán, crypto...)'
  },
  learning: {
    name: 'Học tập',
    color: '#f97316',
    description: 'Đầu tư cho kiến thức và phát triển bản thân.'
  }
};

// === FUNCTIONS QUẢN LÝ DỮ LIỆU ===

/**
 * Hàm lấy dữ liệu từ LocalStorage
 * Nếu chưa có dữ liệu, trả về bản sao của DEFAULT_DATA
 * @returns {Object} Dữ liệu ứng dụng
 */
export function getData() {
  try {
    // Lấy chuỗi JSON từ LocalStorage với key 'money-tracker-data'
    const rawData = localStorage.getItem('money-tracker-data');
    
    // Nếu không có dữ liệu, trả về DEFAULT_DATA
    if (!rawData) {
      return JSON.parse(JSON.stringify(DEFAULT_DATA)); // Deep copy để tránh reference
    }
    
    // Parse chuỗi JSON thành object và trả về
    return JSON.parse(rawData);
    
  } catch (error) {
    // Nếu có lỗi khi parse JSON, log lỗi và trả về DEFAULT_DATA
    console.error('Error loading data from localStorage:', error);
    return JSON.parse(JSON.stringify(DEFAULT_DATA));
  }
}

/**
 * Hàm lưu dữ liệu vào LocalStorage  
 * @param {Object} data - Dữ liệu cần lưu
 */
export function setData(data) {
  try {
    // Chuyển object thành chuỗi JSON và lưu vào LocalStorage
    localStorage.setItem('money-tracker-data', JSON.stringify(data));
  } catch (error) {
    // Nếu có lỗi khi lưu (ví dụ: storage đầy), log lỗi
    console.error('Error saving data to localStorage:', error);
    alert('Không thể lưu dữ liệu. Vui lòng kiểm tra dung lượng trình duyệt.');
  }
}

/**
 * Hàm thêm giao dịch mới (thu nhập hoặc chi tiêu)
 * @param {string} type - Loại giao dịch: 'income' hoặc 'expense' 
 * @param {number} amount - Số tiền giao dịch
 * @param {string} jar - Tên hủ (debt, expenses, emergency, etc.)
 * @param {string} desc - Mô tả giao dịch
 * @param {string} date - Ngày giao dịch (optional, mặc định là hôm nay)
 * @returns {Object} Giao dịch vừa tạo
 */
export function addTransaction(type, amount, jar, desc, date) {
  // Lấy dữ liệu hiện tại từ LocalStorage
  const data = getData();
  
  // Chuyển amount thành số để tránh lỗi tính toán
  const numAmount = Number(amount);
  
  // Validate đầu vào
  if (numAmount <= 0) {
    throw new Error('Số tiền phải lớn hơn 0');
  }
  
  if (!JAR_INFO[jar]) {
    throw new Error('Hủ không hợp lệ');
  }
  
  // Tạo object giao dịch mới
  const transaction = {
    id: 'txn_' + Date.now(), // ID duy nhất dựa trên timestamp
    type: type,              // 'income' hoặc 'expense'
    amount: numAmount,       // Số tiền
    jar: jar,               // Hủ được chọn
    desc: desc,             // Mô tả
    date: date || new Date().toISOString().slice(0, 10) // Format: yyyy-mm-dd
  };
  
  // Thêm giao dịch vào đầu mảng (giao dịch mới nhất lên trước)
  data.transactions.unshift(transaction);
  
  // Cập nhật số dư hủ tương ứng
  if (type === 'income') {
    // Thu nhập: cộng tiền vào hủ
    data.jars[jar] += numAmount;
  } else if (type === 'expense') {
    // Chi tiêu: trừ tiền khỏi hủ
    data.jars[jar] -= numAmount;
  }
  
  // Lưu dữ liệu đã cập nhật vào LocalStorage
  setData(data);
  
  // Trả về giao dịch vừa tạo
  return transaction;
}

/**
 * Hàm chỉnh sửa lương và tỉ lệ các hủ
 * @param {number} newSalary - Lương mới
 * @param {Object} newRatios - Object chứa tỉ lệ mới cho các hủ
 */
export function editSalary(newSalary, newRatios) {
  // Lấy dữ liệu hiện tại
  const data = getData();
  
  // Validate tổng tỉ lệ phải = 100%
  const totalRatio = Object.values(newRatios).reduce((sum, ratio) => sum + Number(ratio), 0);
  if (totalRatio !== 100) {
    throw new Error('Tổng tỉ lệ các hủ phải bằng 100%');
  }
  
  // Cập nhật lương và tỉ lệ mới
  data.salary = Number(newSalary);
  data.ratios = { ...newRatios }; // Sao chép object ratios
  
  // Tính lại số dư các hủ dựa trên lương và tỉ lệ mới
  Object.keys(data.jars).forEach(jarName => {
    // Công thức: số dư = lương * tỉ lệ / 100
    data.jars[jarName] = Math.round(data.salary * data.ratios[jarName] / 100);
  });
  
  // Lưu dữ liệu đã cập nhật
  setData(data);
}

/**
 * Hàm lấy thông tin tất cả các hủ
 * @returns {Object} Object chứa số dư các hủ
 */
export function getJars() {
  return getData().jars;
}

/**
 * Hàm lấy danh sách giao dịch
 * @param {number} limit - Số lượng giao dịch tối đa (optional)
 * @returns {Array} Mảng các giao dịch
 */
export function getTransactions(limit = null) {
  const transactions = getData().transactions;
  
  // Nếu có limit, chỉ trả về số lượng giao dịch theo limit
  if (limit) {
    return transactions.slice(0, limit);
  }
  
  // Nếu không có limit, trả về tất cả
  return transactions;
}

/**
 * Hàm tính tổng số dư tất cả các hủ
 * @returns {number} Tổng số dư
 */
export function getTotalBalance() {
  const jars = getJars();
  
  // Dùng Object.values để lấy tất cả giá trị số dư, sau đó cộng lại
  return Object.values(jars).reduce((total, balance) => total + balance, 0);
}

/**
 * Hàm lấy lương hiện tại
 * @returns {number} Lương
 */
export function getSalary() {
  return getData().salary;
}

/**
 * Hàm lấy tỉ lệ hiện tại của các hủ
 * @returns {Object} Object chứa tỉ lệ các hủ
 */
export function getRatios() {
  return getData().ratios;
}

/**
 * Hàm format số tiền theo định dạng Việt Nam
 * @param {number} amount - Số tiền cần format
 * @returns {string} Chuỗi số tiền đã format (ví dụ: "1.500.000 ₫")
 */
export function formatCurrency(amount) {
  // Sử dụng toLocaleString với locale 'vi-VN' để format theo chuẩn Việt Nam
  return amount.toLocaleString('vi-VN') + ' ₫';
}

/**
 * Hàm xóa tất cả dữ liệu (reset app)
 */
export function clearAllData() {
  localStorage.removeItem('money-tracker-data');
}

/**
 * Hàm export dữ liệu thành file JSON
 * @returns {string} Chuỗi JSON chứa tất cả dữ liệu
 */
export function exportData() {
  const data = getData();
  return JSON.stringify(data, null, 2); // Format đẹp với indent
}

/**
 * Hàm import dữ liệu từ file JSON
 * @param {string} jsonString - Chuỗi JSON cần import
 */
export function importData(jsonString) {
  try {
    // Parse chuỗi JSON thành object
    const data = JSON.parse(jsonString);
    
    // Validate cấu trúc dữ liệu cơ bản
    if (!data.jars || !data.transactions || typeof data.salary !== 'number') {
      throw new Error('Cấu trúc dữ liệu không hợp lệ');
    }
    
    // Lưu dữ liệu đã import
    setData(data);
    
  } catch (error) {
    console.error('Error importing data:', error);
    throw new Error('File dữ liệu không hợp lệ');
  }
}
