# DANH SÁCH CÔNG VIỆC (TASKS) - MONEY TRACKER MVP

Tài liệu này dùng để theo dõi tiến độ hoàn thành các tính năng của sản phẩm theo yêu cầu trong `context.md` và `PRD.md`. Nó so sánh các yêu cầu của MVP với trạng thái hiện tại của dự án.

**Quy ước:**
- `[x]` : Task đã hoàn thành.
- `[ ]` : Task chưa hoàn thành hoặc cần làm.
- Để yêu cầu thực hiện, hãy chỉ định số của Task (ví dụ: "Thực hiện Task 5.1").

---

## PHẦN 1: CÁC TÍNH NĂNG CỐT LÕI (CORE FEATURES)

### **EPIC 1: Thiết lập ban đầu & Phân chia Lương (Initial Setup & Salary Split)**
*Mục tiêu: Người dùng có thể nhập lương và xem tiền được tự động phân bổ vào 6 hủ ngay lần đầu sử dụng.*

- `1.1 [x]` Giao diện nhập lương lần đầu (Salary Modal).
- `1.2 [x]` Tự động gợi ý tỉ lệ 6 hủ theo PRD (20-40-10-10-10-10).
- `1.3 [x]` Cho phép người dùng chỉnh sửa tỉ lệ các hủ.
- `1.4 [x]` Validate tổng tỉ lệ phải bằng 100% và hiển thị cho người dùng.
- `1.5 [x]` Lưu dữ liệu lương và tỉ lệ vào LocalStorage.
- `1.6 [x]` Tự động phân bổ số tiền vào 6 hủ dựa trên lương và tỉ lệ.
- `1.7 [x]` Cập nhật lại số tiền trong các hủ khi người dùng chỉnh sửa lương.
- `1.8 [x]` Fix lỗi input trên mobile để nhập số dễ dàng.

### **EPIC 2: Theo dõi Chi tiêu & Thu nhập Hàng ngày (Daily Expense/Income Tracking)**
*Mục tiêu: Người dùng có thể ghi lại các giao dịch hàng ngày một cách nhanh chóng để theo dõi dòng tiền.*

- `2.1 [x]` Giao diện nhập giao dịch (Transaction Modal).
- `2.2 [x]` Các nút thao tác nhanh "Thêm Thu Nhập" và "Thêm Chi Tiêu".
- `2.3 [x]` Form nhập liệu: số tiền, mô tả, chọn hủ.
- `2.4 [x]` Cập nhật số dư của hủ tương ứng sau khi thêm giao dịch.
- `2.5 [x]` Cập nhật tổng số dư toàn bộ.
- `2.6 [x]` Lưu mọi giao dịch vào LocalStorage.
- `2.7 [x]` Hiển thị danh sách 5 giao dịch gần đây trên Dashboard.
- `2.8 [ ]` **(CHƯA LÀM)** Hoàn thiện logic cho nút "Thêm Thu Nhập" để có thể thêm tiền vào một hủ cụ thể, không chỉ từ việc nhập lương.
- `2.9 [ ]` **(CẦN CẢI THIỆN)** Validate số tiền nhập vào phải là số dương và hiển thị lỗi thân thiện.
- `2.10 [ ]` **(CẦN CẢI THIỆN)** Cảnh báo khi chi tiêu vượt quá số dư trong hủ.

### **EPIC 3: Dashboard Trực quan (Visual Financial Dashboard)**
*Mục tiêu: Cung cấp một cái nhìn tổng quan, dễ hiểu về tình hình tài chính của người dùng.*

- `3.1 [x]` Hiển thị tổng số dư.
- `3.2 [x]` Hiển thị 6 hủ tiền (Jar Cards) với tên, số dư, và màu sắc riêng.
- `3.3 [x]` Biểu đồ tròn (Doughnut Chart) thể hiện phân bổ tài sản.
- `3.4 [x]` Giao diện responsive (Mobile-first) với Hamburger Menu.
- `3.5 [x]` Dữ liệu trên dashboard được cập nhật real-time sau mỗi hành động.
- `3.6 [x]` Chú thích (Legend) cho biểu đồ được tích hợp ngay trên biểu đồ.

