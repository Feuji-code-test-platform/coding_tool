import React from 'react';
import './ResultsChart.css';

function ResultsChart({ results }) {
  // Calculate data for the chart
  const scoreRanges = {
    '90-100': 0,
    '80-89': 0,
    '70-79': 0,
    '60-69': 0,
    'Below 60': 0
  };

  results.forEach(result => {
    if (result.score >= 90) scoreRanges['90-100']++;
    else if (result.score >= 80) scoreRanges['80-89']++;
    else if (result.score >= 70) scoreRanges['70-79']++;
    else if (result.score >= 60) scoreRanges['60-69']++;
    else scoreRanges['Below 60']++;
  });

  const maxCount = Math.max(...Object.values(scoreRanges), 1);

  return (
    <div className="chart-container">
      <div className="chart-header">
        <h3>Score Distribution</h3>
        <span className="chart-subtitle">Breakdown by score range</span>
      </div>

      <div className="bar-chart">
        {Object.entries(scoreRanges).map(([range, count]) => (
          <div key={range} className="chart-bar-group">
            <div className="bar-label">{range}</div>
            <div className="bar-container">
              <div 
                className={`bar ${count > 0 ? 'filled' : 'empty'}`}
                style={{ width: `${(count / maxCount) * 100}%` }}
              >
                {count > 0 && <span className="bar-value">{count}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="chart-summary">
        <div className="summary-item">
          <span className="label">Total Completed</span>
          <span className="value">{results.filter(r => r.status === 'completed').length}</span>
        </div>
        <div className="summary-item">
          <span className="label">Average Score</span>
          <span className="value">
            {results.filter(r => r.status === 'completed').length > 0
              ? (results
                  .filter(r => r.status === 'completed')
                  .reduce((sum, r) => sum + r.score, 0) / results.filter(r => r.status === 'completed').length)
                  .toFixed(1)
              : 'N/A'}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ResultsChart;
