import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  CheckCircle2,
  Briefcase,
  ClipboardList,
  MessageSquare,
  Globe,
  Share2,
  ToggleLeft
} from 'lucide-react';
import axios from 'axios';
import './CreateAssessmentEnhanced.css';

function CreateAssessmentEnhanced() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [jobApiState, setJobApiState] = useState({
    loading: false,
    error: '',
    success: ''
  });
  
  const [formData, setFormData] = useState({
    // Step 0: Job Details
    jobTitle: '',
    clientCompany: '',
    shareCompanyDetails: true,
    jobDescription: '',
    experience: '',
    location: '',
    department: '',
    reportsTo: '',
    
    // Step 1: Requirements
    difficulty: 'medium',
    techStack: '',
    duration: 60,
    requiredSkills: [],
    
    // Step 2: Interview Questions
    selectedQuestions: [],
    aiQuestions: [],
    dbQuestions: [],
    
    // Step 3: Career Page
    careerPageEnabled: false,
    
    // Step 4: Share URL
    inviteUrl: '',
    
    // Step 5: Status
    status: 'draft'
  });

  const steps = [
    {
      id: 0,
      title: 'Job Details',
      icon: Briefcase,
      component: JobDetailsStep
    },
    {
      id: 1,
      title: 'Requirements',
      icon: ClipboardList,
      component: RequirementsStep
    },
    {
      id: 2,
      title: 'Interview Questions',
      icon: MessageSquare,
      component: InterviewQuestionsStep
    },
    {
      id: 3,
      title: 'Career Page Publishing',
      icon: Globe,
      component: CareerPageStep
    },
    {
      id: 4,
      title: 'Share Interview URL',
      icon: Share2,
      component: ShareURLStep
    },
    {
      id: 5,
      title: 'Job Status',
      icon: ToggleLeft,
      component: JobStatusStep
    }
  ];

  const handleStepClick = (stepId) => {
    if (completedSteps.includes(stepId) || stepId === currentStep) {
      setCurrentStep(stepId);
    }
  };

  const submitJobDetails = async () => {
    const jobTitle = formData.jobTitle.trim();
    if (!jobTitle) {
      setJobApiState({
        loading: false,
        error: 'Job title is required before continuing.',
        success: ''
      });
      return false;
    }

    setJobApiState({ loading: true, error: '', success: '' });

    const payload = {
      jobTitle,
      company: formData.clientCompany,
      jobDescription: formData.jobDescription
    };

    try {
      const response = await axios.post('http://localhost:8081/api/job-descriptions', payload);
      const description = response?.data?.jobDescription;

      if (description && !formData.jobDescription.trim()) {
        setFormData((prev) => ({ ...prev, jobDescription: description }));
      }

      setJobApiState({
        loading: false,
        error: '',
        success: 'Job details sent to API successfully.'
      });
    } catch (error) {
      setJobApiState({
        loading: false,
        error: 'Unable to reach the job description API. Continuing with local data.',
        success: ''
      });
    }

    return true;
  };

  const handleNext = async () => {
    if (currentStep === 0) {
      const canProceed = await submitJobDetails();
      if (!canProceed) {
        return;
      }
    }

    // Mark current step as completed
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
    }
    
    // Move to next step
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="create-assessment-enhanced">
      <button className="back-btn" onClick={() => navigate('/dashboard')}>
        <ArrowLeft size={20} />
        Back to Dashboard
      </button>

      <div className="assessment-container">
        {/* Progress Steps Sidebar */}
        <div className="steps-sidebar">
          <div className="steps-header">
            <h2>Create Assessment</h2>
            <p className="steps-subtitle">Complete all steps to publish</p>
          </div>

          <div className="steps-list">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isCompleted = completedSteps.includes(step.id);
              const isActive = currentStep === step.id;
              const isAccessible = isCompleted || isActive || completedSteps.includes(step.id - 1);

              return (
                <div
                  key={step.id}
                  className={`step-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''} ${!isAccessible ? 'disabled' : ''}`}
                  onClick={() => isAccessible && handleStepClick(step.id)}
                >
                  <div className="step-indicator">
                    {isCompleted ? (
                      <CheckCircle2 size={24} className="check-icon" />
                    ) : (
                      <Icon size={24} />
                    )}
                  </div>
                  <div className="step-content">
                    <span className="step-title">{step.title}</span>
                    {isActive && <span className="step-badge">Current</span>}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="steps-footer">
            <div className="progress-indicator">
              <span className="progress-text">
                {completedSteps.length} of {steps.length} completed
              </span>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${(completedSteps.length / steps.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="step-content-area">
          <div className="step-header">
            <h1 className="step-main-title">{steps[currentStep].title}</h1>
            <div className="step-navigation">
              <span className="step-counter">
                Step {currentStep + 1} of {steps.length}
              </span>
            </div>
          </div>

          <div className="step-body">
            {currentStep === 0 && (jobApiState.loading || jobApiState.error || jobApiState.success) && (
              <div
                className={`api-status ${
                  jobApiState.error ? 'api-status-error' : 'api-status-success'
                }`}
              >
                {jobApiState.loading && <span>Saving job details to API...</span>}
                {!jobApiState.loading && jobApiState.error && <span>{jobApiState.error}</span>}
                {!jobApiState.loading && jobApiState.success && <span>{jobApiState.success}</span>}
              </div>
            )}
            <CurrentStepComponent 
              formData={formData}
              onChange={handleInputChange}
            />
          </div>

          <div className="step-actions">
            {currentStep > 0 && (
              <button 
                className="btn-secondary"
                onClick={handleBack}
              >
                Previous
              </button>
            )}
            <button 
              className="btn-primary"
              onClick={handleNext}
              disabled={currentStep === 0 && jobApiState.loading}
            >
              {jobApiState.loading
                ? 'Saving...'
                : currentStep === steps.length - 1
                  ? 'Publish Assessment'
                  : 'Save & Continue'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Step 0: Job Details Component
function JobDetailsStep({ formData, onChange }) {
  return (
    <div className="job-details-step">
      <div className="form-section">
        <div className="form-group">
          <label>Job Title *</label>
          <input
            type="text"
            placeholder="e.g., Machine Learning Engineer"
            value={formData.jobTitle}
            onChange={(e) => onChange('jobTitle', e.target.value)}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Company</label>
          <input
            type="text"
            placeholder="Enter company name"
            value={formData.clientCompany}
            onChange={(e) => onChange('clientCompany', e.target.value)}
            className="form-input"
          />
        </div>

        <div className="form-group-checkbox">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={formData.shareCompanyDetails}
              onChange={(e) => onChange('shareCompanyDetails', e.target.checked)}
            />
            <span>Share Client/Company Details with the Candidate</span>
          </label>
          <p className="checkbox-hint">
            When enabled, candidates will see your company details during the application process
          </p>
        </div>

        <div className="form-group">
          <label>Job Description</label>
          <div className="rich-text-toolbar">
            <button type="button" className="toolbar-btn" title="Bold">
              <strong>B</strong>
            </button>
            <button type="button" className="toolbar-btn" title="Italic">
              <em>I</em>
            </button>
            <button type="button" className="toolbar-btn" title="Underline">
              <u>U</u>
            </button>
            <span className="toolbar-divider"></span>
            <button type="button" className="toolbar-btn" title="Bullet List">
              ≡
            </button>
            <button type="button" className="toolbar-btn" title="Numbered List">
              ⋮
            </button>
            <button type="button" className="toolbar-btn" title="Align">
              ⊟
            </button>
            <button type="button" className="toolbar-btn" title="Link">
              🔗
            </button>
            <button type="button" className="toolbar-btn" title="Image">
              🖼
            </button>
          </div>
          <textarea
            className="form-textarea rich-textarea"
            rows="8"
            placeholder="Enter job description..."
            value={formData.jobDescription}
            onChange={(e) => onChange('jobDescription', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

// Step 1: Requirements Component
function RequirementsStep({ formData, onChange }) {
  return (
    <div className="requirements-step">
      <div className="form-section">
        <div className="form-group">
          <label>Difficulty Level *</label>
          <div className="radio-group">
            {['easy', 'medium', 'hard'].map(level => (
              <label key={level} className="radio-label">
                <input
                  type="radio"
                  name="difficulty"
                  value={level}
                  checked={formData.difficulty === level}
                  onChange={(e) => onChange('difficulty', e.target.value)}
                />
                <span className="radio-text">{level.charAt(0).toUpperCase() + level.slice(1)}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Tech Stack / Skills Required *</label>
          <input
            type="text"
            placeholder="e.g., Python, TensorFlow, Machine Learning, Deep Learning"
            value={formData.techStack}
            onChange={(e) => onChange('techStack', e.target.value)}
            className="form-input"
          />
          <p className="input-hint">Separate multiple skills with commas</p>
        </div>

        <div className="form-group">
          <label>Assessment Duration (minutes) *</label>
          <input
            type="number"
            min="15"
            max="180"
            step="15"
            value={formData.duration}
            onChange={(e) => onChange('duration', parseInt(e.target.value))}
            className="form-input"
          />
          <p className="input-hint">Recommended: 45-90 minutes for coding assessments</p>
        </div>

        <div className="form-group">
          <label>Required Skills</label>
          <div className="skills-input">
            <input
              type="text"
              placeholder="Add a skill and press Enter"
              className="form-input"
            />
            <div className="skills-tags">
              {(formData.requiredSkills || []).map((skill, index) => (
                <span key={index} className="skill-tag">
                  {skill}
                  <button className="skill-remove">×</button>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Step 2: Interview Questions Component
function InterviewQuestionsStep({ formData, onChange }) {
  return (
    <div className="interview-questions-step">
      <div className="questions-info">
        <p>Select 3 questions from AI-generated and database questions</p>
        <p className="questions-selected">
          Selected: <strong>{formData.selectedQuestions?.length || 0} / 3</strong>
        </p>
      </div>

      <div className="questions-sections">
        <div className="questions-section">
          <h3 className="section-title">AI Generated Questions (6)</h3>
          <div className="questions-list">
            {[1, 2, 3, 4, 5, 6].map(num => (
              <div key={`ai-${num}`} className="question-card">
                <div className="question-header">
                  <input type="checkbox" />
                  <h4>Implement Rate Limiter {num}</h4>
                </div>
                <p className="question-desc">Design a rate limiting system...</p>
                <span className="question-difficulty">Medium</span>
              </div>
            ))}
          </div>  
        </div>

        <div className="questions-section">
          <h3 className="section-title">Database Questions (6)</h3>
          <div className="questions-list">
            {[1, 2, 3, 4, 5, 6].map(num => (
              <div key={`db-${num}`} className="question-card">
                <div className="question-header">
                  <input type="checkbox" />
                  <h4>Two Sum Problem {num}</h4>
                </div>
                <p className="question-desc">Find two numbers that add up to target...</p>
                <span className="question-difficulty">Easy</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Step 3: Career Page Component
function CareerPageStep({ formData, onChange }) {
  return (
    <div className="career-page-step">
      <div className="form-section">
        <div className="form-group-checkbox">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={formData.careerPageEnabled}
              onChange={(e) => onChange('careerPageEnabled', e.target.checked)}
            />
            <span>Publish to Career Page</span>
          </label>
          <p className="checkbox-hint">
            Make this job posting visible on your public career page
          </p>
        </div>

        {formData.careerPageEnabled && (
          <div className="career-page-preview">
            <h3>Career Page Preview</h3>
            <div className="preview-box">
              <h4>{formData.jobTitle || 'Job Title'}</h4>
              <p>{formData.clientCompany || 'Company Name'}</p>
              <p className="preview-desc">
                {formData.jobDescription || 'Job description will appear here...'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Step 4: Share URL Component
function ShareURLStep({ formData, onChange }) {
  const assessmentUrl = `https://yourplatform.com/assessment/abc123`;

  return (
    <div className="share-url-step">
      <div className="form-section">
        <div className="url-display">
          <label>Assessment URL</label>
          <div className="url-box">
            <input
              type="text"
              value={assessmentUrl}
              readOnly
              className="url-input"
            />
            <button className="copy-btn">Copy</button>
          </div>
          <p className="input-hint">Share this URL with candidates to start the assessment</p>
        </div>

        <div className="share-options">
          <h3>Share via Email</h3>
          <button className="btn-secondary">Send Email Invites</button>
        </div>
      </div>
    </div>
  );
}

// Step 5: Job Status Component
function JobStatusStep({ formData, onChange }) {
  return (
    <div className="job-status-step">
      <div className="form-section">
        <div className="form-group">
          <label>Assessment Status</label>
          <select
            value={formData.status}
            onChange={(e) => onChange('status', e.target.value)}
            className="form-select"
          >
            <option value="draft">Draft - Not visible to candidates</option>
            <option value="active">Active - Open for applications</option>
            <option value="closed">Closed - No longer accepting</option>
          </select>
        </div>

        <div className="status-summary">
          <h3>Assessment Summary</h3>
          <div className="summary-item">
            <span>Job Title:</span>
            <strong>{formData.jobTitle || 'Not set'}</strong>
          </div>
          <div className="summary-item">
            <span>Difficulty:</span>
            <strong>{formData.difficulty}</strong>
          </div>
          <div className="summary-item">
            <span>Duration:</span>
            <strong>{formData.duration} minutes</strong>
          </div>
          <div className="summary-item">
            <span>Questions:</span>
            <strong>{formData.selectedQuestions?.length || 0} selected</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateAssessmentEnhanced;