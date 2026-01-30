import React, { useMemo, useState } from 'react';
import { Briefcase, Building2, Mail, MapPin, Search, UserCircle2 } from 'lucide-react';
import './RecruiterDashboard.css';

function RecruiterDashboard() {
  const [searchTerm, setSearchTerm] = useState('');

  const recruiter = {
    name: 'Riya Sharma',
    title: 'Lead Technical Recruiter',
    company: 'Feuji',
    email: 'riya.sharma@feuji.com',
    location: 'Bengaluru, IN',
    lastActive: 'Today, 10:20 AM',
    openPositions: 6,
    totalCandidates: 38,
    assessmentsCreated: 14
  };

  const jobs = [
    {
      id: 1,
      title: 'Senior Technical Lead',
      status: 'active',
      location: 'Remote - US',
      candidates: 6,
      createdAt: '2 days ago',
      techStack: 'React, Node.js',
      difficulty: 'Hard'
    },
    {
      id: 2,
      title: 'GenAI Engineer (Fullstack)',
      status: 'active',
      location: 'Bengaluru, IN',
      candidates: 4,
      createdAt: '5 days ago',
      techStack: 'Python, PyTorch',
      difficulty: 'Hard'
    },
    {
      id: 3,
      title: 'Network Engineer',
      status: 'active',
      location: 'Austin, US',
      candidates: 3,
      createdAt: '1 week ago',
      techStack: 'Python, AWS',
      difficulty: 'Medium'
    },
    {
      id: 4,
      title: 'Data Migration Specialist',
      status: 'draft',
      location: 'Remote',
      candidates: 0,
      createdAt: '2 weeks ago',
      techStack: 'SQL, ETL',
      difficulty: 'Medium'
    }
  ];

  const filteredJobs = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) {
      return jobs;
    }
    return jobs.filter((job) => job.title.toLowerCase().includes(term));
  }, [jobs, searchTerm]);

  return (
    <div className="recruiter-dashboard">
      <div className="recruiter-header">
        <div>
          <h1 className="page-title">Recruiter Dashboard</h1>
          <p className="page-subtitle">Profile overview and job pipeline</p>
        </div>
        <button className="primary-action">Create Assessment</button>
      </div>

      <section className="recruiter-card">
        <div className="recruiter-profile">
          <div className="avatar">
            <UserCircle2 size={48} />
          </div>
          <div className="profile-details">
            <h2>{recruiter.name}</h2>
            <p>{recruiter.title}</p>
            <div className="profile-meta">
              <span>
                <Building2 size={16} />
                {recruiter.company}
              </span>
              <span>
                <Mail size={16} />
                {recruiter.email}
              </span>
              <span>
                <MapPin size={16} />
                {recruiter.location}
              </span>
            </div>
          </div>
        </div>
        <div className="recruiter-stats">
          <div className="stat-card">
            <span>Open Positions</span>
            <strong>{recruiter.openPositions}</strong>
          </div>
          <div className="stat-card">
            <span>Total Candidates</span>
            <strong>{recruiter.totalCandidates}</strong>
          </div>
          <div className="stat-card">
            <span>Assessments</span>
            <strong>{recruiter.assessmentsCreated}</strong>
          </div>
          <div className="stat-card">
            <span>Last Active</span>
            <strong>{recruiter.lastActive}</strong>
          </div>
        </div>
      </section>

      <section className="jobs-section">
        <div className="jobs-header">
          <div className="jobs-title">
            <Briefcase size={20} />
            <h2>Job Dashboard</h2>
          </div>
          <div className="search-box">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search job role"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>
        </div>

        <div className="jobs-grid">
          {filteredJobs.map((job) => (
            <article key={job.id} className="job-card">
              <div className="job-card-header">
                <h3>{job.title}</h3>
                <span className={`status-pill ${job.status}`}>{job.status}</span>
              </div>
              <div className="job-card-body">
                <div className="job-meta">
                  <span>
                    <MapPin size={14} />
                    {job.location}
                  </span>
                  <span>
                    <Briefcase size={14} />
                    {job.techStack}
                  </span>
                </div>
                <div className="job-details">
                  <div>
                    <span className="label">Candidates</span>
                    <strong>{job.candidates}</strong>
                  </div>
                  <div>
                    <span className="label">Difficulty</span>
                    <strong>{job.difficulty}</strong>
                  </div>
                  <div>
                    <span className="label">Created</span>
                    <strong>{job.createdAt}</strong>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default RecruiterDashboard;
