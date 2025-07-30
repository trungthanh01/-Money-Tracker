import './data.js';
import './input.js';
import './process.js';
import './output.js';

// =================================================================
// MAIN - Điều phối ứng dụng
// =================================================================

// Import các hàm cần thiết
import { renderOutput, renderInvestmentView, setupEventListeners } from './output.js';
import { loadStateFromLocalStorage } from './process.js';

// Khởi tạo ứng dụng
function initializeApp() {
    // Load dữ liệu từ localStorage
    loadStateFromLocalStorage();
    
    // Render dashboard mặc định
    renderOutput();
    
    // Setup event listeners
    setupEventListeners();
    
    // Setup navigation
    setupNavigation();
}

// Setup navigation giữa các view
function setupNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const views = document.querySelectorAll('.view');
    
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetView = button.getAttribute('data-view');
            
            // Cập nhật active state cho navigation
            navButtons.forEach(btn => btn.classList.remove('active-nav-btn'));
            button.classList.add('active-nav-btn');
            
            // Ẩn tất cả views
            views.forEach(view => view.classList.remove('active'));
            
            // Hiển thị view được chọn
            const targetViewElement = document.getElementById(`${targetView}-view`);
            if (targetViewElement) {
                targetViewElement.classList.add('active');
                
                // Render nội dung tương ứng
                switch (targetView) {
                    case 'dashboard':
                        renderOutput();
                        break;
                    case 'investment':
                        renderInvestmentView();
                        break;
                    case 'education':
                        // TODO: Implement education view
                        break;
                }
            }
        });
    });
    
    // Set dashboard làm active mặc định
    const dashboardBtn = document.querySelector('[data-view="dashboard"]');
    if (dashboardBtn) {
        dashboardBtn.classList.add('active-nav-btn');
    }
}

// Khởi chạy ứng dụng khi DOM đã sẵn sàng
document.addEventListener('DOMContentLoaded', initializeApp);