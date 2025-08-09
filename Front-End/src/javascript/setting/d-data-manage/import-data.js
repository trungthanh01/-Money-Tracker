// File: Front-End/src/javascript/setting/d-data-manage/import-data.js
// Module xử lý chức năng nhập dữ liệu.

import { importData } from '../../store/local-storage.js';
import { updateDashboardUI } from '../../dashboard/a-ui/render-ui.js';
import { showToast } from '../../dashboard/a-ui/toast.js';

/**
 * Khởi tạo chức năng nhập dữ liệu.
 */
export function initializeImportData() {
    const importBtn = document.getElementById('import-data-btn');
    const fileInput = document.getElementById('import-file-input');

    if (importBtn && fileInput) {
        // Mở cửa sổ chọn file khi click nút "Import"
        importBtn.addEventListener('click', () => fileInput.click());
        
        // Xử lý khi người dùng chọn file
        fileInput.addEventListener('change', handleFileSelect);
    }
}

/**
 * Xử lý file JSON được người dùng chọn.
 * @param {Event} event - Sự kiện change từ input file.
 */
function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    
    reader.onload = (e) => {
        try {
            const importedData = JSON.parse(e.target.result);
            const success = importData(importedData);
            
            if (success) {
                showToast(window.t('toast.dataImported'), 'success');
                // Render lại toàn bộ UI với dữ liệu mới
                updateDashboardUI();
            } else {
                showToast(window.t('toast.importFailed'), 'error');
            }
        } catch (error) {
            console.error("Import error:", error);
            showToast(window.t('toast.importFailed'), 'error');
        }
    };
    
    reader.onerror = () => {
        showToast(window.t('toast.importFailed'), 'error');
    };

    reader.readAsText(file);

    // Reset input để có thể chọn lại cùng một file
    event.target.value = '';
}
