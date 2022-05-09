import React, { useState, useEffect } from 'react';
import Answer from '../Answer Component/Answer';
import useAnswer from '../../context/AnswerContext';
import { countryList } from '../../data';
import getRandomInt from '../../getRandomInt';
import './AnswerList.css';

const AnswerList = ({ correctAnswer, getNextQuestion }) => {
  const letters = ['A', 'B', 'C', 'D', 'E'];
  const [answers, setAnswers] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const { answer, nextAnswer } = useAnswer();

  useEffect(() => {
    let answersArray = [];
    while (answersArray.length < 4) {
      const index = getRandomInt(countryList.length);
      const country = countryList[index];
      if (answersArray.indexOf(country) === -1 && country !== correctAnswer) {
        answersArray.push(country);
      }
    }
    answersArray.push(correctAnswer);
    const array = shuffle(answersArray);
    setAnswers(array);
  }, [correctAnswer]);
  const shuffle = (array) => {
    let currentIndex = array.length,
      randomIndex;
    while (currentIndex != 0) {
      randomIndex = getRandomInt(currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  };

  const onClickHandle = () => {
    setIsClicked(false);
    nextAnswer();
    getNextQuestion();
  };

  return (
    <div className="answer-list">
      {answers ? (
        answers.map((answer, index) => (
          <Answer
            answerOption={answer}
            correctAnswer={correctAnswer}
            letter={letters[index]}
            key={answer}
            isClicked={isClicked}
            setIsClicked={setIsClicked}
          />
        ))
      ) : (
        <div className="loader"></div>
      )}
      {answer === 'correct' ? (
        <button className="answer-list-button" onClick={() => onClickHandle()}>
          next
        </button>
      ) : null}
    </div>
  );
};

export default AnswerList;
