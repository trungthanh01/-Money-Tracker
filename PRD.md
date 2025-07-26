**PRODUCT REQUIREMENT DOCUMENT (PRD)**

---

# Tên sản phẩm

**Trình Quản Lý Tài Chính Cá Nhân - 5 Hũ**

# Mô tả sản phẩm

Ứng dụng web giúp người dùng theo dõi, phân bổ và quản lý tài chính cá nhân theo mô hình 5 hũ: Chi tiêu, Khẩn cấp, Tiết kiệm, Đầu tư, Học tập. Hỗ trợ biểu đồ, lịch sử giao dịch, gợi ý lộ trình học tập.

---

# Đối tượng sử dụng

* Sinh viên, người mới đi làm muốn quản lý chi tiêu
* Nhân viên văn phòng, freelance, người có thói quen chia nhóm tài chính
* Người đang theo đuổi mục tiêu tài chính riêng (du lịch, đầu tư, học thêm)

---

# Mục tiêu chính

1. Tổng hợp giao dịch, cập nhật số dư tự động theo 5 hũ
2. Hiển thị đồ thị (doughnut chart) tỷ lệ phân chia tài sản
3. Lưu dữ liệu trong LocalStorage (không cần đăng nhập)
4. Gợi ý lộ trình học dựa trên ngành nghề quan tâm
5. Tính năng theo dõi đầu tư Ethereum qua API

---

# Tính năng chi tiết

## 1. Giao diện chính

* Bài toán: Tailwind + Chart.js
* Header: logo, tên app, thông tin lưu trữ local
* Navigation: 3 tab (Bảng tin, Đầu tư, Học tập)

## 2. Bảng tin (Dashboard)

* Hiển thị số dư tổng
* Nút: Thêm thu nhập / Thêm chi tiêu (mở modal)
* Biểu đồ phân bổ 5 hũ (Chart.js)
* Danh sách card hũ (dựa theo `jarsConfig`)

## 3. Modal giao dịch

* Input: Số tiền, mô tả, chọn hũ
* Nút: Lưu / Hủy
* Cập nhật giao dịch và số dư theo kiểu (income / expense)

## 4. View Đầu tư

* Nhập Ethereum Wallet + API Key
* Hiển thị số dư ETH qua Etherscan API
* Lịch sử giao dịch đầu tư (nhập tay)

## 5. View Học tập

* Nhập tên ngành nghề quan tâm
* Gửi prompt API AI (Gemini hoặc OpenAI) để gợi ý
* Hiển thị sách, khóa học, roadmap

---

# Kỹ thuật sử dụng

* HTML5, CSS3, JavaScript ES6
* Tailwind CSS (giao diện nhanh, responsive)
* Chart.js (vẽ biểu đồ)
* LocalStorage API (lưu trữ local)
* Etherscan API (theo dõi ví Ethereum)
* Gemini AI API (gợi ý học tập)

---

# MVP (Minimum Viable Product)

* Thêm / xoá giao dịch theo hũ
* Lưu và hiển thị dữ liệu local
* Biểu đồ tự động vẽ theo hũ

---

# Phiên bản mở rộng đề xuất

* Export CSV / Excel giao dịch
* Giao diện mobile chi tiết hơn
* Đăng nhập để dự phòng cloud backup
* Tính lãi tiết kiệm theo % mục tiêu
* Đồng bộ với Firebase / Supabase
