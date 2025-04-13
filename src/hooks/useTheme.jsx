import {useEffect, useState} from "react";
import {colorModes} from "../common-data/settings.js";

export const useTheme = () => {
    const [theme, setTheme] = useState(colorModes.light);

    useEffect(() => {
        document.body.setAttribute("color-mode", theme);
        console.log("Theme set to: ", theme);
    }, [theme]);

    const setLightTheme = () => setTheme(colorModes.light);
    const setDarkTheme = () => setTheme(colorModes.dark);
    const setThemeMode = (mode) => setTheme(mode);
    return {
        theme,
        setLightTheme,
        setDarkTheme,
        setThemeMode,
    };
};
