# TÀI LIỆU GIẢI THÍCH CHI TIẾT JAVASCRIPT CODE
*Giải thích từng file JavaScript theo phương pháp Feynman*

---

## 📁 **CẤU TRÚC CÁC FILE JAVASCRIPT**

```
js/
├── data.js    - Quản lý dữ liệu và LocalStorage
├── ui.js      - Quản lý giao diện và hiển thị
└── app.js     - Điều phối chính và xử lý events
```

---

## 🗄️ **FILE: js/data.js**

### **Mục đích của file:**
File này chịu trách nhiệm quản lý tất cả dữ liệu của ứng dụng, bao gồm:
- Lưu trữ và lấy dữ liệu từ LocalStorage 
- Thêm giao dịch mới (thu nhập/chi tiêu)
- Chỉnh sửa lương và tỉ lệ các hủ
- Format số tiền theo chuẩn Việt Nam

### **Các thành phần chính:**

#### 1. **DEFAULT_DATA - Cấu trúc dữ liệu mặc định**
```javascript
const DEFAULT_DATA = {
  salary: 0,           // Lương hiện tại
  ratios: {...},       // Tỉ lệ % các hủ
  jars: {...},         // Số dư từng hủ
  transactions: []     // Danh sách giao dịch
};
```
**Giải thích:** Đây là "khuôn mẫu" dữ liệu khi user mới bắt đầu dùng app. Giống như tờ giấy trắng để ghi chép tài chính.

#### 2. **JAR_INFO - Thông tin hiển thị các hủ**
```javascript
export const JAR_INFO = {
  debt: {
    name: 'Nợ',
    color: '#ef4444',
    description: 'Tiền chi tiêu hàng ngày...'
  },
  // ... các hủ khác
};
```
**Giải thích:** Đây là "danh bạ" chứa tên, màu sắc, mô tả của từng hủ tiền. UI sẽ dựa vào đây để hiển thị.

#### 3. **Function getData() - Lấy dữ liệu**
```javascript
export function getData() {
  const rawData = localStorage.getItem('money-tracker-data');
  if (!rawData) return JSON.parse(JSON.stringify(DEFAULT_DATA));
  return JSON.parse(rawData);
}
```
**Giải thích theo Feynman:**
- Như việc mở tủ lạnh xem có gì
- `localStorage.getItem()` = mở ngăn tủ có nhãn 'money-tracker-data'
- Nếu ngăn tủ trống (`!rawData`) = trả về bản sao của DEFAULT_DATA
- Nếu có dữ liệu = chuyển từ chuỗi JSON thành object để sử dụng

#### 4. **Function setData() - Lưu dữ liệu**
```javascript
export function setData(data) {
  localStorage.setItem('money-tracker-data', JSON.stringify(data));
}
```
**Giải thích theo Feynman:**
- Như việc cất đồ vào tủ lạnh
- Chuyển object thành chuỗi JSON (đóng gói)
- Cất vào ngăn tủ có nhãn 'money-tracker-data'

#### 5. **Function addTransaction() - Thêm giao dịch**
```javascript
export function addTransaction(type, amount, jar, desc, date) {
  const data = getData();                    // Lấy dữ liệu hiện tại
  const transaction = {                      // Tạo giao dịch mới
    id: 'txn_' + Date.now(),
    type, amount, jar, desc, date
  };
  data.transactions.unshift(transaction);    // Thêm vào đầu danh sách
  
  if (type === 'income') {
    data.jars[jar] += numAmount;             // Thu nhập: cộng tiền
  } else if (type === 'expense') {
    data.jars[jar] -= numAmount;             // Chi tiêu: trừ tiền
  }
  
  setData(data);                             // Lưu lại
  return transaction;
}
```
**Giải thích theo Feynman:**
- Như việc ghi sổ sách kế toán
- Tạo 1 dòng ghi chép mới với ID duy nhất (dùng timestamp)
- Nếu thu nhập = cộng tiền vào hủ đã chọn
- Nếu chi tiêu = trừ tiền khỏi hủ đã chọn
- `unshift()` = thêm vào đầu mảng (giao dịch mới nhất lên trước)

#### 6. **Function editSalary() - Chỉnh sửa lương**
```javascript
export function editSalary(newSalary, newRatios) {
  const data = getData();
  data.salary = Number(newSalary);
  data.ratios = { ...newRatios };
  
  Object.keys(data.jars).forEach(jarName => {
    data.jars[jarName] = Math.round(data.salary * data.ratios[jarName] / 100);
  });
  
  setData(data);
}
```
**Giải thích theo Feynman:**
- Như việc chia lại ngân sách gia đình
- Cập nhật lương mới và tỉ lệ % mới
- Tính lại số tiền cho từng hủ: `lương × tỉ lệ ÷ 100`
- `Math.round()` = làm tròn số để không có số lẻ

