import { useParams, useNavigate } from 'react-router-dom';
import questions from '../data/questions';

function Review({ attempts }) {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Find the specific attempt based on the ID from the URL
  const attempt = attempts.find((a) => a.id === parseInt(id));

  if (!attempt) {
    return <p>Attempt not found!</p>; // Handle case when no attempt is found
  }

  return (
    <div className="review-container">
      <h2>Review Attempt</h2>

      {questions.map((q) => {
        const userAnswer = attempt.answers[q.id]; // Get user's answer for this question
        const feedback = attempt.feedback[q.id]; // Get feedback (Correct/Wrong) for this question

        // Check if the user skipped this question
        const isSkipped = userAnswer === undefined || userAnswer === '';

        return (
          <div key={q.id} className="question-review-card">
            <p className="question-text"><strong>{q.question}</strong></p>
            
            {/* Display user's answer or 'Not Attempted' in gray if skipped */}
            <p><strong>Your Answer:</strong> {isSkipped ? <span style={{ color: 'gray' }}>Not Attempted</span> : userAnswer}</p>
            
            {/* Show the correct answer for reference */}
            <p><strong>Correct Answer:</strong> {q.correctAnswer}</p>

            {/* Show 'Not Attempted' feedback in gray if skipped, otherwise show actual feedback */}
            {isSkipped ? (
              <p className="feedback" style={{ color: 'gray' }}>Not Attempted</p>
            ) : (
              <p className={`feedback ${feedback === 'Wrong!' ? 'wrong' : 'correct'}`}>
                {feedback}
              </p>
            )}
          </div>
        );
      })}

      {/* Buttons to navigate back to results or home */}
      <button onClick={() => navigate('/results')}>Back to Results</button>
      <button onClick={() => navigate('/')}>Home</button>
    </div>
  );
}

export default Review;
