import { useState } from "react";
export const useNumberNode = () => {
    const [numberNodes, setNumberNodes] = useState(new Map().set('number1', 4));
    const registerNumberNode = (id, value) => {
        setNumberNodes(prev => {
            const newMap = new Map(prev);
            newMap.set(id, value);
            return newMap;
        });
    };

    const updateNumberNodeValue = (id, newValue) => {
        setNumberNodes(prev => {
            const newMap = new Map(prev);
            if (newMap.has(id)) {
                newMap.set(id, newValue);
            }
            return newMap;
        });
    };

    const unregisterNumberNode = (id) => {
        setNumberNodes(prev => {
            const newMap = new Map(prev);
            newMap.delete(id);
            return newMap;
        });
    };
    return {
        numberNodes,
        registerNumberNode,
        updateNumberNodeValue,
        unregisterNumberNode
    }
}