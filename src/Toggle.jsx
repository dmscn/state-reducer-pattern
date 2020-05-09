import React from 'react'
import Button from './Button'
import Switch from './Switch';

function useToggle() {
  const [on, setOnState] = React.useState(false);

  const toggle = () => setOnState(o => !o);
  const setOn = () => setOnState(true);
  const setOff = () => setOnState(false);

  return { on, toggle, setOn, setOff }
}

function Toggle() {
  const { on, toggle, setOn, setOff } = useToggle();

  return (
    <div className="flex items-center flex-col">
      <div>
        <Button className="m-5" onClick={setOn}>Turn on</Button>
        <Button onClick={setOff}>Turn off</Button>
      </div>

      <Switch on={on} onClick={toggle} />
    </div>
  );
}

export default Toggle;