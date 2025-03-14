import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import './scss/QuestionnaireWrapper.scss';

const QuestionnaireWrapper = () => {
  return (
    <div className="questionnaire-wrapper">
      <nav className="questionnaire-nav">
        <div className="nav-container">
          <div className="nav-logo">
            <Link to="/">VitaGuide</Link>
          </div>
          <ul className="nav-links">
            <li>
              <Link to="/questionnaires">All Questionnaires</Link>
            </li>
            <li>
              <Link to="/questionnaires/create">Create New</Link>
            </li>
            <li>
              <Link to="/questionnaire-answers">View Responses</Link>
            </li>
          </ul>
        </div>
      </nav>
      
      <main className="questionnaire-content">
        <Outlet />
      </main>
      
      <footer className="questionnaire-footer">
        <div className="footer-content">
          <p>&copy; {new Date().getFullYear()} VitaGuide - Questionnaire System</p>
        </div>
      </footer>
    </div>
  );
};

export default QuestionnaireWrapper;
