import React from 'react';

const CounterButtons = ({dispatch}) => {
    return (
        <div style={{display: 'flex', justifyContent: 'center', gap: '10px'}}>
            <button onClick ={() => dispatch({type: 'decrement'})} > -1 </button>
            <button onClick={() => dispatch({ type: 'increment' })}>+1</button>
            <button onClick={() => dispatch({ type: 'add', payload: 5 })}>+5</button>
            <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
        </div>
        )
    }
export default CounterButtons;