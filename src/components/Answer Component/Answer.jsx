import React, { useState } from 'react';
import useAnswer from '../../context/AnswerContext';
import './Answer.css';

const Answer = ({
  answerOption,
  letter,
  correctAnswer,
  isClicked,
  setIsClicked,
}) => {
  const [isCorrect, setIsCorrect] = useState('no answer');
  const { answer, answerIsCorrect, answerIsWrong } = useAnswer();
  const isAnswerCorrect = () => {
    if (answerOption === correctAnswer) {
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
        ${isCorrect === 'correct' ? 'correct' : ''}
				${isCorrect === 'not correct' ? 'wrong' : ''}
				${isCorrect === 'no answer' ? 'notChoosen' : ''}`}
      onClick={() => onClickHandle()}
    >
      <p className="letter"> {letter} </p>
      <p className="answer-option">{answerOption}</p>
      {isCorrect === 'correct' ? (
        <span className="material-icons">check_circle_outline</span>
      ) : null}
      {isCorrect === 'not correct' ? (
        <span className="material-icons">highlight_off</span>
      ) : null}
    </div>
  );
};

export default Answer;
