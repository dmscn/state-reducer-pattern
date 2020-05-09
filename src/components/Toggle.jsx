import React from 'react'
import Button from './Button'
import Switch from './Switch';
import useToggle, { toggleReducer } from '../hooks/useToggle';

const MAX_CLICKS = 4;

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