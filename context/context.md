# MONEY TRACKER - TÀI LIỆU BỐI CẢNH DỰ ÁN
*Tài liệu mô tả chi tiết ý tưởng và định hướng phát triển sản phẩm*

---

## 🎯 **VẤN ĐỀ CỐT LÕI CẦN GIẢI QUYẾT**

### Các vấn đề người dùng Việt Nam đang gặp phải:

#### 1. **Khó khăn trong việc phân bổ tiền lương hợp lý**
- 78% người trẻ Việt Nam không biết cách chia lương sau khi nhận về
- Thường chi tiêu theo cảm tính, không có kế hoạch rõ ràng
- Không biết bao nhiêu % lương nên dành cho từng mục đích (ăn uống, tiết kiệm, đầu tư...)

#### 2. **Thiếu kỷ luật tài chính và thói quen theo dõi**
- Chi tiêu lung tung, không kiểm soát được
- Không ghi chép chi tiêu hàng ngày
- Cuối tháng mới phát hiện đã "cháy túi"

#### 3. **Áp lực tài chính và căng thẳng về tiền bạc**
- 65% nhân viên văn phòng lo lắng về tình hình tài chính
- Không có quỹ khẩn cấp khi gặp sự cố
- Áp lực phải vay mượn khi có nhu cầu lớn

#### 4. **Các ứng dụng quản lý tài chính hiện tại quá phức tạp**
- Mint, YNAB, MoneyLover có quá nhiều tính năng không cần thiết
- Giao diện phức tạp, khó sử dụng cho người mới
- Cần đăng ký tài khoản, lo ngại về bảo mật thông tin

### Tại sao những vấn đề này quan trọng và cấp thiết?

- **Tác động đến sức khỏe tinh thần:** Căng thẳng tài chính gây ra depression, anxiety
- **Ảnh hưởng đến các mối quan hệ:** Xung đột trong gia đình vì tiền bạc
- **Mất cơ hội phát triển:** Không có tiền đầu tư vào bản thân, học tập
- **Vòng luẩn quẩn nghèo khó:** Không tiết kiệm được, không đầu tư được

---

## 💡 **GIẢI PHÁP ĐƠN GIẢN** (Simple Solution)

### Nguyên lý cốt lõi: "Jar System" (Hệ thống Hủ)
```
Lương → Tự động chia vào 6 hủ → Chỉ chi tiêu trong giới hạn mỗi hủ
```

### 6 hủ tiền và ý nghĩa:
1. **Nợ (20%)** - Trả nợ, thẻ tín dụng
2. **Chi tiêu (40%)** - Ăn uống, xăng xe, sinh hoạt hàng ngày  
3. **Khẩn cấp (10%)** - Dự phòng ốm đau, mất việc
4. **Tiết kiệm (10%)** - Mục tiêu lớn: mua nhà, xe, cưới
5. **Đầu tư (10%)** - Chứng khoán, crypto, vàng
6. **Học tập (10%)** - Khóa học, sách, skill mới

### Tại sao phương pháp này hiệu quả?
- **Đơn giản:** Chỉ cần nhớ 6 hủ
- **Tự động:** Không cần suy nghĩ mỗi lần chi tiêu
- **Linh hoạt:** Có thể điều chỉnh tỉ lệ theo hoàn cảnh
- **Có kỷ luật:** Hết tiền hủ nào thì dừng chi tiêu hủ đó

---

## 👥 **NGƯỜI DÙNG MỤC TIÊU** (Target Users)

### Primary Users (Chính):
**Nhân viên văn phòng 22-35 tuổi, lương 8-20 triệu**
- Mới tốt nghiệp, chưa có kinh nghiệm quản lý tiền
- Muốn tiết kiệm để mua nhà, xe, cưới xin
- Thường xuyên "cháy túi" cuối tháng
- Sử dụng smartphone, quen với app đơn giản

### Secondary Users (Phụ):
**Freelancers, sinh viên, người thu nhập không đều**
- Thu nhập thay đổi theo tháng
- Cần kỷ luật tài chính cao hơn
- Muốn tự học về đầu tư, phát triển bản thân

---

## 🚀 **USER JOURNEY ĐƠN GIẢN** (Simple User Journey)

### Lần đầu sử dụng (First Time):
```
1. Mở app → 2. Nhập lương tháng → 3. Xem tiền được chia tự động 
→ 4. Điều chỉnh tỉ lệ nếu cần → 5. Bắt đầu chi tiêu
```

### Hàng tháng (Monthly):
```
1. Nhận lương mới → 2. Mở app → 3. Cập nhật lương 
→ 4. Reset tất cả hủ → 5. Xem báo cáo tháng trước
```

---

## 🎨 **TRẢI NGHIỆM NGƯỜI DÙNG** (User Experience Design)

### Nguyên tắc thiết kế:
1. **Đơn giản tối đa:** 3 click để hoàn thành 1 tác vụ
2. **Visual rõ ràng:** Dùng màu sắc phân biệt 6 hủ
3. **Phản hồi tức thời:** Ngay lập tức thấy số dư thay đổi
4. **Không cần đăng ký:** Lưu local, dùng ngay

### Giao diện chính gồm:
- **Dashboard:** Hiển thị 6 hủ + biểu đồ tròn
- **2 nút lớn:** "Thêm lương" và "Thêm chi tiêu"  
- **Lịch sử:** Xem lại các giao dịch gần đây

---

## 🔧 **TECHNICAL APPROACH** (Cách thức kỹ thuật)

### Tech Stack đơn giản:
- **Frontend:** HTML, CSS, JavaScript (không framework phức tạp)
- **UI:** Tailwind CSS (responsive, nhanh)
- **Charts:** Chart.js (biểu đồ đẹp, nhẹ)
- **Storage:** LocalStorage (không cần server)

### Tại sao chọn tech stack này?
- **Nhanh:** Không cần setup phức tạp
- **Nhẹ:** Tải nhanh trên điện thoại
- **Offline:** Hoạt động không cần internet
- **Free:** Không tốn tiền hosting

---

## 📊 **SUCCESS METRICS** (Đo lường thành công)

### Metrics chính:
1. **Daily Active Users (DAU):** Số người dùng mỗi ngày
2. **Retention Rate:** Tỉ lệ quay lại sau 1 tuần, 1 tháng
3. **Transaction Frequency:** Số lần nhập chi tiêu/tuần
4. **Budget Adherence:** % người không vượt quá budget mỗi hủ

### Target numbers:
- **500 users** trong tháng đầu
- **70% retention** sau 1 tuần
- **5 transactions/user/week** 
- **80% users** không vượt budget hủ chi tiêu

---

## 🚨 **RISKS & ASSUMPTIONS** (Rủi ro & Giả định)

### Assumptions cần validate:
- ✅ Người Việt thích phương pháp "chia hủ"
- ✅ Users sẵn sàng nhập chi tiêu hàng ngày
- ✅ LocalStorage đủ tin cậy cho data quan trọng
- ✅ Không cần tích hợp ngân hàng

### Risks có thể xảy ra:
- 🔴 User quên nhập chi tiêu → Data không chính xác
- 🔴 Mất data khi clear browser → User bỏ app
- 🔴 Competitor lớn copy ý tưởng → Mất market share
- 🔴 Thay đổi thói quen quá khó → Low adoption
```

---
