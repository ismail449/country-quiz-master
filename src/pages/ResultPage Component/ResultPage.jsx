import React from 'react';
import useAnswer from '../../context/AnswerContext';
import Image from './undraw_winners_ao2o 2.svg';
import './ResultPage.css';
const ResultPage = ({ setPage }) => {
  const { result, tryAgain } = useAnswer();
  const onClickHandle = () => {
    tryAgain();
    setPage('quiz');
  };
  return (
    <div className="result">
      <div className="result-background">
        <img className="result-page-image" src={Image} />
        <p className="result-text">results</p>
        <p className="result-correct">
          You got <span>{result}</span> correct answers
        </p>
        <button className="try-again-button" onClick={onClickHandle}>
          Try again
        </button>
      </div>
    </div>
  );
};

export default ResultPage;
