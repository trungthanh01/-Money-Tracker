// input.js
// Module xử lý nhập liệu cho Money Tracker
// Ở bản demo CLI, sử dụng prompt để nhập lương, giao dịch, tỉ lệ các hủ
// Khi chuyển sang UI sẽ thay thế bằng form

import { editSalary, addTransaction } from './data.js';

// Hàm nhập lương và tỉ lệ các hủ
export function inputSalary() {
  // Yêu cầu nhập lương
  const salary = prompt('Nhập lương tháng của bạn (VND):');
  // Yêu cầu nhập tỉ lệ các hủ, mặc định 20-40-10-10-10-10
  const ratiosStr = prompt('Nhập tỉ lệ các hủ (nợ, chi tiêu, khẩn cấp, tiết kiệm, đầu tư, học tập) cách nhau bởi dấu phẩy, tổng 100% (ví dụ: 20,40,10,10,10,10):');
  const ratiosArr = ratiosStr.split(',').map(Number);
  const jars = ['debt', 'expenses', 'emergency', 'savings', 'investment', 'learning'];
  const ratios = {};
  jars.forEach((jar, i) => { ratios[jar] = ratiosArr[i] || 0; });
  // Gọi hàm cập nhật lương và tỉ lệ
  editSalary(salary, ratios);
  alert('Đã cập nhật lương và tỉ lệ các hủ!');
}

// Hàm nhập giao dịch mới
export function inputTransaction() {
  // Chọn loại giao dịch
  const type = prompt('Loại giao dịch (income/expense):');
  // Nhập số tiền
  const amount = prompt('Số tiền:');
  // Chọn hủ
  const jar = prompt('Chọn hủ (debt, expenses, emergency, savings, investment, learning):');
  // Nhập mô tả
  const desc = prompt('Mô tả:');
  // Nhập ngày (tùy chọn)
  const date = prompt('Ngày (yyyy-mm-dd, để trống lấy hôm nay):');
  // Gọi hàm thêm giao dịch
  addTransaction(type, amount, jar, desc, date);
  alert('Đã thêm giao dịch mới!');
}

// Hàm nhập liệu tổng hợp (demo CLI)
export function input() {
  // Hỏi user muốn làm gì
  const action = prompt('Chọn thao tác: 1. Nhập lương/tỉ lệ | 2. Thêm giao dịch | 3. Thoát');
  if (action === '1') {
    inputSalary();
  } else if (action === '2') {
    inputTransaction();
  } else {
    alert('Kết thúc nhập liệu!');
  }
}
