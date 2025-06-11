import React, { createContext, useContext, useEffect, useState } from 'react';
import { themes } from '../common-data/settings.js';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(themes.light);

    useEffect(() => {
        document.body.setAttribute('theme', theme);
        console.log('Theme set to:', theme);
    }, [theme]);

    const setThemeMode = (mode) => setTheme(mode);

    return (
        <ThemeContext.Provider value={{ theme, setThemeMode }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useThemeContext = () => useContext(ThemeContext);
