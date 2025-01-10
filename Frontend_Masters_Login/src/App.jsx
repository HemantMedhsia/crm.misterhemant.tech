import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './Pages/Login/LoginPage';
import TrainingStudio from './Pages/Landing/LandingPage';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<TrainingStudio />} />
      </Routes>
    </Router>
  );
};

export default App;
