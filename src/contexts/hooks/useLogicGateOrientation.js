import { useState, useCallback } from "react";

export const useLogicGateOrientation = () => {
    const [logicGateOrientation, setLogicGateOrientation] = useState(new Map().set('and', true).set('or', true));

    const setOrientation = useCallback((id, isLeft) => {
        setLogicGateOrientation(prev => new Map(prev).set(id, isLeft));
    }, []);

    const removeOrientation = useCallback((id) => {
        setLogicGateOrientation(prev => {
            const newMap = new Map(prev);
            newMap.delete(id);
            return newMap;
        });
    }, []);

    return { logicGateOrientation, setOrientation, removeOrientation };
};
