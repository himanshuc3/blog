import React, { useState, createContext, ReactNode } from "react";

interface ContextProps {
    darkTheme: boolean;
    toggleTheme: () => void;
}

// Useless, because controlled by in function state
export const ThemeContext = createContext<ContextProps>({
    darkTheme: true,
    toggleTheme: () => { }
})

interface Props {
    children: ReactNode;
}

export const ThemeProvider: React.FC<Props> = ({ children }) => {
    const [darkTheme, setDarkTheme] = useState(false);

    const toggleThemeHandler = () => {
        setDarkTheme((prevState) => !prevState);
    };

    return (
        <ThemeContext.Provider
            value={{
                darkTheme: darkTheme,
                toggleTheme: toggleThemeHandler,
            }
            }
        >
            {children}
        </ThemeContext.Provider>
    );
};



export default ThemeContext;

