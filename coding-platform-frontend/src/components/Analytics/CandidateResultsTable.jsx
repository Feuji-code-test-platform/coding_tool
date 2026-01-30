import React, { useState } from 'react';
import { 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Download,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import './CandidateResultsTable.css';

function CandidateResultsTable({ results }) {
  const [sortConfig, setSortConfig] = useState({ key: 'score', direction: 'desc' });
  const [expandedRows, setExpandedRows] = useState(new Set());

  const getSortedResults = () => {
    const sorted = [...results].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (typeof aValue === 'string') {
        return sortConfig.direction === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return sortConfig.direction === 'asc'
        ? aValue - bValue
        : bValue - aValue;
    });

    return sorted;
  };

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'desc' ? 'asc' : 'desc'
    });
  };

  const toggleRowExpand = (id) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  const getStatusBadge = (status) => {
    const badges = {
      'completed': { icon: CheckCircle, label: 'Completed', class: 'completed' },
      'in-progress': { icon: Clock, label: 'In Progress', class: 'in-progress' },
      'not-started': { icon: AlertCircle, label: 'Not Started', class: 'not-started' }
    };
    return badges[status] || badges['not-started'];
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'high';
    if (score >= 60) return 'medium';
    return 'low';
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const sortedResults = getSortedResults();

  return (
    <div className="candidate-results-table">
      <div className="table-actions">
        <button className="export-btn">
          <Download size={16} />
          Export Results
        </button>
      </div>

      <div className="table-wrapper">
        <table className="results-table">
          <thead>
            <tr>
              <th className="expand-col"></th>
              <th onClick={() => handleSort('candidate_name')} className="sortable">
                <div className="header-content">
                  Candidate Name
                  <SortIndicator active={sortConfig.key === 'candidate_name'} direction={sortConfig.direction} />
                </div>
              </th>
              <th onClick={() => handleSort('assessment_title')} className="sortable">
                <div className="header-content">
                  Assessment
                  <SortIndicator active={sortConfig.key === 'assessment_title'} direction={sortConfig.direction} />
                </div>
              </th>
              <th onClick={() => handleSort('score')} className="sortable">
                <div className="header-content">
                  Score
                  <SortIndicator active={sortConfig.key === 'score'} direction={sortConfig.direction} />
                </div>
              </th>
              <th onClick={() => handleSort('status')} className="sortable">
                <div className="header-content">
                  Status
                  <SortIndicator active={sortConfig.key === 'status'} direction={sortConfig.direction} />
                </div>
              </th>
              <th onClick={() => handleSort('submitted_at')} className="sortable">
                <div className="header-content">
                  Submitted
                  <SortIndicator active={sortConfig.key === 'submitted_at'} direction={sortConfig.direction} />
                </div>
              </th>
              <th>Time Taken</th>
            </tr>
          </thead>
          <tbody>
            {sortedResults.map((result) => {
              const statusBadge = getStatusBadge(result.status);
              const StatusIcon = statusBadge.icon;
              const isExpanded = expandedRows.has(result.id);

              return (
                <React.Fragment key={result.id}>
                  <tr className={`result-row ${result.status}`}>
                    <td className="expand-col">
                      <button 
                        className="expand-btn"
                        onClick={() => toggleRowExpand(result.id)}
                      >
                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                    </td>
                    <td>
                      <div className="candidate-info">
                        <div className="candidate-name">{result.candidate_name}</div>
                        <div className="candidate-email">{result.email}</div>
                      </div>
                    </td>
                    <td>
                      <span className="assessment-name">{result.assessment_title}</span>
                    </td>
                    <td>
                      {result.status === 'completed' ? (
                        <span className={`score-badge ${getScoreColor(result.score)}`}>
                          {result.score}/{result.max_score}
                        </span>
                      ) : (
                        <span className="score-na">-</span>
                      )}
                    </td>
                    <td>
                      <div className={`status-badge ${statusBadge.class}`}>
                        <StatusIcon size={14} />
                        <span>{statusBadge.label}</span>
                      </div>
                    </td>
                    <td className="date-cell">
                      {formatDate(result.submitted_at)}
                    </td>
                    <td className="time-cell">
                      {result.time_taken > 0 ? `${result.time_taken}m` : '-'}
                    </td>
                  </tr>
                  {isExpanded && (
                    <tr className="expanded-row">
                      <td colSpan="7">
                        <div className="expanded-content">
                          <div className="detail-grid">
                            <div className="detail-item">
                              <span className="detail-label">Email</span>
                              <span className="detail-value">{result.email}</span>
                            </div>
                            <div className="detail-item">
                              <span className="detail-label">Questions Answered</span>
                              <span className="detail-value">{result.correct_answers}/{result.question_count}</span>
                            </div>
                            <div className="detail-item">
                              <span className="detail-label">Duration Limit</span>
                              <span className="detail-value">{result.duration}m</span>
                            </div>
                            <div className="detail-item">
                              <span className="detail-label">Accuracy</span>
                              <span className="detail-value">
                                {result.question_count > 0 
                                  ? ((result.correct_answers / result.question_count) * 100).toFixed(0)
                                  : 0}%
                              </span>
                            </div>
                            {result.submitted_at && (
                              <div className="detail-item">
                                <span className="detail-label">Submitted At</span>
                                <span className="detail-value">
                                  {new Date(result.submitted_at).toLocaleString()}
                                </span>
                              </div>
                            )}
                          </div>
                          <div className="expanded-actions">
                            <button className="action-btn view-btn">View Details</button>
                            <button className="action-btn feedback-btn">Send Feedback</button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>

        {sortedResults.length === 0 && (
          <div className="empty-state">
            <AlertCircle size={32} />
            <h3>No Results Found</h3>
            <p>Try adjusting your filters to see candidate results</p>
          </div>
        )}
      </div>
    </div>
  );
}

function SortIndicator({ active, direction }) {
  if (!active) return <span className="sort-indicator inactive">⇅</span>;
  return <span className={`sort-indicator ${direction}`}>{direction === 'asc' ? '↑' : '↓'}</span>;
}

export default CandidateResultsTable;
