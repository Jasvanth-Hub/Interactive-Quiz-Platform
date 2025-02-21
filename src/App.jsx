import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Quiz from './components/Quiz';
import Results from './components/Results';
import Review from './components/Review';
import './App.css';

function App() {
  const [attempts, setAttempts] = useState([]);

  const addAttempt = (attempt) => {
    setAttempts([...attempts, attempt]);
  };

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz addAttempt={addAttempt} />} />
          <Route path="/results" element={<Results attempts={attempts} />} />
          <Route path="/review/:id" element={<Review attempts={attempts} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
