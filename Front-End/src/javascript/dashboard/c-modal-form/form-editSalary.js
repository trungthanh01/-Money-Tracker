// File: Front-End/src/javascript/dashboard/c-modal-form/form-editSalary.js
// Xử lý sự kiện và chuẩn bị dữ liệu cho modal "Nhập Lương".

import { showModal } from './modal-handler.js';
import { getSalary, getRatios, formatCurrencyWithSymbol, JAR_INFO } from '../../store/local-storage.js';
import { formatNumberInput, parseFormattedNumber } from './form-helpers.js';

/**
 * Khởi tạo sự kiện cho nút "Nhập Lương".
 */
export function initializeEditSalaryButton() {
    const editSalaryBtn = document.getElementById('btn-edit-salary');
    if (editSalaryBtn) {
        editSalaryBtn.addEventListener('click', () => {
            const salary = getSalary();
            const ratios = getRatios();
            
            // Điền dữ liệu lương hiện tại vào form
            const salaryInput = document.getElementById('salary-input');
            if(salaryInput) {
                salaryInput.value = salary > 0 ? formatNumberInput(String(salary)) : '';
            }
            
            // Điền dữ liệu tỉ lệ hiện tại vào form
            const grid = document.getElementById('jar-ratios-grid');
            if (grid) {
                grid.innerHTML = Object.keys(ratios).map(key => {
                    const jarInfo = JAR_INFO[key];
                    const jarName = window.t ? window.t(jarInfo.nameKey) : key;
                    return `
                        <div class="ratio-item">
                            <label for="${key}-ratio">${jarName}:</label>
                            <input type="number" id="${key}-ratio" value="${ratios[key]}" min="0" max="100" class="form-control-sm ratio-input">
                            <span>%</span>
                        </div>
                    `;
                }).join('');
            }
            
            updateTotalRatioDisplay();
            showModal('salary-modal');
        });
    }
}

/**
 * Cập nhật hiển thị tổng tỉ lệ %.
 */
export function updateTotalRatioDisplay() {
    const totalRatioEl = document.getElementById('total-ratio');
    if (!totalRatioEl) return;
    
    const ratioInputs = document.querySelectorAll('.ratio-input');
    const total = Array.from(ratioInputs).reduce((sum, input) => sum + (Number(input.value) || 0), 0);
    
    totalRatioEl.textContent = total;
    totalRatioEl.parentElement.classList.toggle('error', total !== 100);
}
