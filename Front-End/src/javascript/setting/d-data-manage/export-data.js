// File: Front-End/src/javascript/setting/d-data-manage/export-data.js
// Module xử lý chức năng xuất dữ liệu.

import { exportData } from '../../store/local-storage.js';
import { showToast } from '../../dashboard/a-ui/toast.js';

/**
 * Khởi tạo nút xuất dữ liệu.
 */
export function initializeExportData() {
    const exportBtn = document.getElementById('export-data-btn');
    if (exportBtn) {
        exportBtn.addEventListener('click', handleExport);
    }
}

/**
 * Xử lý sự kiện xuất dữ liệu ra file JSON.
 */
function handleExport() {
    const data = exportData();
    const dataString = JSON.stringify(data, null, 2);
    const blob = new Blob([dataString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `money-tracker-data-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    
    // Dọn dẹp
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showToast(window.t('toast.dataExported'), 'success');
}
