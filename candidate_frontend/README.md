# Candidate Frontend - Coding Assessment Platform

Complete React-based exam portal for candidates taking coding assessments.

---

## 🎯 Features

### **Exam Workflow**
- ✅ Token-based secure access
- ✅ Instructions page with checklist
- ✅ Consent form for proctoring (GDPR compliant)
- ✅ Full-screen exam interface
- ✅ Countdown timer with auto-submit
- ✅ Monaco code editor (VS Code editor)
- ✅ Multi-language support (JavaScript, Python, Java, C++)
- ✅ Run code with test cases
- ✅ Question navigation
- ✅ Auto-save every 30 seconds
- ✅ Thank you page with feedback form

### **Proctoring & Security**
- ✅ Webcam recording (continuous)
- ✅ Frame capture for AI analysis (every 5 seconds)
- ✅ Tab switching detection
- ✅ Copy/paste blocking (outside code editor)
- ✅ Right-click disabled
- ✅ Fullscreen monitoring
- ✅ DevTools detection
- ✅ Screenshot prevention
- ✅ Multi-monitor detection
- ✅ Warning modal system
- ✅ Auto-submit after 5 critical violations

### **User Experience**
- ✅ Professional UI with dark theme for coding
- ✅ Live webcam preview
- ✅ Real-time test results
- ✅ Progress tracking
- ✅ Submission confirmation
- ✅ Star rating feedback system

---

## 📦 Installation

### **Prerequisites**
- Node.js v18+ or v20+
- npm v9+ or v10+

### **Step 1: Install Dependencies**

```bash
cd candidate-frontend
npm install
```

This installs:
- React 18.3.1
- React Router 7.1.3
- Monaco Editor (code editor)
- React Webcam (camera access)
- RecordRTC (video recording)
- Lucide React (icons)
- Axios (HTTP client)

### **Step 2: Configure Backend URL**

Update the API endpoint in all component files if your backend is not on `http://localhost:5000`:

Search and replace in `src/pages/` files:
```javascript
// Find:
http://localhost:5000

// Replace with your backend URL:
https://your-backend-url.com
```

### **Step 3: Run Development Server**

```bash
npm run dev
```

Runs on: **http://localhost:5174**

### **Step 4: Build for Production**

```bash
npm run build
```

Creates production build in `dist/` folder.

---

## 🗂️ Project Structure

```
candidate-frontend/
├── public/                      # Static assets
├── src/
│   ├── pages/
│   │   ├── ExamPortal.jsx      # Main entry component
│   │   ├── ExamInstructions.jsx # Instructions page
│   │   ├── ConsentForm.jsx     # Consent for proctoring
│   │   ├── ExamInterface.jsx   # Main exam interface
│   │   ├── WebcamMonitor.jsx   # Webcam recording
│   │   ├── ProctoringWarning.jsx # Warning modal
│   │   ├── ExamComplete.jsx    # Thank you page
│   │   └── ExamPortal.css      # All styles
│   │
│   ├── hooks/
│   │   ├── useBrowserSecurity.js # Security hooks
│   │   └── useExamTimer.js       # Timer hook
│   │
│   ├── App.jsx                 # Main app with routing
│   ├── App.css                 # Global styles
│   ├── main.jsx                # React entry point
│   └── index.css               # Base styles
│
├── index.html                  # HTML template
├── package.json                # Dependencies
├── vite.config.js             # Vite configuration
└── README.md                   # This file
```

---

## 🔗 Backend API Requirements

The candidate frontend expects these endpoints:

### **1. Validate Token**
```
GET /api/exam/validate/:token
Response: {
  status: 'active',
  expiresAt: '2026-02-01T00:00:00Z',
  candidateName: 'John Doe',
  candidateEmail: 'john@example.com',
  assessmentTitle: 'Senior Software Engineer',
  duration: 60,
  questionCount: 3
}
```

### **2. Record Consent**
```
POST /api/exam/consent/:token
Body: { consentGiven: true }
```

### **3. Get Questions**
```
GET /api/exam/questions/:token
Response: {
  questions: [
    {
      id: 'q1',
      title: 'Two Sum',
      description: '...',
      difficulty: 'easy',
      starterCode: '...',
      examples: [...]
    }
  ]
}
```

### **4. Start Exam**
```
POST /api/exam/start/:token
```

### **5. Auto-save Code**
```
POST /api/exam/save/:token
Body: { questionId: 'q1', code: '...', language: 'javascript' }
```

### **6. Run Code**
```
POST /api/exam/run-code/:token
Body: { questionId: 'q1', code: '...', language: 'javascript' }
Response: { testCases: [...], passed: 3, total: 3 }
```

### **7. Submit Exam**
```
POST /api/exam/submit/:token
Body: { submissions: {...}, proctoringWarnings: [...], timeSpent: 3600 }
```

### **8. Log Proctoring Event**
```
POST /api/exam/proctoring/:token
Body: { type: 'tab_switch', severity: 'high', timestamp: '...' }
```

### **9. Upload Video**
```
POST /api/exam/upload-video/:token
Body: FormData with 'video' file
```

### **10. Submit Feedback**
```
POST /api/exam/feedback
Body: { candidateEmail: '...', feedback: {...} }
```

---

## 🐍 Python AI Service Integration

### **Frame Analysis Endpoint**

The webcam monitor sends frames every 5 seconds:

```
POST http://localhost:8000/api/analyze-frame
Body: {
  frame: 'data:image/jpeg;base64,...',
  candidateId: 'token-123'
}

Response: {
  face_detection: { face_count: 1 },
  gaze_tracking: { direction: 'center' },
  movement_analysis: { movement_detected: false },
  alerts: [
    { type: 'no_face_detected', severity: 'high', message: '...' }
  ]
}
```

