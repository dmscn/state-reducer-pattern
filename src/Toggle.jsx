import React from 'react'
import Button from './Button'
import Switch from './Switch';

function Toggle() {
  const [on, setOnState] = React.useState(false)

  const toggle = () => setOnState(o => !o);

  return (
    <div className="flex items-center flex-col">
      <div>
        <Button className="m-5">Turn on</Button>
        <Button>Turn off</Button>
      </div>

      <Switch on={on} onClick={toggle} />
    </div>
  );
}

export default Toggle;