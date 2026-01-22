import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  UserPlus, 
  Upload, 
  Mail, 
  Phone, 
  Trash2,
  Send,
  CheckCircle2,
  Clock,
  XCircle
} from 'lucide-react';
import './AssessmentDetails.css';

function AssessmentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('candidates');
  const [showAddModal, setShowAddModal] = useState(false);
  const [candidates, setCandidates] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1234567890',
      status: 'completed',
      score: 85,
      invite_sent: true
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+1234567891',
      status: 'in_progress',
      score: null,
      invite_sent: true
    },
    {
      id: 3,
      name: 'Bob Johnson',
      email: 'bob@example.com',
      phone: '+1234567892',
      status: 'invited',
      score: null,
      invite_sent: true
    }
  ]);

  // Mock assessment data
  const assessment = {
    id,
    job_role: 'Senior Frontend Developer',
    tech_stack: 'React, TypeScript, Node.js',
    difficulty: 'medium',
    duration: 60,
    questions: 3,
    status: 'active'
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 size={16} color="#48bb78" />;
      case 'in_progress':
        return <Clock size={16} color="#ed8936" />;
      case 'invited':
        return <Mail size={16} color="#4299e1" />;
      default:
        return <XCircle size={16} color="#f56565" />;
    }
  };

  const getStatusText = (status) => {
    return status.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="assessment-details">
      <button className="back-btn" onClick={() => navigate('/dashboard')}>
        <ArrowLeft size={20} />
        Back to Assessments
      </button>

      <div className="details-header">
        <div className="header-left">
          <h1 className="assessment-title">{assessment.job_role}</h1>
          <div className="assessment-meta">
            <span className="meta-item">{assessment.tech_stack}</span>
            <span className="meta-divider">•</span>
            <span className="meta-item">{assessment.duration} minutes</span>
            <span className="meta-divider">•</span>
            <span className="meta-item">{assessment.questions} questions</span>
          </div>
        </div>
        <div className="header-actions">
          <button className="send-invites-btn">
            <Send size={18} />
            Send Invites
          </button>
        </div>
      </div>

      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'candidates' ? 'active' : ''}`}
          onClick={() => setActiveTab('candidates')}
        >
          Candidates ({candidates.length})
        </button>
        <button 
          className={`tab ${activeTab === 'questions' ? 'active' : ''}`}
          onClick={() => setActiveTab('questions')}
        >
          Questions
        </button>
        <button 
          className={`tab ${activeTab === 'results' ? 'active' : ''}`}
          onClick={() => setActiveTab('results')}
        >
          Results
        </button>
      </div>

      {activeTab === 'candidates' && (
        <div className="candidates-section">
          <div className="section-header">
            <h2 className="section-title">Manage Candidates</h2>
            <div className="section-actions">
              <button className="secondary-btn">
                <Upload size={18} />
                Bulk Upload
              </button>
              <button 
                className="primary-btn"
                onClick={() => setShowAddModal(true)}
              >
                <UserPlus size={18} />
                Add Candidate
              </button>
            </div>
          </div>

          <div className="candidates-table-container">
            <table className="candidates-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Status</th>
                  <th>Score</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {candidates.map(candidate => (
                  <tr key={candidate.id}>
                    <td>
                      <div className="candidate-name">
                        <div className="candidate-avatar">
                          {candidate.name.charAt(0)}
                        </div>
                        <span>{candidate.name}</span>
                      </div>
                    </td>
                    <td className="email-cell">{candidate.email}</td>
                    <td>{candidate.phone}</td>
                    <td>
                      <div className="status-cell">
                        {getStatusIcon(candidate.status)}
                        <span>{getStatusText(candidate.status)}</span>
                      </div>
                    </td>
                    <td>
                      {candidate.score !== null ? (
                        <span className="score-badge">{candidate.score}%</span>
                      ) : (
                        <span className="no-score">-</span>
                      )}
                    </td>
                    <td>
                      <button className="icon-btn delete-btn">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showAddModal && (
        <AddCandidateModal 
          onClose={() => setShowAddModal(false)}
          onAdd={(candidate) => {
            setCandidates([...candidates, { ...candidate, id: Date.now(), status: 'invited', invite_sent: false }]);
            setShowAddModal(false);
          }}
        />
      )}
    </div>
  );
}

function AddCandidateModal({ onClose, onAdd }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add New Candidate</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>Full Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="John Doe"
              required
            />
          </div>

          <div className="form-group">
            <label>Email Address *</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="john@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              placeholder="+1 (555) 000-0000"
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              Add Candidate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AssessmentDetails;
