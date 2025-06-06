import {createContext, useContext, useState, useCallback, useEffect} from "react";
import {Position} from "@xyflow/react";
import {getControlHandles} from "../flows/mips/nodes/common/handles/handleLists.js";
import {headersData as initialHeaders, statesData as initialData} from "../common-data/statesData.js"
const FlowMIPSContext = createContext();

export const useFlowMIPS = () => useContext(FlowMIPSContext);

export const FlowMIPSProvider = ({ children }) => {
    const [logicGateOrientation, setLogicGateOrientation] = useState(new Map().set('and', true).set('or', true));
    const [multiplexerInputs, setMultiplexerInputs] = useState(new Map().set('multiplexer5', 4).set('multiplexer6', 3));
    const [numberNodes, setNumberNodes] = useState(new Map().set('number1', 4));

    const [headers, setHeaders] = useState(initialHeaders);
    const [tableData, setTableData] = useState(initialData);

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

    /**
     * Number Node
     */
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


    /**
     * Control Node
     */
    const [numHandles, setNumHandles] = useState({ left: 8, right: 7 });
    const [bitsInputControl, setBitsInputControl] = useState(5);

    const sizeControl = {
        width: 160,
        height: 220,
    };
    const centerX = (sizeControl.width - 8) / 2;
    const centerY = sizeControl.height / 2;
    const radiusX = (sizeControl.width - 6) / 2;
    const radiusY = sizeControl.height / 2;

    const getHandlePosition = (angleInDegrees) => {
        const angleInRadians = (Math.PI / 180) * angleInDegrees;
        const x = centerX + radiusX * Math.cos(angleInRadians);
        const y = centerY + radiusY * Math.sin(angleInRadians);
        return { top: y, left: x };
    };
    let handlePositions = {
        pcWriteCondOutput: getHandlePosition((180 * 7) / numHandles.left + 90),
        pcWriteOutput: getHandlePosition((180 * 6) / numHandles.left + 90),
        iOrDOutput: getHandlePosition((180 * 5) / numHandles.left + 90),
        memReadOutput: getHandlePosition((180 * 4) / numHandles.left + 90),
        memWriteOutput: getHandlePosition((180 * 3) / numHandles.left + 90),
        memToRegOutput: getHandlePosition((180 * 2) / numHandles.left + 90),
        iRWriteOutput: getHandlePosition((180) / numHandles.left + 90),

        pcSourceOutput: getHandlePosition((180) / numHandles.right - 90),
        aluOpOutput: getHandlePosition((180 * 2) / numHandles.right - 90),
        aluSrcBOutput: getHandlePosition((180 * 3) / numHandles.right - 90),
        aluSrcAOutput: getHandlePosition((180 * 4) / numHandles.right - 90),
        regWriteOutput: getHandlePosition((180 * 5) / numHandles.right - 90),
        regDstOutput: getHandlePosition((180 * 6) / numHandles.right - 90),
    };

    const staticControlHandleInput = [
        {
            id: "input",
            type: "target",
            position: Position.Bottom,
            bits: bitsInputControl,
            connectioncount: 1,
        },
    ]
    const staticControlHandleList = getControlHandles(sizeControl, handlePositions);
    
    const [staticControlHandles, setStaticControlHandles] = useState(staticControlHandleList);

    const [dynamicControlHandles, setDynamicControlHandles] = useState([]);

    useEffect(() => {

        const leftHandles = dynamicControlHandles.filter(h => h.isLeft);
        const rightHandles = dynamicControlHandles.filter(h => !h.isLeft);

        const updatedDynamicHandlesL = leftHandles.map((handle, index) => {
            const newPosition = getHandlePosition((180 * (numHandles.left - index - 1)) / numHandles.left + 90);
            return {
                ...handle,
                style: newPosition,
            };
        });

        const updatedDynamicHandlesR = rightHandles.map((handle, index) => {
            const newPosition = getHandlePosition((180 * (numHandles.right - index - 1)) / numHandles.right - 90);
            return {
                ...handle,
                style: newPosition,
            };
        });

        setDynamicControlHandles([...updatedDynamicHandlesL, ...updatedDynamicHandlesR]);

        const updatedHandles = staticControlHandles.map(handle => {
            let newStyle;

            switch (handle.id) {
                case "pc-write-cond-output":
                    newStyle = getHandlePosition((180 * 7) / numHandles.left + 90);
                    break;
                case "pc-write-output":
                    newStyle = getHandlePosition((180 * 6) / numHandles.left + 90);
                    break;
                case "i-or-d-output":
                    newStyle = getHandlePosition((180 * 5) / numHandles.left + 90);
                    break;
                case "mem-read-output":
                    newStyle = getHandlePosition((180 * 4) / numHandles.left + 90);
                    break;
                case "mem-write-output":
                    newStyle = getHandlePosition((180 * 3) / numHandles.left + 90);
                    break;
                case "mem-to-reg-output":
                    newStyle = getHandlePosition((180 * 2) / numHandles.left + 90);
                    break;
                case "i-r-write-output":
                    newStyle = getHandlePosition(180 / numHandles.left + 90);
                    break;
                case "pc-source-output":
                    newStyle = getHandlePosition(180 / numHandles.right - 90);
                    break;
                case "alu-op-output":
                    newStyle = getHandlePosition((180 * 2) / numHandles.right - 90);
                    break;
                case "alu-src-b-output":
                    newStyle = getHandlePosition((180 * 3) / numHandles.right - 90);
                    break;
                case "alu-src-a-output":
                    newStyle = getHandlePosition((180 * 4) / numHandles.right - 90);
                    break;
                case "reg-write-output":
                    newStyle = getHandlePosition((180 * 5) / numHandles.right - 90);
                    break;
                case "reg-dst-output":
                    newStyle = getHandlePosition((180 * 6) / numHandles.right - 90);
                    break;
                default:
                    newStyle = handle.style;
            }

            return {
                ...handle,
                style: newStyle
            };
        });

        setStaticControlHandles(updatedHandles);
    }, [numHandles]);

    useEffect(() => {
        setBitsInputControl(Math.max(Math.ceil(Math.log2(staticControlHandles.length + dynamicControlHandles.length)), 5))
    }, [staticControlHandles.length, dynamicControlHandles.length])

    // Cambiar los bits de un handle estático
    const updateStaticHandleBits = (label, bits) => {
        setStaticControlHandles(prev =>
            prev.map(handle => handle.label === label ? { ...handle, bits } : handle)
        );
    };

    // Funciones para manejar dinámicos
    const addDynamicHandle = ({ label, bits }) => {
        if (label === "" || label === undefined) return;
        console.log(label, bits);
        console.log("H: ", numHandles)
        const id = `dyn-${label}`;
        const allNames = new Set([
            ...staticControlHandles.map(h => h.label),
            ...staticControlHandles.map(h => h.id),
            ...dynamicControlHandles.map(h => h.label),
            ...dynamicControlHandles.map(h => h.id)
        ]);

        if (bits < 1 || bits > 32 || allNames.has(label)) return;
        let position;
        let isLeft;
        if (numHandles.right <= numHandles.left) {
            isLeft = false;
            position = Position.Right;
            setNumHandles({left: numHandles.left, right: numHandles.right+1});
        } else {
            isLeft = true;
            position = Position.Left;
            setNumHandles({left: numHandles.left+1, right: numHandles.right});
        }
        setDynamicControlHandles(prev => [
            ...prev,
            { id, type:'source', label, bits, position, positionInverted: true, isLeft },
        ]);
        addColumn(label)
        console.log("Updated Control handles:\n", dynamicControlHandles);
    };

    const removeDynamicHandle = (label) => {
        if (!dynamicControlHandles.some(h => h.label === label)) return;
        const handle = dynamicControlHandles.find(h => h.label === label);
        if (handle.isLeft) {
            setNumHandles({left: numHandles.left-1, right: numHandles.right});
        } else {
            setNumHandles({left: numHandles.left, right: numHandles.right-1});
        }
        setDynamicControlHandles(prev => prev.filter(h => h.label !== label));
        removeColumn(label);
    };

    const updateDynamicHandleBits = (label, bits) => {
        setDynamicControlHandles(prev =>
            prev.map(h => h.label === label ? { ...h, bits } : h)
        );
    };

    const updateDynamicHandleSide = (label, isLeft) => {
        setDynamicControlHandles(prev =>
            prev.map(h => h.label === label ? { ...h, isLeft } : h)
        );
    };

    const updateDynamicHandleLabel = (oldLabel, newLabel) => {
        const labels = new Set([
            ...staticControlHandles.map(h => h.label),
            ...dynamicControlHandles.map(h => h.label)
        ]);
        if (labels.has(newLabel)) return false;

        setDynamicControlHandles(prev =>
            prev.map(h => h.label === oldLabel ? { ...h, label: newLabel, id: `dyn-${newLabel}` } : h)
        );
        return true;
    };

    /**
     * Table
     */
    const addColumn = (headerName) => {
        if (headers.includes(headerName)) {
            console.warn(`Column "${headerName}" already exists.`);
            return;
        }

        setHeaders([...headers, headerName]);
        setTableData(tableData.map(row => [...row, '']));
    };
    const removeColumn = (headerName) => {
        const columnIndex = headers.indexOf(headerName);

        if (columnIndex !== -1) {
            setHeaders(headers.filter((_, i) => i !== columnIndex));
            setTableData(tableData.map(row => row.filter((_, i) => i !== columnIndex)));
        } else {
            console.warn(`Column "${headerName}" does not exist.`);
        }
    };

    const addRow = () => {
        const newRow = new Array(headers.length).fill(''); // Valor predeterminado para la nueva fila
        setTableData([...tableData, newRow]);
    };

    const removeRow = (index) => {
        setTableData(tableData.filter((_, i) => i !== index));
    };

    const getRowNumberInBinary = (rowIndex) => {
        return rowIndex.toString(2).padStart(4, '0'); // Número binario en 4 dígitos
    };

    const editCell = (rowIndex, colIndex, newValue) => {
        const newData = [...tableData];
        newData[rowIndex][colIndex] = newValue;
        setTableData(newData);
    };

    const editHeader = (colIndex, newHeader) => {
        const oldHeader = headers[colIndex];
        const newHeaders = [...headers];
        newHeaders[colIndex] = newHeader;
        setHeaders(newHeaders);

        // Si el header modificado coincide con un dynamic handle, también actualiza su label
        const dynamicHandle = dynamicControlHandles.find(h => h.label === oldHeader);
        if (dynamicHandle) {
            updateDynamicHandleLabel(oldHeader, newHeader);
        }
    };

    /**
     * Info panel
     */
    const infoPanelTypes = {
        none: null,
        about: "about",
    }
    const [activeInfoPanel, setActiveInfoPanel] = useState(infoPanelTypes.none);

    return (
        <FlowMIPSContext.Provider value={{
            logicGateOrientation,
            setOrientation,
            removeOrientation,
            multiplexerInputs,
            setMultiplexerInputCount,
            addMultiplexerInput,
            removeMultiplexerInput,
            removeMultiplexer,

            numberNodes,
            registerNumberNode,
            updateNumberNodeValue,
            unregisterNumberNode,

            staticControlHandleInput,
            staticControlHandles,
            updateStaticHandleBits,

            dynamicControlHandles,
            addDynamicHandle,
            removeDynamicHandle,
            updateDynamicHandleBits,
            updateDynamicHandleSide,
            updateDynamicHandleLabel,

            headers,
            tableData,

            editHeader,
            editCell,
            getRowNumberInBinary,

            addRow,
            removeRow,

            infoPanelTypes,
            activeInfoPanel,
            setActiveInfoPanel,
        }}>
            {children}
        </FlowMIPSContext.Provider>
    );
};
