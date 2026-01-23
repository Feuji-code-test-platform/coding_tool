# CodeHire - Coding Assessment Platform

A modern, full-featured coding assessment platform for recruiters to create, manage, and evaluate technical interviews.

## Features

### Recruiter Dashboard

- 📊 **Assessment Management** - Create and manage coding assessments
- 🎯 **Question Selection** - Choose from AI-generated and database questions
- 👥 **Candidate Management** - Add candidates individually or in bulk
- 📧 **Automated Invites** - Send assessment links to candidates
- 📈 **Results Tracking** - Monitor candidate progress and scores

### Design Highlights

- Modern, clean UI inspired by professional recruitment platforms
- Responsive design that works on desktop, tablet, and mobile
- Beautiful gradient card designs with hover effects
- Intuitive navigation and user-friendly workflows

## Tech Stack

### Frontend

- **React** - UI framework
- **React Router** - Client-side routing
- **Lucide React** - Beautiful icon library
- **Axios** - HTTP client
- **Vite** - Build tool and dev server

### Planned Backend

- **Node.js** with Express
- **PostgreSQL** - Database
- **JWT** - Authentication
- **Anthropic Claude API** - AI question generation
- **AWS S3** - Video storage

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

1. Clone the repository
\`\`\`bash
git clone <repository-url>
cd coding-platform-frontend
\`\`\`

2. Install dependencies
\`\`\`bash
npm install
\`\`\`

3. Start the development server
\`\`\`bash
npm run dev
\`\`\`

4. Open your browser to `http://localhost:5173`

### Mock Authentication

For development, the app uses mock authentication:

- Any email/password combination will work on login
- Registration creates a mock session
- Token is stored in localStorage

## Project Structure

```
coding-platform-frontend/
├── src/
│   ├── components/
│   │   ├── Layout/
│   │   │   ├── Layout.jsx
│   │   │   └── Layout.css
│   │   ├── Sidebar/
│   │   │   ├── Sidebar.jsx
│   │   │   └── Sidebar.css
│   │   └── AssessmentCard/
│   │       ├── AssessmentCard.jsx
│   │       └── AssessmentCard.css
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Auth.css
│   │   ├── Dashboard.jsx
│   │   ├── Dashboard.css
│   │   ├── CreateAssessment.jsx
│   │   ├── CreateAssessment.css
│   │   ├── AssessmentDetails.jsx
│   │   └── AssessmentDetails.css
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── index.html
└── package.json
```

## Key Features Walkthrough

### 1. Dashboard

The main dashboard displays all assessments in a beautiful card grid layout:

- Visual status indicators (Active/Draft)
- Candidate count tracking
- Time since last edit
- Quick access to assessment details

### 2. Create Assessment

Multi-step wizard for creating assessments:

- **Step 1:** Enter job details (role, difficulty, tech stack, duration)
- **Step 2:** Select 3 questions from 12 options (6 AI-generated + 6 from database)
- **Step 3:** Add candidates (coming soon)

### 3. Assessment Details

Comprehensive assessment management:

- **Candidates Tab:** Add, view, and manage candidates
- **Questions Tab:** Review selected questions
- **Results Tab:** View candidate scores and performance
- Add candidates individually or via bulk upload
- Send invites to all candidates at once

### 4. Candidate Management

- Add candidates with name, email, and phone
- Track candidate status (Invited, In Progress, Completed)
- View scores for completed assessments
- Delete candidates if needed

## Upcoming Features

### Candidate Exam Portal

- Secure login with unique tokens
- Instructions and consent screen
- Live coding interface with Monaco editor
- Webcam and microphone monitoring
- Auto-save functionality
- Timer and progress tracking

### Advanced Features

- AI-powered code evaluation
- Video recording playback
- Plagiarism detection
- Analytics and reporting
- Email templates customization
- Bulk candidate import via CSV
- Integration with ATS systems

## API Integration

The frontend is ready to integrate with a backend API. Key endpoints needed:

```
POST   /api/auth/recruiter/register
POST   /api/auth/recruiter/login
POST   /api/assessments/create
GET    /api/assessments/:id
POST   /api/questions/generate-ai
GET    /api/questions/database
POST   /api/candidates/add-single
POST   /api/candidates/add-bulk
POST   /api/candidates/send-invites/:assessmentId
```

## Customization

### Colors

Edit CSS variables in `App.css`:
```
css
:root {
  --primary-color: #ff6b35;  /*Orange accent */
  --secondary-color: #2d3748; /* Dark gray */
  --success-color: #48bb78;   /* Green */
  /* ... more colors*/
}
```

### Branding

- Update logo in `Sidebar.jsx` and auth pages
- Modify `CodeHire` text to your platform name
- Customize gradient backgrounds in auth pages

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style

- Components use functional components with hooks
- CSS modules for component-specific styles
- Consistent naming conventions
- Responsive design patterns

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)

## License

MIT

## Support

For issues and questions, please open an issue on GitHub.
