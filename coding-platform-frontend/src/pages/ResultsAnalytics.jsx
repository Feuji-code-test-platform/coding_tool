import React, { useState, useMemo } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Filter
} from 'lucide-react';
import ResultsChart from '../components/Analytics/ResultsChart';
import CandidateResultsTable from '../components/Analytics/CandidateResultsTable';
import PerformanceMetrics from '../components/Analytics/PerformanceMetrics';
import './ResultsAnalytics.css';

function ResultsAnalytics() {
  const [assessmentFilter, setAssessmentFilter] = useState('all');
  const [timeFilter, setTimeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock candidate results data
  const mockResults = [
    {
      id: 1,
      assessment_id: 1,
      candidate_name: 'Rajesh Kumar',
      email: 'rajesh.kumar@example.com',
      assessment_title: 'Senior Technical Lead',
      score: 87,
      max_score: 100,
      status: 'completed',
      submitted_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      time_taken: 58,
      duration: 60,
      question_count: 5,
      correct_answers: 4
    },
    {
      id: 2,
      assessment_id: 1,
      candidate_name: 'Priya Sharma',
      email: 'priya.sharma@example.com',
      assessment_title: 'Senior Technical Lead',
      score: 92,
      max_score: 100,
      status: 'completed',
      submitted_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      time_taken: 55,
      duration: 60,
      question_count: 5,
      correct_answers: 5
    },
    {
      id: 3,
      assessment_id: 2,
      candidate_name: 'Amit Patel',
      email: 'amit.patel@example.com',
      assessment_title: 'Network Engineer',
      score: 72,
      max_score: 100,
      status: 'completed',
      submitted_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      time_taken: 44,
      duration: 45,
      question_count: 4,
      correct_answers: 3
    },
    {
      id: 4,
      assessment_id: 2,
      candidate_name: 'Sneha Gupta',
      email: 'sneha.gupta@example.com',
      assessment_title: 'Network Engineer',
      score: 78,
      max_score: 100,
      status: 'completed',
      submitted_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      time_taken: 42,
      duration: 45,
      question_count: 4,
      correct_answers: 3
    },
    {
      id: 5,
      assessment_id: 1,
      candidate_name: 'Vikram Singh',
      email: 'vikram.singh@example.com',
      assessment_title: 'Senior Technical Lead',
      score: 65,
      max_score: 100,
      status: 'in-progress',
      submitted_at: new Date(Date.now() - 30 * 60 * 1000),
      time_taken: 30,
      duration: 60,
      question_count: 5,
      correct_answers: 3
    },
    {
      id: 6,
      assessment_id: 5,
      candidate_name: 'Deepak Rao',
      email: 'deepak.rao@example.com',
      assessment_title: 'GenAI Engineer (Fullstack)',
      score: 88,
      max_score: 100,
      status: 'completed',
      submitted_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      time_taken: 87,
      duration: 90,
      question_count: 6,
      correct_answers: 5
    },
    {
      id: 7,
      assessment_id: 5,
      candidate_name: 'Neha Verma',
      email: 'neha.verma@example.com',
      assessment_title: 'GenAI Engineer (Fullstack)',
      score: 82,
      max_score: 100,
      status: 'completed',
      submitted_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      time_taken: 85,
      duration: 90,
      question_count: 6,
      correct_answers: 5
    },
    {
      id: 8,
      assessment_id: 7,
      candidate_name: 'Arjun Tiwari',
      email: 'arjun.tiwari@example.com',
      assessment_title: 'Data migration specialist',
      score: 0,
      max_score: 100,
      status: 'not-started',
      submitted_at: null,
      time_taken: 0,
      duration: 45,
      question_count: 4,
      correct_answers: 0
    }
  ];

  // Filter results
  const filteredResults = useMemo(() => {
    return mockResults.filter(result => {
      if (assessmentFilter !== 'all' && result.assessment_id !== parseInt(assessmentFilter)) {
        return false;
      }
      if (statusFilter !== 'all' && result.status !== statusFilter) {
        return false;
      }
      return true;
    });
  }, [assessmentFilter, statusFilter]);

  // Calculate metrics
  const metrics = useMemo(() => {
    const completed = filteredResults.filter(r => r.status === 'completed');
    const inProgress = filteredResults.filter(r => r.status === 'in-progress');
    const notStarted = filteredResults.filter(r => r.status === 'not-started');
    
    const avgScore = completed.length > 0 
      ? (completed.reduce((sum, r) => sum + r.score, 0) / completed.length).toFixed(1)
      : 0;

    const highScores = completed.filter(r => r.score >= 80).length;
    const lowScores = completed.filter(r => r.score < 60).length;

    return {
      total: filteredResults.length,
      completed: completed.length,
      inProgress: inProgress.length,
      notStarted: notStarted.length,
      avgScore,
      highScores,
      lowScores,
      completionRate: ((completed.length / (filteredResults.length || 1)) * 100).toFixed(1)
    };
  }, [filteredResults]);

  const assessments = [...new Set(mockResults.map(r => ({
    id: r.assessment_id,
    title: r.assessment_title
  })))];

  return (
    <div className="results-analytics">
      <div className="analytics-header">
        <div className="header-top">
          <h1 className="page-title">Assessment Analytics</h1>
          <p className="page-subtitle">Track candidate performance and assessment metrics</p>
        </div>

        <div className="filters-section">
          <div className="filter-group">
            <label htmlFor="assessment-filter">Assessment</label>
            <select 
              id="assessment-filter"
              value={assessmentFilter}
              onChange={(e) => setAssessmentFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Assessments</option>
              {assessments.map(a => (
                <option key={a.id} value={a.id}>{a.title}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="status-filter">Status</label>
            <select 
              id="status-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="in-progress">In Progress</option>
              <option value="not-started">Not Started</option>
            </select>
          </div>

          <div className="filter-info">
            <Filter size={16} />
            <span>Showing {filteredResults.length} results</span>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-header">
            <Users size={20} />
            <span className="metric-label">Total Candidates</span>
          </div>
          <div className="metric-value">{metrics.total}</div>
          <div className="metric-footer">
            <span className={`trend ${metrics.completed > 0 ? 'positive' : 'neutral'}`}>
              {metrics.completed} completed
            </span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <CheckCircle size={20} />
            <span className="metric-label">Completion Rate</span>
          </div>
          <div className="metric-value">{metrics.completionRate}%</div>
          <div className="metric-footer">
            <span className="trend positive">
              <ArrowUpRight size={14} /> {metrics.completed} completed
            </span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <TrendingUp size={20} />
            <span className="metric-label">Average Score</span>
          </div>
          <div className="metric-value">{metrics.avgScore}</div>
          <div className="metric-footer">
            <span className="metric-detail">
              Out of 100
            </span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <BarChart3 size={20} />
            <span className="metric-label">Performance</span>
          </div>
          <div className="metric-value">{metrics.highScores}</div>
          <div className="metric-footer">
            <span className="metric-detail">
              {metrics.highScores} high scorers (80+)
            </span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        <ResultsChart results={filteredResults} />
        <PerformanceMetrics results={filteredResults} />
      </div>

      {/* Results Table */}
      <div className="results-table-section">
        <h2 className="section-title">Detailed Results</h2>
        <CandidateResultsTable results={filteredResults} />
      </div>
    </div>
  );
}

export default ResultsAnalytics;
