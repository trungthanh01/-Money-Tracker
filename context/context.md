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


## 1. **CHI TIẾT KỸ THUẬT (Technical Implementation Details)**

### 1.1. Kiến trúc Component (Component Architecture)
- **App**: Quản lý state tổng, điều hướng các màn hình.
- **Dashboard**: Hiển thị tổng quan số dư, biểu đồ, các hủ, nút thao tác nhanh.
- **JarCard**: Card hiển thị từng hủ (tên, số dư, màu, %).
- **TransactionModal**: Modal nhập giao dịch (thu nhập/chi tiêu).
- **EditSalaryModal**: Modal nhập/chỉnh sửa lương, chia tỉ lệ các hủ.
- **TransactionList**: Danh sách giao dịch gần đây, filter theo hủ/ngày.
- **Settings**: Cài đặt theme, export/import, reset data.
- **Notification**: Hiển thị thông báo, lỗi, thành công.

### 1.2. Đặc tả hàm chính (Function Specifications)
- **calculateJarDistribution(salary, ratios):**  
  Input: số lương, tỉ lệ từng hủ  
  Output: object { jarName: amount }
- **saveTransaction(type, amount, jar, desc, date):**  
  Input: loại (income/expense), số tiền, hủ, mô tả, ngày  
  Output: cập nhật state, lưu LocalStorage
- **editSalary(newSalary, newRatios):**  
  Input: lương mới, tỉ lệ mới  
  Output: cập nhật số dư các hủ, không ảnh hưởng lịch sử giao dịch
- **exportData():**  
  Output: file JSON toàn bộ dữ liệu
- **importData(json):**  
  Input: file JSON  
  Output: cập nhật lại toàn bộ state

### 1.3. API Contracts (nếu có backend/cloud)
- **POST /transactions**  
  Body: {type, amount, jar, desc, date}  
  Response: {success, transactionId}
- **GET /jars**  
  Response: [{name, balance, ratio, color}]
- **POST /backup**  
  Body: {userId, data}  
  Response: {success}

---

## 2. LUỒNG NGƯỜI DÙNG & WIREFRAMES (User Flows & Wireframes)

### 2.1. Sơ đồ luồng người dùng (User Flow Diagrams)
- **Onboarding**: Mở app → Nhập lương → Chia tỉ lệ → Dashboard
- **Thêm giao dịch**: Dashboard → [+] → Chọn hủ → Nhập số tiền, mô tả → Lưu → Update số dư
- **Chỉnh sửa lương**: Dashboard → [Chỉnh sửa lương] → Nhập số mới → Lưu → Update các hủ
- **Export/Import**: Settings → [Export/Import] → Chọn file → Xác nhận

### 2.2. Wireframes (Lo-fi)
- **Dashboard**:  
  [Tổng số dư]  
  [Biểu đồ tròn]  
  [6 JarCard]  
  [Giao dịch gần đây]  
  [+ Thu nhập] [- Chi tiêu] [Chỉnh sửa lương]
- **TransactionModal**:  
  [Số tiền] [Mô tả] [Chọn hủ] [Lưu/Hủy]
- **EditSalaryModal**:  
  [Lương mới] [Tỉ lệ từng hủ] [Lưu/Hủy]

### 2.3. Interaction States
- **Loading**: Spinner khi load dữ liệu
- **Error**: Hiện thông báo lỗi (ví dụ: nhập số âm, LocalStorage đầy)
- **Success**: Toast xác nhận thành công

---

## 3. QUY TẮC KIỂM TRA DỮ LIỆU (Data Validation Rules)

- **Số tiền nhập phải > 0, là số hợp lệ**
- **Tỉ lệ các hủ phải tổng đúng 100%**
- **Không cho phép nhập mô tả quá 100 ký tự**
- **Ngày giao dịch không được lớn hơn ngày hiện tại**
- **Khi LocalStorage đầy, cảnh báo và hướng dẫn export**
- **Không cho phép trùng ID giao dịch**

---

## 4. KỊCH BẢN TEST (Testing Scenarios)

### 4.1. Unit Test Cases
- Tính toán chia lương đúng tỉ lệ
- Thêm giao dịch cập nhật đúng số dư
- Chỉnh sửa lương không ảnh hưởng lịch sử
- Export/Import giữ nguyên dữ liệu

### 4.2. Integration Test Flows
- Thêm nhiều giao dịch liên tiếp, kiểm tra số dư
- Đổi tỉ lệ hủ, kiểm tra update real-time
- Xóa giao dịch, kiểm tra rollback số dư

