import React, { useEffect, useState } from 'react';
import AnswerList from '../../components/AnswerList Component/AnswerList';
import useAnswer from '../../context/AnswerContext';
import getRandomInt from '../../getRandomInt';
import Image from './undraw_adventure_4hum 1.svg';
import './QuizPage.css';

const QuizPage = ({ countryList, questions, setPage }) => {
  const [country, setCountry] = useState('');
  const [question, setQuestion] = useState('');
  const [countryInfo, setCountryInfo] = useState({
    capital: '',
    flag: '',
    language: '',
  });
  const { answer } = useAnswer();
  useEffect(() => {
    if (answer === 'not correct') {
      setPage('result');
    }
  }, [answer]);
  useEffect(() => {
    fetchCoutry();
  }, []);
  useEffect(() => {
    getQuestion();
  }, [countryInfo]);
  const fetchCoutry = async () => {
    const index = getRandomInt(countryList.length);
    const countryName = countryList[index];

    const responce = await fetch(
      `https://restcountries.com/v3.1/name/${countryName}`,
    );
    const info = {
      capital: '',
      flag: '',
      language: '',
    };
    const data = await responce.json();
    info.capital = data[0].capital[0];
    info.flag = data[0].flags.png;
    info.language = Object.values(data[0].languages)[0];
    setCountryInfo(info);
    setCountry(data[0].name.common);
  };

  const getQuestion = () => {
    const index = getRandomInt(questions.length);
    const question = questions[index];
    if (index === 0 && countryInfo.capital) {
      setQuestion(`${countryInfo.capital} ${question}`);
    } else if (index === 1 && countryInfo.flag) {
      setQuestion(question);
    }
  };
  const getNextQuestion = () => {
    fetchCoutry();
    getQuestion();
  };
  return (
    <>
      <img className="quiz-page-image" src={Image} />
      <div className="quize-background">
        {question === 'which country does this flag belong to' ? (
          <img className="flag" src={countryInfo.flag} />
        ) : (
          <div></div>
        )}
        <p className="question"> {question} </p>
        {country !== '' ? (
          <AnswerList
            getNextQuestion={getNextQuestion}
            correctAnswer={country}
          />
        ) : (
          <div className="loader"></div>
        )}
      </div>
    </>
  );
};

export default QuizPage;
