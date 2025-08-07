// js/ui.js
// Module quản lý giao diện người dùng (UI) cho Money Tracker
// Chức năng: Render và cập nhật các component UI, xử lý interaction
// Theo phương pháp Feynman: Giải thích từng function một cách đơn giản

// Import các functions từ module data để lấy/cập nhật dữ liệu
import { 
  JAR_INFO, 
  getTotalBalance, 
  getSalary, 
  getJars, 
  getTransactions, 
  formatCurrency,
  getRatios
} from './data.js';

// === CHART INSTANCE ===
// Biến global để lưu instance của Chart.js
let jarChart = null;

// === FUNCTIONS RENDER UI ===

/**
 * Hàm cập nhật hiển thị tổng số dư và lương
 * Được gọi mỗi khi có thay đổi về tiền
 */
export function updateBalanceDisplay() {
  // Lấy các element HTML cần cập nhật
  const totalBalanceEl = document.getElementById('total-balance');
  const totalSalaryEl = document.getElementById('total-salary');
  
  // Lấy dữ liệu từ data module
  const totalBalance = getTotalBalance();
  const salary = getSalary();
  
  // Cập nhật nội dung HTML với số tiền đã format
  totalBalanceEl.textContent = formatCurrency(totalBalance);
  totalSalaryEl.textContent = formatCurrency(salary);
}

/**
 * Hàm render các card hủ tiền
 * Hiển thị 6 hủ với thông tin: tên, số dư, màu sắc, mô tả
 */
export function renderJarCards() {
  // Lấy container chứa các jar cards
  const container = document.getElementById('jars-container');
  
  // Lấy dữ liệu số dư các hủ
  const jars = getJars();
  
  // Xóa nội dung cũ
  container.innerHTML = '';
  
  // Duyệt qua từng hủ và tạo card HTML
  Object.entries(jars).forEach(([jarKey, balance]) => {
    // Lấy thông tin hiển thị của hủ từ JAR_INFO
    const jarInfo = JAR_INFO[jarKey];
    
    // Tạo element div cho card
    const cardEl = document.createElement('div');
    cardEl.className = 'bg-white rounded-lg shadow-sm p-4 border-l-4';
    cardEl.style.borderLeftColor = jarInfo.color; // Màu viền trái theo màu hủ
    
    // Nội dung HTML của card
    cardEl.innerHTML = `
      <!-- Header với tên hủ và icon màu -->
      <div class="flex items-center justify-between mb-2">
        <h4 class="font-semibold text-gray-700">${jarInfo.name}</h4>
        <div class="w-4 h-4 rounded-full" style="background-color: ${jarInfo.color}"></div>
      </div>
      
      <!-- Số dư của hủ -->
      <div class="text-xl font-bold text-gray-900 mb-2">
        ${formatCurrency(balance)}
      </div>
      
      <!-- Mô tả về hủ -->
      <p class="text-sm text-gray-500">
        ${jarInfo.description}
      </p>
    `;
    
    // Thêm card vào container
    container.appendChild(cardEl);
  });
}

/**
 * Hàm render danh sách giao dịch gần đây
 * @param {number} limit - Số lượng giao dịch hiển thị tối đa (mặc định 5)
 */
export function renderTransactionsList(limit = 5) {
  // Lấy container chứa danh sách giao dịch
  const container = document.getElementById('transactions-list');
  
  // Lấy danh sách giao dịch với giới hạn
  const transactions = getTransactions(limit);
  
  // Nếu không có giao dịch nào
  if (transactions.length === 0) {
    container.innerHTML = `
      <div class="text-center text-gray-500 py-4">
        Chưa có giao dịch nào
      </div>
    `;
    return;
  }
  
  // Xóa nội dung cũ
  container.innerHTML = '';
  
  // Duyệt qua từng giao dịch và tạo HTML
  transactions.forEach(transaction => {
    // Lấy thông tin hủ
    const jarInfo = JAR_INFO[transaction.jar];
    
    // Xác định màu sắc cho loại giao dịch
    const typeColor = transaction.type === 'income' ? 'text-green-600' : 'text-red-600';
    const typeIcon = transaction.type === 'income' ? '+' : '-';
    
    // Tạo element div cho item giao dịch
    const itemEl = document.createElement('div');
    itemEl.className = 'flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0';
    
    // Nội dung HTML của item
    itemEl.innerHTML = `
      <!-- Thông tin giao dịch bên trái -->
      <div class="flex-1">
        <div class="font-medium text-gray-900">${transaction.desc}</div>
        <div class="text-sm text-gray-500">
          ${jarInfo.name} • ${transaction.date}
        </div>
      </div>
      
      <!-- Số tiền bên phải -->
      <div class="text-right">
        <div class="font-semibold ${typeColor}">
          ${typeIcon}${formatCurrency(transaction.amount)}
        </div>
      </div>
    `;
    
    // Thêm item vào container
    container.appendChild(itemEl);
  });
}

