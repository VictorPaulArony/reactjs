import React, { useReducer } from 'react'
import './App.css'
import CounterDisplay from './components/CounterDisplay';
import CounterButtons from './components/CounterButtons';
import Reducer, { initialState } from './components/Reducer';
import FormReducer, { initialStates } from './components/FormReducer';
import TodoList from './components/TodoList'


function App() {
  const [state, dispatch] = useReducer(Reducer, initialState)
  const [counter, setCounter] = useReducer(FormReducer, initialStates);

  const handleNum = () => {
    setCounter( {type: 'increment_num'});
  }

  const handleStr = (e) => {
    setCounter({
      type: 'increment_str',
      nextNum: e.target.value
    })
    
  }
  return (
    <div className="App" style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>React useReducer Counter</h1>
      <CounterDisplay count={state.count} />
      <CounterButtons dispatch={dispatch} />
      <input
        value= {counter.nextNum}
        onChange={handleStr}
      />

      <button
        onClick={handleNum}
      >increment</button>
      <p> String: {counter.str} </p>
      <p> Number: {counter.num}</p>
    </div>
  )
}

export default App
