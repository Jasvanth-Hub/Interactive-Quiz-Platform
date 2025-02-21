import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import questions from '../data/questions';

function Quiz({ addAttempt }) {
  // State to store user's answers
  const [answers, setAnswers] = useState({});
  // State to store feedback for each question
  const [feedback, setFeedback] = useState({});
  // State to track the current question index
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // State to handle the countdown timer (30 seconds per question)
  const [timer, setTimer] = useState(30);
  // State to store the final score after the quiz is completed
  const [score, setScore] = useState(null);
  // State to track whether the final feedback is being displayed
  const [showFinalFeedback, setShowFinalFeedback] = useState(false);

  const navigate = useNavigate();
  
  // Get the current question based on the current index
  const currentQuestion = questions[currentQuestionIndex];

  // Timer Effect: Decreases the timer every second
  useEffect(() => {
    if (timer === 0) {
      handleNextQuestion(); // Auto move to next question when timer runs out
    }
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on component unmount or question change
  }, [timer, currentQuestionIndex]);

  // Function to handle answer selection (MCQ or input-based)
  const handleAnswerChange = (e) => {
    const value = e.target.value;
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: value, // Store the answer for the current question
    }));
  };

  // Function to move to the next question
  const handleNextQuestion = () => {
    const userAnswer = answers[currentQuestion.id] || '';

    // Check if the user's answer is correct
    const isCorrect =
      userAnswer.trim().toLowerCase() === currentQuestion.correctAnswer.trim().toLowerCase();

    // Only store feedback if the user attempted the question
    if (userAnswer) {
      setFeedback((prev) => ({
        ...prev,
        [currentQuestion.id]: isCorrect ? 'Correct!' : 'Wrong!',
      }));
    }

    // Check if this is the last question
    if (currentQuestionIndex === questions.length - 1) {
      setFeedback((prev) => ({
        ...prev,
        [currentQuestion.id]: isCorrect ? 'Correct!' : 'Wrong!',
      }));

      setShowFinalFeedback(true); // Show final feedback before navigating to results

      setTimeout(() => {
        calculateScore(); // Calculate the final score after showing feedback
      }, 1500);
    } else {
      // Move to the next question after a short delay
      setTimeout(() => {
        setCurrentQuestionIndex((prev) => prev + 1);
        setTimer(30); // Reset timer for the next question
      }, 1000);
    }
  };

  // Function to calculate the final quiz score
  const calculateScore = () => {
    let correctCount = 0;

    // Loop through all questions and count correct answers
    questions.forEach((q) => {
      if (answers[q.id]?.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase()) {
        correctCount++;
      }
    });

    // Prepare attempt data to store the result
    const attemptData = {
      id: Date.now(),
      score: correctCount,
      answers,
      feedback,
    };

    addAttempt(attemptData); // Save attempt data
    setScore(correctCount); // Update score state

    // Navigate to the results page after a short delay
    setTimeout(() => {
      navigate('/results');
    }, 500);
  };

  return (
    <div className="quiz-container">
      {/* Show quiz if the score is not yet calculated */}
      {score === null ? (
        <>
          {/* Display countdown timer */}
          <div className="timer">Time Left: {timer}s</div>
          <div className="question-card">
            <p>
              <strong>Question {currentQuestionIndex + 1}:</strong> {currentQuestion.question}
            </p>

            {/* Display multiple-choice options if the question type is MCQ */}
            {currentQuestion.type === 'mcq' &&
            currentQuestion.options.map((option, index) => (
              <label key={index} className="option-container">
                <input
                  type="radio"
                  name={`q-${currentQuestion.id}`}
                  value={option.charAt(0)}
                  onChange={handleAnswerChange}
                  checked={answers[currentQuestion.id] === option.charAt(0)}
                />
                {option} {/* Clicking this will also select the option */}
              </label>
            ))}

            {/* Display input box if the question type is integer-based */}
            {currentQuestion.type === 'integer' && (
              <div>
                <input
                  type="number"
                  onChange={handleAnswerChange}
                  value={answers[currentQuestion.id] || ''}
                />
              </div>
            )}

            {/* Display feedback only if the question has been attempted */}
            {feedback[currentQuestion.id] && (
              <p className={`feedback ${feedback[currentQuestion.id] === 'Wrong!' ? 'wrong' : 'correct'}`}>
                {feedback[currentQuestion.id]}
              </p>
            )}

            {/* Next button to proceed to the next question */}
            <div className="next-button-container">
              {!showFinalFeedback && <button onClick={handleNextQuestion}>Next</button>}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default Quiz;
