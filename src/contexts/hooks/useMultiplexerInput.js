import { useState, useCallback } from "react";

export const useMultiplexerInput = () => {
    const [multiplexerInputs, setMultiplexerInputs] = useState(new Map().set('multiplexer5', 4).set('multiplexer6', 3));

    // Multiplexer Input Methods
    const setMultiplexerInputCount = useCallback((id, count) => {
        console.log(`Multiplexer '${id}' initialized with ${count} inputs`);
        setMultiplexerInputs(prev => {
            const newMap = new Map(prev);
            newMap.set(id, count);
            return newMap;
        });
    }, []);

    // Añadir una entrada
    const addMultiplexerInput = useCallback((id) => {
        console.log(`Multiplexer '${id}' input added`);
        setMultiplexerInputs(prev => {
            const newMap = new Map(prev);
            const current = newMap.get(id) || 2;
            newMap.set(id, current + 1);
            return newMap;
        });
    }, []);
    // Remover una entrada
    const removeMultiplexerInput = useCallback((id) => {
        console.log(`Multiplexer '${id}' input removed`);
        setMultiplexerInputs(prev => {
            const newMap = new Map(prev);
            const current = newMap.get(id) || 2;
            if (current > 2) {
                newMap.set(id, current - 1);
            }
            return newMap;
        });
    }, []);

    const removeMultiplexer = useCallback((id) => {
        console.log(`Multiplexer '${id}' removed`);
        setMultiplexerInputs(prev => {
            const newMap = new Map(prev);
            newMap.delete(id);
            return newMap;
        });
    }, []);

    return {
        multiplexerInputs,
        setMultiplexerInputCount,
        addMultiplexerInput,
        removeMultiplexerInput,
        removeMultiplexer
    }
}