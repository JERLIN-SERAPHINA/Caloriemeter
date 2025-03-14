import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './scss/Navigation.scss';

const Navigation = () => {
  const location = useLocation();
  
  // Check if the current path is related to questionnaires
  const isQuestionnairePath = location.pathname.includes('questionnaire');
  
  if (!isQuestionnairePath) return null;

  return (
    <nav className="questionnaire-navigation">
      <div className="nav-container">
        <div className="nav-brand">
          <Link to="/">VitaGuide</Link>
        </div>
        <ul className="nav-links">
          <li className={location.pathname === '/questionnaires' ? 'active' : ''}>
            <Link to="/questionnaires">Questionnaires</Link>
          </li>
          <li className={location.pathname.includes('/questionnaires/create') ? 'active' : ''}>
            <Link to="/questionnaires/create">Create New</Link>
          </li>
          <li className={location.pathname.includes('/questionnaire-answers') ? 'active' : ''}>
            <Link to="/questionnaire-answers">Responses</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
