# 003 - Tai Nghe Ứng Dụng: input.js 👂

Chào Marc! Bây giờ chúng ta sẽ tìm hiểu về file `input.js` – nơi ứng dụng "nghe" dữ liệu từ người dùng.

## 🎤 input.js làm gì?

- Kết nối các phần tử trên giao diện (form, nút, ô nhập liệu) với code.
- Lấy dữ liệu người dùng nhập vào (ví dụ: số tiền, mô tả giao dịch).
- Chuyển dữ liệu này sang cho các module xử lý logic.

## 🧩 Ví dụ thực tế

Hãy tưởng tượng bạn đi siêu thị:
- Bạn nói với nhân viên thu ngân: "Tôi mua 2 ổ bánh mì!"
- Nhân viên sẽ ghi lại thông tin này vào hệ thống.
- input.js chính là "nhân viên thu ngân" đó!

## 🗂️ Một số đoạn code tiêu biểu

```javascript
// Lấy phần tử form nhập giao dịch
export const transactionForm = document.getElementById('transaction-form');

// Lấy giá trị số tiền
export const amountInput = document.getElementById('transaction-amount');

// ... các biến DOM khác
```

## 🔄 Quy trình
1. Người dùng nhập dữ liệu vào form
2. input.js lấy dữ liệu này
3. Chuyển sang process.js để xử lý

---

**Câu hỏi cho Marc:** Bạn thấy vai trò của input.js đã rõ chưa?
Hãy trả lời: 1 (confused), 2 (kind of get it), 3 (got it!)
