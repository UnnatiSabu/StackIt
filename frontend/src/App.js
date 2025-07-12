import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import AskAQuestion from '/Users/yughjuneja/Documents/stackit/frontend/src/components/AskAQuestion.js';  // Import AskAQuestionPage here
import './styles/global.css';
import EditProfilePage from './pages/EditProfilePage'; // import this new page


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/ask-question" element={<AskAQuestion />} />  {/* Add AskQuestion route */}
        <Route path="/edit-profile" element={<EditProfilePage />} /> {/* new route */}
      </Routes>
    </Router>
  );
}

export default App;
