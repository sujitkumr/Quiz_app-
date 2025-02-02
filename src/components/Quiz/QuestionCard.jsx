import ProgressBar from '../Layout/ProgressBar';
import Button from '../UI/Button';
import { useState, useEffect } from 'react';


export default function QuestionCard({
  currentQuestion,
  questionNumber,
  currentQuestionIndex,
  totalQuestions,
  handleAnswerSelect,
  feedback,
}) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [shuffledOptions, setShuffledOptions] = useState([]);

  // Shuffle options only once when question changes
  useEffect(() => {
    if (currentQuestion) {
      const options = currentQuestion.options || 
        shuffleArray([currentQuestion.correct_answer, ...currentQuestion.incorrect_answers]);
      setShuffledOptions(options);
    }
  }, [currentQuestion]);

  // If no question, show error
  if (!currentQuestion) {
    return <div className="error">No question available</div>;
  }

  // If no options, show error
  if (!shuffledOptions || shuffledOptions.length === 0) {
    return (
      <div className="error-card">
        <h3>Question {questionNumber || currentQuestionIndex + 1} of {totalQuestions}</h3>
        <p>This question format is invalid</p>
      </div>
    );
  }

  // Handle when an answer is selected
  const handleAnswerClick = (answer) => {
    if (!feedback) { // Prevent changing answer after feedback is shown
      setSelectedAnswer(answer);
      handleAnswerSelect(answer);  // Call parent function to submit the answer
    }
  };

  // Logic to determine answer button classes
  const getButtonClass = (answer) => {
    const isCorrect = answer === currentQuestion.correct_answer;
    const isSelected = answer === selectedAnswer;

    // Add classes for feedback states
    if (feedback) {
      if (isCorrect) {
        return 'correct';
      }
      if (isSelected && !isCorrect) {
        return 'incorrect';
      }
      return 'inactive'; // Show inactive for other answers when feedback is shown
    }

    // Default class when no feedback is present
    return isSelected ? 'selected' : '';
  };

  return (
    <div className="question-card slide-in">
      <ProgressBar 
        current={currentQuestionIndex + 1} 
        total={totalQuestions} 
      />
      
      <div className="question-content">
        <h3 className="question-text">{currentQuestion.question || 'No question text available'}</h3>
        <div className="answers-grid">
          {shuffledOptions.map((answer) => (
            <Button
              key={answer}
              onClick={() => handleAnswerClick(answer)}  // Handle answer click
              disabled={!!feedback}  // Disable button after feedback
              className={`answer-button ${getButtonClass(answer)}`}
            >
              {answer}
            </Button>
          ))}
        </div>
      </div>

      {feedback && (
        <div className={`feedback ${feedback.type || 'default'}`}>
          {feedback.message || 'No feedback available'}
        </div>
      )}
    </div>
  );
}

// Fisher-Yates shuffle for randomizing options
function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]]; // Swap elements
  }
  return newArray;
}
