// File: Front-End/src/javascript/dashboard/f-chart/chart.js
// Module quản lý việc render và cập nhật biểu đồ Chart.js

import { JAR_INFO, getJars } from '../../store/local-storage.js';

let jarChart = null; // Biến để lưu trữ instance của biểu đồ

/**
 * Khởi tạo biểu đồ doughnut.
 */
function initializeChart() {
    const ctx = document.getElementById('jar-chart')?.getContext('2d');
    if (!ctx) return;

    jarChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: [],
            datasets: [{
                data: [],
                backgroundColor: [],
                borderColor: 'var(--color-surface)',
                borderWidth: 2,
                hoverBorderColor: 'var(--color-primary)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '70%',
            plugins: {
                legend: {
                    display: false // Tắt legend mặc định để tự tạo
                },
                tooltip: {
                    enabled: true,
                    backgroundColor: 'var(--color-background)',
                    titleColor: 'var(--color-text-primary)',
                    bodyColor: 'var(--color-text-secondary)',
                    borderColor: 'var(--color-border)',
                    borderWidth: 1,
                    callbacks: {
                        label: function(context) {
                            let label = context.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed !== null) {
                                // Tính toán % để hiển thị trong tooltip
                                const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
                                const percentage = total > 0 ? (context.parsed / total * 100).toFixed(1) : 0;
                                label += `${percentage}%`;
                            }
                            return label;
                        }
                    }
                }
            },
            animation: {
                animateScale: true,
                animateRotate: true
            }
        }
    });
}

/**
 * Cập nhật dữ liệu và hiển thị lại biểu đồ và chú thích.
 * @param {object} jars - Dữ liệu các hủ tiền.
 */
export function updateChart(jars) {
    if (!jarChart) {
        initializeChart();
        if(!jarChart) return; // Nếu vẫn chưa khởi tạo được thì thoát
    }

    const labels = [];
    const data = [];
    const colors = [];

    // Lọc ra các hủ có số dư > 0 để biểu đồ không bị rối
    const jarsWithBalance = Object.keys(jars).filter(key => jars[key].balance > 0);

    jarsWithBalance.forEach(key => {
        const jarInfo = JAR_INFO[key];
        labels.push(window.t ? window.t(jarInfo.nameKey) : jars[key].name);
        data.push(jars[key].balance);
        colors.push(jarInfo.color);
    });
    
    // Cập nhật dữ liệu cho biểu đồ
    jarChart.data.labels = labels;
    jarChart.data.datasets[0].data = data;
    jarChart.data.datasets[0].backgroundColor = colors;
    jarChart.update();

    // Cập nhật chú thích tùy chỉnh
    updateChartLegend(jarsWithBalance);
}

/**
 * Tạo và cập nhật chú thích (legend) tùy chỉnh cho biểu đồ.
 * @param {Array<string>} activeJars - Mảng các key của hủ có số dư > 0.
 */
function updateChartLegend(activeJars) {
    const legendContainer = document.getElementById('chart-legend');
    if (!legendContainer) return;

    if (activeJars.length === 0) {
        legendContainer.innerHTML = '';
        return;
    }

    legendContainer.innerHTML = activeJars.map(key => {
        const jarInfo = JAR_INFO[key];
        const jarName = window.t ? window.t(jarInfo.nameKey) : JAR_INFO[key].name;
        return `
            <div class="legend-item">
                <div class="legend-color-box" style="background-color: ${jarInfo.color};"></div>
                <span>${jarName}</span>
            </div>
        `;
    }).join('');
}
