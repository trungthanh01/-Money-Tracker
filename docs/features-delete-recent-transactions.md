## Tính năng: Xóa Giao Dịch Gần Đây (Delete Recent Transactions)

### Mục tiêu
- Cho phép người dùng xóa nhanh từng giao dịch trong danh sách "Giao dịch gần đây" trên Dashboard bằng nút X, có xác nhận và đồng bộ dữ liệu/UI.

### Phạm vi
- Dashboard: danh sách 5 giao dịch gần đây.
- LocalStorage: thao tác xóa giao dịch theo id, cập nhật số dư hủ liên quan, tổng số dư, biểu đồ.
- i18n: Chuỗi cho tooltip, xác nhận, thông báo hoàn tác (nếu bật).

### Thay đổi UI
- Thêm nút X (icon delete) trên mỗi item giao dịch:
  - Có tooltip (vi/en), `aria-label`, focus ring rõ ràng.
  - Kích thước và vị trí không che nội dung giao dịch.
- Empty state: Nếu không còn giao dịch, hiển thị thông điệp thân thiện.
- Tuỳ chọn: Toast "Hoàn tác" trong 5 giây sau khi xóa (nếu bật trong Cài đặt).

### Luồng xử lý (happy path)
1. Người dùng click nút X trên item giao dịch.
2. Hiển thị confirm dialog: "Bạn có chắc muốn xóa giao dịch này?"
3. Người dùng xác nhận → Xóa giao dịch khỏi LocalStorage theo `transactionId`.
4. Cập nhật số dư hủ tương ứng (cộng lại nếu xóa chi tiêu, trừ nếu xóa thu nhập), tổng số dư và biểu đồ.
5. Cập nhật danh sách gần đây trên UI. Nếu rỗng, hiển thị Empty state.
6. Nếu bật Undo: hiện toast; nếu người dùng hoàn tác, khôi phục giao dịch và UI.

### Dữ liệu & Storage
- Yêu cầu mỗi giao dịch có `id` duy nhất (string hoặc number).
- Xóa: lọc `transactions = transactions.filter(tx => tx.id !== id)` và cập nhật `balances` theo loại giao dịch.
- Persist: ghi lại `transactions`, `balances`, `lastUpdated`.

### i18n (gợi ý key)
- `recent.delete.tooltip`: "Xóa giao dịch" / "Delete transaction"
- `recent.delete.confirm.title`: "Xác nhận xóa"
- `recent.delete.confirm.message`: "Bạn có chắc muốn xóa giao dịch này? Hành động không thể hoàn tác."
- `recent.delete.success`: "Đã xóa giao dịch."
- `recent.empty`: "Chưa có giao dịch nào"
- `recent.undo`: "Hoàn tác"

### Accessibility
- Nút X có `aria-label`, focusable, kích hoạt bằng Enter/Space.
- Màu sắc icon đảm bảo contrast trong Dark mode.
- Confirm dialog có focus trap, nút xác nhận là secondary.

### Tiêu chí chấp nhận (Acceptance Criteria)
- Có thể xóa một giao dịch cụ thể; số dư hủ và tổng số dư cập nhật chính xác.
- Danh sách gần đây cập nhật ngay; biểu đồ cập nhật đồng bộ.
- Refresh trang sau khi xóa vẫn phản ánh trạng thái mới.
- i18n hiển thị đúng theo ngôn ngữ hiện tại.
- Undo (nếu bật) khôi phục dữ liệu chính xác trong khoảng thời gian quy định.

### Kiểm thử đề xuất
- Xóa giao dịch đầu danh sách, cuối danh sách, và khi danh sách chỉ có 1 phần tử.
- Xóa giao dịch thu (income) và chi (expense), kiểm tra số dư hủ liên quan.
- Reload trang sau khi xóa → dữ liệu nhất quán.
- Dark mode: icon, tooltip hiển thị rõ ràng.

### Ghi chú triển khai
- Tách handler: `bindRecentTransactionsEvents()` để gắn sự kiện cho nút X.
- Tránh rerender toàn bộ: chỉ cập nhật danh sách gần đây, số dư hủ liên quan, tổng số dư, biểu đồ.
- Cân nhắc debounce re-render biểu đồ nếu có nhiều thao tác liên tiếp.

