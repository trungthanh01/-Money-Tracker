// File: Front-End/src/javascript/setting/c-lang/lang-switch.js
// Module quản lý đa ngôn ngữ (i18n)

import { getData, setData } from '../../store/local-storage.js';

const DEFAULT_LANGUAGE = 'vi';
let translations = {};

/**
 * Tải file ngôn ngữ JSON.
 * @param {string} langCode - Mã ngôn ngữ (ví dụ: 'vi', 'en').
 * @returns {Promise<object|null>} - Dữ liệu dịch hoặc null nếu lỗi.
 */
async function loadLanguageFile(langCode) {
    try {
        // Đường dẫn được tính từ file index.html
        const response = await fetch(`./Front-End/src/javascript/setting/c-lang/${langCode}.json`);
        if (!response.ok) throw new Error(`Failed to load ${langCode}.json`);
        return await response.json();
    } catch (error) {
        console.error(`Error loading language file:`, error);
        return null; // Trả về null nếu không tải được
    }
}

/**
 * Cập nhật tất cả các element có attribute `data-i18n`.
 */
function translateUI() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        // Sử dụng reduce để truy cập key lồng nhau (vd: "header.title")
        const translation = key.split('.').reduce((obj, k) => obj && obj[k], translations);
        if (translation) {
            // Phân biệt các loại element khác nhau
            if (element.placeholder !== undefined) {
                element.placeholder = translation;
            } else {
                element.textContent = translation;
            }
        }
    });
}

/**
 * Hàm dịch một chuỗi văn bản.
 * @param {string} key - Key của chuỗi cần dịch (vd: "toast.dataExported").
 * @returns {string} - Chuỗi đã được dịch hoặc key nếu không tìm thấy.
 */
function t(key) {
    return key.split('.').reduce((obj, k) => obj && obj[k], translations) || key;
}

/**
 * Thay đổi ngôn ngữ của ứng dụng.
 * @param {string} langCode - Mã ngôn ngữ mới.
 * @param {function} [uiRenderer] - Callback để render lại UI sau khi đổi ngôn ngữ.
 */
export async function changeLanguage(langCode, uiRenderer) {
    const newTranslations = await loadLanguageFile(langCode);
    if (newTranslations) {
        translations = newTranslations;
        
        // Lưu lựa chọn ngôn ngữ vào LocalStorage
        const data = getData();
        data.language = langCode;
        setData(data);

        // Cập nhật thuộc tính lang của thẻ <html>
        document.documentElement.lang = langCode;
        
        // Dịch lại toàn bộ UI tĩnh
        translateUI();

        // Render lại các thành phần động của UI
        if (uiRenderer) {
            uiRenderer();
        }

        // Cập nhật giá trị của select dropdown
        const langSelect = document.getElementById('language-select');
        if (langSelect) langSelect.value = langCode;
    }
}

/**
 * Khởi tạo hệ thống i18n.
 * @param {function} [uiRenderer] - Callback để render lại UI sau khi khởi tạo.
 */
export async function initializeI18n(uiRenderer) {
    // Ưu tiên ngôn ngữ đã lưu, nếu không có thì dùng mặc định
    const savedLang = getData().language || DEFAULT_LANGUAGE;
    
    // Gán hàm t vào window để dễ dàng truy cập từ khắp nơi
    window.t = t;

    await changeLanguage(savedLang, uiRenderer);
}
