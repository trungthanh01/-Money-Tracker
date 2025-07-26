# 🧾 README - Ứng Dụng Quản Lý Tài Chính Cá Nhân - 5 Hũ

## 📌 Giới thiệu

"5 Hũ Tài Chính" là một ứng dụng web giúp người dùng quản lý tài chính cá nhân bằng cách phân bổ thu nhập và chi tiêu theo 5 mục tiêu cụ thể: Chi tiêu, Khẩn cấp, Tiết kiệm, Đầu tư, và Học tập. Ứng dụng hoạt động hoàn toàn offline (LocalStorage) và có tích hợp biểu đồ, ví đầu tư crypto, và trí tuệ nhân tạo.

---

## 🚀 Tính năng chính

### 1. Dashboard (Bảng tin tổng hợp)

* Hiển thị tổng số dư
* Biểu đồ Doughnut trực quan theo tỷ lệ các hũ
* Danh sách các hũ: truy cập xem lịch sử giao dịch

### 2. Modal thêm giao dịch

* Tạo giao dịch: chọn loại (Thu nhập/Chi tiêu), chọn hũ
* Tự động cập nhật số dư và lịch sử

### 3. Đầu tư (Investment)

* Nhập địa chỉ ví Ethereum + API Key (Etherscan)
* Hiển thị số dư và giá trị quy đổi VNĐ
* Ghi lại giao dịch đầu tư thủ công

### 4. Gợi ý học tập (Education)

* Nhập ngành nghề bạn quan tâm
* Gọi AI (Gemini/OpenAI) gợi ý sách, khóa học, roadmap
* Hiển thị đẹp với HTML từ markdown AI trả về

---

## 🧠 Kiến trúc hệ thống (System Thinking)

| Module           | Chức năng                                                                |
| ---------------- | ------------------------------------------------------------------------ |
| UI (Tailwind)    | Thiết kế hiện đại, responsive, dễ tùy chỉnh giao diện                    |
| State Management | Quản lý toàn bộ dữ liệu ứng dụng (jars, transactions, ví, tổng số dư...) |
| LocalStorage     | Lưu trữ trạng thái vĩnh viễn không cần backend                           |
| Chart.js         | Biểu đồ Doughnut hiển thị tỷ lệ các hũ tài chính                         |
| Etherscan API    | Lấy số dư ETH và quy đổi giá trị                                         |
| Gemini AI API    | Gợi ý lộ trình học dựa trên ngành nghề người dùng nhập                   |

---

## 🧩 Công nghệ sử dụng

* HTML5, CSS3
* JavaScript thuần (ES6+)
* TailwindCSS
* Chart.js
* LocalStorage
* Etherscan API
* Gemini (Google AI Model)

---

## 📂 Cấu trúc file

```
📁 project-root/
├── index.html       # Giao diện chính
├── style.css        # Tùy biến bổ sung cho giao diện
├── script.js        # Logic chính và xử lý state
└── README.md        # Mô tả dự án (file hiện tại)
```

---

## ✅ Tiến độ (MVP)

* [x] Giao diện Dashboard
* [x] Thêm giao dịch & modal popup
* [x] Vẽ biểu đồ phân bổ
* [x] Tích hợp ví Ethereum
* [x] Gợi ý học tập bằng AI

---

## 📌 Tác giả

* Người thiết kế hệ thống: **Quinnie - System Thinker & Designer**
* Ngôn ngữ: 🇻🇳 Tiếng Việt

---

## 📎 Giấy phép

MIT License

---

> Mọi phản hồi và đóng góp hoan nghênh qua email hoặc GitHub Discussions 💬