### 4.3. User Acceptance Criteria
- Người dùng mới có thể setup và nhập giao dịch đầu tiên trong < 2 phút
- Không có lỗi UI/blocker khi thao tác nhanh liên tục
- Dữ liệu không mất khi reload/trở lại app

---

## 5. ƯU TIÊN TRIỂN KHAI & PHỤ THUỘC (Implementation Priorities & Dependencies)

- **Critical Path**:  
  1. Khởi tạo project → 2. Xây dựng data model → 3. Dashboard → 4. TransactionModal → 5. JarCard → 6. Lưu LocalStorage → 7. Biểu đồ → 8. Settings
- **Task Dependencies**:  
  - TransactionModal phụ thuộc vào data model
  - Dashboard phụ thuộc vào JarCard, Chart
- **Technical Debt Tracking**:  
  - Ghi chú các workaround, TODO trong code
  - Định kỳ review và lên kế hoạch refactor

---

## 6. ĐỊNH DẠNG & ĐA NGÔN NGỮ (Localization & Internationalization)

- **Toàn bộ UI, thông báo, lỗi đều bằng tiếng Việt**
- **Định dạng số tiền:** 1.500.000₫ (dấu chấm ngăn cách, ký hiệu ₫ cuối)
- **Định dạng ngày:** dd/mm/yyyy (ví dụ: 15/07/2024)
- **Chuẩn bị sẵn file JSON cho đa ngôn ngữ (i18n) nếu mở rộng, hiện tại cần tiếng Việt và english cho toàn bộ app**

---

## 7. YÊU CẦU TRỢ NĂNG (Accessibility Requirements)

- **Tuân thủ WCAG 2.1 AA**: Độ tương phản màu, font size tối thiểu 16px
- **Tab navigation**: Có thể thao tác toàn bộ app bằng bàn phím
- **Screen reader**: Thêm aria-label cho các nút, mô tả hình ảnh
- **Focus state**: Rõ ràng khi chuyển tab, nhập liệu

---

## 8. CODE SAMPLES & BOILERPLATE

### 8.1. Project Setup (ví dụ cho Vanilla JS + Tailwind + Chart.js)
```js
// main.js
import './styles/main.css';
import Chart from 'chart.js/auto';
import { calculateJarDistribution, saveTransaction } from './core/finance.js';
```
```js
// core/finance.js
export function calculateJarDistribution(salary, ratios) {
  const result = {};
  Object.keys(ratios).forEach(jar => {
    result[jar] = Math.round(salary * ratios[jar] / 100);
  });
  return result;
}
export function saveTransaction(type, amount, jar, desc, date) {
  // ...validate, update state, save to localStorage
}
```
```json
// data example
{
  "salary": 15000000,
  "ratios": {"debt":20,"expenses":40,"emergency":10,"savings":10,"investment":10,"learning":10},
  "jars": {"debt":3000000,"expenses":6000000,"emergency":1500000,"savings":1500000,"investment":1500000,"learning":1500000},
  "transactions": [
    {"id":"txn1","type":"expense","amount":35000,"jar":"expenses","desc":"Cà phê","date":"2024-07-15"}
  ]
}
```

---

## 9. TRIỂN KHAI & CI/CD (Deployment & CI/CD)

- **Build Process**: Sử dụng npm scripts để build, minify, optimize assets
- **Hosting**: Ưu tiên GitHub Pages, Vercel, Netlify (free, dễ tích hợp)
- **Performance Budgets**:  
  - Bundle < 300KB  
  - TTFB < 500ms  
  - LCP < 2.5s trên mobile
- **CI/CD**:  
  - Tích hợp GitHub Actions để tự động build, test, deploy khi push lên main

---

## 10. PHÂN TÍCH & GIÁM SÁT (Analytics & Monitoring)

- **Event Tracking Plan**:  
  - track('add_transaction'), track('edit_salary'), track('export_data'), track('import_data'), track('change_ratio')
- **Performance Metrics**:  
  - Thời gian load dashboard, số lượng users active, số giao dịch/ngày
- **Error Reporting**:  
  - Ghi log lỗi vào localStorage, hiển thị popup cho user  
  - (Nếu có backend) gửi lỗi về server để phân tích

---

**Bổ sung này sẽ giúp bạn có một context engineering hoàn chỉnh, sẵn sàng cho AI agent hoặc dev team triển khai app một cách bài bản, không sót bước nào. Nếu cần tôi có thể tách từng đề mục thành file riêng hoặc bổ sung chi tiết code cho từng phần!**