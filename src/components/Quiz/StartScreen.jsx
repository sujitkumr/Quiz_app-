export default function StartScreen({ quiz, onStart }) {
    return (
      <div className="start-screen fade-in">
        <h1 className="quiz-title">{quiz?.title}</h1>
        <div className="quiz-meta">
          <p>Category: {quiz?.category}</p>
          <p>Total Questions: {quiz?.questions?.length}</p>
          <p>Difficulty: {quiz?.difficulty}</p>
        </div>
        <button 
          className="start-button"
          onClick={onStart}
        >
          Start Quiz!
        </button>
      </div>
    );
  }