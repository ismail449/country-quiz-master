import React, { createContext, useReducer, useContext } from 'react';
import answerReducer, { initialState } from './answerReducer';

const AnswerContext = createContext(initialState);

export const AnswerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(answerReducer, initialState);
  const answerIsCorrect = () => {
    dispatch({
      type: 'ANSWER_IS_CORRECT',
    });
  };
  const answerIsWrong = () => {
    dispatch({
      type: 'ANSWER_IS_WRONG',
    });
  };
  const nextAnswer = () => {
    dispatch({
      type: 'NEXT_QUESTION',
    });
  };
  const tryAgain = () => {
    dispatch({
      type: 'TRY_AGAIN',
    });
  };
  const value = {
    answer: state.answer,
    result: state.result,
    answerIsCorrect,
    answerIsWrong,
    nextAnswer,
    tryAgain,
  };
  return (
    <AnswerContext.Provider value={value}>{children}</AnswerContext.Provider>
  );
};
const useAnswer = () => {
  const context = useContext(AnswerContext);
  if (context === undefined) {
    throw new Error('useShop must be used within ShopContext');
  }
  return context;
};
export default useAnswer;
