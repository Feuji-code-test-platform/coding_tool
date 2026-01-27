import React from 'react';
import { AlertTriangle, XCircle, X } from 'lucide-react';

function ProctoringWarning({ warning, onClose }) {
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return '#dc2626';
      case 'high': return '#ea580c';
      case 'medium': return '#f59e0b';
      default: return '#3b82f6';
    }
  };

  const getWarningMessage = (type) => {
    const messages = {
      'tab_switch': 'You switched to another tab or window',
      'fullscreen_exit': 'You exited fullscreen mode',
      'no_face_detected': 'Your face is not visible to the camera',
      'multiple_faces': 'Multiple faces detected in the camera',
      'looking_away': 'You appear to be looking away from the screen',
      'copy_attempt': 'Copy operation detected',
      'paste_attempt': 'Paste operation detected',
      'right_click_attempt': 'Right-click menu attempt detected',
      'devtools_opened': 'Developer tools detected',
      'excessive_movement': 'Excessive movement detected',
      'camera_denied': 'Camera access was blocked',
      'screenshot_attempt': 'Screenshot attempt detected',
      'multi_monitor_detected': 'Multiple monitors detected'
    };

    return messages[type] || warning.message || 'Suspicious activity detected';
  };

  const getWarningAdvice = (type) => {
    const advice = {
      'tab_switch': 'Please stay on the exam tab. Multiple violations may result in exam termination.',
      'fullscreen_exit': 'Please return to fullscreen mode immediately.',
      'no_face_detected': 'Ensure your face is clearly visible to the camera with proper lighting.',
      'multiple_faces': 'Only you should be visible during the exam. Others must leave the room.',
      'looking_away': 'Keep your eyes on the screen. Looking away frequently may indicate cheating.',
      'copy_attempt': 'Copying content is not allowed during this exam.',
      'paste_attempt': 'Pasting content from external sources is not allowed.',
      'right_click_attempt': 'Right-click menu is disabled during the exam.',
      'devtools_opened': 'Developer tools must be closed during the exam.',
      'excessive_movement': 'Try to stay still and focused on your screen.',
      'camera_denied': 'Camera must be enabled for this proctored exam.',
      'screenshot_attempt': 'Screenshots are not allowed during the exam.',
      'multi_monitor_detected': 'Please use only one monitor for this exam.'
    };

    return advice[type] || 'This behavior has been logged and may be reviewed by the recruiter.';
  };

  return (
    <div className="proctoring-modal-overlay">
      <div className="proctoring-modal">
        <div className="modal-header" style={{ borderTopColor: getSeverityColor(warning.severity) }}>
          <div className="modal-icon" style={{ color: getSeverityColor(warning.severity) }}>
            {warning.severity === 'critical' ? (
              <XCircle size={48} />
            ) : (
              <AlertTriangle size={48} />
            )}
          </div>
          <h2>Proctoring Warning</h2>
          <button className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div className="warning-severity">
            <span className={`severity-badge ${warning.severity}`}>
              {warning.severity.toUpperCase()}
            </span>
          </div>

          <div className="warning-message">
            <h3>What happened?</h3>
            <p>{getWarningMessage(warning.type)}</p>
          </div>

          <div className="warning-advice">
            <h3>What should you do?</h3>
            <p>{getWarningAdvice(warning.type)}</p>
          </div>

          {warning.severity === 'critical' && (
            <div className="warning-critical">
              <AlertTriangle size={16} />
              <p>
                <strong>Critical Warning:</strong> Multiple violations of this type may result 
                in automatic exam submission and possible disqualification.
              </p>
            </div>
          )}

          <div className="warning-note">
            <p>
              <strong>Note:</strong> All proctoring events are recorded and will be reviewed. 
              Please follow exam rules to avoid further warnings.
            </p>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-understand" onClick={onClose}>
            I Understand - Continue Exam
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProctoringWarning;