### **EPIC 4: Cài đặt & Tùy chỉnh (Settings & Customization)**
*Mục tiêu: Cho phép người dùng cá nhân hóa trải nghiệm ứng dụng.*

- `4.1 [x]` Xây dựng Tab Cài đặt với giao diện responsive.
- `4.2 [x]` Chức năng chuyển đổi ngôn ngữ (Đa ngôn ngữ: Anh/Việt).
- `4.3 [x]` Chức năng chuyển đổi giao diện Sáng/Tối (Light/Dark Theme).
- `4.4 [x]` Chức năng chọn đơn vị tiền tệ (10 loại tiền tệ phổ biến).
- `4.5 [x]` Thông tin liên hệ hỗ trợ (`mailto:`).
- `4.6 [ ]` **(CHƯA LÀM)** Chức năng Export/Import dữ liệu ra file JSON để backup/restore.
- `4.7 [ ]` **(CHƯA LÀM)** Chức năng Reset toàn bộ dữ liệu ứng dụng.

---

## PHẦN 2: CÁC TASK CẢI TIẾN VÀ SỬA LỖI (Backlog & Bug Fixing)
*Đây là danh sách các công việc cần làm để sản phẩm hoàn thiện hơn, được chia nhỏ để dễ dàng yêu cầu.*

### **TASK GROUP 5: Cải thiện Trải nghiệm Người dùng (UX Improvements)**
- `5.1 [ ]` Thêm định dạng số (dấu phẩy) ngay khi người dùng nhập số tiền trong modal "Thêm Giao Dịch", tương tự như ô nhập lương.
- `5.2 [ ]` Thêm các hiệu ứng chuyển động (transition) nhẹ nhàng khi mở/đóng modal, chuyển tab để ứng dụng mượt mà hơn.
- `5.3 [ ]` Khi người dùng chi tiêu vượt quá số dư trong hủ, thay vì chỉ chặn, hãy hiển thị một thông báo pop-up thân thiện giải thích lý do.
- `5.4 [ ]` Tự động đóng menu trên mobile sau khi chọn một tab.

### **TASK GROUP 6: Hoàn thiện Tính năng (Feature Completion)**
- `6.1 [ ]` Implement logic cho nút "Thêm Thu Nhập" để mở một modal cho phép người dùng thêm một khoản tiền vào một hủ tùy chọn.
- `6.2 [ ]` Implement tính năng "Export Data" trong phần Cài đặt, cho phép người dùng tải về một file `data.json`.
- `6.3 [ ]` Implement tính năng "Import Data" trong phần Cài đặt, cho phép người dùng chọn một file `data.json` để khôi phục dữ liệu. Cần có cảnh báo rằng hành động này sẽ ghi đè dữ liệu hiện tại.
- `6.4 [ ]` Implement tính năng "Reset App" trong phần Cài đặt. Cần có một pop-up xác nhận (confirm dialog) để tránh người dùng vô tình xóa dữ liệu.

### **TASK GROUP 7: Tối ưu & Refactor Code (Optimization & Refactoring)**
- `7.1 [ ]` Tối ưu hàm `updateUI()`. Thay vì gọi lại toàn bộ hàm, chỉ cập nhật những thành phần bị ảnh hưởng bởi hành động của người dùng (ví dụ: chỉ cập nhật 1 Jar Card khi có giao dịch liên quan).
- `7.2 [ ]` Refactor lại file `js/app.js`. Tách các hàm xử lý sự kiện trong `bindEvents()` ra các hàm nhỏ hơn, chuyên biệt hơn (ví dụ: `bindModalEvents()`, `bindTabEvents()`, `bindSettingsEvents()`).
- `7.3 [ ]` Review và bổ sung comment chi tiết hơn cho các hàm xử lý logic phức tạp trong `js/data.js` và `js/app.js` theo phương pháp Feynman.
