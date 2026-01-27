import React from 'react';
import { Clock, CheckCircle, AlertTriangle, Camera, Lock } from 'lucide-react';

function ExamInstructions({ examData, candidateInfo, onContinue }) {
  return (
    <div className="exam-instructions">
      <div className="instructions-container">
        <div className="instructions-header">
          <h1>Assessment Instructions</h1>
          <div className="candidate-info">
            <p><strong>Candidate:</strong> {candidateInfo.name}</p>
            <p><strong>Assessment:</strong> {candidateInfo.assessmentTitle}</p>
          </div>
        </div>

        <div className="instructions-content">
          <section className="instruction-section">
            <div className="section-icon">
              <Clock size={24} />
            </div>
            <div className="section-content">
              <h2>Time Limit</h2>
              <p>You have <strong>{examData.duration} minutes</strong> to complete this assessment.</p>
              <p className="note">The timer will start once you begin the exam and cannot be paused.</p>
            </div>
          </section>

          <section className="instruction-section">
            <div className="section-icon">
              <CheckCircle size={24} />
            </div>
            <div className="section-content">
              <h2>Questions</h2>
              <p>This assessment contains <strong>{examData.questionCount} coding questions</strong>.</p>
              <ul>
                <li>You can navigate between questions at any time</li>
                <li>Your code is auto-saved every 30 seconds</li>
                <li>You can submit individual questions or all at once</li>
              </ul>
            </div>
          </section>

          <section className="instruction-section">
            <div className="section-icon">
              <Camera size={24} />
            </div>
            <div className="section-content">
              <h2>Proctoring</h2>
              <p><strong>This exam is proctored.</strong> The following will be monitored:</p>
              <ul>
                <li>Your webcam feed (video and audio)</li>
                <li>Tab switches and window changes</li>
                <li>Face detection and eye movement</li>
                <li>Copy/paste attempts</li>
              </ul>
              <p className="warning">Multiple violations may result in automatic submission.</p>
            </div>
          </section>

          <section className="instruction-section">
            <div className="section-icon">
              <AlertTriangle size={24} />
            </div>
            <div className="section-content">
              <h2>Important Rules</h2>
              <ul>
                <li><strong>Stay in fullscreen mode</strong> - Exiting fullscreen will be flagged</li>
                <li><strong>Keep your face visible</strong> - Ensure proper lighting</li>
                <li><strong>No external help</strong> - Work independently</li>
                <li><strong>No additional resources</strong> - Only use the provided code editor</li>
                <li><strong>Test your code</strong> - Use the test cases provided</li>
              </ul>
            </div>
          </section>

          <section className="instruction-section">
            <div className="section-icon">
              <Lock size={24} />
            </div>
            <div className="section-content">
              <h2>Technical Requirements</h2>
              <ul>
                <li>Stable internet connection required</li>
                <li>Webcam and microphone must be enabled</li>
                <li>Modern browser (Chrome, Firefox, Edge recommended)</li>
                <li>Minimum screen resolution: 1280x720</li>
              </ul>
            </div>
          </section>
        </div>

        <div className="instructions-footer">
          <div className="checklist">
            <h3>Before you begin, ensure:</h3>
            <label className="checklist-item">
              <input type="checkbox" required />
              <span>I have read and understood all instructions</span>
            </label>
            <label className="checklist-item">
              <input type="checkbox" required />
              <span>My webcam and microphone are working properly</span>
            </label>
            <label className="checklist-item">
              <input type="checkbox" required />
              <span>I am in a quiet, well-lit environment</span>
            </label>
            <label className="checklist-item">
              <input type="checkbox" required />
              <span>I will not use any unauthorized resources</span>
            </label>
          </div>

          <button 
            className="continue-btn"
            onClick={onContinue}
          >
            Continue to Consent Form
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExamInstructions;