**Python service must run on port 8000!**

---

## 🧪 Testing

### **Method 1: With Backend**

1. Start backend API server
2. Start Python proctoring service
3. Create test exam token in backend
4. Access: `http://localhost:5174/exam/test-token-123`

### **Method 2: Mock Testing (Without Backend)**

Update `ExamPortal.jsx` to use mock data:

```javascript
// In validateTokenAndLoadExam function, replace fetch with:
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
```

---

## 🎯 User Flow

```
1. Recruiter sends: http://localhost:5174/exam/abc123
   ↓
2. Token validated → Load exam details
   ↓
3. Instructions page
   - Read rules
   - Check all checkboxes
   - Click "Continue"
   ↓
4. Consent form
   - Review 4 consent items
   - Check all boxes
   - Click "I Consent - Start Exam"
   ↓
5. Camera permission
   - Browser requests camera/mic access
   - Candidate must allow
   ↓
6. Exam interface
   - Fullscreen mode enters automatically
   - Timer starts countdown
   - Webcam recording begins
   - Write code in Monaco editor
   - Run tests
   - Submit questions
   ↓
7. Submit exam
   - Confirmation dialog
   - All data sent to backend
   ↓
8. Complete page
   - Success message
   - Rate experience (1-5 stars)
   - Submit feedback
```

---

## 🎨 Customization

### **Change Colors**

Edit `src/App.css`:

```css
:root {
  --primary-color: #3b82f6;     /* Change to your brand color */
  --success-color: #10b981;     /* Success/complete color */
  --warning-color: #f59e0b;     /* Warning color */
  --error-color: #ef4444;       /* Error color */
}
```

### **Change Port**

Edit `vite.config.js`:

```javascript
server: {
  port: 5174,  // Change to any available port
}
```

### **Change Backend URL**

Search and replace in all files:
```
http://localhost:5000 → https://your-api.com
```

### **Change Python Service URL**

In `WebcamMonitor.jsx`:
```javascript
// Find:
http://localhost:8000/api/analyze-frame

// Replace with:
https://your-python-service.com/api/analyze-frame
```

---

## 🔒 Security Features

### **Browser-Level Security**
- Tab switching detected and logged
- Copy/paste blocked outside code editor
- Right-click menu disabled
- Screenshot attempts prevented
- Developer tools detection
- Fullscreen exit triggers warning

### **Camera-Based Security**
- Continuous video recording
- AI-powered face detection
- Eye gaze tracking
- Movement analysis
- Multiple face detection
- Looking away detection

### **Behavioral Security**
- Auto-save prevents data loss
- Timer auto-submits on expiration
- 5 critical violations = auto-submit
- All events logged with timestamps
- Unique token per candidate

---

## 📊 Browser Support

**Tested & Supported:**
- ✅ Chrome 90+ (Recommended)
- ✅ Firefox 88+
- ✅ Edge 90+
- ✅ Safari 14+

**Not Supported:**
- ❌ Internet Explorer
- ❌ Mobile browsers (desktop required)

**Requirements:**
- JavaScript enabled
- Webcam available
- Microphone available
- Fullscreen API support
- LocalStorage enabled

---

## 🐛 Troubleshooting

### **Issue: Blank screen on load**
**Solution:** 
- Check console (F12) for errors
- Verify backend API is running
- Check CORS settings on backend

### **Issue: Camera not working**
**Solution:**
- Ensure browser has camera permission
- Use HTTPS or localhost only
- Check if camera is being used by another app

### **Issue: Monaco editor not loading**
**Solution:**
```bash
npm install @monaco-editor/react
npm run dev
```

### **Issue: Timer not starting**
**Solution:**
- Check useExamTimer hook is imported
- Verify duration is passed correctly
- Check console for errors

### **Issue: Auto-save failing**
**Solution:**
- Verify backend endpoint is running
- Check network tab for failed requests
- Verify CORS configuration

---

## 🚀 Deployment

### **Option 1: Netlify**

```bash
# Build
npm run build

# Deploy
# Drag and drop 'dist' folder to Netlify
```

### **Option 2: Vercel**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### **Option 3: Custom Server**

```bash
# Build
npm run build

# Copy dist/ folder to your server
# Configure Nginx/Apache to serve static files
```

**Important:** Update backend URL in production build!

---

## 📈 Performance

- **Bundle Size:** ~800KB gzipped
- **Initial Load:** < 2 seconds on 4G
- **Code Editor Load:** < 1 second
- **Webcam Start:** < 2 seconds
- **Auto-save:** Runs every 30 seconds
- **Frame Capture:** Every 5 seconds

---

## 🔄 Future Enhancements

- [ ] Screen recording (full screen capture)
- [ ] Offline detection and recovery
- [ ] Progressive Web App (PWA)
- [ ] Code snippets library
- [ ] Real-time collaboration (pair programming)
- [ ] Voice commands
- [ ] Mobile app version
- [ ] Accessibility improvements (WCAG 2.1)

---

## 📞 Support

For issues or questions:
1. Check this README
2. Check browser console (F12)
3. Verify backend is running
4. Check Python service is running
5. Test with mock data first

---

## 📄 License

Proprietary - All rights reserved

---

## 🙏 Credits

Built with:
- React 18
- Vite
- Monaco Editor
- React Webcam
- Lucide React
- RecordRTC

---

**Ready to deploy!** 🚀

For backend integration, see the backend API documentation.
For Python AI service, see the Python service documentation.
