import { useState, useCallback } from "react";
import {useReactFlow} from "@xyflow/react";

export const useLetterSwitchHandle = () => {
    const [letterSwitchMap, setLetterSwitchMap] = useState(new Map());

    const setLetterSwitch = useCallback((nodeId, isEnabled) => {
        setLetterSwitchMap(prev => new Map(prev).set(nodeId, isEnabled));
    }, []);

    const removeLetterSwitch = useCallback((nodeId) => {
        setLetterSwitchMap(prev => {
            const newMap = new Map(prev);
            newMap.delete(nodeId);
            return newMap;
        });
    }, []);

    return { letterSwitchMap, setLetterSwitch, removeLetterSwitch };
};
