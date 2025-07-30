// File: data.js
// Mục đích: Chứa toàn bộ dữ liệu cấu hình và trạng thái của ứng dụng.
// Đây là "bộ não" chỉ chứa thông tin, không thực hiện hành động.

// --- CONFIGURATION DATA ---
// Dữ liệu cấu hình cố định cho 5 chiếc hũ.
export const jarsConfig = {
    spending: { 
        name: "Chi tiêu", 
        color: "bg-blue-500", 
        description: "Tiền chi tiêu hàng ngày (ăn uống, đi lại, hóa đơn...)" },
    emergency: { 
        name: "Khẩn cấp", 
        color: "bg-red-500", 
        description: "Quỹ dự phòng cho các trường hợp bất ngờ, mục tiêu 6 tháng chi tiêu." },
    saving: { 
        name: "Tiết kiệm", 
        color: "bg-green-500", 
        description: "Dành cho các mục tiêu lớn (du lịch, mua sắm, xe cộ...)" },
    investment: { 
        name: "Đầu tư", 
        color: "bg-purple-500", 
        description: "Gia tăng tài sản qua các kênh đầu tư (chứng khoán, crypto...)" },
    education: { 
        name: "Học tập", 
        color: "bg-yellow-500", 
        description: "Đầu tư cho kiến thức và phát triển bản thân." }
};


// --- STATE DATA ---
// "Bộ nhớ sống" của ứng dụng. Mọi thay đổi của người dùng sẽ được cập nhật ở đây.
// Dùng 'let' vì object này sẽ được gán lại giá trị khi tải từ Local Storage.
export let state = {
    jars: {
        // Dữ liệu số dư sẽ được khởi tạo khi ứng dụng chạy
    },
    transactions: [],
    totalBalance: 0,
    investmentWallet: { apiKey: '', address: ''}
};

// Hàm này không phải là logic xử lý, nó chỉ là một công cụ để cập nhật lại biến state.
// Nó được đặt ở đây để file script.js có thể gọi và thay đổi state.
export function updateState(newState) {
    state = newState;
}
