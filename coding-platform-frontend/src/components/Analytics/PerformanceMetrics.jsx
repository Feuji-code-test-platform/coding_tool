import React from 'react';
import { TrendingUp, TrendingDown, Zap } from 'lucide-react';
import './PerformanceMetrics.css';

function PerformanceMetrics({ results }) {
  const completed = results.filter(r => r.status === 'completed');
  
  // Calculate percentile distribution
  const percentiles = {
    'Top 25% (90+)': completed.filter(r => r.score >= 90).length,
    'Above Average (80-89)': completed.filter(r => r.score >= 80 && r.score < 90).length,
    'Average (70-79)': completed.filter(r => r.score >= 70 && r.score < 80).length,
    'Below Average (60-69)': completed.filter(r => r.score >= 60 && r.score < 70).length,
    'Needs Improvement (<60)': completed.filter(r => r.score < 60).length
  };

  // Calculate time efficiency
  const avgTimeEfficiency = completed.length > 0
    ? (completed.reduce((sum, r) => sum + (r.time_taken / r.duration * 100), 0) / completed.length).toFixed(1)
    : 0;

  // Calculate completion stats
  const completionStats = {
    'Completed': results.filter(r => r.status === 'completed').length,
    'In Progress': results.filter(r => r.status === 'in-progress').length,
    'Not Started': results.filter(r => r.status === 'not-started').length
  };

  return (
    <div className="performance-metrics">
      <div className="metrics-header">
        <h3>Performance Analysis</h3>
        <span className="metrics-subtitle">Candidate achievement levels</span>
      </div>

      <div className="performance-sections">
        {/* Score Distribution Breakdown */}
        <div className="performance-section">
          <h4 className="section-label">Score Distribution</h4>
          <div className="distribution-list">
            {Object.entries(percentiles).map(([label, count]) => (
              <div key={label} className="distribution-item">
                <span className="dist-label">{label}</span>
                <div className="dist-bar-wrapper">
                  <div className={`dist-bar tier-${label.split('(')[0].trim().toLowerCase().replace(/\s+/g, '-')}`}>
                    {count}
                  </div>
                </div>
                <span className="dist-count">{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Status Breakdown */}
        <div className="performance-section">
          <h4 className="section-label">Status Breakdown</h4>
          <div className="status-breakdown">
            {Object.entries(completionStats).map(([status, count]) => (
              <div key={status} className="status-item">
                <div className={`status-indicator ${status.toLowerCase().replace(/\s+/g, '-')}`}></div>
                <div className="status-info">
                  <span className="status-name">{status}</span>
                  <span className="status-count">{count} candidates</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Efficiency Metrics */}
        <div className="performance-section">
          <h4 className="section-label">Efficiency Metrics</h4>
          <div className="efficiency-card">
            <div className="efficiency-item">
              <Zap size={18} />
              <div className="efficiency-content">
                <span className="eff-label">Avg Time Utilization</span>
                <span className="eff-value">{avgTimeEfficiency}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PerformanceMetrics;
