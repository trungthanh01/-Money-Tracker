// File: script.js
// Mục đích: Chứa toàn bộ logic xử lý của ứng dụng.
// Cấu trúc theo mô hình Input -> Process -> Output (IPO).

// =================================================================
// PHẦN 1: INPUT - Đầu vào & Khai báo
// =================================================================
// Phần này chịu trách nhiệm "nhập khẩu" dữ liệu cần thiết và
// lấy các thẻ HTML quan trọng để chuẩn bị cho việc xử lý.

// Nhập (import) các dữ liệu và cấu hình từ file data.js
import { jarsConfig, state, updateState } from './data.js';

// Lấy các thẻ HTML quan trọng từ file index.html
const totalBalanceEl = document.getElementById('total-balance');
const jarsContainer = document.getElementById('jars-container');
const transactionModal = document.getElementById('transaction-modal');
const transactionForm = document.getElementById('transaction-form');
const jarDetailModal = document.getElementById('jar-detail-modal');

// Biến toàn cục cho biểu đồ
let jarsChart = null;