import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileCode, 
  BarChart3, 
  Settings, 
  HelpCircle,
  LogOut
} from 'lucide-react';
import './Sidebar.css';

function Sidebar({ isOpen }) {
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Assessments' },
    { path: '/reports', icon: BarChart3, label: 'Reports' },
    { path: '/support', icon: HelpCircle, label: 'Support' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  const recentProjects = [
    { name: 'Network Engineer', candidates: 5 },
    { name: 'GenAI Engineer (Fullstack)', candidates: 4 },
    { name: 'GenAI Engineer', candidates: 3 },
    { name: 'Data migration specialist', candidates: 11 },
    { name: 'Principal Security', candidates: 1 },
  ];

  const handleLogout = () => {
    localStorage.removeItem('recruiter_token');
    window.location.href = '/login';
  };

  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <FileCode size={28} color="#ff6b35" />
        <h1 className="logo-text">Feuji CodeHire</h1>
      </div>

      <nav className="sidebar-nav">
        <ul className="nav-list">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="recent-projects">
        <h3 className="section-title">Recent Projects</h3>
        <ul className="project-list">
          {recentProjects.map((project, index) => (
            <li key={index} className="project-item">
              <div className="project-icon"></div>
              <div className="project-info">
                <div className="project-name">{project.name}</div>
                <div className="project-meta">{project.candidates} candidates</div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="sidebar-footer">
        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
