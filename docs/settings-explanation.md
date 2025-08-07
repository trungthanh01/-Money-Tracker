# Giải Thích Module Cài Đặt (Settings)

Tài liệu này giải thích chi tiết các tính năng cài đặt được thêm vào Money Tracker App theo phương pháp Feynman.

## 📋 Tổng Quan

App đã được nâng cấp với 3 tính năng cài đặt chính:
1. **Đa ngôn ngữ** (English/Tiếng Việt)
2. **Theme sáng/tối** (Light/Dark mode)
3. **Hỗ trợ liên hệ** (Contact support)

---

## 🌐 1. HỆ THỐNG ĐA NGÔN NGỮ (i18n.js)

### Cách Hoạt Động
```javascript
// Giống như một cuốn từ điển có 2 ngôn ngữ
const TRANSLATIONS = {
  en: { addIncome: 'Add Income' },
  vi: { addIncome: 'Thêm Thu Nhập' }
}

// Hàm lấy text theo ngôn ngữ hiện tại
function t(key) {
  const currentLang = getCurrentLanguage(); // 'en' hoặc 'vi'
  return TRANSLATIONS[currentLang][key];   // Trả về text đúng ngôn ngữ
}
```

### Tính Năng Chi Tiết

#### **Lưu Trữ Preference**
```javascript
// Lưu ngôn ngữ vào localStorage
localStorage.setItem('money-tracker-language', 'vi');

// Đọc ngôn ngữ khi app khởi động
const savedLang = localStorage.getItem('money-tracker-language');
```

#### **Update Toàn Bộ UI**
```javascript
// Khi user thay đổi ngôn ngữ:
function updateAllTexts() {
  // 1. Cập nhật navigation tabs
  dashboardTab.innerHTML = `🏠 ${t('dashboard')}`;
  
  // 2. Cập nhật buttons
  addIncomeBtn.textContent = t('addIncome');
  
  // 3. Cập nhật jar cards
  updateJarCards();
  
  // 4. Cập nhật modal forms
  updateModalTexts();
}
```

#### **Jar Cards I18n**
```javascript
// Mỗi jar card có data-jar-type để identify
<div class="jar-card" data-jar-type="debt">
  <h4>${t('debt')}</h4>        // 'Debt' hoặc 'Nợ'
  <p>${t('debtDesc')}</p>      // Description theo ngôn ngữ
</div>

// Update khi chuyển ngôn ngữ
function updateJarCards() {
  const jarCards = document.querySelectorAll('.jar-card');
  jarCards.forEach(card => {
    const jarType = card.dataset.jarType;
    card.querySelector('h4').textContent = t(jarType);
    card.querySelector('p').textContent = t(jarType + 'Desc');
  });
}
```

#### **Modal Forms I18n**
```javascript
// Transaction modal
const modalTitle = document.getElementById('modal-title');
if (modalTitle.textContent.includes('Income')) {
  modalTitle.textContent = t('addIncomeTitle');
} else {
  modalTitle.textContent = t('addExpenseTitle');
}

// Form fields
document.querySelector('label[for="amount-input"]').textContent = t('amount');
document.getElementById('amount-input').placeholder = t('amount');
```

---

## 🎨 2. HỆ THỐNG THEME (theme.js)

### Cách Hoạt Động
```javascript
// Như công tắc đèn cho website
function applyTheme(theme) {
  if (theme === 'dark') {
    // Bật chế độ tối: nền đen, chữ trắng
    document.body.classList.add('dark', 'bg-gray-900', 'text-white');
    updateElementsForDarkMode();
  } else {
    // Bật chế độ sáng: nền trắng, chữ đen
    document.body.classList.remove('dark', 'bg-gray-900', 'text-white');
    updateElementsForLightMode();
  }
}
```

### Theme System Chi Tiết

#### **Header & Navigation**
```javascript
function updateElementsForDarkMode() {
  // Header: trắng → đen
  header.classList.remove('bg-white', 'border-gray-200');
  header.classList.add('bg-gray-800', 'border-gray-700');
  
  // Navigation tabs: xám → sáng hơn
  navTabs.forEach(tab => {
    if (tab.classList.contains('text-gray-500')) {
      tab.classList.remove('text-gray-500', 'hover:text-gray-700');
      tab.classList.add('text-gray-400', 'hover:text-gray-200');
    }
  });
}
```

