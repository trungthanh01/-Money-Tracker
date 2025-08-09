# Giải Thích Hệ Thống CSS - Money Tracker

Tài liệu này giải thích cách hệ thống CSS của ứng dụng được tổ chức và hoạt động, tuân theo phương pháp BEM (Block, Element, Modifier) và kiến trúc ITCSS (Inverted Triangle CSS) ở mức độ đơn giản.

---

## 1. Triết Lý Thiết Kế

- **Dark Mode Mặc Định**: Giao diện được thiết kế chỉ dành cho chế độ tối, giúp tập trung và dễ nhìn vào ban đêm.
- **CSS Variables**: Toàn bộ màu sắc, font chữ, khoảng cách, và các giá trị khác được định nghĩa dưới dạng biến CSS (`--ten-bien`) trong file `root.css`. Điều này giúp việc thay đổi giao diện toàn cục trở nên cực kỳ dễ dàng.
- **Mobile First**: Giao diện được ưu tiên thiết kế cho màn hình di động trước, sau đó mới mở rộng cho desktop thông qua Media Queries (`@media`).
- **Semantic Class Naming**: Tên class mang ý nghĩa về chức năng thay vì chỉ mô tả về giao diện (ví dụ: `.card` thay vì `.box-with-shadow-and-border-radius`).

---

## 2. Cấu Trúc Thư Mục

Cấu trúc CSS được chia nhỏ để dễ quản lý:

```
/Front-End/src/style/
├── color/
│   └── root.css       # (Settings) Định nghĩa toàn bộ biến CSS global
└── main/
    ├── dashboard.css  # (Components & Objects) Style cho layout chính và các thành phần
    ├── mobile.css     # (Components) Style riêng cho điều hướng mobile
    └── setting.css    # (Components) Style riêng cho trang cài đặt
```

### 2.1. `color/root.css`

Đây là file quan trọng nhất, là "bảng màu" của toàn bộ ứng dụng.

- **`--font-primary`**: Font chữ chính.
- **`--color-background`**, **`--color-surface`**, **`--color-border`**: Các màu nền cơ bản.
- **`--color-text-*`**: Các màu chữ.
- **`--color-btn-*`**: Màu cho các trạng thái của button.
- **`--color-jar-*`**: Màu sắc đặc trưng cho từng hủ tiền.
- **`--shadow-*`**, **`--border-radius-*`**: Các hiệu ứng và bo góc.

**Lợi ích**: Nếu sau này bạn muốn đổi màu chủ đạo của app từ xanh dương sang xanh lá, bạn chỉ cần thay đổi giá trị của biến `--color-primary` và `--color-primary-hover` ở một nơi duy nhất.

### 2.2. `main/dashboard.css`

File này chứa phần lớn các quy tắc style cho các thành phần UI chính.

- **Layout (`.container`, `.main-header`, `.dashboard-grid`)**: Các class định hình cấu trúc chung của trang.
- **Generic Components (`.card`, `.btn`, `.form-control`)**: Các class tái sử dụng được cho nhiều thành phần (thẻ, nút bấm, ô nhập liệu). Đây là những "khối lego" bạn có thể dùng ở bất cứ đâu.
- **Dashboard Specific (`.summary-card`, `.jar-card`, `.chart-card`)**: Các class chỉ dành riêng cho các thành phần trên dashboard, áp dụng các style đặc thù.
- **Modals (`.modal-overlay`, `.modal-content`)**: Style cho các hộp thoại pop-up.
- **Toast Notifications (`.toast`)**: Style cho các thông báo nhỏ.
- **Media Queries (`@media (min-width: ...)`):** Nằm ở cuối file, chứa các quy tắc để điều chỉnh layout cho các màn hình lớn hơn (desktop).

### 2.3. `main/mobile.css`

Chỉ chứa các style liên quan đến menu điều hướng trên di động (menu trượt ra từ bên trái). Tách riêng file này giúp code gọn gàng và dễ dàng tìm kiếm khi cần sửa lỗi liên quan đến mobile menu.

- **`.mobile-menu-overlay`**: Lớp phủ màu đen mờ phía sau menu.
- **`.mobile-nav`**: Khung menu chính.
- **`.mobile-nav.open`**: Class được thêm vào bằng JavaScript để kích hoạt animation trượt ra.

### 2.4. `main/setting.css`

Chứa các style dành riêng cho các thành phần chỉ có trên trang Cài đặt, ví dụ như layout của các card cài đặt, các khu vực quản lý dữ liệu, hỗ trợ...

---

## 3. Cách Hoạt Động

1. **`index.html`** sẽ link đến cả 4 file CSS này.
2. Trình duyệt đọc `root.css` đầu tiên để "học" về tất cả các biến màu sắc.
3. Sau đó, nó đọc các file còn lại và áp dụng các style tương ứng cho các class có trong HTML.
4. Khi JavaScript thêm/xóa class (ví dụ: `hidden` cho modal, `open` cho mobile menu), các style tương ứng trong CSS sẽ được kích hoạt, tạo ra các hiệu ứng chuyển động.

Cách tổ chức này giúp code CSS của bạn trở nên rất dễ đọc, dễ bảo trì và dễ mở rộng trong tương lai.
