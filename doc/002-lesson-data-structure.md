# 002 - Kho Dữ Liệu (data.js) 📊

Chào Marc! Bây giờ chúng ta sẽ khám phá "kho dữ liệu" của ứng dụng.

## 🏪 data.js là gì?

Hãy tưởng tượng `data.js` như một cửa hàng tạp hóa:
- **Kệ hàng**: Chứa thông tin về 5 cái hũ
- **Sổ sách**: Ghi lại tất cả giao dịch
- **Bảng giá**: Danh sách các loại tiền crypto
- **Quầy thu ngân**: Quản lý trạng thái hiện tại

## 🗂️ Cấu trúc dữ liệu chính

### 1. jarsConfig - "Thông tin 5 cái hũ"
```javascript
export const jarsConfig = {
    'spending': { name: 'Chi tiêu', percentage: 55, color: '#FF6B6B' },
    'emergency': { name: 'Khẩn cấp', percentage: 10, color: '#4ECDC4' },
    'savings': { name: 'Tiết kiệm', percentage: 10, color: '#45B7D1' },
    'investment': { name: 'Đầu tư', percentage: 20, color: '#96CEB4' },
    'learning': { name: 'Học tập', percentage: 5, color: '#FFEAA7' }
};
```

### 2. state - "Trạng thái hiện tại"
```javascript
export let state = {
    jars: {
        'spending': { balance: 0 },
        'emergency': { balance: 0 },
        // ... các hũ khác
    },
    transactions: [], // Danh sách giao dịch
    portfolio: {}     // Danh mục đầu tư
};
```

## 🎯 Ví dụ thực tế

Giống như bạn có một cuốn sổ ghi chép:
- **Trang 1**: "Hũ chi tiêu còn 500k"
- **Trang 2**: "Hôm nay mua cà phê 50k"
- **Trang 3**: "Bitcoin hiện giá 1 tỷ"

---

**Câu hỏi cho Marc**: Bạn hiểu vai trò của data.js như thế nào?
Hãy trả lời: 1 (confused), 2 (kind of get it), 3 (got it!)
