import {createContext, useContext, useState, useEffect} from "react";
import {Position} from "@xyflow/react";
import {getControlHandles} from "../flows/mips/nodes/common/handles/handleLists.js";
import {headersData as initialHeaders, statesData as initialData} from "../common-data/statesData.js"
import {staticHeadersDataControlHandle as initialStaticHeadersControlHandle } from "../flows/mips/ControlHandle.js"
import {useLogicGateOrientation} from "./hooks/useLogicGateOrientation.js";
import {useMultiplexerInput} from "./hooks/useMultiplexerInput.js";
import {useNumberNode} from "./hooks/useNumberNode.js";
import {ControlHandle} from "../flows/mips/ControlHandle.js"
const FlowMIPSContext = createContext();


export const useFlowMIPS = () => useContext(FlowMIPSContext);

export const FlowMIPSProvider = ({ children }) => {
    const [headers, setHeaders] = useState(initialHeaders);
    const [tableData, setTableData] = useState(initialData);

    const [staticHeadersData, setStaticHeadersData] = useState(initialStaticHeadersControlHandle);
    const [dynamicHeadersData, setDynamicHeadersData] = useState([]);

    const logicGates = useLogicGateOrientation();

    const multiplexerInputs = useMultiplexerInput();

    const numberNodes = useNumberNode();



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
    let staticHandlePositions = {
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
    const staticControlHandleList = getControlHandles(sizeControl, staticHandlePositions);
    
    const [staticControlHandles, setStaticControlHandles] = useState(staticControlHandleList);

    const [dynamicControlHandles, setDynamicControlHandles] = useState([]);
    /*
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
    */
    useEffect(() => {

        const leftHandles = dynamicHeadersData.filter(h => h.isLeft);
        const rightHandles = dynamicHeadersData.filter(h => !h.isLeft);

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

        setDynamicHeadersData([...updatedDynamicHandlesL, ...updatedDynamicHandlesR]);

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

    useEffect(() => {
        setBitsInputControl(Math.max(Math.ceil(Math.log2(staticControlHandles.length + dynamicHeadersData.length)), 5))
    }, [staticControlHandles.length, dynamicHeadersData.length])

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

        if (bits === 1) {
            addColumn(label)
        } else {
            const newColumns = [];
            for (let i = 0; i < bits; i++) {
                newColumns.push(label + i);
                console.log("Added: " + label + i);
            }

            // Añadir columnas en lote
            setHeaders(prevHeaders => [...prevHeaders, ...newColumns]);
            setTableData(prevData =>
                prevData.map(row => [...row, ...new Array(newColumns.length).fill('')])
            );
        }

        console.log("Updated Control handles:\n", dynamicControlHandles);
    };

    const addDynamicHandle2 = ({ label, bits }) => {
        if (label === "" || label === undefined) return;
        console.log(label, bits);
        console.log("H: ", numHandles)
        const id = `dynamic-${label}`;
        const allNames = new Set([
            ...staticControlHandles.map(h => h.label),
            ...staticControlHandles.map(h => h.id),
            ...dynamicHeadersData.map(h => h.label),
            ...dynamicHeadersData.map(h => h.id)
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


        if (bits === 1) {
            setDynamicHeadersData(prev => [
                ...prev,
                new ControlHandle({id: id, label, bits: bits, type:'source', position, positionInverted: true, isLeft }),
            ]);
            setTableData(tableData.map(row => [...row, '']));
        } else {
            const newHandles = [];
            for (let i = 0; i < bits; i++) {
                newHandles.push(new ControlHandle({id: id, label, bits: bits, assignedBit: i, type:'source', position, positionInverted: true, isLeft}));
                console.log("Added: " + label + i);
            }

            setTableData(tableData.map(row => [...row, ...Array(bits).fill('')]));
            // Añadir columnas en lote
            setDynamicHeadersData(prevHeaders => [...prevHeaders, ...newHandles]);
        }
        console.log("Updated Control handles2:\n", dynamicControlHandles);
        console.log(tableData)
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

    const removeDynamicHandle2 = (label) => {
        if (!dynamicHeadersData.some(h => h.label === label)) return;
        const handle = dynamicHeadersData.find(h => h.label === label);
        if (handle.isLeft) {
            setNumHandles({left: numHandles.left-1, right: numHandles.right});
        } else {
            setNumHandles({left: numHandles.left, right: numHandles.right-1});
        }
        setDynamicHeadersData(prev => prev.filter(h => h.label !== label));
        if (handle.bits === 1) {
            removeColumn2(handle.label);
        } else {
            for (let i = 0; i < handle.bits; i++) {
                removeColumn2(handle.label);
            }
        }
        console.log(tableData)

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
    const removeColumn2 = (label) => {
        // Encuentra los índices de los headers con el label dado
        const indicesToRemove = dynamicHeadersData
            .map((header, index) => (header.label === label ? index : -1))
            .filter(index => index !== -1);

        // Elimina los headers correspondientes de dynamicHeadersData
        const newHeadersData = dynamicHeadersData.filter(
            (_, index) => !indicesToRemove.includes(index)
        );
        setDynamicHeadersData(newHeadersData);

        // Elimina las columnas correspondientes (índice + 16) de cada fila en tableData
        const newTableData = tableData.map(row => {
            const newRow = [...row]; // copia del array
            // Eliminamos columnas desde el final para evitar desajustes de índice
            indicesToRemove
                .map(index => index + 16)
                .sort((a, b) => b - a)
                .forEach(colIndex => {
                    newRow.splice(colIndex, 1);
                });
            return newRow;
        });
        setTableData(newTableData);
    };





    const addRow = () => {
        const newRow = new Array(headers.length + dynamicHeadersData.length).fill(''); // Valor predeterminado para la nueva fila
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
    const editHeader2 = (colIndex, newLabel) => {
        const targetIndex = colIndex - 16;
        if (targetIndex < 0 || targetIndex >= dynamicHeadersData.length) return;

        const oldLabel = dynamicHeadersData[targetIndex].label;

        const updatedHeaders = dynamicHeadersData.map(header => {
            if (header.label === oldLabel) {
                return {
                    ...header,
                    label: newLabel
                };
            }
            return header;
        });

        setDynamicHeadersData(updatedHeaders);
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
            ...logicGates,

            ...multiplexerInputs,

            ...numberNodes,

            staticControlHandleInput,
            staticControlHandles,
            updateStaticHandleBits,

            dynamicHeadersData,
            addDynamicHandle2,removeDynamicHandle2,editHeader2,


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
