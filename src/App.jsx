import React, { useState } from 'react';
import { AnswerProvider } from './context/AnswerContext';
import { countryList, questions } from './data';
import QuizPage from './pages/QuizPage Component/QuizPage';
import ResultPage from './pages/ResultPage Component/ResultPage';
import './App.css';

const App = () => {
  const [page, setPage] = useState('quiz');
  return (
    <AnswerProvider
      value={{
        answer: 'no answer',
        result: 0,
      }}
    >
      <div className="App">
        <h1 className="title"> country quiz </h1>
        {page === 'quiz' ? (
          <>
            <QuizPage
              countryList={countryList}
              questions={questions}
              setPage={setPage}
            />
          </>
        ) : (
          <ResultPage setPage={setPage} />
        )}
      </div>
    </AnswerProvider>
  );
};

export default App;