#### **Cards & Content**
```javascript
// Cards: nền trắng → nền xám đen
const cards = document.querySelectorAll('.bg-white');
cards.forEach(card => {
  card.classList.remove('bg-white', 'border-gray-200');
  card.classList.add('bg-gray-800', 'border-gray-700');
  
  // Text: đen → trắng
  card.querySelectorAll('.text-gray-700').forEach(text => {
    text.classList.remove('text-gray-700');
    text.classList.add('text-gray-100');
  });
});
```

#### **Form Elements**
```javascript
function updateFormElementsForDarkMode() {
  // Input fields: nền trắng → nền xám đen
  const inputs = document.querySelectorAll('input, select, textarea');
  inputs.forEach(input => {
    input.classList.remove('bg-white', 'border-gray-300', 'text-gray-900');
    input.classList.add('bg-gray-700', 'border-gray-600', 'text-white', 'placeholder-gray-400');
    
    // Focus ring: xanh đậm → xanh sáng
    input.classList.remove('focus:ring-blue-500');
    input.classList.add('focus:ring-blue-400');
  });
}
```

#### **Modals**
```javascript
function updateModalsForDarkMode() {
  const modals = document.querySelectorAll('.fixed.inset-0');
  modals.forEach(modal => {
    // Modal overlay đậm hơn
    modal.classList.add('bg-opacity-80');
    
    const content = modal.querySelector('.bg-white');
    if (content) {
      // Modal content: trắng → xám đen
      content.classList.remove('bg-white');
      content.classList.add('bg-gray-800', 'border-gray-700');
      
      // Modal text: đen → trắng
      content.querySelectorAll('.text-gray-700').forEach(text => {
        text.classList.remove('text-gray-700');
        text.classList.add('text-gray-100');
      });
    }
  });
}
```

#### **System Theme Detection**
```javascript
// Tự động detect system preference
function getCurrentTheme() {
  const savedTheme = localStorage.getItem('money-tracker-theme');
  
  if (!savedTheme) {
    // Nếu chưa có setting, check system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
  }
  
  return savedTheme || 'light';
}

// Listen for system theme changes
const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
mediaQuery.addEventListener('change', (e) => {
  if (e.matches) {
    applyTheme('dark');
  } else {
    applyTheme('light');
  }
});
```

---

## 🆘 3. HỖ TRỢ LIÊN HỆ

### Email Support
```html
<!-- Mailto link tự động mở email client -->
<a href="mailto:trungthanh.marcus@gmail.com" class="bg-blue-500 text-white px-4 py-2 rounded-lg">
  Gửi Email
</a>
```

### Support Information
- **Email**: trungthanh.marcus@gmail.com
- **Response time**: 24-48 giờ
- **Auto-format**: Subject line và body được format sẵn

---

## ⚙️ 4. SETTINGS TAB UI

### Layout Structure
```html
<div id="settings-tab" class="tab-content hidden">
  <!-- Language Settings -->
  <div class="bg-white rounded-lg shadow-sm p-6">
    <h3>🌐 Ngôn Ngữ</h3>
    <select id="language-select">
      <option value="en">English</option>
      <option value="vi">Tiếng Việt</option>
    </select>
  </div>
  
  <!-- Theme Settings -->
  <div class="bg-white rounded-lg shadow-sm p-6">
    <h3>🎨 Giao Diện</h3>
    <div class="grid grid-cols-2 gap-3">
      <button id="light-mode-btn">Light Mode</button>
      <button id="dark-mode-btn">Dark Mode</button>
    </div>
  </div>
  
  <!-- Support Settings -->
  <div class="bg-white rounded-lg shadow-sm p-6">
    <h3>🆘 Hỗ Trợ</h3>
    <a href="mailto:trungthanh.marcus@gmail.com">Contact Support</a>
  </div>
  
  <!-- Data Management -->
  <div class="bg-white rounded-lg shadow-sm p-6">
    <h3>💾 Quản Lý Dữ Liệu</h3>
    <button id="export-data-btn">📤 Export Data</button>
    <button id="import-data-btn">📥 Import Data</button>
    <button id="clear-data-btn">🗑️ Clear All Data</button>
  </div>
</div>
```

