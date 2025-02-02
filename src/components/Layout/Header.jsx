import PropTypes from 'prop-types';
import LogoIcon from '../UI/LogoIcon';
const Header = ({ title, score, showScore = true }) => {
  return (
    <header className="quiz-header slide-down">
      <div className="header-content">
      <h1 className="logo">
         <LogoIcon />
         {title || 'Quiz App'}
      </h1>
        {showScore && (
          <div className="score-display">
            <span className="score-label">Current Score:</span>
            <span className="score-value">{score} pts</span>
          </div>
        )}
      </div>
    </header>
  );
};

Header.propTypes = {
  title: PropTypes.string,
  score: PropTypes.number,
  showScore: PropTypes.bool,
};

export default Header;