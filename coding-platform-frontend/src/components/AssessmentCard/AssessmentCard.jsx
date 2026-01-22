import React from 'react';
import { Clock, Users, MoreVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './AssessmentCard.css';

function AssessmentCard({ assessment }) {
  const navigate = useNavigate();

  // Generate random gradient colors for card headers
  const gradients = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
  ];

  const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];

  const formatTimeAgo = (date) => {
    const hours = Math.floor((new Date() - new Date(date)) / (1000 * 60 * 60));
    if (hours < 1) return 'Just now';
    if (hours < 24) return `Edited ${hours} hours ago`;
    return `Edited ${Math.floor(hours / 24)} days ago`;
  };

  return (
    <div 
      className="assessment-card"
      onClick={() => navigate(`/assessment/${assessment.id}`)}
    >
      <div className="card-header" style={{ background: randomGradient }}>
        <div className="card-pattern"></div>
      </div>
      
      <div className="card-body">
        <div className="card-title-row">
          <h3 className="card-title">{assessment.job_role}</h3>
          <button className="card-menu-btn">
            <MoreVertical size={18} />
          </button>
        </div>
        
        <div className="card-meta">
          <div className="meta-item">
            <Users size={14} />
            <span>{assessment.candidate_count || 0} candidates in pipeline</span>
          </div>
          <div className="meta-item">
            <Clock size={14} />
            <span>{assessment.duration} minutes</span>
          </div>
        </div>

        <div className="card-footer">
          <span className={`status-badge ${assessment.status}`}>
            {assessment.status === 'active' ? '● Active' : '● Draft'}
          </span>
          <span className="time-ago">{formatTimeAgo(assessment.created_at)}</span>
        </div>
      </div>

      <button className="card-action-btn">
        <span>→</span>
      </button>
    </div>
  );
}

export default AssessmentCard;