---

## 🔧 5. INTEGRATION VỚI APP CHÍNH

### Event Handlers (app.js)
```javascript
// Language change
document.getElementById('language-select').addEventListener('change', (e) => {
  setLanguage(e.target.value);                    // Set new language
  showToast(t('languageChanged'), 'success');    // Show success message
});

// Theme change
document.getElementById('light-mode-btn').addEventListener('click', () => {
  setTheme('light');                              // Apply light theme
  updateThemeButtons();                           // Update button states
  showToast(t('themeChanged'), 'success');       // Show feedback
});

// Data management
document.getElementById('export-data-btn').addEventListener('click', handleExportData);
document.getElementById('import-data-btn').addEventListener('click', handleImportData);
document.getElementById('clear-data-btn').addEventListener('click', handleClearData);
```

### Data Management Functions
```javascript
function handleExportData() {
  try {
    const data = exportData();                    // Get all app data
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    // Create download link
    const a = document.createElement('a');
    a.href = url;
    a.download = `money-tracker-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    
    showToast(t('exportSuccess'), 'success');
  } catch (error) {
    showToast(t('exportError'), 'error');
  }
}

function handleImportData() {
  document.getElementById('import-file-input').click(); // Trigger file picker
}

function handleFileImport(e) {
  const file = e.target.files[0];
  const reader = new FileReader();
  
  reader.onload = (event) => {
    try {
      importData(event.target.result);           // Import data
      updateAllUI();                             // Refresh UI
      showToast(t('importSuccess'), 'success');
    } catch (error) {
      showToast(t('importError'), 'error');
    }
  };
  
  reader.readAsText(file);
}
```

---

## 🎯 6. CÁC ĐIỂM QUAN TRỌNG

### Performance Optimization
- **Lazy loading**: Chỉ load i18n data khi cần
- **Efficient DOM updates**: Chỉ update elements thay đổi
- **Memory management**: Cleanup event listeners

### Error Handling
- **Graceful fallback**: Fallback về English nếu missing translation
- **Silent logging**: Log errors without spamming user
- **User feedback**: Clear success/error messages

### Accessibility
- **Keyboard navigation**: Tab navigation cho theme buttons
- **Screen reader**: Proper ARIA labels
- **Color contrast**: WCAG compliant colors cho dark mode

### Browser Compatibility
- **LocalStorage**: Fallback nếu không support
- **System theme**: Fallback nếu không support prefers-color-scheme
- **File API**: Graceful degradation cho import/export

---

## 🚀 7. CÁCH SỬ DỤNG

### Đổi Ngôn Ngữ
1. Vào tab "⚙️ Cài Đặt"
2. Section "🌐 Ngôn Ngữ"
3. Chọn "English" hoặc "Tiếng Việt"
4. UI tự động cập nhật ngay lập tức

### Đổi Theme
1. Vào tab "⚙️ Cài Đặt"
2. Section "🎨 Giao Diện"
3. Click "Giao Diện Sáng" hoặc "Giao Diện Tối"
4. Theme áp dụng ngay lập tức

### Liên Hệ Hỗ Trợ
1. Vào tab "⚙️ Cài Đặt"
2. Section "🆘 Hỗ Trợ"
3. Click "Gửi Email"
4. Email client tự động mở với địa chỉ support

### Quản Lý Dữ Liệu
1. **Export**: Click "📤 Xuất Dữ Liệu" → File JSON được download
2. **Import**: Click "📥 Nhập Dữ Liệu" → Chọn file JSON
3. **Clear**: Click "🗑️ Xóa Tất Cả" → Confirm dialog → Data cleared

---

## ✅ Kết Luận

Hệ thống settings đã được tích hợp hoàn chỉnh với:
- **🌐 Đa ngôn ngữ**: English (default) + Vietnamese
- **🎨 Theme system**: Light/Dark mode với system detection
- **🆘 Support**: Direct email contact
- **💾 Data management**: Export/Import/Clear functionality
- **🔧 Professional UI**: Clean, responsive design
- **⚡ Performance**: Optimized updates và error handling

User experience được cải thiện đáng kể với customization options và professional support system! 🎉
