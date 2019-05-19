export const initialState = {
  currentValue: "0",
  operator: null,
  previousValue: null
};

const calculator = (type, value, state) => {
  if (type === "number") {
    if (state.currentValue === "0") {
      return { currentValue: `${value}` };
    }
    return { currentValue: `${state.currentValue}${value}` };
  }

  if (type === "operator") {
    return {
      currentValue: "0",
      operator: value,
      previousValue: state.currentValue
    };
  }

  if (type === "equal") {
    const { currentValue, previousValue, operator } = state;

    const current = parseFloat(currentValue);
    const previous = parseFloat(previousValue);
    const resetState = {
      operator: null,
      previousValue: null
    };
    if (operator === "/") {
      return {
        currentValue: previous / current,
        ...resetState
      };
    }

    if (operator === "*") {
      return {
        currentValue: previous * current,
        ...resetState
      };
    }

    if (operator === "+") {
      return {
        currentValue: previous + current,
        ...resetState
      };
    }

    if (operator === "-") {
      return {
        currentValue: previous - current,
        ...resetState
      };
    }
  }

  if (type === "clear") {
    return initialState;
  }
  if (type === "posneg") {
    return {
      currentValue: `${parseFloat(state.currentValue) * -1}`
    };
  }
  if (type === "percentage") {
    return {
      currentValue: `${parseFloat(state.currentValue) * 0.01}`
    };
  }
  return state;
};

export default calculator;
