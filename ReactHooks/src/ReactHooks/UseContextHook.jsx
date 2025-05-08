import React, { useContext } from "react";
import {ThemeContext} from "../context/ThemeContext";


//custom hook(basic useContext hook)
const UseContextHook = () => {

    const { theme, themeToggler } = useContext(ThemeContext)
    return (
        <>
            <button onClick={themeToggler}>
                Toggle to {theme === "light" ? "dark" : "light"}
            </button>
        </>
    );

}
export default UseContextHook;