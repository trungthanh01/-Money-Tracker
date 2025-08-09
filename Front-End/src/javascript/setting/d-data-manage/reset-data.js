// File: Front-End/src/javascript/setting/d-data-manage/reset-data.js
// Module xử lý chức năng reset ứng dụng.

import { clearAllData } from '../../store/local-storage.js';
import { updateDashboardUI } from '../../dashboard/a-ui/render-ui.js';
import { showToast } from '../../dashboard/a-ui/toast.js';
import { changeLanguage } from '../c-lang/lang-switch.js';

/**
 * Khởi tạo nút reset dữ liệu.
 */
export function initializeResetData() {
    const resetBtn = document.getElementById('reset-data-btn');
    if (resetBtn) {
        resetBtn.addEventListener('click', handleReset);
    }
}

/**
 * Xử lý sự kiện reset dữ liệu.
 */
function handleReset() {
    // Hiển thị hộp thoại xác nhận của trình duyệt
    const isConfirmed = confirm(window.t('toast.confirmReset'));
    
    if (isConfirmed) {
        clearAllData();
        
        showToast(window.t('toast.dataReset'), 'success');
        
        // Cập nhật lại UI và có thể cả ngôn ngữ về mặc định
        updateDashboardUI();
        changeLanguage('vi'); // Quay về ngôn ngữ mặc định là Tiếng Việt
    }
}
