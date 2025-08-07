# 💰 Money Tracker - Trình Quản Lý Tài Chính

> Ứng dụng quản lý tài chính cá nhân đơn giản theo phương pháp 6 hủ, giúp bạn kiểm soát chi tiêu và tiết kiệm hiệu quả.

![Money Tracker Screenshot](assets/Screenshot%202025-08-05%20102540.png)

## 🎯 **Tính Năng Chính**

### ✨ **6 Hủ Quản Lý Tiền**
- **Nợ (20%):** Trả nợ, thẻ tín dụng
- **Chi tiêu (40%):** Ăn uống, xăng xe, sinh hoạt hàng ngày
- **Khẩn cấp (10%):** Dự phòng ốm đau, mất việc
- **Tiết kiệm (10%):** Mục tiêu lớn (mua nhà, xe, cưới)
- **Đầu tư (10%):** Chứng khoán, crypto, vàng
- **Học tập (10%):** Khóa học, sách, phát triển bản thân

### 🚀 **Tính Năng Nổi Bật**
- ⚡ **Tự động chia lương** theo tỉ lệ 6 hủ
- 📊 **Biểu đồ trực quan** phân bổ tài sản
- 📱 **Responsive design** hoạt động mượt trên mọi thiết bị
- 🔒 **Lưu trữ local** - không cần đăng ký tài khoản
- 🎨 **Giao diện đơn giản** - dễ sử dụng cho mọi lứa tuổi
- 📈 **Theo dõi giao dịch** real-time

## 🛠️ **Công Nghệ Sử dụng**

- **Frontend:** HTML5, Vanilla JavaScript ES6+
- **Styling:** Tailwind CSS
- **Charts:** Chart.js
- **Storage:** LocalStorage API
- **Icons:** Unicode Emojis

## 📁 **Cấu Trúc Project**

```
Money-Tracker/
├── index.html              # File HTML chính
├── js/
│   ├── data.js             # Module quản lý dữ liệu
│   ├── ui.js               # Module quản lý giao diện
│   └── app.js              # Module chính điều phối
├── docs/
│   ├── javascript-explanation.md  # Giải thích chi tiết JS
│   └── tailwind-explanation.md    # Giải thích chi tiết Tailwind
├── context/
│   ├── context.md          # Tài liệu bối cảnh dự án
│   ├── PRD.md             # Product Requirements Document
│   └── plan.md            # Kế hoạch phát triển
└── README.md              # File này
```

## 🚀 **Cách Chạy App**

### **Option 1: Chạy trực tiếp**
1. Clone hoặc download repository
2. Mở file `index.html` bằng trình duyệt web
3. Bắt đầu sử dụng ngay!

### **Option 2: Chạy với Live Server**
1. Cài đặt Live Server extension (VS Code)
2. Right-click vào `index.html` → "Open with Live Server"
3. App sẽ mở tại `http://localhost:5500`

### **Yêu cầu hệ thống:**
- Trình duyệt hiện đại (Chrome, Firefox, Safari, Edge)
- JavaScript enabled
- Kết nối internet (cho CDN của Tailwind và Chart.js)

## 📖 **Hướng Dẫn Sử Dụng**

### **Bước 1: Nhập lương lần đầu**
1. Click nút "Nhập Lương"
2. Nhập số lương tháng
3. Điều chỉnh tỉ lệ % các hủ nếu cần (mặc định: 20-40-10-10-10-10)
4. Click "Lưu"

### **Bước 2: Thêm giao dịch hàng ngày**
1. Click "Thêm Thu Nhập" hoặc "Thêm Chi Tiêu"
2. Nhập số tiền và mô tả
3. Chọn hủ tương ứng
4. Click "Lưu"

### **Bước 3: Theo dõi tình hình tài chính**
- Xem tổng số dư và biểu đồ phân bổ
- Kiểm tra lịch sử giao dịch gần đây
- Điều chỉnh chi tiêu dựa vào số dư các hủ

## 🧠 **Giải Thích Code Chi Tiết**

### **JavaScript Modules:**
- 📄 [Giải thích chi tiết JavaScript](docs/javascript-explanation.md)
- 🎨 [Giải thích chi tiết Tailwind CSS](docs/tailwind-explanation.md)

### **Nguyên tắc thiết kế:**
- **Separation of Concerns:** Tách biệt Data - UI - App logic
- **Single Responsibility:** Mỗi function làm 1 việc cụ thể
- **Error Handling:** Xử lý lỗi đầy đủ với thông báo user-friendly
- **Mobile First:** Thiết kế responsive từ mobile lên desktop

## 🎯 **Roadmap Phát Triển**

### **Version 1.0 (Hiện tại)**
- ✅ Quản lý 6 hủ cơ bản
- ✅ Thêm thu nhập/chi tiêu
- ✅ Biểu đồ phân bổ tài sản
- ✅ Lưu trữ dữ liệu local
- ✅ Giao diện responsive

### **Version 1.1 (Sắp tới)**
- 🔄 Export/Import dữ liệu JSON
- 🔄 Dark mode toggle
- 🔄 Thống kê chi tiêu theo tháng
- 🔄 Notifications nhắc nhở

### **Version 2.0 (Tương lai)**
- 🔮 Đồng bộ cloud (Firebase)
- 🔮 Báo cáo chi tiết với charts
- 🔮 Mục tiêu tiết kiệm
- 🔮 Tích hợp API đầu tư

## 🤝 **Đóng Góp**

Chúng tôi hoan nghênh mọi đóng góp! Vui lòng:

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Mở Pull Request

## 📝 **License**

Dự án này được phát hành dưới [MIT License](LICENSE).

## 🙏 **Lời Cảm Ơn**

- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Chart.js](https://www.chartjs.org/) - Beautiful charts library
- [Inter Font](https://fonts.google.com/specimen/Inter) - Typography

## 📞 **Liên Hệ**

- **Author:** Money Tracker Team
- **Email:** contact@moneytracker.dev
- **Website:** [moneytracker.dev](https://moneytracker.dev)

---

**⭐ Nếu project này hữu ích, hãy cho chúng tôi 1 star nhé! ⭐**