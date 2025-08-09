// File: Front-End/src/javascript/dashboard/c-modal-form/modal-handler.js
// Module chung để quản lý việc hiển thị và ẩn các modal.

/**
 * Hiển thị một modal.
 * @param {string} modalId - ID của modal cần hiển thị.
 */
export function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('hidden');
    }
}

/**
 * Ẩn một modal.
 * @param {string} modalId - ID của modal cần ẩn.
 */
export function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
    }
}

/**
 * Khởi tạo các event handler chung cho tất cả các modal.
 * (Ví dụ: đóng khi click ra ngoài, nhấn nút Esc, nút cancel).
 */
export function initializeCommonModalHandlers() {
    document.querySelectorAll('.modal-overlay').forEach(modal => {
        // Đóng khi click vào vùng overlay bên ngoài
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                hideModal(modal.id);
            }
        });
    });

    // Tìm tất cả các nút cancel và gán sự kiện
    document.querySelectorAll('#cancel-btn, #cancel-salary-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal-overlay');
            if (modal) {
                hideModal(modal.id);
            }
        });
    });

    // Đóng modal khi nhấn phím Escape
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            document.querySelectorAll('.modal-overlay').forEach(modal => {
                if (!modal.classList.contains('hidden')) {
                    hideModal(modal.id);
                }
            });
        }
    });
}
