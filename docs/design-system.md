# Money Tracker Design System

Tài liệu này mô tả hệ thống thiết kế cho ứng dụng Money Tracker dựa trên **6 Jar System** và triết lý **Mobile-First**.

---

## 🎨 Visual Design Principles

### Dark Theme Foundation
- **Background**: `#111827` (gray-900) - Màu nền chính
- **Surface**: `#1f2937` (gray-800) - Màu nền các card/modal
- **Border**: `#374151` (gray-700) - Màu viền subtle

### Typography Scale
```css
/* Hierarchy cho mobile */
- H1 (App Title): 1.25rem (20px) - font-weight: 700
- H2 (Card Title): 1.125rem (18px) - font-weight: 600  
- H3 (Section): 1rem (16px) - font-weight: 600
- Body: 1rem (16px) - font-weight: 400
- Small: 0.875rem (14px) - font-weight: 400

/* Desktop scale up */
- H1: 1.5rem → 2rem (large screens)
- Balance Display: 2.5rem → 4rem (ultra wide)
```

---

## 🏺 Jar System Design

### Color Psychology & Mapping
```css
1. 💳 Debt (Nợ): #ef4444 (red-500)
   - Urgency, priority, action needed
   
2. 🛒 Expenses (Chi Tiêu): #3b82f6 (blue-500)  
   - Primary daily needs, stability
   
3. 🚑 Emergency (Khẩn Cấp): #f59e0b (amber-500)
   - Warning, preparation, safety
   
4. 💰 Savings (Tiết Kiệm): #10b981 (emerald-500)
   - Growth, success, future goals
   
5. 📈 Investment (Đầu Tư): #8b5cf6 (violet-500)
   - Premium, sophistication, long-term
   
6. 📚 Learning (Học Tập): #f97316 (orange-500)
   - Energy, creativity, personal growth
```

### Jar Card Anatomy
```html
<div class="jar-card" style="border-left-color: var(--color-jar-*)">
  <div class="jar-card-header">
    <div class="jar-card-title">
      <div class="jar-card-icon">📚</div>
      <h3 class="jar-card-name">Học Tập</h3>
    </div>
    <div class="jar-card-percentage">10%</div>
  </div>
  <div class="jar-card-balance">1.500.000 ₫</div>
</div>
```

### Responsive Jar Grid
```css
/* Mobile: 1 column stack */
@media (max-width: 359px) {
  .jar-grid { grid-template-columns: 1fr; }
}

/* Small Mobile: 2x3 grid */  
@media (min-width: 360px) {
  .jar-grid { grid-template-columns: repeat(2, 1fr); }
}

/* Tablet: 3x2 grid */
@media (min-width: 768px) {
  .jar-grid { grid-template-columns: repeat(3, 1fr); }
}

/* Desktop: 2 columns within dashboard grid */
@media (min-width: 769px) {
  .jar-grid { grid-template-columns: repeat(2, 1fr); }
}

/* Large Desktop: 3 columns optimal */
@media (min-width: 1280px) {
  .jar-grid { grid-template-columns: repeat(3, 1fr); }
}
```

---

## 📱 Mobile Navigation System

### Hamburger Button States
```css
/* Default: 3 lines */
.hamburger-btn::before { box-shadow: 0 6px 0 0 currentColor; }

/* Active: X shape */  
.hamburger-btn.active::before {
  transform: translateX(-50%) rotate(45deg);
  box-shadow: none;
}
.hamburger-btn.active::after {
  transform: translateX(-50%) rotate(-45deg);
}
```

### Slide Navigation
- **Width**: 280px (optimal for thumb reach)
- **Animation**: `transform: translateX(-100%)` → `translateX(0)`
- **Backdrop**: `rgba(0, 0, 0, 0.6)` overlay
- **Z-index Stack**: Overlay (30) → Nav (40) → Button (45)

---

## 🎯 Touch & Interaction Design

