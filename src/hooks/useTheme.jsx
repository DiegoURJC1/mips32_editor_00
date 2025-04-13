import {useEffect, useState} from "react";
import {themes} from "../common-data/settings.js";

export const useTheme = () => {
    const [theme, setTheme] = useState(themes.light);

    useEffect(() => {
        document.body.setAttribute("theme", theme);
        console.log("Theme set to: ", theme);
    }, [theme]);

    const setLightTheme = () => setTheme(themes.light);
    const setDarkTheme = () => setTheme(themes.dark);
    const setThemeMode = (mode) => setTheme(mode);
    return {
        theme,
        setLightTheme,
        setDarkTheme,
        setThemeMode,
    };
};
