import { createContext, useEffect, useState } from "react";
import { storage } from "../storage/storage";

export const ThemeContext = createContext();

const ThemeProvider = ({children}) => {

    const [theme, setTheme] = useState(storage.getItem('theme') || 'dark')

    const changeTheme = () => {
        return theme === 'light'? setTheme('dark') : setTheme('light');
    }
    
    useEffect(()=>{

        storage.setItem('theme', theme)

        const root = document.querySelector(':root');
        const vars = [
            '--background-color',
            '--text-color'
        ]

        vars.map((item)=>{
            root.style.setProperty(
                `${item}-default`,
                `var(${item}-${theme})`
            )
        })

    }, [theme])

    return (
        <ThemeContext.Provider value={{theme, changeTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider;