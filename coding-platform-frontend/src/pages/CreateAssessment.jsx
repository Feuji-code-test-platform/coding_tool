import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, Database, Check } from 'lucide-react';
import './CreateAssessment.css';

function CreateAssessment() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    job_role: '',
    difficulty: 'medium',
    tech_stack: '',
    duration: 60
  });
  const [questions, setQuestions] = useState({ ai: [], database: [] });
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const generateQuestions = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const mockAIQuestions = [
        {
          id: 'ai-1',
          title: 'Implement a Rate Limiter',
          description: 'Design and implement a rate limiting system that allows maximum N requests per time window.',
          difficulty: formData.difficulty,
          source: 'ai'
        },
        {
          id: 'ai-2',
          title: 'Binary Tree Traversal',
          description: 'Implement three types of tree traversals: inorder, preorder, and postorder.',
          difficulty: formData.difficulty,
          source: 'ai'
        },
        {
          id: 'ai-3',
          title: 'LRU Cache Implementation',
          description: 'Design and implement a Least Recently Used (LRU) cache with O(1) operations.',
          difficulty: formData.difficulty,
          source: 'ai'
        },
        {
          id: 'ai-4',
          title: 'API Request Debouncer',
          description: 'Create a function that debounces API requests to prevent excessive calls.',
          difficulty: formData.difficulty,
          source: 'ai'
        },
        {
          id: 'ai-5',
          title: 'String Compression',
          description: 'Implement a function to perform basic string compression using counts of repeated characters.',
          difficulty: formData.difficulty,
          source: 'ai'
        },
        {
          id: 'ai-6',
          title: 'Merge Intervals',
          description: 'Given a collection of intervals, merge all overlapping intervals.',
          difficulty: formData.difficulty,
          source: 'ai'
        }
      ];

      const mockDBQuestions = [
        {
          id: 'db-1',
          title: 'Two Sum Problem',
          description: 'Given an array of integers and a target, return indices of two numbers that add up to target.',
          difficulty: formData.difficulty,
          source: 'database'
        },
        {
          id: 'db-2',
          title: 'Valid Parentheses',
          description: 'Determine if the input string has valid matching parentheses.',
          difficulty: formData.difficulty,
          source: 'database'
        },
        {
          id: 'db-3',
          title: 'Reverse Linked List',
          description: 'Reverse a singly linked list iteratively and recursively.',
          difficulty: formData.difficulty,
          source: 'database'
        },
        {
          id: 'db-4',
          title: 'Find Duplicate Number',
          description: 'Find the duplicate number in an array containing n+1 integers.',
          difficulty: formData.difficulty,
          source: 'database'
        },
        {
          id: 'db-5',
          title: 'Palindrome Check',
          description: 'Determine whether a given string is a palindrome.',
          difficulty: formData.difficulty,
          source: 'database'
        },
        {
          id: 'db-6',
          title: 'Maximum Subarray',
          description: 'Find the contiguous subarray with the largest sum.',
          difficulty: formData.difficulty,
          source: 'database'
        }
      ];

      setQuestions({ ai: mockAIQuestions, database: mockDBQuestions });
      setStep(2);
      setLoading(false);
    }, 1500);
  };

  const toggleQuestionSelection = (question) => {
    const isSelected = selectedQuestions.find(q => q.id === question.id);
    
    if (isSelected) {
      setSelectedQuestions(selectedQuestions.filter(q => q.id !== question.id));
    } else if (selectedQuestions.length < 3) {
      setSelectedQuestions([...selectedQuestions, question]);
    }
  };

  const handleCreateAssessment = () => {
    console.log('Creating assessment with:', { formData, selectedQuestions });
    // Navigate to next step (candidate management)
    navigate('/dashboard');
  };

  return (
    <div className="create-assessment">
      <button className="back-btn" onClick={() => step === 1 ? navigate('/dashboard') : setStep(1)}>
        <ArrowLeft size={20} />
        Back
      </button>

      <div className="create-header">
        <h1 className="create-title">
          {step === 1 ? 'Create New Assessment' : 'Select Questions'}
        </h1>
        <div className="steps-indicator">
          <div className={`step ${step >= 1 ? 'active' : ''}`}>1</div>
          <div className="step-line"></div>
          <div className={`step ${step >= 2 ? 'active' : ''}`}>2</div>
          <div className="step-line"></div>
          <div className={`step ${step >= 3 ? 'active' : ''}`}>3</div>
        </div>
      </div>

      {step === 1 && (
        <div className="form-container">
          <div className="form-card">
            <h2 className="form-section-title">Assessment Details</h2>
            
            <div className="form-group">
              <label>Job Role</label>
              <input
                type="text"
                name="job_role"
                value={formData.job_role}
                onChange={handleInputChange}
                placeholder="e.g., Senior Frontend Developer"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Difficulty Level</label>
                <select
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleInputChange}
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>

              <div className="form-group">
                <label>Duration (minutes)</label>
                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  min="15"
                  max="180"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Tech Stack</label>
              <input
                type="text"
                name="tech_stack"
                value={formData.tech_stack}
                onChange={handleInputChange}
                placeholder="e.g., JavaScript, React, Node.js"
                required
              />
            </div>

            <button 
              className="primary-btn"
              onClick={generateQuestions}
              disabled={!formData.job_role || !formData.tech_stack || loading}
            >
              {loading ? 'Generating Questions...' : 'Generate Questions'}
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="questions-container">
          <div className="selection-status">
            <span className="status-text">
              Selected: {selectedQuestions.length} / 3 questions
            </span>
          </div>

          <div className="questions-sections">
            <div className="questions-section">
              <div className="section-header">
                <Sparkles size={20} color="#ff6b35" />
                <h3>AI Generated Questions</h3>
              </div>
              <div className="questions-list">
                {questions.ai.map(question => (
                  <QuestionCard
                    key={question.id}
                    question={question}
                    isSelected={selectedQuestions.find(q => q.id === question.id)}
                    onSelect={toggleQuestionSelection}
                    disabled={selectedQuestions.length >= 3 && !selectedQuestions.find(q => q.id === question.id)}
                  />
                ))}
              </div>
            </div>

            <div className="questions-section">
              <div className="section-header">
                <Database size={20} color="#667eea" />
                <h3>Database Questions</h3>
              </div>
              <div className="questions-list">
                {questions.database.map(question => (
                  <QuestionCard
                    key={question.id}
                    question={question}
                    isSelected={selectedQuestions.find(q => q.id === question.id)}
                    onSelect={toggleQuestionSelection}
                    disabled={selectedQuestions.length >= 3 && !selectedQuestions.find(q => q.id === question.id)}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="actions-bar">
            <button 
              className="primary-btn"
              onClick={handleCreateAssessment}
              disabled={selectedQuestions.length !== 3}
            >
              Continue to Add Candidates
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function QuestionCard({ question, isSelected, onSelect, disabled }) {
  return (
    <div 
      className={`question-card ${isSelected ? 'selected' : ''} ${disabled ? 'disabled' : ''}`}
      onClick={() => !disabled && onSelect(question)}
    >
      <div className="question-header">
        <h4 className="question-title">{question.title}</h4>
        {isSelected && (
          <div className="check-icon">
            <Check size={16} />
          </div>
        )}
      </div>
      <p className="question-description">{question.description}</p>
      <div className="question-meta">
        <span className={`difficulty-badge ${question.difficulty}`}>
          {question.difficulty}
        </span>
        <span className="source-badge">{question.source === 'ai' ? 'AI Generated' : 'Database'}</span>
      </div>
    </div>
  );
}

export default CreateAssessment;
