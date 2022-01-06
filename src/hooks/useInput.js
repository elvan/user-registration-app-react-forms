import { useReducer } from 'react';

const initialInputState = {
  value: '',
  isTouched: false,
};

const inputStateReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT_CHANGE':
      return {
        value: action.value,
        isTouched: state.isTouched,
      };
    case 'INPUT_BLUR':
      return {
        ...state,
        isTouched: true,
      };
    case 'RESET_INPUT':
      return initialInputState;
    default:
      return state;
  }
};

const useInput = (validate) => {
  const [state, dispatch] = useReducer(inputStateReducer, initialInputState);

  const isValid = validate(state.value);
  const hasError = !isValid && state.isTouched;

  const changeHandler = (event) => {
    // @ts-ignore
    dispatch({
      type: 'INPUT_CHANGE',
      value: event.target.value,
    });
  };

  const blurHandler = () => {
    // @ts-ignore
    dispatch({
      type: 'INPUT_BLUR',
    });
  };

  const reset = () => {
    // @ts-ignore
    dispatch({
      type: 'RESET_INPUT',
    });
  };

  return {
    value: state.value,
    isValid,
    hasError,
    changeHandler,
    blurHandler,
    reset,
  };
};

export default useInput;
