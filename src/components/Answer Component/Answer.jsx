import React, { useState } from 'react';
import useAnswer from '../../context/AnswerContext';
import './Answer.css';

const Answer = ({
  answerOption,
  letter,
  isClicked,
  setIsClicked,
  showAnswer,
}) => {
  const [isCorrect, setIsCorrect] = useState('no answer');
  const { answerIsCorrect, answerIsWrong } = useAnswer();
  const isAnswerCorrect = () => {
    if (answerOption.isCorrect) {
      answerIsCorrect();
      setIsCorrect('correct');
    } else {
      answerIsWrong();
      setIsCorrect('not correct');
    }
  };
  const onClickHandle = () => {
    if (!isClicked) {
      setIsClicked(true);
      isAnswerCorrect();
    }

    return;
  };
  return (
    <div
      className={`answer
        ${showAnswer && answerOption.isCorrect ? 'correct' : ''}
				${isCorrect === 'not correct' && showAnswer ? 'wrong' : ''}
				${isCorrect === 'no answer' ? 'notChoosen' : ''}`}
      onClick={() => onClickHandle()}
    >
      <p className="letter"> {letter} </p>
      <p className="answer-option">{answerOption.country}</p>
      {showAnswer && answerOption.isCorrect ? (
        <span className="material-icons">check_circle_outline</span>
      ) : null}
      {isCorrect === 'not correct' ? (
        <span className="material-icons">highlight_off</span>
      ) : null}
    </div>
  );
};

export default Answer;
