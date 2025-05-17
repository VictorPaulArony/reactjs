import React, {useReducer} from 'react';


export const initialTasks = [
    {id: 0, text: "Finish Reading", done: true},
    {id: 1, text: "Go for a walk", done: false},
    {id: 2, text: "Go home", done: false}
];

let nextId = 3;

const tasksReducer = (tasks, action) => {
    switch(action.type) {
        case 'added' :{
            return [...tasks, {
                id: action.id,
                text: action.text,
                done: false
                }];
            }
        case 'changed': {
            return tasks.map(t=> {
                if (t.id === action.task.id){
                    return action.task;
                }else {
                    return t;
                }
            });
        }
        case 'deleted': {
            return tasks.filter(t => t.id !== action.id);
            }
        default: {
            throw Error("invalid action"+ action.type)
        }
    }
 }

 const TodoList = () => {

    const [state, dispatch] = useReducer(tasksReducer, initialTasks);

    const handleAddTask = (text) => {
        dispatch({
            type: 'added',
            id: nextId++,
            text: text,
        })  ;
    }

    const handleChangeTask = (task) => {
        dispatch({
            type: 'changed',
            task: task
        });
    }

    const handleDeleteTask =(taskId) => {
        dispatch({
           type: 'deleted' ,
           id: taskId
        });
    }
  return(
      <>
        <h2> Task Manager </h2>
        <input
            value = {input}
         />


      </>

  );


 }









 export default TodoList;