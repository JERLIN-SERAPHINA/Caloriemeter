import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./components/common/Home";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import SymptomsForm from "./components/forms/SymptomsForm"; // Import SymptomsForm component
import VitaminPredictionForm from "./components/vitamin/VitaminPredictionForm"; // Import SymptomsForm component
import DemoHomepage from "./components/common/GuestHomepage";
import PersonalDetails from "./components/forms/PersonalDetails";
import KnowledgeQuizPage from "./components/quiz/KnowledgeQuizPage";
import QuizResultsPage from "./components/quiz/QuizResult";
import Profile from "./legacy/Profile";
import FoodSources from "./components/vitamin/FoodSources";
import EmailSender from "./components/common/EmailSender";
import FeedbackForm from "./components/forms/FeedbackForm";
import FeedbackDisplay from "./components/forms/FeedbackDisplay";
import SymptomsList from "./components/forms/SymptomsList";
import DietPlan from "./components/forms/DietPlan";
import AboutSection from "./components/common/About";
import SideEffects from "./components/vitamin/SideEffects";
import VitaminInformation from "./components/vitamin/VitaminInformation";
import GuestHomepage from "./legacy/Guest";
import AdminDashboard from "./components/dashboard/AdminDashboard";
import AdminPage from "./components/dashboard/AdminPage";
import TodllerForm from "./components/forms/TodllerForm";


import QuestionnaireList from './components/QuestionnaireList';
import QuestionnaireDetail from './components/QuestionnaireDetail';
import QuestionnaireCreate from './components/QuestionnaireCreate';
import QuestionnaireEdit from './components/QuestionnaireEdit';
import QuestionnaireAnswerList from './components/QuestionnaireAnswerList';
import QuestionnaireAnswerDetail from './components/QuestionnaireAnswerDetail';
import QuestionnaireAnswerForQuestionnaire from './components/QuestionnaireAnswerForQuestionnaire';
import Calorie from "./components/Calorie";
import QuestionnaireForm from './components/QuestionnaireForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<DemoHomepage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/personal-details" element={<PersonalDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/symptoms-form" element={<SymptomsForm />} />
        <Route path="/vitamin-prediction" element={<VitaminPredictionForm />} />
        <Route path="/quiz" element={<KnowledgeQuizPage />} />
        <Route path="/quiz-results" element={<QuizResultsPage />} />
        <Route path="/foodsources" element={<FoodSources />} />
        <Route path="/mail" element={<EmailSender />} />
        <Route path="/feedback" element={<FeedbackForm />} />
        <Route path="/feedbackdisplay" element={<FeedbackDisplay />} />
        <Route path="/symptomslist" element={<SymptomsList />} />
        <Route path="/dietplan" element={<DietPlan />} />
        <Route path="/about" element={<AboutSection />} />
        <Route path="/sideffects" element={<SideEffects />} />
        <Route path="/vitamin-information" element={<VitaminInformation />} />
        <Route path="/guest" element={<GuestHomepage />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/adminpage" element={<AdminPage />} />
        <Route path="/toddlerform" element={<TodllerForm />} />

        <Route path="/calorie" element={<Calorie />} />


        <Route path="/questionnaires" element={<QuestionnaireList />} />
        <Route path="/questionnaires/create" element={<QuestionnaireCreate />} />
        <Route path="/questionnaires/:questionnaireId" element={<QuestionnaireDetail />} />
        <Route path="/questionnaires/edit/:questionnaireId" element={<QuestionnaireEdit />} />
        <Route path="/questionnaires/fill/:questionnaireId" element={<QuestionnaireForm />} />

        {/* Questionnaire Answer Routes */}
        <Route path="/questionnaire-answers" element={<QuestionnaireAnswerList />} />
        <Route path="/questionnaire-answers/:answerId" element={<QuestionnaireAnswerDetail />} />
        <Route path="/questionnaire-answers/questionnaire/:questionnaireId" element={<QuestionnaireAnswerForQuestionnaire />} />

        {/* Home or default route */}
        <Route path="/" element={<div><h1>Welcome to Questionnaire App</h1><Link to="/questionnaires">View Questionnaires</Link> | <Link to="/questionnaire-answers">View Answers</Link></div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
