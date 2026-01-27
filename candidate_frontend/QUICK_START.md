# Quick Start Guide - Candidate Frontend

Get the candidate exam portal running in 5 minutes!

---

## ⚡ 5-Minute Setup

### **Step 1: Extract & Navigate (30 seconds)**

```bash
# Extract the folder
# Navigate into it
cd candidate-frontend

# Verify you're in the right directory
ls
# Should see: package.json, src/, index.html, etc.
```

### **Step 2: Install Dependencies (2 minutes)**

```bash
npm install
```

This installs all required packages:
- React & React Router
- Monaco Editor (code editor)
- React Webcam (camera)
- Icons & utilities

### **Step 3: Start Dev Server (10 seconds)**

```bash
npm run dev
```

You'll see:
```
VITE v7.3.1  ready in 523 ms

➜  Local:   http://localhost:5174/
➜  Network: use --host to expose
```

### **Step 4: Test Access (1 minute)**

Open browser and go to:
```
http://localhost:5174/exam/test-123
```

You'll see the exam portal! (Will show loading since no backend yet)

---

## 🎯 What You Just Set Up

**Frontend is now running on:**
```
http://localhost:5174
```

**To access an exam:**
```
http://localhost:5174/exam/YOUR-TOKEN-HERE
```

---

## 🔗 Connect to Backend

### **If you have backend running:**

1. **Make sure backend is on:** `http://localhost:5000`
2. **Create an exam token** in your backend
3. **Access:** `http://localhost:5174/exam/your-token`

### **If backend is on different URL:**

Update all files in `src/pages/` that have:
```javascript
http://localhost:5000
```

Change to your backend URL:
```javascript
https://your-backend-api.com
```

**Files to update:**
- `src/pages/ExamPortal.jsx`
- `src/pages/ExamInterface.jsx`
- `src/pages/WebcamMonitor.jsx`
- `src/pages/ExamComplete.jsx`

---

## 🧪 Test Without Backend (Mock Mode)

Want to see the UI without backend? 

**Edit `src/pages/ExamPortal.jsx`:**

Replace the `validateTokenAndLoadExam` function with:

```javascript
const validateTokenAndLoadExam = async () => {
  // Mock data for testing
  const mockData = {
    status: 'active',
    expiresAt: new Date(Date.now() + 24*60*60*1000).toISOString(),
    candidateName: 'Test Candidate',
    candidateEmail: 'test@example.com',
    assessmentTitle: 'Software Engineer Assessment',
    duration: 60,
    questionCount: 3
  };
  
  setExamData(mockData);
  setCandidateInfo({
    name: mockData.candidateName,
    email: mockData.candidateEmail,
    assessmentTitle: mockData.assessmentTitle
  });
  
  setCurrentStep('instructions');
};
```

Now access: `http://localhost:5174/exam/anything`

You'll see:
1. ✅ Instructions page
2. ✅ Consent form
3. ⚠️ Exam interface (needs more mock data)

---

## 📦 Project Structure

```
candidate-frontend/
├── src/
│   ├── pages/              # 7 components
│   │   ├── ExamPortal.jsx        # Main entry
│   │   ├── ExamInstructions.jsx   # Instructions
│   │   ├── ConsentForm.jsx        # Consent
│   │   ├── ExamInterface.jsx      # Exam UI
│   │   ├── WebcamMonitor.jsx      # Camera
│   │   ├── ProctoringWarning.jsx  # Warnings
│   │   └── ExamComplete.jsx       # Thank you
│   │
│   ├── hooks/              # 2 custom hooks
│   │   ├── useBrowserSecurity.js  # Security
│   │   └── useExamTimer.js        # Timer
│   │
│   ├── App.jsx            # Router
│   └── main.jsx           # Entry point
│
├── package.json           # Dependencies
├── vite.config.js        # Config
└── index.html            # HTML template
```

---

## 🎨 How It Looks

### **Instructions Page:**
- Purple gradient background
- White card with sections
- Icons for each section
- Checklist before continuing

### **Consent Form:**
- Green gradient background
- 4 consent items with checkboxes
- Camera icon
- Must accept all to proceed

### **Exam Interface:**
- Dark theme (VS Code style)
- 3-panel layout:
  - Left: Questions + Webcam
  - Center: Code editor
  - Right: Navigation
- Timer at top
- Submit button

### **Complete Page:**
- Green success gradient
- Checkmark icon
- 3-step "What's next" section
- Star rating form

---

## 🔧 Configuration

### **Change Port**

Edit `vite.config.js`:
```javascript
server: {
  port: 5174,  // Change this
}
```

### **Change Backend URL**

Search & replace in `src/pages/`:
```
Find: http://localhost:5000
Replace: https://your-api.com
```

### **Change Python Service URL**

In `src/pages/WebcamMonitor.jsx`:
```javascript
// Line ~88
fetch('http://localhost:8000/api/analyze-frame', {
```

Change to your Python service URL.

---

## 🚀 Build for Production

```bash
# Create production build
npm run build

# Output goes to: dist/
# Deploy this folder to your hosting
```

---

## ✅ Verify Installation

**Check 1: Dependencies installed**
```bash
ls node_modules
# Should have many folders
```

**Check 2: Dev server runs**
```bash
npm run dev
# Should show Vite ready message
```

**Check 3: Can access home**
```bash
# Open: http://localhost:5174
# Should show "Invalid Access" message
```

**Check 4: Can access exam route**
```bash
# Open: http://localhost:5174/exam/test
# Should show loading or instructions
```

---

## 🆘 Common Issues

### **Issue: `npm install` fails**
**Fix:**
```bash
# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json
# Or on Windows:
rmdir /s node_modules
del package-lock.json

# Try again
npm install
```

### **Issue: Port 5174 already in use**
**Fix:**
```bash
# Kill process on port 5174
# Mac/Linux:
lsof -ti:5174 | xargs kill -9

# Windows:
netstat -ano | findstr :5174
taskkill /PID [PID] /F

# Or change port in vite.config.js
```

### **Issue: Blank screen**
**Fix:**
- Press F12 to open console
- Look for red error messages
- Share error with developer

### **Issue: Camera not working**
**Fix:**
- Allow camera permission in browser
- Use HTTPS or localhost only
- Check camera isn't used by another app

---

## 📊 What's Included

### **7 Components:**
✅ ExamPortal - Main entry
✅ ExamInstructions - Instructions page
✅ ConsentForm - Proctoring consent
✅ ExamInterface - Coding interface
✅ WebcamMonitor - Camera recording
✅ ProctoringWarning - Warning modal
✅ ExamComplete - Thank you page

### **2 Hooks:**
✅ useBrowserSecurity - Tab switching, copy/paste detection
✅ useExamTimer - Countdown timer

### **Features:**
✅ Monaco code editor
✅ Multi-language support
✅ Webcam recording
✅ AI proctoring integration
✅ Browser security
✅ Auto-save
✅ Test execution
✅ Feedback form

---

## 🎯 Next Steps

1. ✅ **Frontend running** - You're here!
2. ⏭️ **Connect to backend** - See README.md for API endpoints
3. ⏭️ **Set up Python AI service** - For proctoring
4. ⏭️ **Test end-to-end** - Create test exam token
5. ⏭️ **Deploy** - Build and deploy to production

---

## 📞 Need Help?

1. Check `README.md` for detailed docs
2. Check browser console (F12) for errors
3. Verify backend is running
4. Test with mock data first

---

**You're all set! The candidate frontend is ready to use.** 🎉

Next: Connect to backend API (see README.md for endpoints)
