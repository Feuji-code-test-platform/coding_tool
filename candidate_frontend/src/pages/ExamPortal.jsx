import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ExamInstructions from './ExamInstructions';
import ConsentForm from './ConsentForm';
import ExamInterface from './ExamInterface';
import ExamComplete from './ExamComplete';
import './ExamPortal.css';

function ExamPortal() {
  const { token } = useParams();
  const navigate = useNavigate();
  
  const [currentStep, setCurrentStep] = useState('loading');
  const [examData, setExamData] = useState(null);
  const [error, setError] = useState('');
  const [candidateInfo, setCandidateInfo] = useState(null);
  const [useMockData, setUseMockData] = useState(true); // Enable mock mode

  useEffect(() => {
    validateTokenAndLoadExam();
  }, [token]);

  const validateTokenAndLoadExam = async () => {
    // Check if we should use mock data
    if (useMockData) {
      // MOCK DATA FOR TESTING WITHOUT BACKEND
      console.log('🧪 Using mock data (backend not required)');
      
      const mockData = {
        status: 'active',
        expiresAt: new Date(Date.now() + 24*60*60*1000).toISOString(),
        candidateName: 'Test Candidate',
        candidateEmail: 'test@example.com',
        assessmentTitle: 'Software Engineer Assessment',
        duration: 60, // minutes
        questionCount: 3
      };
      
      setExamData(mockData);
      setCandidateInfo({
        name: mockData.candidateName,
        email: mockData.candidateEmail,
        assessmentTitle: mockData.assessmentTitle
      });
      
      // Check if instructions were already viewed
      const instructionsViewed = sessionStorage.getItem(`exam_instructions_${token}`);
      if (instructionsViewed) {
        setCurrentStep('consent');
      } else {
        setCurrentStep('instructions');
      }
      return;
    }

    // REAL API CALL (when backend is available)
    try {
      const response = await fetch(`http://localhost:5000/api/exam/validate/${token}`);
      
      if (!response.ok) {
        throw new Error('Invalid or expired exam link');
      }

      const data = await response.json();
      
      if (data.status === 'completed') {
        setError('This exam has already been completed');
        return;
      }

      if (new Date(data.expiresAt) < new Date()) {
        setError('This exam link has expired');
        return;
      }

      setExamData(data);
      setCandidateInfo({
        name: data.candidateName,
        email: data.candidateEmail,
        assessmentTitle: data.assessmentTitle
      });
      
      const instructionsViewed = sessionStorage.getItem(`exam_instructions_${token}`);
      if (instructionsViewed) {
        setCurrentStep('consent');
      } else {
        setCurrentStep('instructions');
      }

    } catch (err) {
      console.error('Token validation error:', err);
      setError(
        'Unable to connect to server. Make sure the backend API is running on http://localhost:5000'
      );
      setCurrentStep('error');
    }
  };

  const handleInstructionsComplete = () => {
    sessionStorage.setItem(`exam_instructions_${token}`, 'true');
    setCurrentStep('consent');
  };

  const handleConsentGiven = async () => {
    if (useMockData) {
      // Mock consent recording
      console.log('✅ Mock: Consent recorded');
      setCurrentStep('exam');
      return;
    }

    try {
      await fetch(`http://localhost:5000/api/exam/consent/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ consentGiven: true })
      });

      setCurrentStep('exam');
    } catch (err) {
      console.error('Consent recording error:', err);
      alert('Failed to record consent. Please try again.');
    }
  };

  const handleExamComplete = () => {
    setCurrentStep('complete');
  };

  if (currentStep === 'loading') {
    return (
      <div className="exam-portal-loading">
        <div className="loading-spinner"></div>
        <p>Loading your exam...</p>
        {useMockData && (
          <p style={{ marginTop: '1rem', color: '#718096', fontSize: '0.875rem' }}>
            💡 Running in mock mode (backend not required)
          </p>
        )}
      </div>
    );
  }

  if (currentStep === 'error' || error) {
    return (
      <div className="exam-portal-error">
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <h1>Unable to Load Exam</h1>
          <p>{error}</p>
          <p className="error-hint">
            {useMockData ? (
              <>Backend is not running. That's OK - we're using mock data!</>
            ) : (
              <>Please contact your recruiter if you believe this is an error.</>
            )}
          </p>
          {!useMockData && (
            <button 
              onClick={() => {
                setUseMockData(true);
                setError('');
                setCurrentStep('loading');
                validateTokenAndLoadExam();
              }}
              style={{
                marginTop: '1rem',
                padding: '0.75rem 1.5rem',
                background: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 500
              }}
            >
              Try Mock Mode
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="exam-portal">
      {useMockData && (
        <div style={{
          position: 'fixed',
          top: '1rem',
          right: '1rem',
          background: '#fef3c7',
          color: '#92400e',
          padding: '0.75rem 1rem',
          borderRadius: '8px',
          fontSize: '0.875rem',
          zIndex: 9999,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          🧪 Mock Mode Active (Backend not required)
        </div>
      )}

      {currentStep === 'instructions' && (
        <ExamInstructions
          examData={examData}
          candidateInfo={candidateInfo}
          onContinue={handleInstructionsComplete}
        />
      )}

      {currentStep === 'consent' && (
        <ConsentForm
          examData={examData}
          candidateInfo={candidateInfo}
          onConsent={handleConsentGiven}
          onDecline={() => setError('Consent is required to proceed with the exam')}
        />
      )}

      {currentStep === 'exam' && (
        <ExamInterface
          token={token}
          examData={examData}
          candidateInfo={candidateInfo}
          onComplete={handleExamComplete}
          useMockData={useMockData}
        />
      )}

      {currentStep === 'complete' && (
        <ExamComplete
          candidateInfo={candidateInfo}
        />
      )}
    </div>
  );
}

export default ExamPortal;
