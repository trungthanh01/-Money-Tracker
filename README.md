# 📁 Cấu Trúc File & README - App Quản Lý Tài Chính 5 Hũ

---

## 🧾 Giới thiệu

Dự án ứng dụng web giúp người dùng quản lý tài chính cá nhân bằng cách phân chia thu nhập vào 5 hũ: **Chi tiêu, Khẩn cấp, Tiết kiệm, Đầu tư, Học tập**. Toàn bộ ứng dụng được chia thành các module riêng biệt theo mô hình **IPO (Input – Process – Output)**, giúp dễ bảo trì và mở rộng.
link: https://montracker.netlify.app/
---

## 🧩 Cấu trúc thư mục

```
money-tracker/
├── index.html          # Trang chính
├── css/
│   ├── main.css        # CSS chung
│   ├── layout.css      # Bố cục
│   ├── components/     # Các thành phần UI
│   │   ├── modal.css
│   │   ├── header.css
│   │   └── cards.css
│   └── views/          # CSS cho từng view
│       ├── dashboard.css
│       ├── investment.css
│       └── education.css
├── js/
│   ├── app.js          # Khởi tạo ứng dụng
│   ├── modules/        # Các module chức năng
│   │   ├── data.js     # Quản lý dữ liệu
│   │   ├── ui.js       # Xử lý giao diện
│   │   └── charts.js   # Xử lý biểu đồ
│   └── views/          # Logic cho từng view
│       ├── dashboard.js
│       ├── investment.js
│       └── education.js
└── assets/             # Hình ảnh, icons
```

## 👩‍💻 Tác giả

* Marcus (System Thinker & Web Designer)

---


