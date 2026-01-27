import React, { useState } from 'react';
import { CheckCircle, Star } from 'lucide-react';

function ExamComplete({ candidateInfo }) {
  const [feedback, setFeedback] = useState({
    difficulty: 0,
    clarity: 0,
    experience: 0,
    comments: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleRatingChange = (category, rating) => {
    setFeedback({
      ...feedback,
      [category]: rating
    });
  };

  const handleSubmitFeedback = async () => {
    try {
      await fetch('http://localhost:5000/api/exam/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          candidateEmail: candidateInfo.email,
          feedback
        })
      });
      setSubmitted(true);
    } catch (err) {
      console.error('Feedback submission error:', err);
    }
  };

  const RatingStars = ({ category, label }) => (
    <div className="rating-item">
      <label>{label}</label>
      <div className="stars">
        {[1, 2, 3, 4, 5].map(num => (
          <Star
            key={num}
            size={24}
            className={feedback[category] >= num ? 'star-filled' : 'star-empty'}
            onClick={() => handleRatingChange(category, num)}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="exam-complete">
      <div className="complete-container">
        <div className="complete-icon">
          <CheckCircle size={64} />
        </div>

        <h1>Exam Submitted Successfully!</h1>
        
        <div className="complete-info">
          <p>Thank you, <strong>{candidateInfo.name}</strong></p>
          <p>Your responses for <strong>{candidateInfo.assessmentTitle}</strong> have been recorded.</p>
        </div>

        <div className="complete-message">
          <h2>What happens next?</h2>
          <div className="next-steps">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Review</h3>
                <p>Your code and proctoring recordings will be reviewed by the recruitment team.</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Evaluation</h3>
                <p>Your solutions will be tested against additional test cases and evaluated for code quality.</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Results</h3>
                <p>You will receive an email with your results within 3-5 business days.</p>
              </div>
            </div>
          </div>
        </div>

        {!submitted ? (
          <div className="feedback-section">
            <h2>Help us improve</h2>
            <p>Please rate your experience with this assessment</p>

            <div className="feedback-form">
              <RatingStars category="difficulty" label="How difficult were the questions?" />
              <RatingStars category="clarity" label="How clear were the instructions?" />
              <RatingStars category="experience" label="Overall experience with the platform?" />

              <div className="feedback-comments">
                <label>Additional Comments (Optional)</label>
                <textarea
                  rows="4"
                  placeholder="Share your thoughts about the assessment..."
                  value={feedback.comments}
                  onChange={(e) => setFeedback({ ...feedback, comments: e.target.value })}
                />
              </div>

              <button className="btn-submit-feedback" onClick={handleSubmitFeedback}>
                Submit Feedback
              </button>
            </div>
          </div>
        ) : (
          <div className="feedback-thanks">
            <CheckCircle size={32} />
            <p>Thank you for your feedback!</p>
          </div>
        )}

        <div className="complete-footer">
          <p>You can now safely close this window.</p>
          <p className="contact-info">
            Questions? Contact us at support@yourplatform.com
          </p>
        </div>
      </div>
    </div>
  );
}

export default ExamComplete;
