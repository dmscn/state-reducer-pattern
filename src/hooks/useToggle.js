import React from 'react'

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

export function toggleReducer(state, action) {
    const handler = actionHandlers[action.type]
    if (!handler) throw new Error(`Unhandled type: ${action.type}`);
    return handler(state, action);
}

export default function useToggle({ reducer = toggleReducer } = {}) {
    const [{ on }, dispatch] = React.useReducer(reducer, INITIAL_STATE);

    const toggle = () => dispatch({ type: useToggle.types.TOGGLE });
    const setOn = () => dispatch({ type: useToggle.types.ON });
    const setOff = () => dispatch({ type: useToggle.types.OFF });

    return { on, toggle, setOn, setOff }
}

useToggle.types = ACTION_TYPES;