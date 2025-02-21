import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Interactive Quiz Platform</h1>
        <p>Test your knowledge with our interactive quiz!</p>
      </header>

      <div className="home-content">
        <button className="start-button" onClick={() => navigate('/quiz')}>
          Start Quiz
        </button>
      </div>
    </div>
  );
}

export default Home;
