import React, { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { 
  Clock, Camera, AlertTriangle, ChevronLeft, ChevronRight, 
  Play, Save, CheckCircle, XCircle 
} from 'lucide-react';
import WebcamMonitor from './WebcamMonitor';
import ProctoringWarning from './ProctoringWarning';
import useBrowserSecurity from '../hooks/useBrowserSecurity';
import useExamTimer from '../hooks/useExamTimer';

function ExamInterface({ token, examData, candidateInfo, onComplete, useMockData = false }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [code, setCode] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [testResults, setTestResults] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [submissions, setSubmissions] = useState({});
  const [proctoringWarnings, setProctoringWarnings] = useState([]);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const autoSaveTimerRef = useRef(null);
  const warningCountRef = useRef(0);

  useEffect(() => {
    loadQuestions();
    enterFullscreen();
    startExam();
  }, []);

  useEffect(() => {
    autoSaveTimerRef.current = setInterval(() => {
      saveCodeToBackend();
    }, 30000);

    return () => clearInterval(autoSaveTimerRef.current);
  }, [code, currentQuestionIndex]);

  const { timeRemaining, formatTime } = useExamTimer(examData.duration * 60, handleTimeUp);
  const violations = useBrowserSecurity(handleViolation);

  const loadQuestions = async () => {
    if (useMockData) {
      // MOCK QUESTIONS
      const mockQuestions = [
        {
          id: 'q1',
          title: 'Two Sum',
          description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
          difficulty: 'easy',
          starterCode: 'function twoSum(nums, target) {\n  // Your code here\n  \n}',
          examples: [
            { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]' },
            { input: 'nums = [3,2,4], target = 6', output: '[1,2]' }
          ]
        },
        {
          id: 'q2',
          title: 'Reverse String',
          description: 'Write a function that reverses a string. The input string is given as an array of characters.',
          difficulty: 'easy',
          starterCode: 'function reverseString(s) {\n  // Your code here\n  \n}',
          examples: [
            { input: 's = ["h","e","l","l","o"]', output: '["o","l","l","e","h"]' }
          ]
        },
        {
          id: 'q3',
          title: 'Valid Palindrome',
          description: 'A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.',
          difficulty: 'medium',
          starterCode: 'function isPalindrome(s) {\n  // Your code here\n  \n}',
          examples: [
            { input: 's = "A man, a plan, a canal: Panama"', output: 'true' },
            { input: 's = "race a car"', output: 'false' }
          ]
        }
      ];

      setQuestions(mockQuestions);
      setCode(mockQuestions[0].starterCode);
      console.log('🧪 Mock: Loaded 3 sample questions');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/exam/questions/${token}`);
      const data = await response.json();
      setQuestions(data.questions);
      
      if (data.questions[0]) {
        const savedCode = data.savedSubmissions?.[data.questions[0].id];
        setCode(savedCode?.code || data.questions[0].starterCode || '');
        setSelectedLanguage(savedCode?.language || 'javascript');
      }
    } catch (err) {
      console.error('Failed to load questions:', err);
    }
  };

  const startExam = async () => {
    if (useMockData) {
      console.log('🧪 Mock: Exam started');
      return;
    }

    try {
      await fetch(`http://localhost:5000/api/exam/start/${token}`, {
        method: 'POST'
      });
    } catch (err) {
      console.error('Failed to record exam start:', err);
    }
  };

  const enterFullscreen = () => {
    document.documentElement.requestFullscreen().catch(err => {
      console.error('Fullscreen error:', err);
    });
    setIsFullscreen(true);
  };

  const handleFullscreenChange = () => {
    if (!document.fullscreenElement) {
      setIsFullscreen(false);
      handleViolation({
        type: 'fullscreen_exit',
        severity: 'high',
        message: 'Exited fullscreen mode'
      });
    }
  };

  useEffect(() => {
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const handleViolation = (violation) => {
    console.warn('Proctoring violation:', violation);
    
    setProctoringWarnings(prev => [...prev, { ...violation, timestamp: new Date() }]);
    
    if (!useMockData) {
      fetch(`http://localhost:5000/api/exam/proctoring/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(violation)
      }).catch(err => console.error('Failed to log violation:', err));
    } else {
      console.log('🧪 Mock: Violation logged:', violation.type);
    }

    if (violation.severity === 'high' || violation.severity === 'critical') {
      warningCountRef.current += 1;
      setShowWarningModal(true);

      if (warningCountRef.current >= 5) {
        alert('Too many violations detected. Exam will be auto-submitted.');
        handleSubmitExam();
      }
    }
  };

  const saveCodeToBackend = async () => {
    if (!code.trim()) return;

    if (useMockData) {
      console.log('🧪 Mock: Code auto-saved');
      return;
    }

    try {
      await fetch(`http://localhost:5000/api/exam/save/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionId: questions[currentQuestionIndex].id,
          code,
          language: selectedLanguage
        })
      });
      console.log('Code auto-saved');
    } catch (err) {
      console.error('Auto-save failed:', err);
    }
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setTestResults(null);

    if (useMockData) {
      // Mock test results
      setTimeout(() => {
        setTestResults({
          testCases: [
            { input: '[2,7,11,15], 9', expected: '[0,1]', actual: '[0,1]', passed: true },
            { input: '[3,2,4], 6', expected: '[1,2]', actual: '[1,2]', passed: true },
            { input: '[3,3], 6', expected: '[0,1]', actual: '[0,1]', passed: true }
          ],
          passed: 3,
          total: 3
        });
        setIsRunning(false);
        console.log('🧪 Mock: Code executed successfully');
      }, 1500);
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/exam/run-code/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionId: questions[currentQuestionIndex].id,
          code,
          language: selectedLanguage
        })
      });

      const results = await response.json();
      setTestResults(results);
    } catch (err) {
      console.error('Code execution error:', err);
      setTestResults({ error: 'Failed to run code' });
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmitQuestion = async () => {
    await saveCodeToBackend();
    
    setSubmissions({
      ...submissions,
      [questions[currentQuestionIndex].id]: {
        submitted: true,
        code,
        language: selectedLanguage,
        timestamp: new Date()
      }
    });

    console.log('🧪 Mock: Question submitted');
    alert('Question submitted successfully!');
  };

  const handleQuestionChange = (index) => {
    saveCodeToBackend();
    
    setCurrentQuestionIndex(index);
    const question = questions[index];
    const savedSubmission = submissions[question.id];
    
    if (savedSubmission) {
      setCode(savedSubmission.code);
      setSelectedLanguage(savedSubmission.language);
    } else {
      setCode(question.starterCode || '');
      setSelectedLanguage('javascript');
    }
    
    setTestResults(null);
  };

  const handleSubmitExam = async () => {
    const confirmSubmit = window.confirm(
      'Are you sure you want to submit the exam? This action cannot be undone.'
    );

    if (!confirmSubmit) return;

    if (useMockData) {
      console.log('🧪 Mock: Exam submitted');
      alert('Exam submitted successfully! (Mock mode)');
      onComplete();
      return;
    }

    try {
      await saveCodeToBackend();

      await fetch(`http://localhost:5000/api/exam/submit/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          submissions,
          proctoringWarnings,
          timeSpent: (examData.duration * 60) - timeRemaining
        })
      });

      onComplete();
    } catch (err) {
      console.error('Submission error:', err);
      alert('Failed to submit exam. Please try again.');
    }
  };

  function handleTimeUp() {
    alert('Time is up! Your exam will be submitted automatically.');
    handleSubmitExam();
  }

  if (!questions.length) {
    return (
      <div className="exam-loading">
        <div className="loading-spinner"></div>
        <p>Loading exam questions...</p>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="exam-interface">
      {useMockData && (
        <div style={{
          position: 'fixed',
          top: '1rem',
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#fef3c7',
          color: '#92400e',
          padding: '0.5rem 1rem',
          borderRadius: '8px',
          fontSize: '0.875rem',
          zIndex: 9999,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          🧪 Mock Mode - Backend not required
        </div>
      )}

      <div className="exam-header">
        <div className="exam-info">
          <h2>{candidateInfo.assessmentTitle}</h2>
          <span className="candidate-name">{candidateInfo.name}</span>
        </div>
        
        <div className="exam-timer">
          <Clock size={20} />
          <span className={timeRemaining < 300 ? 'timer-warning' : ''}>
            {formatTime(timeRemaining)}
          </span>
        </div>

        <div className="exam-actions">
          <button className="btn-save" onClick={saveCodeToBackend}>
            <Save size={18} />
            Save
          </button>
          <button className="btn-submit-exam" onClick={handleSubmitExam}>
            Submit Exam
          </button>
        </div>
      </div>

      {proctoringWarnings.length > 0 && (
        <div className="warning-strip">
          <AlertTriangle size={18} />
          <span>{proctoringWarnings.length} proctoring warnings detected</span>
        </div>
      )}

      <div className="exam-content">
        <div className="questions-panel">
          <div className="questions-header">
            <h3>Questions</h3>
            <span className="question-progress">
              {currentQuestionIndex + 1} / {questions.length}
            </span>
          </div>

          <div className="questions-list">
            {questions.map((q, index) => (
              <button
                key={q.id}
                className={`question-item ${index === currentQuestionIndex ? 'active' : ''} ${
                  submissions[q.id] ? 'submitted' : ''
                }`}
                onClick={() => handleQuestionChange(index)}
              >
                <span className="question-number">Q{index + 1}</span>
                <span className="question-title">{q.title}</span>
                {submissions[q.id] && <CheckCircle size={16} className="submitted-icon" />}
              </button>
            ))}
          </div>

          {!useMockData && (
            <div className="webcam-container">
              <WebcamMonitor token={token} onViolation={handleViolation} />
            </div>
          )}
          
          {useMockData && (
            <div className="webcam-container">
              <div style={{ padding: '1rem', textAlign: 'center', color: '#718096' }}>
                <Camera size={48} style={{ margin: '0 auto 0.5rem' }} />
                <p style={{ fontSize: '0.875rem' }}>Webcam disabled in mock mode</p>
              </div>
            </div>
          )}
        </div>

        <div className="editor-panel">
          <div className="question-display">
            <div className="question-header">
              <h3>{currentQuestion.title}</h3>
              <span className={`difficulty-badge ${currentQuestion.difficulty}`}>
                {currentQuestion.difficulty}
              </span>
            </div>
            <p className="question-description">{currentQuestion.description}</p>
            
            {currentQuestion.examples && (
              <div className="question-examples">
                <h4>Examples:</h4>
                {currentQuestion.examples.map((ex, i) => (
                  <div key={i} className="example">
                    <p><strong>Input:</strong> {ex.input}</p>
                    <p><strong>Output:</strong> {ex.output}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="editor-toolbar">
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="language-selector"
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="cpp">C++</option>
            </select>

            <button className="btn-run" onClick={handleRunCode} disabled={isRunning}>
              <Play size={16} />
              {isRunning ? 'Running...' : 'Run Code'}
            </button>

            <button className="btn-submit-question" onClick={handleSubmitQuestion}>
              Submit Question
            </button>
          </div>

          <div className="code-editor">
            <Editor
              height="400px"
              language={selectedLanguage}
              value={code}
              onChange={setCode}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                scrollBeyondLastLine: false,
                automaticLayout: true
              }}
            />
          </div>

          {testResults && (
            <div className="test-results">
              <h4>Test Results</h4>
              {testResults.error ? (
                <div className="test-error">
                  <XCircle size={16} />
                  <span>{testResults.error}</span>
                </div>
              ) : (
                <div className="test-cases">
                  {testResults.testCases.map((tc, i) => (
                    <div key={i} className={`test-case ${tc.passed ? 'passed' : 'failed'}`}>
                      <div className="test-case-header">
                        {tc.passed ? <CheckCircle size={16} /> : <XCircle size={16} />}
                        <span>Test Case {i + 1}</span>
                      </div>
                      <p><strong>Input:</strong> {tc.input}</p>
                      <p><strong>Expected:</strong> {tc.expected}</p>
                      <p><strong>Got:</strong> {tc.actual}</p>
                    </div>
                  ))}
                  <div className="test-summary">
                    {testResults.passed} / {testResults.total} tests passed
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="navigation-panel">
          <div className="nav-header">
            <h4>Navigation</h4>
          </div>

          <button
            className="nav-btn"
            onClick={() => handleQuestionChange(currentQuestionIndex - 1)}
            disabled={currentQuestionIndex === 0}
          >
            <ChevronLeft size={18} />
            Previous
          </button>

          <button
            className="nav-btn"
            onClick={() => handleQuestionChange(currentQuestionIndex + 1)}
            disabled={currentQuestionIndex === questions.length - 1}
          >
            Next
            <ChevronRight size={18} />
          </button>

          <div className="exam-stats">
            <div className="stat-item">
              <span className="stat-label">Answered:</span>
              <span className="stat-value">
                {Object.keys(submissions).length} / {questions.length}
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Warnings:</span>
              <span className="stat-value warning">
                {proctoringWarnings.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {showWarningModal && (
        <ProctoringWarning
          warning={proctoringWarnings[proctoringWarnings.length - 1]}
          onClose={() => setShowWarningModal(false)}
        />
      )}
    </div>
  );
}

export default ExamInterface;
