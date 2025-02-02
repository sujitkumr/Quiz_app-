import { useEffect, useState } from 'react';
import StartScreen from './components/Quiz/StartScreen';
import QuestionCard from './components/Quiz/QuestionCard';
import Results from './components/Quiz/Result';
import LoadingSpinner from './components/UI/LoadingSpinner';
import Header from './components/Layout/Header';
import useQuiz from './hooks/useQuiz';


// Updated CORS proxy solution
const PROXY_URL = 'https://api.allorigins.win/raw?url=';
const API_URL = `${PROXY_URL}https://api.jsonserve.com/Uw5CrX`;

const MOCK_QUIZ = {
  results: [
    {
      question: "If the base sequence in DNA is 5' AAAT 3', what is the mRNA sequence?",
      correct_answer: "5' AAAU 3'",
      incorrect_answers: [
        "5' UUUU 3'",
        "3' UUUU 5'",
        "3' AAAU 5'"
      ]
    }
  ],
  title: "Genetics and Evolution",
  questions_count: 1
};

function App() {
  const [quizData, setQuizData] = useState(MOCK_QUIZ);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentView, setCurrentView] = useState('start');


  
  // Enhanced data transformation with validation
  const transformData = (apiData) => {
    try {
      const rawQuestions = apiData.questions || [];
      
      const transformedResults = rawQuestions.map(q => {
        const options = q.options || [];
        const correctOption = options.find(o => o.is_correct) || {};
        
        return {
          question: q.description || 'Missing question text',
          correct_answer: correctOption.description || 'No correct answer provided',
          incorrect_answers: options
            .filter(o => !o.is_correct)
            .map(o => o.description)
            .filter(Boolean)
        };
      });

      return {
        results: transformedResults,
        title: apiData.title || "Biology Quiz",
        questions_count: apiData.questions_count || transformedResults.length
      };
    } catch (transformError) {
      console.error('Data transformation failed:', transformError);
      return MOCK_QUIZ;
    }
  };

  const quiz = useQuiz(quizData.results);
  useEffect(() => {
    if (quiz.quizCompleted) {
      setCurrentView('results');
    }
  }, [quiz.quizCompleted]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const validData = data.quizzes?.[0] || data;
        
        const transformed = transformData(validData);
        
        if (!transformed.results?.length) {
          throw new Error('No valid questions found in response');
        }

        setQuizData(transformed);
        setError(null);
      } catch (err) {
        console.error('API Error:', err);
        setError(err.message);
        setQuizData(MOCK_QUIZ);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const startQuiz = () => {
    if (!quizData.results.length) {
      setError('No questions available to start quiz');
      return;
    }
    quiz.resetQuiz();
    setCurrentView('quiz');
  };
  

  if (loading) return <LoadingSpinner />;

  return (
    <div className="app-container">
      {currentView === 'start' && (
        <StartScreen 
          quiz={quizData} 
          onStart={startQuiz} 
          error={error}
        />
      )}
      
      {currentView === 'quiz' && (
        <QuestionCard
          {...quiz}
          totalQuestions={quizData.questions_count}
          onComplete={() => setCurrentView('results')}
        />
      )}
      
      {currentView === 'results' && (
        <Results
          score={quiz.score}
          totalQuestions={quizData.questions_count}
          onRestart={() => setCurrentView('start')}
        />
      )}
    </div>
  );
}

export default App;




