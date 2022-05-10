import React, { useState, useEffect } from 'react';
import Answer from '../Answer Component/Answer';
import useAnswer from '../../context/AnswerContext';
import { countryList } from '../../data';
import getRandomInt from '../../getRandomInt';
import './AnswerList.css';

const AnswerList = ({ correctAnswer, getNextQuestion, setPage }) => {
  const letters = ['A', 'B', 'C', 'D', 'E'];
  const [answers, setAnswers] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const { answer, nextAnswer } = useAnswer();
  console.log(answer);
  useEffect(() => {
    let answersArray = [];
    while (answersArray.length < 4) {
      const index = getRandomInt(countryList.length);
      const country = countryList[index];
      if (answersArray.indexOf(country) === -1 && country !== correctAnswer) {
        answersArray.push({ country: country, isCorrect: false });
      }
    }
    answersArray.push({ country: correctAnswer, isCorrect: true });
    const array = shuffle(answersArray);
    setAnswers(array);
  }, [correctAnswer]);
  useEffect(() => {
    if (answer === 'correct' || answer === 'not correct') {
      setShowAnswer(true);
    }
  }, [answer]);
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
    if (answer === 'correct') {
      setShowAnswer(false);
      setIsClicked(false);
      nextAnswer();
      getNextQuestion();
    } else if (answer === 'not correct') {
      setShowAnswer(false);
      setIsClicked(false);
      setPage('result');
    }
  };

  return (
    <div className="answer-list">
      {answers ? (
        answers.map((answer, index) => (
          <Answer
            answerOption={answer}
            letter={letters[index]}
            showAnswer={showAnswer}
            key={answer}
            isClicked={isClicked}
            setIsClicked={setIsClicked}
          />
        ))
      ) : (
        <div className="loader"></div>
      )}
      {answer !== 'no answer' ? (
        <button className="answer-list-button" onClick={() => onClickHandle()}>
          next
        </button>
      ) : null}
    </div>
  );
};

export default AnswerList;
