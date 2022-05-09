export const initialState = { answer: 'no answer', result: 0 };

function answerReducer(state, action) {
  switch (action.type) {
    case 'ANSWER_IS_CORRECT':
      return { ...state, answer: 'correct', result: state.result+1 };
    case 'ANSWER_IS_WRONG':
      return { ...state, answer: 'not correct' };
    case 'NEXT_QUESTION':
      return { ...state, answer: 'no answer'};
      case 'TRY_AGAIN':
        return { ...state, answer: 'no answer', result: 0};
    default:
      return state;
  }
}

export default answerReducer;