/**
 * Hàm render biểu đồ tròn phân bổ tài sản
 * Sử dụng Chart.js để vẽ doughnut chart
 */
export function renderChart() {
  // Lấy canvas element
  const canvas = document.getElementById('jar-chart');
  const ctx = canvas.getContext('2d');
  
  // Lấy dữ liệu số dư các hủ
  const jars = getJars();
  
  // Chuẩn bị dữ liệu cho chart
  const chartData = [];
  const chartLabels = [];
  const chartColors = [];
  
  // Duyệt qua các hủ để tạo data cho chart
  Object.entries(jars).forEach(([jarKey, balance]) => {
    // Chỉ hiển thị hủ có số dư > 0
    if (balance > 0) {
      const jarInfo = JAR_INFO[jarKey];
      chartData.push(balance);
      chartLabels.push(jarInfo.name);
      chartColors.push(jarInfo.color);
    }
  });
  
  // Nếu đã có chart instance cũ, hủy nó để tránh conflict
  if (jarChart) {
    jarChart.destroy();
  }
  
  // Tạo chart mới
  jarChart = new Chart(ctx, {
    type: 'doughnut', // Loại biểu đồ: doughnut (tròn rỗng giữa)
    data: {
      labels: chartLabels,     // Tên các hủ
      datasets: [{
        data: chartData,       // Số dư các hủ
        backgroundColor: chartColors, // Màu các phần
        borderWidth: 2,        // Độ dày viền
        borderColor: '#ffffff' // Màu viền trắng
      }]
    },
    options: {
      responsive: true,          // Tự động resize theo container
      maintainAspectRatio: false, // Không giữ tỉ lệ cố định
      plugins: {
        legend: {
          display: false       // Ẩn legend mặc định (ta sẽ tự tạo)
        },
        tooltip: {
          callbacks: {
            // Custom format cho tooltip khi hover
            label: function(context) {
              const label = context.label;
              const value = formatCurrency(context.parsed);
              return `${label}: ${value}`;
            }
          }
        }
      }
    }
  });
  
  // Render legend tùy chỉnh
  renderChartLegend(chartLabels, chartColors);
}

/**
 * Hàm render legend cho biểu đồ
 * @param {Array} labels - Danh sách tên hủ
 * @param {Array} colors - Danh sách màu sắc
 */
function renderChartLegend(labels, colors) {
  // Lấy container cho legend
  const container = document.getElementById('chart-legend');
  
  // Xóa nội dung cũ
  container.innerHTML = '';
  
  // Tạo legend item cho mỗi hủ
  labels.forEach((label, index) => {
    const color = colors[index];
    
    // Tạo element div cho legend item
    const itemEl = document.createElement('div');
    itemEl.className = 'flex items-center space-x-2';
    
    // Nội dung HTML
    itemEl.innerHTML = `
      <!-- Ô vuông màu -->
      <div class="w-3 h-3 rounded" style="background-color: ${color}"></div>
      <!-- Tên hủ -->
      <span class="text-sm text-gray-600">${label}</span>
    `;
    
    // Thêm vào container
    container.appendChild(itemEl);
  });
}

/**
 * Hàm cập nhật tất cả UI components
 * Được gọi sau mỗi lần thay đổi dữ liệu
 */
export function updateAllUI() {
  updateBalanceDisplay();  // Cập nhật số dư
  renderJarCards();       // Render lại jar cards
  renderTransactionsList(); // Render lại danh sách giao dịch
  renderChart();          // Render lại biểu đồ
}

// === MODAL MANAGEMENT ===

/**
 * Hàm hiển thị modal
 * @param {string} modalId - ID của modal cần hiển thị
 */
export function showModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.remove('hidden');
  
  // Focus vào input đầu tiên trong modal
  const firstInput = modal.querySelector('input');
  if (firstInput) {
    setTimeout(() => firstInput.focus(), 100);
  }
}

/**
 * Hàm ẩn modal
 * @param {string} modalId - ID của modal cần ẩn
 */
