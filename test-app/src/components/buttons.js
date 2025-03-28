import { useState } from "react"


export default function MessageButton(){
    const [message, setMessage]= useState("")

    const handleClick = () => {
        setMessage("Hello Kenya. ")
        alert(`button clicked`)
    }
    return(
        <div className="buttons">
            <button onClick={handleClick}> Click me</button>
            {message && <p>{ message }</p>}
            <BasicButtons />
        </div>
    )
}
function ClickMe() {
    alert(`clicked me all the time!`)
}

function BasicButtons() {
  return (
     <button onClick={ClickMe}> hello</button>
  );
}
