import { useState } from "react";

export const useNumberNode = () => {
    const [numberNodes, setNumberNodes] = useState(
        new Map().set('number1', { value: 4, bits: 32 })
    );

    const registerNumberNode = (id, value, bits = 32) => {
        setNumberNodes(prev => {
            const newMap = new Map(prev);
            newMap.set(id, { value, bits });
            return newMap;
        });
    };

    const updateNumberNodeValue = (id, newValue) => {
        setNumberNodes(prev => {
            const newMap = new Map(prev);
            const node = newMap.get(id);
            if (node) {
                newMap.set(id, { ...node, value: newValue });
            }
            return newMap;
        });
    };

    const updateNumberNodeBits = (id, newBits) => {
        setNumberNodes(prev => {
            const newMap = new Map(prev);
            const node = newMap.get(id);
            if (node) {
                newMap.set(id, { ...node, bits: newBits });
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
        updateNumberNodeBits,
        unregisterNumberNode
    };
};
