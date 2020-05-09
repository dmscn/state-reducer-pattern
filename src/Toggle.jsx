import React from 'react'
import Button from './Button'
import Switch from './Switch';

const MAX_CLICKS = 4;

const INITIAL_STATE = {
  on: false
}

const ACTION_TYPES = {
  ON: 'ON',
  OFF: 'OFF',
  TOGGLE: 'TOGGLE',
}

const actionHandlers = {
  [ACTION_TYPES.ON]: state => ({ ...state, on: true }),
  [ACTION_TYPES.OFF]: state => ({ ...state, on: false }),
  [ACTION_TYPES.TOGGLE]: state => ({ ...state, on: !state.on })
}

function toggleReducer(state, action) {
  const handler = actionHandlers[action.type]
  if (!handler) throw new Error(`Unhandled type: ${action.type}`);
  return handler(state, action);
}

function useToggle({ reducer = toggleReducer } = {}) {
  const [{ on }, dispatch] = React.useReducer(reducer, INITIAL_STATE);

  const toggle = () => dispatch({ type: useToggle.types.TOGGLE });
  const setOn = () => dispatch({ type: useToggle.types.ON });
  const setOff = () => dispatch({ type: useToggle.types.OFF });

  return { on, toggle, setOn, setOff }
}

useToggle.types = ACTION_TYPES;

function Toggle() {
  const [clicskSinceReset, setClicksSinceReset] = React.useState(0);
  const tooManyClicks = clicskSinceReset >= MAX_CLICKS;

  const { on, toggle, setOn, setOff } = useToggle({
    reducer(state, action) {
      const changes = toggleReducer(state, action);
      return (tooManyClicks && action.type === useToggle.types.TOGGLE)
        ? { ...changes, on: state.on }
        : changes;
    }
  });

  const reset = () => setClicksSinceReset(0);

  const handleClick = () => {
    toggle();
    setClicksSinceReset(c => c + 1);
  }

  return (
    <div className="flex items-center flex-col">
      <div>
        <Button className="m-5" onClick={setOn}>Turn on</Button>
        <Button onClick={setOff}>Turn off</Button>
      </div>

      <Switch on={on} onClick={handleClick} />
      {
        tooManyClicks && <Button onClick={reset}>Reset</Button>
      }
    </div>
  );
}

export default Toggle;