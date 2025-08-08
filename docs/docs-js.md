# Giải thích kiến trúc JavaScript (Feynman)

Tài liệu này giải thích cách các file JS được tổ chức theo tính năng (feature-based), mỗi file có một trách nhiệm duy nhất (SRP), giúp dễ đọc – dễ bảo trì – không "đổ domino".

## Tổng quan module
- `frontend/src/app.js`: Điểm vào ứng dụng. Khởi tạo i18n, theme, currency, mobile responsive, bind events, update UI.
- `frontend/src/core/data.js`: Quản lý dữ liệu (LocalStorage), schema, tính toán jars, transactions, currency.
- `frontend/src/features/navigation/*`: Chuyển tab (desktop), hamburger menu (mobile).
- `frontend/src/features/salary/*`: Modal lương + định dạng input (`#salary-input`).
- `frontend/src/features/transactions/*`: Modal giao dịch + định dạng input (`#amount-input`) + validate.
- `frontend/src/features/dashboard/*`: Render tổng số dư, thẻ jars, danh sách giao dịch, Chart.js.
- `frontend/src/features/settings/*`: i18n, theme, currency – độc lập nhau.
- `frontend/src/utils/*`: Hàm tiện ích chung (DOM helpers, format số).

## Luồng cơ bản (IPO)
- Input: hành động user (click, submit, chọn setting)
- Process: validate → cập nhật data (LocalStorage) → tính toán số dư → render
- Output: UI cập nhật (text, card, chart), thông báo

## Mobile-first
- Định dạng input theo thời gian thực bằng `toLocaleString()` với debounce, tách riêng cho salary/transactions.
- Trên submit: luôn loại bỏ dấu phẩy trước khi parse number để tránh lỗi mobile.

## Dark theme – độ tương phản
- Thêm/loại class nền/tệp màu chữ ở header, nav, card, form, modal.
- Trạng thái được lưu vào LocalStorage; toggle cập nhật toàn bộ UI.

## Quy tắc đóng gói
- Mỗi thư mục con chịu trách nhiệm 1 phần UI/logic.
- Hàm công khai (public) có tên mô tả rõ; biến mang ý nghĩa, tránh viết tắt.
- Không chồng chéo init: chỉ init từ `app.js`.

## Testing thủ công
- Mobile: nhập lương → Lưu → Dashboard cập nhật jars/total.
- Transactions: nhập số (tự format) → Lưu → danh sách + số dư cập nhật.
- Settings: đổi ngôn ngữ, theme, currency → UI đổi ngay.
