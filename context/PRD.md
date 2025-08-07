# PRODUCT REQUIREMENTS DOCUMENT (PRD)
## Money Tracker - 6 Jar Personal Finance Manager

---

## 📋 **EXECUTIVE SUMMARY**

**Product Vision:** Ứng dụng quản lý tài chính cá nhân đơn giản nhất Việt Nam, giúp người dùng tự động phân bổ lương theo phương pháp 6 hủ và duy trì kỷ luật chi tiêu.

**Success Definition:** 10,000 active users sau 6 tháng, 70% retention rate, users giảm 30% chi tiêu lung tung.

---

## 🎯 **PROBLEM STATEMENT**

### Current Pain Points:
1. **Financial Stress:** 73% nhân viên văn phòng lo lắng về tài chính cuối tháng
2. **No Budget Discipline:** 68% không có kế hoạch phân bổ lương cụ thể  
3. **Complex Tools:** Existing apps (Mint, YNAB) quá phức tạp, nhiều tính năng không cần thiết
4. **Lack of Automation:** Phải tự tính toán, phân chia tiền thủ công mỗi tháng

### Opportunity Size:
- **TAM:** 54 triệu người Việt trong độ tuổi lao động
- **SAM:** 15 triệu người có smartphone + lương ổn định  
- **SOM:** 300,000 early adopters trong năm đầu

---

## 👥 **TARGET USERS & PERSONAS**

### Primary Persona: "Minh - Fresh Graduate"

### Secondary Persona: "Lan - Freelancer"


---

## 💡 **SOLUTION OVERVIEW**

### Core Concept: "6-Jar Money Management System"

### Key Value Propositions:
1. **Zero-Effort Budgeting:** Tự động chia tiền, không cần tính toán
2. **Visual Money Management:** Thấy rõ còn bao nhiêu tiền mỗi hủ  
3. **Behavioral Change:** Tạo thói quen chi tiêu có kỷ luật
4. **No Complex Features:** Chỉ có tính năng cần thiết, không rối rắm

### Differentiation vs Competitors:
| Feature | Money Tracker | Mint | YNAB | Misa |
|---------|---------------|------|------|------|
| Simplicité | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐ | ⭐⭐⭐ |
| Auto Budget | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐ |
| Local Storage | ⭐⭐⭐⭐⭐ | ❌ | ❌ | ❌ |
| Free | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ❌ | ⭐⭐⭐ |
| Vietnamese | ⭐⭐⭐⭐⭐ | ❌ | ❌ | ⭐⭐⭐⭐⭐ |

---

## 🏗️ **CORE FEATURES & USER STORIES**

### Epic 1: Salary Input & Auto-Split
User Story:
"As a fresh graduate, I want to input my monthly salary and see it automatically split into 6 jars with recommended percentages, so I don't have to figure out budgeting myself."
Acceptance Criteria:
User can input salary amount (VND format)
System auto-splits: Debt 20%, Expenses 40%, Emergency 10%, Savings 10%, Investment 10%, Learning 10%
User can adjust percentages, total must equal 100%
Changes reflect immediately in jar balances

### Epic 2: Daily Expense Tracking
User Story:
"As a working professional, I want to quickly log my daily expenses to the appropriate jar and see remaining balance, so I know if I can afford additional purchases."
Acceptance Criteria:
Quick expense entry: amount, description, jar selection
Real-time balance updates
Visual warning when jar balance is low (< 20%)
Transaction history with filters by jar and date


### Epic 3: Visual Financial Dashboard
User Story:
"As someone who is visual, I want to see my money allocation in charts and clear jar cards, so I can quickly understand my financial situation."
Acceptance Criteria:
Doughnut chart showing current jar distribution
6 jar cards with current balance, percentage, and visual progress
Total balance prominently displayed
Color-coded jars for easy recognition
Responsive design for mobile and desktop


### Epic 4: Additional Income Management
User Story:
"As a freelancer with variable income, I want to add extra income to specific jars, so I can maintain my budgeting system even with irregular earnings."
Acceptance Criteria:
"Add Income" button opens modal
User selects which jar(s) to add money to
Option to split extra income across multiple jars
Separate tracking for salary vs additional income
Updates total balance and jar-specific balances


---

## 🛠️ **TECHNICAL REQUIREMENTS**