### Touch Targets (WCAG 2.1 AA)
- **Minimum Size**: 44px × 44px
- **Buttons**: 48px height for optimal thumb interaction
- **Form Controls**: 48px minimum height
- **Jar Cards**: Full card is tappable area

### Hover States (Desktop Only)
```css
@media (hover: hover) {
  .jar-card:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }
}
```

### Focus Management
- **Visible Focus**: 3px blue outline với contrast
- **Tab Order**: Logical flow từ trái→phải, trên→dưới
- **Skip Links**: Cho screen readers

---

## 📊 Dashboard Grid Architecture

### Mobile Layout (Single Column)
```css
.dashboard-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  /* Order: Summary → Jars → Chart → Transactions */
}
```

### Desktop Layout (12-Column Grid)
```css
@media (min-width: 769px) {
  .dashboard-grid {
    grid-template-columns: repeat(12, 1fr);
    grid-template-areas:
      "summary summary summary summary jars jars jars jars chart chart chart chart"
      "transactions transactions transactions transactions transactions transactions transactions transactions chart chart chart chart";
  }
}
```

### Ultra Wide Layout (16-Column Grid)
```css
@media (min-width: 1536px) {
  .dashboard-grid {
    grid-template-columns: repeat(16, 1fr);
    grid-template-areas:
      "summary summary summary summary jars jars jars jars jars chart chart chart chart chart chart chart"
      "transactions transactions transactions transactions transactions transactions transactions transactions transactions chart chart chart chart chart chart chart";
  }
}
```

---

## 🎭 Animation & Transitions

### Performance-First Animations
```css
/* GPU-accelerated transforms */
.jar-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  will-change: transform; /* Optimize cho frequent hovers */
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Easing Functions
- **Standard**: `ease` (0.25, 0.1, 0.25, 1)
- **Accelerate**: `cubic-bezier(0.4, 0, 1, 1)` cho exit animations
- **Decelerate**: `cubic-bezier(0, 0, 0.2, 1)` cho enter animations

---

## 🔧 Implementation Guidelines

### CSS Custom Properties Usage
```css
/* Component-scoped properties */
.jar-card {
  --jar-color: var(--color-jar-expenses);
  border-left: 4px solid var(--jar-color);
}

/* State variations */
.jar-card[data-jar="debt"] {
  --jar-color: var(--color-jar-debt);
}
```

### Utility Classes
```css
/* Layout utilities */
.sr-only { /* Screen reader only */ }
.hidden { display: none !important; }

/* Spacing system (0.25rem = 4px base) */
.p-1 { padding: 0.25rem; }
.p-2 { padding: 0.5rem; }
.p-4 { padding: 1rem; }
/* ... continue pattern */
```

### Component Naming Convention
```css
/* Block-Element-Modifier pattern */
.jar-card { }                    /* Block */
.jar-card__header { }            /* Element */  
.jar-card__title { }             /* Element */
.jar-card--highlighted { }       /* Modifier */
.jar-card--loading { }           /* State modifier */
```

---

## 📏 Spacing & Layout Scale

### Spacing Scale (rem-based)
```css
:root {
  --space-xs: 0.25rem;   /* 4px */
  --space-sm: 0.5rem;    /* 8px */
  --space-md: 0.75rem;   /* 12px */  
  --space-lg: 1rem;      /* 16px */
  --space-xl: 1.5rem;    /* 24px */
  --space-2xl: 2rem;     /* 32px */
  --space-3xl: 3rem;     /* 48px */
}
```

### Container Sizes
```css
/* Mobile-first containers */
.container {
  width: 100%;
  max-width: 100%;           /* Mobile */
  max-width: 1280px;         /* Desktop */
  max-width: 1536px;         /* Ultra wide */
  padding: 1rem;             /* Mobile */  
  padding: 1.5rem 2rem;      /* Desktop */
  padding: 2.5rem 4rem;      /* Ultra wide */
}
```

Hệ thống thiết kế này đảm bảo consistency, accessibility, và performance optimization cho Money Tracker application.
