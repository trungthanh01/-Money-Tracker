# Giải Thích Hệ Thống CSS - Money Tracker (Mobile-First Jar System)

Tài liệu này giải thích cách hệ thống CSS của ứng dụng Money Tracker được thiết kế theo phương pháp **Mobile-First** với focus chính vào **6 Jar System** - hệ thống quản lý tài chính cá nhân hiệu quả.

---

## 1. Triết Lý Thiết Kế

- **Mobile-First + Jar-Centric Design**: Giao diện được xây dựng ưu tiên cho mobile với 6 jar cards là trung tâm. Mỗi jar có màu sắc riêng biệt và được tối ưu cho touch interaction.
- **Dark Theme by Design**: Toàn bộ ứng dụng sử dụng dark theme với tone màu từ `root.css` để tạo cảm giác hiện đại và dễ nhìn trong mọi điều kiện ánh sáng.
- **Component-Based Architecture**: Mỗi thành phần (jar card, transaction item, modal...) được thiết kế như một component độc lập với state riêng (hover, active, focus).
- **Accessibility First**: Tuân thủ WCAG 2.1 AA với touch targets tối thiểu 44px, contrast ratio phù hợp, và hỗ trợ keyboard navigation.

---

## 2. Cấu Trúc File CSS

Cấu trúc đã được refactor để tuân thủ chặt chẽ hơn triết lý Mobile-First:

```
/Front-End/src/style/
├── color/
│   └── root.css       # (Settings) Định nghĩa toàn bộ biến CSS global.
└── main/
    ├── mobile.css     # (Mobile & Base) Chứa toàn bộ style cho mobile (<= 768px) và các style chung.
    └── dashboard.css  # (Desktop) Chỉ chứa các media query cho desktop (> 768px).
```

### 2.1. `color/root.css`

File nền tảng, định nghĩa "DNA" của giao diện. Mọi giá trị về màu sắc, font, bo góc, bóng đổ... đều được khai báo tại đây dưới dạng biến CSS.

### 2.2. `main/mobile.css`

Đây là file CSS **chính** và **quan trọng nhất**, chứa toàn bộ thiết kế mobile-first:

1.  **Jar System Components**: 
    - `.jar-card`: Component chính cho 6 hủ tiền với responsive grid
    - Mỗi jar có màu border-left riêng và hover effects
    - Grid responsive: 1 cột (mobile) → 2 cột (360px+) → 3 cột (768px+)

2.  **Mobile Navigation System**:
    - `.hamburger-btn`: Animated hamburger với 3 gạch → X khi active
    - `.mobile-nav`: Slide-in panel từ trái với backdrop overlay
    - Touch-friendly với min-height 44px cho tất cả interactive elements

3.  **Dashboard Layout**:
    - Single column grid cho mobile
    - Summary card với total balance prominently displayed
    - Chart integration với responsive legend
    - Recent transactions với visual hierarchy

4.  **Component Library**:
    - Button system với 5 variants (primary, success, danger, warning, secondary)
    - Form controls với focus states và proper touch targets
    - Modal system với backdrop và smooth animations
    - Toast notifications system

### 2.3. `main/dashboard.css`

File này chứa **progressive enhancement** cho các màn hình lớn hơn:

- **`@media (min-width: 769px)` - Tablet Landscape & Desktop**:
  - Ẩn mobile navigation, hiển thị desktop nav với tab system
  - CSS Grid 12-column layout: `grid-template-areas` cho optimal space usage
  - Jar grid chuyển thành 2 cột, chart được expand
  - Enhanced typography và spacing cho desktop experience

- **`@media (min-width: 1280px)` - Large Desktop**:
  - Jar grid chuyển thành 3 cột cho better visual balance
  - Increased container max-width và padding
  - Enhanced chart size và legend layout

- **`@media (min-width: 1536px)` - Ultra Wide**:
  - 16-column grid system cho maximum screen utilization
  - Jar grid vẫn giữ 3 cột nhưng với optimal spacing
  - Premium spacing và typography scale

- **Special Media Queries**:
  - `@media (prefers-reduced-motion)`: Disable animations cho accessibility
  - `@media print`: Print-optimized layout
  - `@media (-webkit-min-device-pixel-ratio: 2)`: Retina display optimizations

---

## 3. Responsive Breakpoint Strategy

### 3.1. Breakpoint System
```css
/* Mobile First Base Styles */
/* Default: 320px+ */

@media (min-width: 360px) { /* Small Mobile */ }
@media (min-width: 480px) { /* Large Mobile */ }  
@media (min-width: 768px) { /* Tablet Portrait */ }
@media (min-width: 769px) { /* Tablet Landscape+ */ }
@media (min-width: 1280px) { /* Large Desktop */ }
@media (min-width: 1536px) { /* Ultra Wide */ }
```

### 3.2. Jar Grid Responsive Behavior
- **320px+**: 1 column (stacked jars)
- **360px+**: 2 columns (2x3 grid)
- **768px+**: 3 columns (3x2 grid) 
- **769px+**: 2 columns trong desktop grid
- **1280px+**: 3 columns cho optimal desktop experience

### 3.3. Performance Strategy

1. **Mobile-First Loading**: Base styles được optimize cho mobile
2. **Progressive Enhancement**: Desktop styles chỉ load khi cần thiết
3. **Critical CSS Inlining**: Có thể inline critical mobile CSS vào HTML
4. **Tree Shaking**: Unused styles có thể được remove trong production

### 3.4. Component State Management

- **Hover States**: Chỉ active trên non-touch devices
- **Focus States**: Keyboard navigation support
- **Active States**: Touch feedback cho mobile
- **Loading States**: Skeleton screens cho jar cards

## 4. Jar System Design Principles

### 4.1. Color Coding System
```css
/* Mỗi jar có màu riêng từ root.css */
--color-jar-debt: #ef4444;       /* Đỏ - Urgent */
--color-jar-expenses: #3b82f6;   /* Xanh dương - Primary */  
--color-jar-emergency: #f59e0b;  /* Vàng - Warning */
--color-jar-savings: #10b981;    /* Xanh lá - Success */
--color-jar-investment: #8b5cf6; /* Tím - Future */
--color-jar-learning: #f97316;   /* Cam - Growth */
```

### 4.2. Visual Hierarchy
1. **Border-left accent**: 4px colored border
2. **Icon**: Contextual emoji/icon cho mỗi jar
3. **Balance**: Prominent typography
4. **Percentage**: Subtle indicator

### 4.3. Interaction Design
- **Touch targets**: Minimum 44px
- **Hover effects**: Subtle lift và glow
- **Loading states**: Shimmer animation
- **Empty states**: Helpful messaging

Thiết kế này đảm bảo ứng dụng Money Tracker có trải nghiệm nhất quán từ mobile đến desktop, với 6 jar system luôn là trung tâm của giao diện.
