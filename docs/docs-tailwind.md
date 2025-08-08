# Giải thích UI với Tailwind (Feynman)

## Nguyên tắc
- Mobile-first: class responsive `sm:`, `lg:` để nâng cấp trên màn hình lớn.
- Tương phản màu sắc: Dark mode dùng nền `bg-gray-900` + chữ `text-white`; Light mode `bg-white` + chữ `text-gray-900`.
- Khoảng cách: `p-4 lg:p-6`, `space-y-4` để nội dung thoáng.

## Pattern chính
- Card: `bg-white rounded-lg shadow-sm p-4 lg:p-6` → dark: đổi sang `bg-gray-800`, text sang `text-gray-100`.
- Header/Nav: Light: `bg-white border-b`; Dark: `bg-gray-800 border-gray-700`.
- Form: Light: `bg-white border-gray-300 text-gray-900`; Dark: `bg-gray-700 border-gray-600 text-white placeholder-gray-400`.
- Buttons: màu trạng thái (xanh lá thu nhập, đỏ chi tiêu, xanh dương lương), tăng padding trên mobile.

## Dark mode áp dụng
- Thay class theo nhóm:
  - Header/Nav → nền tối + chữ sáng.
  - Cards → nền tối, chữ sáng phụ `text-gray-400`.
  - Forms → input tối, placeholder sáng hơn.
  - Modals → content nền tối, heading `text-white`.

## Kiểm tra nhanh
- Bật/tắt theme: xem chữ có đủ tương phản (WCAG) không.
- Trên mobile: focus/active rõ ràng, nút to dễ bấm.
