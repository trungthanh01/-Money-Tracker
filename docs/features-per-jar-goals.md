## Tính năng: Mục tiêu cho từng hủ (Per-Jar Goals)

### Mục tiêu
- Người dùng đặt mục tiêu riêng cho từng hủ và theo dõi tiến độ qua progress bar và % ngay trên Dashboard.

### Phạm vi
- Data model: thêm `goals` vào LocalStorage (theo key từng hủ).
- UI Settings: màn hình/section để đặt/sửa/xóa mục tiêu.
- Dashboard: hiển thị tiến độ trên mỗi Jar Card; mở modal chi tiết khi click.
- i18n: toàn bộ label, thông báo, empty state.

### Data model đề xuất
```json
{
  "goals": {
    "debt": { "goalAmount": 20000000, "goalType": "debt_repay" },
    "expenses": { "goalAmount": 5000000, "goalType": "monthly_budget" },
    "emergency": { "goalAmount": 30000000, "goalType": "savings_target" },
    "savings": { "goalAmount": 10000000, "goalType": "savings_target" },
    "investment": { "goalAmount": 15000000, "goalType": "capital_target" },
    "learning": { "goalAmount": 3000000, "goalType": "learning_target" }
  }
}
```
- Migration: nếu thiếu `goals`, khởi tạo rỗng; không làm mất dữ liệu cũ.

### Công thức tiến độ
- Debt (Nợ): chọn một cách thể hiện nhất quán, ví dụ: tiến độ = `đã trả lũy kế / goalAmount` (hoặc `1 - nợ còn lại / goalAmount`).
- Expenses (Chi tiêu/tháng): tiến độ = `đã chi trong tháng hiện tại / goalAmount` (cần lọc giao dịch theo tháng).
- Emergency, Savings, Investment, Learning: tiến độ = `số dư hiện tại / goalAmount`.
- Edge cases: goalAmount = 0 → ẩn progress hoặc hiển thị 0% và nhắc đặt mục tiêu.

### UI Dashboard
- Mỗi Jar Card hiển thị:
  - Progress bar với 3 ngưỡng màu: <=33% (đỏ), <=66% (vàng), >66% (xanh).
  - Dòng chữ nhỏ: `đạt X / mục tiêu Y` (format theo đơn vị tiền tệ hiện tại).
  - Click vào Jar Card → mở modal chi tiết mục tiêu của hủ đó.

### Modal chi tiết mục tiêu
- Hiển thị và cho phép chỉnh sửa: `goalAmount`, `goalType` (tuỳ hủ), mô tả ngắn (tuỳ chọn).
- Nút lưu, nút xóa mục tiêu cho hủ.
- Validate số dương; i18n đầy đủ.

### Settings UI
- Thêm section "Mục tiêu từng hủ": danh sách 6 hủ với input tiền và loại mục tiêu.
- Nút lưu tất cả; toast xác nhận sau khi lưu.

### i18n (gợi ý key)
- `goals.title`: "Mục tiêu từng hủ"
- `goals.set`: "Đặt mục tiêu"
- `goals.amount`: "Số tiền mục tiêu"
- `goals.type`: "Loại mục tiêu"
- `goals.progress`: "Tiến độ"
- `goals.reached`: "Đã đạt mục tiêu!"
- `goals.none`: "Chưa đặt mục tiêu"

### Accessibility
- Progress bar có `aria-valuenow`, `aria-valuemax`, văn bản thay thế cho SR.
- Modal có focus trap, nhấn Escape để đóng.

### Tiêu chí chấp nhận
- Có thể đặt/sửa/xóa mục tiêu cho từng hủ; dữ liệu lưu qua reload.
- Dashboard hiển thị % tiến độ đúng theo công thức từng hủ.
- Màu progress phản ánh ngưỡng; i18n đầy đủ.

### Kiểm thử đề xuất
- Goals trống → ẩn progress/hiển thị nhắc đặt mục tiêu.
- Đổi đơn vị tiền tệ → format đúng.
- Tháng mới → expenses reset tính toán theo giao dịch tháng hiện tại.

