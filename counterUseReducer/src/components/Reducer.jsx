// import React, {useReducer} from 'react';

//initial state
export const initialState = {count: 0};

//reducer function
const Reducer = (state, action) => {
    switch(action.type) {
        case 'increment':
            return {count: state.count + 1};
        case 'decrement':
            return {count: state.count -1 };
        case 'add':
            return {count: state.count + action.payload};
        case 'reset':
            return {count: 0}
        default:
            return state;
    }
}

export default Reducer;