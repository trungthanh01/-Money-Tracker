// File: Front-End/src/javascript/dashboard/a-data/data.js
// Module này đóng vai trò là một "facade" hay "cổng dữ liệu" cho các thành phần trong dashboard.
// Nó gom tất cả các hàm và dữ liệu cần thiết từ các module cấp thấp hơn (như store, setting)
// và re-export chúng ra một nơi duy nhất.
// --> Các module khác trong dashboard chỉ cần import từ file này.

import {
  // Functions
  addTransaction,
  editSalary,
  getTotalBalance,
  getSalary,
  getJars,
  getTransactions,
  formatCurrencyWithSymbol,
  // Constants
  JAR_INFO
} from '../store/local-storage.js';

import { getTranslation } from '../setting/c-lang/lang-switch.js';

// Re-export tất cả để các module khác có thể sử dụng
export {
  // Functions
  formatCurrencyWithSymbol,
  getTranslation,
  getJars,
  getTotalBalance,
  getSalary,
  getTransactions,
  addTransaction,
  editSalary,
  // Constants
  JAR_INFO
};