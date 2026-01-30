# Candidate Performance Visualization - Visual Guide

## 📊 How It Looks:

The Performance Visualization component displays on the Results Analytics page as a beautiful card with **three main sections**:

---

## 1️⃣ SCORE DISTRIBUTION BREAKDOWN
```
┌─────────────────────────────────────────────────────────────┐
│ Score Distribution                                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ Top 25% (90+)          ████████████ [2]                   │
│ Above Average (80-89)  ████████ [1]                       │
│ Average (70-79)        ██████ [2]                         │
│ Below Average (60-69)  ██ [1]                             │
│ Needs Improvement (<60) [0]                               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Color Scheme:**
- 🟢 **Top 25% (90+)** - Green gradient (#059669 → #10b981)
- 🔵 **Above Average (80-89)** - Cyan gradient (#0891b2 → #06b6d4)
- 🟣 **Average (70-79)** - Purple gradient (#667eea → #764ba2)
- 🟠 **Below Average (60-69)** - Orange gradient (#f59e0b → #f97316)
- 🔴 **Needs Improvement (<60)** - Red gradient (#ef4444 → #dc2626)

---

## 2️⃣ STATUS BREAKDOWN
```
┌─────────────────────────────────────────────────────────────┐
│ Status Breakdown                                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ ● Completed          4 candidates                         │
│ ● In Progress        1 candidate                          │
│ ● Not Started        3 candidates                         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Visual Indicators:**
- 🟢 **Completed** - Solid green dot
- 🟡 **In Progress** - Orange dot with pulse animation (breathing effect)
- ⚫ **Not Started** - Gray dot

---

## 3️⃣ EFFICIENCY METRICS
```
┌─────────────────────────────────────────────────────────────┐
│ Efficiency Metrics                                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ ⚡ Avg Time Utilization: 94.3%                             │
│                                                             │
│ (Light blue background card with icon)                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎨 Design Features:

### **Typography**
- Header: "Performance Analysis" (16px, bold)
- Subtitle: "Candidate achievement levels" (12px, gray)
- Section labels: UPPERCASE, small gray text
- Values: Bold, prominent sizing

### **Layout**
- White background card with rounded corners
- Soft shadow (0 2px 8px rgba(0,0,0,0.08))
- Three vertically stacked sections separated by dividers
- Each section has 12px gap between items

### **Interactive Elements**
- Hover effects on status items (background color change)
- Smooth transitions (0.3s ease) on all bars
- Pulsing animation on "In Progress" indicator

### **Responsive Design**
- On desktop: Full width in 2-column grid
- On tablet: Full width with adjusted spacing
- On mobile: Stack vertically, reduce font sizes

---

## 📋 Example Data Displayed:

With 8 candidates in the system:
- **Completed**: 4 ✅
- **In Progress**: 1 ⏳
- **Not Started**: 3 ❌

**Score Distribution** (of the 4 completed):
- 2 scored 90+ (Top performers)
- 1 scored 80-89 (Above average)
- 2 scored 70-79 (Average)
- 1 scored 60-69 (Below average)
- 0 scored below 60

**Time Efficiency**: 94.3% of allocated time used on average

---

## 🔧 Technical Details:

- **Component**: React functional component
- **Props**: `results` (array of candidate result objects)
- **Calculations**: Dynamic percentile buckets, efficiency metrics
- **Styling**: CSS with gradients, transitions, and animations
- **Icons**: Lucide React (Zap icon for efficiency)

---

## 💡 Perfect For:

✅ Recruiting managers to understand candidate quality
✅ Quick performance overview of assessment batches
✅ Identifying high performers and struggling candidates
✅ Assessing assessment difficulty (via score distribution)
✅ Tracking completion rates and engagement

