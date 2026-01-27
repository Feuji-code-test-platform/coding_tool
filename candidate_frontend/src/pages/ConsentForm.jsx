import React, { useState } from 'react';
import { Camera, Mic, Video, AlertCircle } from 'lucide-react';

function ConsentForm({ examData, candidateInfo, onConsent, onDecline }) {
  const [consents, setConsents] = useState({
    videoRecording: false,
    faceDetection: false,
    screenMonitoring: false,
    dataStorage: false
  });
  const [allChecked, setAllChecked] = useState(false);

  const handleConsentChange = (key) => {
    const updated = {
      ...consents,
      [key]: !consents[key]
    };
    setConsents(updated);
    
    // Check if all are checked
    const allAreChecked = Object.values(updated).every(val => val === true);
    setAllChecked(allAreChecked);
  };

  const handleSubmit = () => {
    if (allChecked) {
      onConsent();
    }
  };

  return (
    <div className="consent-form">
      <div className="consent-container">
        <div className="consent-header">
          <Camera size={48} className="consent-icon" />
          <h1>Exam Proctoring Consent</h1>
          <p className="consent-subtitle">
            Your privacy is important to us. Please review and accept the following consent terms.
          </p>
        </div>

        <div className="consent-content">
          <div className="consent-info">
            <p><strong>Assessment:</strong> {candidateInfo.assessmentTitle}</p>
            <p><strong>Candidate:</strong> {candidateInfo.name}</p>
            <p><strong>Duration:</strong> {examData.duration} minutes</p>
          </div>

          <div className="consent-items">
            <div className="consent-item">
              <div className="consent-item-header">
                <div className="consent-item-icon">
                  <Video size={24} />
                </div>
                <h3>Video Recording</h3>
              </div>
              <p>
                I consent to having my webcam feed recorded during the entire duration of this assessment. 
                The video will be reviewed by authorized personnel only for the purpose of ensuring exam integrity.
              </p>
              <label className="consent-checkbox">
                <input
                  type="checkbox"
                  checked={consents.videoRecording}
                  onChange={() => handleConsentChange('videoRecording')}
                />
                <span>I agree to video recording</span>
              </label>
            </div>

            <div className="consent-item">
              <div className="consent-item-header">
                <div className="consent-item-icon">
                  <Camera size={24} />
                </div>
                <h3>Face Detection & Eye Tracking</h3>
              </div>
              <p>
                I consent to AI-powered face detection and eye movement tracking to ensure I am the only person 
                taking the exam and that my attention remains on the assessment.
              </p>
              <label className="consent-checkbox">
                <input
                  type="checkbox"
                  checked={consents.faceDetection}
                  onChange={() => handleConsentChange('faceDetection')}
                />
                <span>I agree to face detection and eye tracking</span>
              </label>
            </div>

            <div className="consent-item">
              <div className="consent-item-header">
                <div className="consent-item-icon">
                  <Mic size={24} />
                </div>
                <h3>Screen & Activity Monitoring</h3>
              </div>
              <p>
                I consent to monitoring of my screen activity, including tab switches, copy/paste attempts, 
                and other browser interactions to maintain assessment security.
              </p>
              <label className="consent-checkbox">
                <input
                  type="checkbox"
                  checked={consents.screenMonitoring}
                  onChange={() => handleConsentChange('screenMonitoring')}
                />
                <span>I agree to screen and activity monitoring</span>
              </label>
            </div>

            <div className="consent-item">
              <div className="consent-item-header">
                <div className="consent-item-icon">
                  <AlertCircle size={24} />
                </div>
                <h3>Data Storage & Privacy</h3>
              </div>
              <p>
                I understand that all proctoring data (video, audio, activity logs) will be stored securely 
                and will only be accessible by authorized personnel. Data will be retained for 90 days and 
                then permanently deleted.
              </p>
              <label className="consent-checkbox">
                <input
                  type="checkbox"
                  checked={consents.dataStorage}
                  onChange={() => handleConsentChange('dataStorage')}
                />
                <span>I understand and agree to data storage policies</span>
              </label>
            </div>
          </div>

          <div className="consent-warning">
            <AlertCircle size={20} />
            <p>
              <strong>Important:</strong> All consent items must be accepted to proceed with the assessment. 
              If you do not consent, you will not be able to take this exam.
            </p>
          </div>

          <div className="consent-declaration">
            <p>
              I declare that I am the person named above and that I will take this assessment without 
              any unauthorized assistance or resources. I understand that violations of exam rules may 
              result in disqualification.
            </p>
          </div>
        </div>

        <div className="consent-footer">
          <button 
            className="btn-decline"
            onClick={onDecline}
          >
            Decline & Exit
          </button>
          <button 
            className="btn-consent"
            onClick={handleSubmit}
            disabled={!allChecked}
          >
            I Consent - Start Exam
          </button>
        </div>

        {!allChecked && (
          <p className="consent-hint">
            Please check all boxes above to enable the "Start Exam" button
          </p>
        )}
      </div>
    </div>
  );
}

export default ConsentForm;
