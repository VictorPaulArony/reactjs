import React, { createContext, useState } from "react";

export const ThemeContext = createContext()

const ThemeContextProvider = ({ children }) => {
    const [theme, setTheme] = useState("light")

    const themeToggler = () =>{
        setTheme((prevTheme) => prevTheme === "light" ? "dark": "light");
       
    }
    return (
        < ThemeContext.Provider value={{ theme, themeToggler }}>
            {children}
        </ThemeContext.Provider >
    )
}

export default ThemeContextProvider;