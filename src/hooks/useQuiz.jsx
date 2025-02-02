

import { useState } from 'react';

const useQuiz = (questions = []) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const handleAnswerSelect = (selectedAnswer) => {
    if (quizCompleted) return;

    const currentQuestion = questions[currentQuestionIndex];
    
    // Validate question structure
    if (!currentQuestion?.correct_answer) {
      console.error('Invalid question format:', currentQuestion);
      setFeedback({ type: 'error', message: 'Invalid question format' });
      return;
    }

    // Check answer correctness
    const isCorrect = selectedAnswer === currentQuestion.correct_answer;
    
    if (isCorrect) {
      setScore(prev => prev + (currentQuestion.points || 1));
      setFeedback({ type: 'correct', message: 'Correct! 🎉' });
    } else {
      setFeedback({ type: 'incorrect', message: 'Oops! Try again 💪' });
    }

    // Move to next question or complete quiz
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        setQuizCompleted(true);
      }
      setFeedback(null);
    }, 1500);
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizCompleted(false);
    setFeedback(null);
  };

  return {
    currentQuestion: questions[currentQuestionIndex],
    currentQuestionIndex,
    totalQuestions: questions.length,
    handleAnswerSelect,
    score,
    feedback,
    quizCompleted, // Important: expose completion state
    resetQuiz,
  };
};



export default useQuiz;
