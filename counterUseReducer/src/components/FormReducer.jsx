import React from 'react';

export const initialStates = { str: "", num: 0 };

const FormReducer = (state, action) => {
    switch (action.type) {
        case 'increment_str': {
            return {
                str: action.nextNum,
                num: state.num
            };
        }
        case 'increment_num': {
            return {
                str: state.str,
                num: state.num + 1
            };
        }
    }
    throw Error("invalid input" + action.type)

}

export default FormReducer;