export function hideModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.add('hidden');
  
  // Reset form trong modal
  const form = modal.querySelector('form');
  if (form) {
    form.reset();
  }
}

/**
 * Hàm setup modal giao dịch cho thu nhập hoặc chi tiêu
 * @param {string} type - Loại giao dịch: 'income' hoặc 'expense'
 */
export function setupTransactionModal(type) {
  // Lấy các elements
  const modal = document.getElementById('transaction-modal');
  const title = document.getElementById('modal-title');
  
  // Cập nhật tiêu đề modal
  if (type === 'income') {
    title.textContent = 'Thêm Thu Nhập';
  } else {
    title.textContent = 'Thêm Chi Tiêu';
  }
  
  // Lưu loại giao dịch vào data attribute để sử dụng khi submit
  modal.dataset.transactionType = type;
  
  // Hiển thị modal
  showModal('transaction-modal');
}

// === TAB NAVIGATION ===

/**
 * Hàm chuyển đổi giữa các tab
 * @param {string} activeTabId - ID của tab cần active
 */
export function switchTab(activeTabId) {
  // Lấy tất cả tab buttons và tab contents
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  
  // Remove active state từ tất cả tabs
  tabButtons.forEach(btn => {
    btn.classList.remove('border-blue-500', 'text-blue-600');
    btn.classList.add('border-transparent', 'text-gray-500');
  });
  
  // Ẩn tất cả tab contents
  tabContents.forEach(content => {
    content.classList.add('hidden');
  });
  
  // Active tab được chọn
  const activeButton = document.querySelector(`[data-tab="${activeTabId}"]`);
  const activeContent = document.getElementById(`${activeTabId}-tab`);
  
  if (activeButton) {
    activeButton.classList.remove('border-transparent', 'text-gray-500');
    activeButton.classList.add('border-blue-500', 'text-blue-600');
  }
  
  if (activeContent) {
    activeContent.classList.remove('hidden');
  }
}

// === SALARY MODAL HELPERS ===

/**
 * Hàm cập nhật tổng tỉ lệ khi user thay đổi input
 */
export function updateTotalRatio() {
  // Lấy tất cả input tỉ lệ
  const ratioInputs = [
    'debt-ratio', 'expenses-ratio', 'emergency-ratio',
    'savings-ratio', 'investment-ratio', 'learning-ratio'
  ];
  
  // Tính tổng
  let total = 0;
  ratioInputs.forEach(inputId => {
    const input = document.getElementById(inputId);
    total += Number(input.value) || 0;
  });
  
  // Cập nhật hiển thị tổng
  const totalDisplay = document.getElementById('total-ratio');
  totalDisplay.textContent = total;
  
  // Đổi màu nếu tổng khác 100%
  if (total === 100) {
    totalDisplay.className = 'text-green-600 font-semibold';
  } else {
    totalDisplay.className = 'text-red-600 font-semibold';
  }
}

/**
 * Hàm load dữ liệu hiện tại vào salary modal
 */
export function loadSalaryData() {
  // Lấy dữ liệu hiện tại
  const salary = getSalary();
  const ratios = getRatios();
  
  // Load vào form
  document.getElementById('salary-input').value = salary;
  document.getElementById('debt-ratio').value = ratios.debt;
  document.getElementById('expenses-ratio').value = ratios.expenses;
  document.getElementById('emergency-ratio').value = ratios.emergency;
  document.getElementById('savings-ratio').value = ratios.savings;
  document.getElementById('investment-ratio').value = ratios.investment;
  document.getElementById('learning-ratio').value = ratios.learning;
  
  // Cập nhật tổng tỉ lệ
  updateTotalRatio();
}

// === NOTIFICATION HELPERS ===

/**
 * Hàm hiển thị thông báo toast
 * @param {string} message - Nội dung thông báo
 * @param {string} type - Loại thông báo: 'success', 'error', 'info'
 */
export function showToast(message, type = 'success') {
  // Tạo element toast
  const toast = document.createElement('div');
  toast.className = `fixed top-4 right-4 px-6 py-3 rounded-lg text-white z-50 transition-opacity duration-300`;
  
  // Màu sắc theo loại
  switch (type) {
    case 'success':
      toast.classList.add('bg-green-500');
      break;
    case 'error':
      toast.classList.add('bg-red-500');
      break;
    case 'info':
      toast.classList.add('bg-blue-500');
      break;
  }
  
  toast.textContent = message;
  
  // Thêm vào body
  document.body.appendChild(toast);
  
  // Tự động ẩn sau 3 giây
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 300);
  }, 3000);
}
