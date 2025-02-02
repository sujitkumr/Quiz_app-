import Button from '../UI/Button';

export default function Results({ score, totalQuestions, onRestart }) {
  const correctAnswers = Math.floor((score / 100) * totalQuestions);

  return (
    <div className="results-container zoom-in">
      <h2>Quiz Complete! 🎉</h2>
      <div className="results-card">
        <div className="result-item">
          <span>Total Score:</span>
          <span className="score">{score} points</span>
        </div>
        <div className="result-item">
          <span>Correct Answers:</span>
          <span>{score}/{totalQuestions}</span>
        </div>
        <div className="result-item">
          <span>Accuracy:</span>
          <span>{((score / totalQuestions) * 100).toFixed(1)}%</span>
        </div>
      </div>
      <Button onClick={onRestart} className="restart-button">
        Try Again 
      </Button>
    </div>
  );
}

