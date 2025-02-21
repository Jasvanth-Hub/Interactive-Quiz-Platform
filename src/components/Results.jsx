import { useNavigate } from 'react-router-dom';

function Results({ attempts }) {
  const navigate = useNavigate(); // Hook for navigation between pages

  return (
    <div className="results-container">
      <h2>Quiz Results Summary</h2>

      {/* Loop through each attempt and display its score */}
      {attempts.map((attempt, index) => (
        <div key={attempt.id} className="attempt-card">
          <p>Attempt {index + 1}: {attempt.score} / {15}</p>

          {/* Button to navigate to the review page for this specific attempt */}
          <button onClick={() => navigate(`/review/${attempt.id}`)}>Review Attempt</button>
        </div>
      ))}

      {/* Button to go back to the home page */}
      <button onClick={() => navigate('/')}>Home</button>
    </div>
  );
}

export default Results;
