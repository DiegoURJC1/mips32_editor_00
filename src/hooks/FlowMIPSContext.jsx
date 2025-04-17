import { createContext, useContext, useState, useCallback } from "react";

const FlowMIPSContext = createContext();

export const useFlowMIPS = () => useContext(FlowMIPSContext);

export const FlowMIPSProvider = ({ children }) => {
    const [logicGateOrientation, setLogicGateOrientation] = useState(new Map().set('and', true).set('or', true));
    const [multiplexerInputs, setMultiplexerInputs] = useState(new Map());

    // Logic Gate Orientation Methods
    const setOrientation = useCallback((id, isLeft) => {
        setLogicGateOrientation(prev => {
            const newMap = new Map(prev);
            newMap.set(id, isLeft);
            return newMap;
        });
    }, []);

    const removeOrientation = useCallback((id) => {
        setLogicGateOrientation(prev => {
            const newMap = new Map(prev);
            newMap.delete(id);
            return newMap;
        });
    }, []);

    // Multiplexer Input Methods
    const setMultiplexerInputCount = useCallback((id, count) => {
        setMultiplexerInputs(prev => {
            const newMap = new Map(prev);
            newMap.set(id, count);
            return newMap;
        });
    }, []);

    const removeMultiplexer = useCallback((id) => {
        setMultiplexerInputs(prev => {
            const newMap = new Map(prev);
            newMap.delete(id);
            return newMap;
        });
    }, []);

    return (
        <FlowMIPSContext.Provider
            value={{
                logicGateOrientation,
                setOrientation,
                removeOrientation,
                multiplexerInputs,
                setMultiplexerInputCount,
                removeMultiplexer,
            }}
        >
            {children}
        </FlowMIPSContext.Provider>
    );
};
