export default function ProgressBar({ current, total }) {
    const progress = (current / total) * 100;
  
    return (
      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}>
          <span className="progress-text">
            Question {current} of {total}
          </span>
        </div>
      </div>
    );
  }