#### 7. **Các helper functions**
```javascript
export function formatCurrency(amount) {
  return amount.toLocaleString('vi-VN') + ' ₫';
}
```
**Giải thích:** Format số tiền theo chuẩn Việt Nam (1.500.000 ₫)

---

## 🎨 **FILE: js/ui.js**

### **Mục đích của file:**
File này chịu trách nhiệm về giao diện người dùng:
- Hiển thị số dư, biểu đồ, danh sách giao dịch
- Quản lý modal (popup)
- Render các component UI

### **Các thành phần chính:**

#### 1. **Function updateBalanceDisplay() - Cập nhật số dư**
```javascript
export function updateBalanceDisplay() {
  const totalBalanceEl = document.getElementById('total-balance');
  const totalSalaryEl = document.getElementById('total-salary');
  
  const totalBalance = getTotalBalance();
  const salary = getSalary();
  
  totalBalanceEl.textContent = formatCurrency(totalBalance);
  totalSalaryEl.textContent = formatCurrency(salary);
}
```
**Giải thích theo Feynman:**
- Như việc cập nhật bảng hiển thị số dư ATM
- Lấy element HTML có ID 'total-balance'
- Lấy số liệu từ data module
- Cập nhật nội dung hiển thị với số tiền đã format

#### 2. **Function renderJarCards() - Render các card hủ**
```javascript
export function renderJarCards() {
  const container = document.getElementById('jars-container');
  const jars = getJars();
  container.innerHTML = '';
  
  Object.entries(jars).forEach(([jarKey, balance]) => {
    const jarInfo = JAR_INFO[jarKey];
    const cardEl = document.createElement('div');
    cardEl.innerHTML = `<!-- HTML template -->`;
    container.appendChild(cardEl);
  });
}
```
**Giải thích theo Feynman:**
- Như việc xếp 6 cái hủ tiền lên bàn
- `Object.entries()` = biến object thành mảng [key, value]
- `document.createElement()` = tạo element HTML mới
- Loop qua từng hủ, tạo card HTML, thêm vào container

#### 3. **Function renderChart() - Vẽ biểu đồ**
```javascript
export function renderChart() {
  const canvas = document.getElementById('jar-chart');
  const ctx = canvas.getContext('2d');
  
  // Chuẩn bị dữ liệu
  const chartData = [];
  const chartLabels = [];
  const chartColors = [];
  
  // Tạo chart với Chart.js
  jarChart = new Chart(ctx, {
    type: 'doughnut',
    data: { labels: chartLabels, datasets: [{ data: chartData }] },
    options: { responsive: true }
  });
}
```
**Giải thích theo Feynman:**
- Như việc vẽ biểu đồ tròn trên giấy
- `getContext('2d')` = lấy bút vẽ 2D trên canvas
- Chuẩn bị data thành 3 mảng: số liệu, nhãn, màu sắc
- `new Chart()` = tạo biểu đồ mới với Chart.js library

#### 4. **Modal Management**
```javascript
export function showModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.remove('hidden');
}

export function hideModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.add('hidden');
}
```
**Giải thích theo Feynman:**
- `showModal()` = mở popup (remove class 'hidden')
- `hideModal()` = đóng popup (add class 'hidden')
- Như việc kéo rèm mở/đóng cửa sổ

---

## ⚙️ **FILE: js/app.js**

### **Mục đích của file:**
File này là "trung tâm điều hành" của app:
- Khởi tạo ứng dụng
- Bind events (gán sự kiện cho buttons)
- Xử lý form submit
- Điều phối giữa UI và Data

### **Các thành phần chính:**

#### 1. **Function initApp() - Khởi tạo app**
```javascript
function initApp() {
  console.log('🚀 Money Tracker App Starting...');
  updateAllUI();     // Render UI lần đầu
  bindEvents();      // Gán events
  switchTab('dashboard'); // Hiển thị tab chính
}
```
**Giải thích theo Feynman:**
- Như việc khởi động máy tính
- Hiển thị giao diện ban đầu
- Kết nối các nút bấm với chức năng
- Mở tab dashboard làm mặc định

