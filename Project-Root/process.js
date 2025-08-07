// process.js
// Module xử lý logic tổng thể cho Money Tracker
// Khởi tạo app, gọi input, output, lặp lại thao tác cho đến khi user thoát
// Bản CLI demo, sau này sẽ thay bằng UI

import { input } from './input.js';
import { output } from './output.js';

export function process() {
  // Lặp lại thao tác cho đến khi user chọn thoát
  let running = true;
  while (running) {
    // Hiển thị dashboard
    output();
    // Nhập thao tác
    const action = prompt('Chọn thao tác: 1. Nhập lương/tỉ lệ | 2. Thêm giao dịch | 3. Xem lại | 4. Thoát');
    if (action === '1' || action === '2') {
      input();
    } else if (action === '3') {
      output();
    } else {
      running = false;
      alert('Cảm ơn bạn đã sử dụng Money Tracker!');
    }
  }
}
