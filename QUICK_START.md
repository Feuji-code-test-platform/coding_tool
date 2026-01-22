# Quick Start Guide

## Get Started in 3 Minutes

### Step 1: Extract and Install
```bash
# Extract the project
tar -xzf coding-platform-frontend.tar.gz
cd coding-platform-frontend

# Install dependencies (takes 1-2 minutes)
npm install
```

### Step 2: Run the Development Server
```bash
npm run dev
```

The app will open at: **http://localhost:5173**

### Step 3: Explore the App

1. **Login Page**
   - Use any email/password (mock auth for testing)
   - Example: `test@example.com` / `password`

2. **Dashboard** 
   - View 8 mock assessments in card layout
   - Click any card to see details
   - Try the search bar
   - Click "+ New Project" to create assessment

3. **Create Assessment**
   - Fill in job role, difficulty, tech stack, duration
   - Click "Generate Questions"
   - Select 3 questions from 12 options (6 AI + 6 DB)
   - Click "Continue to Add Candidates"

4. **Assessment Details**
   - View candidates table
   - Click "Add Candidate" to open modal
   - Add candidate details
   - View status indicators

## Key Features to Try

✨ **Search** - Type in the search box on dashboard
📝 **Create** - Walk through the multi-step wizard
👥 **Manage** - Add/remove candidates
🎨 **Responsive** - Resize browser to see mobile view
🔄 **Navigation** - Use sidebar to navigate

## Mock Data Included

- 8 sample assessments
- 3 sample candidates per assessment
- 12 coding questions (6 AI + 6 database)
- Various status states (active, draft, in progress, completed)

## What Works Without Backend

✅ Full navigation
✅ Form validation
✅ Search filtering
✅ Modal interactions
✅ Card hover effects
✅ Responsive layout
✅ All UI components
✅ Multi-step wizard
✅ Table operations

## File Structure (Important Files)

```
src/
├── pages/
│   ├── Login.jsx          # Login page
│   ├── Dashboard.jsx      # Main dashboard
│   ├── CreateAssessment.jsx  # Create wizard
│   └── AssessmentDetails.jsx # Candidate management
├── components/
│   ├── Sidebar/           # Left navigation
│   ├── Layout/            # Page wrapper
│   └── AssessmentCard/    # Card component
└── App.jsx                # Main router
```

## Customization (Quick Changes)

### Change Brand Name
Find and replace "CodeHire" in:
- `src/components/Sidebar/Sidebar.jsx`
- `src/pages/Login.jsx`
- `src/pages/Register.jsx`

### Change Primary Color
Edit `src/App.css`:
```css
:root {
  --primary-color: #YOUR_COLOR;
}
```

### Change Logo
Replace `<FileCode>` icon components with your logo SVG

## Build for Production

```bash
npm run build
```

Output will be in `dist/` folder - ready to deploy!

## Need Help?

See the full **IMPLEMENTATION_GUIDE.md** for:
- Detailed page descriptions
- API integration guide
- Backend schema
- Customization guide
- Complete documentation

## Screenshot Guide

**Dashboard:**
- Grid of colorful assessment cards
- Search bar and new project button
- Sidebar navigation on left

**Create Assessment:**
- Step 1: Form for assessment details
- Step 2: Two-column question selector
- Progress indicator at top

**Assessment Details:**
- Tabs for Candidates/Questions/Results
- Table with candidate information
- Action buttons for bulk upload and add

**Login:**
- Centered card on gradient background
- Beautiful icon inputs
- Remember me checkbox

Enjoy your new coding assessment platform! 🚀
