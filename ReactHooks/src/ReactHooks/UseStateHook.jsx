import React, {useState} from "react";

//the use of the useState hook – For Local Component State
const UseStateHook = () => {
    const [counter, setConter] = useState(0);
    return (
        <div>
            <h1>UseStateHook</h1>
            <p>counter: {counter}</p>
            <button onClick={() => setConter((counter) => counter + 1)}>Counter</button>
           
        </div>
    );
};



export default UseStateHook;