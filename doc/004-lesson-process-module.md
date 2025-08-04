# 004 - Bộ Não Ứng Dụng: process.js 🧠

Chào Marc! Bây giờ chúng ta sẽ tìm hiểu về file `process.js` – nơi xử lý tất cả logic và phép tính của ứng dụng.

## ⚙️ process.js làm gì?

- Nhận dữ liệu từ input.js (những gì người dùng nhập)
- Xử lý các phép tính: cộng/trừ tiền, chia lương vào các hũ, kiểm tra hợp lệ
- Quản lý danh sách giao dịch, danh mục đầu tư
- Lưu và lấy dữ liệu từ localStorage (bộ nhớ trình duyệt)
- Gọi các hàm để cập nhật giao diện (output.js)

## 🧩 Ví dụ thực tế

Giống như một đầu bếp trong nhà hàng:
- Nhận order từ nhân viên phục vụ (input.js)
- Nấu ăn, chuẩn bị món (xử lý logic)
- Đưa món cho nhân viên mang ra bàn (output.js)

## 🗂️ Một số hàm tiêu biểu

```javascript
// Hàm tính tổng lương còn lại
export function calculateSalaryLeft() { ... }

// Hàm chỉnh sửa tổng lương
export function editTotalSalary(newSalary) { ... }

// Hàm xử lý khi người dùng lưu giao dịch
export function handleTransactionSubmit(e) { ... }
```

## 🔄 Quy trình
1. Người dùng nhập dữ liệu (input.js)
2. process.js xử lý logic, cập nhật state
3. Gọi output.js để cập nhật giao diện

---

**Câu hỏi cho Marc:** Bạn đã hình dung được vai trò của process.js chưa?
Hãy trả lời: 1 (confused), 2 (kind of get it), 3 (got it!)
