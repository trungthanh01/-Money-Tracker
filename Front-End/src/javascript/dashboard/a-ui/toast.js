// File: Front-End/src/javascript/dashboard/a-ui/toast.js
// Module cung cấp chức năng hiển thị thông báo toast.

/**
 * Hiển thị một thông báo toast.
 * @param {string} message - Nội dung thông báo.
 * @param {'success' | 'error' | 'warning'} type - Loại thông báo.
 * @param {number} duration - Thời gian hiển thị (ms).
 */
export function showToast(message, type = 'success', duration = 3000) {
    const container = document.getElementById('toast-container');
    if (!container) {
        console.error('Toast container not found!');
        return;
    }
  
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    toast.innerHTML = `
        <span class="toast-message">${message}</span>
        <button class="toast-close-btn">&times;</button>
    `;
  
    container.appendChild(toast);

    // Thêm class 'show' sau một khoảng trễ nhỏ để transition hoạt động
    setTimeout(() => toast.classList.add('show'), 10);
  
    const removeToast = () => {
        toast.classList.remove('show');
        // Xóa element khỏi DOM sau khi transition kết thúc
        toast.addEventListener('transitionend', () => toast.remove());
    };

    // Tự động xóa toast sau một khoảng thời gian
    const timer = setTimeout(removeToast, duration);

    // Cho phép người dùng đóng toast sớm
    toast.querySelector('.toast-close-btn').addEventListener('click', () => {
        clearTimeout(timer);
        removeToast();
    });
}
