# 001 - Tổng Quan Dự Án Money Tracker 💰

Chào Marc! Hôm nay chúng ta sẽ khám phá một ứng dụng quản lý tài chính thú vị!

## 🎯 Ứng dụng này làm gì?

Hãy tưởng tượng bạn có 5 cái hũ trong nhà bếp:
- **Hũ 1**: Tiền chi tiêu hàng ngày (mua cà phê, ăn sáng)
- **Hũ 2**: Tiền khẩn cấp (phòng khi xe hỏng, ốm đau)  
- **Hũ 3**: Tiền tiết kiệm (mua điện thoại mới, đi du lịch)
- **Hũ 4**: Tiền đầu tư (mua Bitcoin, cổ phiếu)
- **Hũ 5**: Tiền học tập (khóa học online, sách vở)

Mỗi tháng khi nhận lương, bạn chia tiền vào 5 hũ này theo tỷ lệ nhất định. Đây chính là phương pháp "5 Jars" nổi tiếng!

## 🏗️ Cấu trúc file (như một ngôi nhà)

```
Project-Root/
├── index.html     # 🏠 Cửa chính (giao diện người dùng nhìn thấy)
├── main.js        # 🧠 Bộ não điều khiển (khởi động mọi thứ)
├── data.js        # 📊 Kho dữ liệu (lưu thông tin 5 hũ, giao dịch)
├── input.js       # 👂 Tai nghe (lắng nghe người dùng nhập gì)
├── process.js     # ⚙️  Máy tính (xử lý logic, tính toán)
└── output.js      # 👁️  Mắt (hiển thị kết quả ra màn hình)
```

## 🔄 Quy trình hoạt động (như nấu ăn)

1. **INPUT** 👂: Người dùng nhập "Tôi vừa mua cà phê 50k"
2. **PROCESS** ⚙️: Máy tính trừ 50k từ hũ "Chi tiêu"
3. **OUTPUT** 👁️: Màn hình cập nhật hiển thị số dư mới

Giống như khi bạn nấu ăn: Chuẩn bị nguyên liệu → Chế biến → Thành phẩm!

---

**Câu hỏi cho Marc**: Bạn hiểu ý tưởng tổng quan này như thế nào? 
Hãy trả lời bằng thang điểm: 1 (confused), 2 (kind of get it), 3 (got it!)
