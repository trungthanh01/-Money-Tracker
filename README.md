# 📁 Cấu Trúc File & README - App Quản Lý Tài Chính 5 Hũ

---

## 🧾 Giới thiệu

Dự án ứng dụng web giúp người dùng quản lý tài chính cá nhân bằng cách phân chia thu nhập vào 5 hũ: **Chi tiêu, Khẩn cấp, Tiết kiệm, Đầu tư, Học tập**. Toàn bộ ứng dụng được chia thành các module riêng biệt theo mô hình **IPO (Input – Process – Output)**, giúp dễ bảo trì và mở rộng.
link: https://montracker.netlify.app/
---

## 🧩 Cấu trúc thư mục

```
📁 project-root/
├── index.html            # Giao diện chính (HTML)
├── main.js               # File tổng, nơi import toàn bộ module
├── data.js               # Chứa cấu hình & biến state (dữ liệu)
├── input.js              # Lấy biến DOM & dữ liệu đầu vào
├── process.js            # Xử lý logic: giao dịch, localStorage
├── output.js             # Vẽ giao diện, gắn sự kiện, biểu đồ
└── README.md             # Hướng dẫn & mô tả hệ thống
```

---

## 📘 Giải thích chức năng từng file

| Tên file     | Vai trò                                                                |
| ------------ | ---------------------------------------------------------------------- |
| `index.html` | Giao diện người dùng (UI), gọi `main.js` để khởi chạy toàn bộ logic    |
| `main.js`    | File trung tâm, import toàn bộ các module `input`, `process`, `output` |
| `data.js`    | Dữ liệu cấu hình (5 hũ), biến `state`, và hàm cập nhật `state`         |
| `input.js`   | Gán các biến DOM (`getElementById`) và chuẩn bị dữ liệu đầu vào        |
| `process.js` | Chứa các hàm xử lý logic, lưu/đọc LocalStorage... |
| `output.js`  | Vẽ giao diện, xử lý sự kiện (như `handleTransactionSubmit`), biểu đồ... |

---

## 🔄 Mô hình hoạt động (IPO)

1. **Input** (`input.js`):

   * Lấy dữ liệu từ người dùng (form: số tiền, mô tả, loại giao dịch...)
   * Lưu vào biến `state`

2. **Process** (`process.js`):

   * Xử lý nghiệp vụ: cộng/trừ số dư, kiểm tra hợp lệ, cập nhật localStorage

3. **Output** (`output.js`):

   * Hiển thị dữ liệu ra HTML
   * Cập nhật số dư, biểu đồ, danh sách các hũ

---

## ✅ Hướng dẫn sử dụng

1. Clone project về máy:

```bash
  git clone <repo>
```

2. Mở thư mục project trong VS Code:

```bash
  code .
```

3. Chạy bằng Live Server hoặc mở `index.html` trực tiếp bằng trình duyệt.

---

## 📦 Kỹ thuật sử dụng

* HTML5 / Tailwind CSS
* JavaScript ES Modules
* Chart.js (vẽ biểu đồ Doughnut)
* LocalStorage API

---

## ✨ Ưu điểm kiến trúc

* Dễ mở rộng
* Code sạch, phân chia rõ ràng
* Theo tư duy hệ thống và chuẩn module hóa hiện đại

---

## 👩‍💻 Tác giả

* Marcus (System Thinker & Web Designer)

---

> Hệ thống được thiết kế để scale tốt, bảo trì dễ, phù hợp team làm việc hoặc mở rộng thành SPA hoặc PWA sau này.
