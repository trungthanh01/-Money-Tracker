# Giải Thích Luồng Code JavaScript - Money Tracker

Tài liệu này giải thích chi tiết kiến trúc và luồng hoạt động của các file JavaScript trong ứng dụng, giúp bạn dễ dàng hiểu, bảo trì và mở rộng code trong tương lai.

---

## 1. Triết Lý Thiết Kế

- **Module Hóa (ES Modules)**: Toàn bộ code được chia thành các file nhỏ (module), mỗi file có một chức năng duy nhất. Điều này giúp code dễ đọc, dễ test và tránh "rối" như một file lớn.
- **Tách Biệt Luồng Logic (Separation of Concerns)**:
  - **Data (`store/`)**: Logic liên quan đến lưu trữ và truy xuất dữ liệu.
  - **UI (`a-ui/`, `f-chart/`)**: Logic chỉ để "vẽ" dữ liệu lên màn hình.
  - **Event Handling (`c-modal-form/`, `d-logic/`)**: Logic xử lý tương tác của người dùng (click, submit).
- **Single Source of Truth**: Toàn bộ dữ liệu của ứng dụng được quản lý duy nhất tại `store/local-storage.js`. Bất kỳ module nào muốn đọc/ghi dữ liệu đều phải thông qua module này.
- **Không Phụ Thuộc Vòng (No Circular Dependencies)**: Các module được thiết kế để import theo một chiều, tránh việc module A import module B và module B lại import module A, gây ra lỗi.

---

## 2. Cấu Trúc Thư Mục

```
/Front-End/src/javascript/
├── dashboard/
│   ├── a-ui/
│   │   ├── render-ui.js      # "Vẽ" các thành phần UI chính
│   │   └── toast.js          # Hiển thị thông báo nhỏ
│   ├── c-modal-form/
│   │   ├── form-editSalary.js  # Chuẩn bị modal sửa lương
│   │   ├── form-expenses.js    # Chuẩn bị modal chi tiêu
│   │   ├── form-helpers.js     # Các hàm hỗ trợ cho form
│   │   ├── form-income.js      # Chuẩn bị modal thu nhập
│   │   └── modal-handler.js    # Quản lý hiện/ẩn modal chung
│   ├── d-logic/
│   │   ├── logic-editSalary.js # Xử lý submit form lương
│   │   └── save-logic.js       # Xử lý submit form giao dịch
│   ├── f-chart/
│   │   └── chart.js          # "Vẽ" và cập nhật biểu đồ
│   └── dashboard.js          # => ENTRY POINT - Điểm bắt đầu của app
└── setting/
│   ├── b-currency/
│   │   └── currency-switch.js# Xử lý đổi tiền tệ
│   ├── c-lang/
│   │   ├── en.json           # Dịch tiếng Anh
│   │   ├── lang-switch.js    # Logic đổi ngôn ngữ
│   │   └── vi.json           # Dịch tiếng Việt
│   └── d-data-manage/
│       ├── export-data.js    # Logic xuất dữ liệu
│       ├── import-data.js    # Logic nhập dữ liệu
│       └── reset-data.js     # Logic reset dữ liệu
└── store/
    └── local-storage.js      # => TRÁI TIM - Quản lý toàn bộ dữ liệu
```

---

## 3. Luồng Hoạt Động Chi Tiết

Mọi thứ bắt đầu từ `index.html` gọi đến `dashboard.js`.

### Bước 1: Khởi Động (`dashboard.js`)

1.  **`document.addEventListener('DOMContentLoaded', main);`**: Chờ cho toàn bộ HTML được tải xong, sau đó gọi hàm `main()`.
2.  **Hàm `main()`**:
    - **`initializeI18n(updateDashboardUI)`**: **Quan trọng!** Khởi tạo hệ thống đa ngôn ngữ (`lang-switch.js`) đầu tiên. Nó sẽ tải file ngôn ngữ (`vi.json` hoặc `en.json`) và dịch các nội dung tĩnh trong HTML. Nó nhận `updateDashboardUI` làm "callback" để sau khi đổi ngôn ngữ, UI có thể được vẽ lại.
    - **`bindEventListeners()`**: Gọi hàm này để "gắn" tất cả các sự kiện click, submit vào các nút và form tương ứng.
    - **`updateDashboardUI()`**: Gọi hàm render chính từ `render-ui.js` để "vẽ" dữ liệu (số dư, các hủ, giao dịch...) lên màn hình lần đầu tiên.
    - **Kiểm tra người dùng mới**: Gọi `getSalary()` từ `local-storage.js`. Nếu lương bằng 0, nó sẽ hiện thông báo chào mừng và tự động mở modal nhập lương.

### Bước 2: Gắn Sự Kiện (`dashboard.js` -> `bindEventListeners()`)

Hàm này gọi một loạt các hàm `initialize...()` từ các module khác:
- `initializeAddIncomeButton()`, `initializeAddExpenseButton()`, `initializeEditSalaryButton()`: Gắn sự kiện `click` cho 3 nút chính trên dashboard.
- `initializeTransactionForm()`, `initializeSalaryForm()`: Gắn sự kiện `submit` cho 2 form trong các modal.
- `initializeCurrency()`, `initializeExportData()`, etc.: Gắn sự kiện cho các nút trong trang Cài đặt.
- `autoFormatNumberInput()`: Gắn sự kiện `input` cho các ô nhập tiền để tự động thêm dấu phẩy.

### Bước 3: Người Dùng Tương Tác (Ví dụ: Click "Thêm Chi Tiêu")

1.  Người dùng click nút `#btn-add-expense`.
2.  Sự kiện `click` trong `form-expenses.js` được kích hoạt.
3.  Nó gọi `setupTransactionModal('expense')`.
4.  Hàm này làm 3 việc:
    - Reset form để xóa dữ liệu cũ.
    - Cập nhật tiêu đề modal thành "Thêm Chi Tiêu".
    - Gọi `populateJarSelect()` từ `form-helpers.js` để điền danh sách các hủ vào dropdown.
    - Gọi `showModal('transaction-modal')` từ `modal-handler.js` để hiện modal lên.

### Bước 4: Người Dùng Gửi Form (Ví dụ: Lưu Giao Dịch)

1.  Người dùng điền thông tin và nhấn nút "Lưu".
2.  Sự kiện `submit` trên `<form id="transaction-form">` được kích hoạt, gọi hàm `handleTransactionSubmit` trong `save-logic.js`.
3.  Hàm này làm các việc sau:
    - Lấy dữ liệu từ các ô input.
    - **Validation**: Kiểm tra xem số tiền có hợp lệ, có đủ số dư trong hủ không. Nếu lỗi, gọi `showToast()` từ `toast.js` để báo lỗi và dừng lại.
    - **Lưu dữ liệu**: Nếu không lỗi, gọi `addTransaction(...)` từ `store/local-storage.js`.
    - `local-storage.js` sẽ cập nhật lại dữ liệu và lưu vào LocalStorage của trình duyệt.
    - **Phản hồi**: Gọi `showToast()` để báo thành công, gọi `hideModal()` để ẩn modal.
    - **Cập nhật UI**: Gọi `updateDashboardUI()` để "vẽ" lại toàn bộ dashboard với dữ liệu mới nhất.

Luồng hoạt động này được áp dụng cho tất cả các tính năng khác (sửa lương, đổi tiền tệ, import/export...), tạo ra một kiến trúc rõ ràng, dễ dự đoán và dễ gỡ lỗi.