#### 2. **Function bindEvents() - Gán sự kiện**
```javascript
function bindEvents() {
  document.getElementById('btn-add-income').addEventListener('click', () => {
    setupTransactionModal('income');
  });
  
  document.getElementById('btn-add-expense').addEventListener('click', () => {
    setupTransactionModal('expense');
  });
  // ... các events khác
}
```
**Giải thích theo Feynman:**
- Như việc gắn chuông cửa
- `addEventListener()` = gắn "tai nghe" vào button
- Khi user click button = chạy function tương ứng
- Mỗi button có 1 nhiệm vụ riêng

#### 3. **Event Handlers - Xử lý sự kiện**

**handleTransactionSubmit():**
```javascript
function handleTransactionSubmit(e) {
  e.preventDefault();  // Ngăn form reload page
  
  // Lấy dữ liệu từ form
  const amount = document.getElementById('amount-input').value;
  const description = document.getElementById('description-input').value;
  // ...
  
  // Validate
  if (!amount || Number(amount) <= 0) {
    throw new Error('Vui lòng nhập số tiền hợp lệ');
  }
  
  // Thêm giao dịch
  addTransaction(type, amount, jar, description);
  
  // Cập nhật UI
  updateAllUI();
  showToast('Thành công!');
}
```
**Giải thích theo Feynman:**
- Như việc xử lý đơn đặt hàng
- `e.preventDefault()` = ngăn form gửi đi theo cách mặc định
- Lấy thông tin từ các input fields
- Kiểm tra dữ liệu có hợp lệ không
- Nếu OK = thêm giao dịch và cập nhật hiển thị

#### 4. **First Time User Setup**
```javascript
function checkFirstTimeUser() {
  const salary = getSalary();
  if (salary === 0) {
    setTimeout(() => {
      showToast('Chào mừng bạn!', 'info');
      setTimeout(() => {
        showModal('salary-modal');
      }, 1000);
    }, 500);
  }
}
```
**Giải thích theo Feynman:**
- Như việc hướng dẫn khách hàng mới
- Kiểm tra nếu chưa có lương (= user mới)
- Hiển thị lời chào + mở popup nhập lương
- `setTimeout()` = đặt hẹn giờ để thực hiện

---

## 🔄 **FLOW HOẠT ĐỘNG TỔNG THỂ**

### **1. Khởi động App:**
```
DOMContentLoaded → initApp() → updateAllUI() → bindEvents()
```

### **2. Thêm giao dịch:**
```
Click button → showModal() → User nhập form → handleTransactionSubmit() 
→ addTransaction() → setData() → updateAllUI() → hideModal()
```

### **3. Cập nhật lương:**
```
Click "Nhập lương" → loadSalaryData() → showModal() → User submit 
→ handleSalarySubmit() → editSalary() → setData() → updateAllUI()
```

### **4. Hiển thị dữ liệu:**
```
updateAllUI() → updateBalanceDisplay() + renderJarCards() 
+ renderTransactionsList() + renderChart()
```

---

## 🎯 **NGUYÊN TẮC THIẾT KẾ**

### **1. Separation of Concerns (Tách biệt mối quan tâm):**
- **data.js:** Chỉ lo về dữ liệu
- **ui.js:** Chỉ lo về hiển thị
- **app.js:** Chỉ lo về điều phối

### **2. Single Responsibility (Một trách nhiệm):**
- Mỗi function chỉ làm 1 việc cụ thể
- Dễ debug, maintain, test

### **3. Error Handling (Xử lý lỗi):**
- Try-catch cho mọi operation quan trọng
- Hiển thị thông báo lỗi thân thiện cho user
- Console.log để debug

### **4. User Experience:**
- Toast notifications cho feedback
- Modal để nhập liệu
- Real-time update UI

---

## 🔧 **DEBUGGING TIPS**

### **Console Commands hữu ích:**
```javascript
// Xem dữ liệu hiện tại
MoneyTracker.debugLog();

// Force update UI
MoneyTracker.updateUI();

// Xem raw data
localStorage.getItem('money-tracker-data');
```

### **Common Issues & Solutions:**
1. **UI không update:** Kiểm tra `updateAllUI()` có được gọi sau thay đổi data
2. **Modal không đóng:** Kiểm tra event binding và CSS class 'hidden'
3. **Chart không hiển thị:** Kiểm tra canvas size và Chart.js data format
4. **LocalStorage full:** Implement data cleanup hoặc export feature

---

**🎉 Kết luận:** Code được viết theo nguyên tắc modular, dễ hiểu, dễ maintain. Mỗi file có trách nhiệm rõ ràng, functions nhỏ gọn, có error handling đầy đủ.