### Architecture Overview:
Frontend (Client-side only)
├── HTML5 Structure
├── Tailwind CSS (Styling)
├── Vanilla JavaScript (Logic)
├── Chart.js (Visualizations)
└── LocalStorage (Data Persistence)


### Technical Specifications:

#### Frontend Tech Stack:
- **HTML5:** Semantic markup, accessibility features
- **Tailwind CSS 3.x:** Utility-first styling, responsive design
- **JavaScript ES6+:** Modern syntax, modules, async/await
- **Chart.js 4.x:** Interactive charts, responsive
- **LocalStorage API:** Client-side data persistence

#### Data Structure:
```javascript
// User Data Schema
{
  userId: "generated-uuid",
  profile: {
    name: "optional",
    monthlyTarget: 15000000,
    currency: "VND"
  },
  jars: {
    debt: { name: "Nợ", percentage: 20, balance: 3000000, color: "#ef4444" },
    expenses: { name: "Chi tiêu", percentage: 40, balance: 6000000, color: "#06b6d4" },
    emergency: { name: "Khẩn cấp", percentage: 10, balance: 1500000, color: "#f59e0b" },
    savings: { name: "Tiết kiệm", percentage: 10, balance: 1500000, color: "#10b981" },
    investment: { name: "Đầu tư", percentage: 10, balance: 1500000, color: "#8b5cf6" },
    learning: { name: "Học tập", percentage: 10, balance: 1500000, color: "#f97316" }
  },
  transactions: [
    {
      id: "txn-uuid",
      type: "income|expense",
      amount: 50000,
      description: "Cà phê sáng",
      jar: "expenses",
      date: "2024-01-15T08:30:00Z",
      category: "food-drink"
    }
  ],
  settings: {
    theme: "light|dark",
    notifications: true,
    autoBackup: false
  }
}
```

#### Performance Requirements:
- **Load Time:** < 2 seconds on 3G
- **Bundle Size:** < 500KB total
- **Responsiveness:** 60fps animations
- **Offline Support:** Full functionality without internet

#### Security & Privacy:
- **No User Authentication:** Anonymous usage
- **Local Data Only:** No server transmission
- **Data Export:** JSON download for backup
- **Clear Data Option:** Complete reset functionality

---

## 📱 **USER INTERFACE SPECIFICATIONS**

### Design System:

#### Color Palette:
```css
/* Jar Colors */
--debt: #ef4444 (red-500)
--expenses: #06b6d4 (cyan-500)  
--emergency: #f59e0b (amber-500)
--savings: #10b981 (emerald-500)
--investment: #8b5cf6 (violet-500)
--learning: #f97316 (orange-500)

/* UI Colors */
--primary: #1f2937 (gray-800)
--secondary: #6b7280 (gray-500)
--success: #10b981 (emerald-500)
--warning: #f59e0b (amber-500)
--error: #ef4444 (red-500)
```

#### Typography:
- **Primary Font:** Inter (Google Fonts)
- **Headers:** Font weight 600-700
- **Body:** Font weight 400-500
- **Numbers:** Tabular nums for alignment

#### Layout:
Mobile-First Responsive Design
├── Mobile: 320px - 768px (Primary)
├── Tablet: 768px - 1024px
└── Desktop: 1024px+ (Enhanced)

### Screen Specifications:

#### 1. Dashboard (Main Screen)
Components:
┌─────────────────────────────────┐
│ Header: Logo + Total Balance │
├─────────────────────────────────┤
│ Action Buttons: +Income +Expense│
├─────────────────────────────────┤
│ Doughnut Chart (Jar Distribution)│
├─────────────────────────────────┤
│ 6 Jar Cards (2x3 grid mobile) │
├─────────────────────────────────┤
│ Recent Transactions (last 5) │
└─────────────────────────────────┘


#### 2. Income/Expense Modal
Modal Content:
┌─────────────────────┐
│ Amount Input (VND) │
│ Description Input │
│ Jar Selection │
│ [Cancel] [Save] │
└─────────────────────┘


#### 3. Jar Detail View
Jar Breakdown:
┌─────────────────────┐
│ Jar Name + Balance │
│ Progress Bar │
│ Recent Transactions │
│ [Add] [History] │
└─────────────────────┘


---

