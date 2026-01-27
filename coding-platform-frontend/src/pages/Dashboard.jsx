import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus } from 'lucide-react';
import AssessmentCard from '../components/AssessmentCard/AssessmentCard';
import './Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();
  const [assessments, setAssessments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - replace with actual API call
  useEffect(() => {
    const mockAssessments = [
      {
        id: 1,
        job_role: 'Senior Technical Lead',
        candidate_count: 6,
        duration: 60,
        status: 'active',
        created_at: new Date(Date.now() - 12 * 60 * 60 * 1000),
        tech_stack: 'React, Node.js',
        difficulty: 'hard'
      },
      {
        id: 2,
        job_role: 'Network Engineer',
        candidate_count: 3,
        duration: 45,
        status: 'active',
        created_at: new Date(Date.now() - 14 * 60 * 60 * 1000),
        tech_stack: 'Python, AWS',
        difficulty: 'medium'
      },
      {
        id: 3,
        job_role: 'Microsoft Office Specialist',
        candidate_count: 0,
        duration: 30,
        status: 'draft',
        created_at: new Date(Date.now() - 14 * 60 * 60 * 1000),
        tech_stack: 'JavaScript',
        difficulty: 'easy'
      },
      {
        id: 4,
        job_role: 'Network Engineer',
        candidate_count: 5,
        duration: 60,
        status: 'active',
        created_at: new Date(Date.now() - 16 * 60 * 60 * 1000),
        tech_stack: 'Java, Spring',
        difficulty: 'medium'
      },
      {
        id: 5,
        job_role: 'GenAI Engineer (Fullstack)',
        candidate_count: 4,
        duration: 90,
        status: 'active',
        created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        tech_stack: 'Python, PyTorch',
        difficulty: 'hard'
      },
      {
        id: 6,
        job_role: 'GenAI Engineer',
        candidate_count: 3,
        duration: 75,
        status: 'active',
        created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        tech_stack: 'Python, TensorFlow',
        difficulty: 'hard'
      },
      {
        id: 7,
        job_role: 'Data migration specialist',
        candidate_count: 11,
        duration: 45,
        status: 'active',
        created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
        tech_stack: 'SQL, ETL',
        difficulty: 'medium'
      },
      {
        id: 8,
        job_role: 'Principal Security Engineer',
        candidate_count: 1,
        duration: 120,
        status: 'active',
        created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        tech_stack: 'Security, Cloud',
        difficulty: 'hard'
      }
    ];

    setAssessments(mockAssessments);
  }, []);

  const filteredAssessments = assessments.filter(assessment =>
    assessment.job_role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="header-left">
          <h1 className="page-title">{assessments.length} Projects</h1>
        </div>
        <div className="header-right">
          <div className="search-box">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search project"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            className="new-project-btn"
            onClick={() => navigate('/assessment/create')}
          >
            <Plus size={20} />
            New Assessment
          </button>
        </div>
      </div>

      <div className="assessments-grid">
        {filteredAssessments.map(assessment => (
          <AssessmentCard key={assessment.id} assessment={assessment} />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
