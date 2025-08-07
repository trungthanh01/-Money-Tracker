// output.js
// Module hiển thị dữ liệu cho Money Tracker
// Ở bản CLI demo, sử dụng alert/console.log để hiển thị dashboard, số dư các hủ, lịch sử giao dịch
// Khi chuyển sang UI sẽ thay thế bằng giao diện trực quan

import { getJars, getTransactions } from './data.js';

// Hàm hiển thị số dư các hủ
export function showJars() {
  const jars = getJars();
  let msg = 'Số dư các hủ:\n';
  Object.entries(jars).forEach(([jar, amount]) => {
    msg += `${jar}: ${amount.toLocaleString('vi-VN')}₫\n`;
  });
  alert(msg);
}

// Hàm hiển thị lịch sử giao dịch gần đây
export function showTransactions(limit = 5) {
  const txs = getTransactions().slice(0, limit);
  let msg = 'Giao dịch gần đây:\n';
  txs.forEach(tx => {
    msg += `${tx.date} | ${tx.type === 'income' ? '+' : '-'}${tx.amount.toLocaleString('vi-VN')}₫ | ${tx.jar} | ${tx.desc}\n`;
  });
  alert(msg);
}

// Hàm hiển thị dashboard tổng hợp
export function output() {
  showJars();
  showTransactions();
}
