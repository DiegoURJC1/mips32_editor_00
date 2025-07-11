import {createContext, useContext, useState, useEffect} from "react";
import {Position, useUpdateNodeInternals} from "@xyflow/react";
import {getControlHandles} from "../flows/mips/nodes/common/handles/handleLists.js";
import {statesData as initialData, statesDataReferenceCopy as tableReferenceData} from "../common-data/statesData.js"
import {useLogicGateOrientation} from "./hooks/useLogicGateOrientation.js";
import {useMultiplexerInput} from "./hooks/useMultiplexerInput.js";
import {useNumberNode} from "./hooks/useNumberNode.js";
import {ControlHandle} from "../flows/mips/ControlHandle.js"
import {useHandleConnectionList} from "./hooks/useHandleConnectionList.js";
import {useLetterSwitchHandle} from "./hooks/useLetterSwitchHandle.js";
import {defaultSettings} from "../common-data/settings.js";
const FlowMIPSContext = createContext();


export const useFlowMIPS = () => useContext(FlowMIPSContext);

export const FlowMIPSProvider = ({ children }) => {
    const [tableData, setTableData] = useState(initialData);
    const [tableDataReference, setTableDataReference] = useState(tableReferenceData);

    const logicGates = useLogicGateOrientation();

    const multiplexerInputs = useMultiplexerInput();

    const numberNodes = useNumberNode();

    const handleConnectionList = useHandleConnectionList();

    const letterNodes = useLetterSwitchHandle();

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

    const [staticControlHandles, setStaticControlHandles] = useState(getControlHandles(sizeControl, staticHandlePositions));

    const [dynamicControlHandles, setDynamicControlHandles] = useState([]);

    const [staticHeadersData, setStaticHeadersData] = useState(getControlHandles(sizeControl, staticHandlePositions).map(handle => handle.label));

    const [dynamicHeadersData, setDynamicHeadersData] = useState([]);
    const updateNodeInternals = useUpdateNodeInternals();
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

        const leftHandles = dynamicControlHandles.filter(h => h.isLeft);
        const rightHandles = dynamicControlHandles.filter(h => !h.isLeft);

        const updatedDynamicHandlesL = leftHandles.map((handle, index) => {
            const newPosition = getHandlePosition((180 * (numHandles.left - index - 1)) / numHandles.left + 90);
            return {
                ...handle,
                style: newPosition,
            };

        });

        console.log(updatedDynamicHandlesL);

        const updatedDynamicHandlesR = rightHandles.map((handle, index) => {
            const newPosition = getHandlePosition((180 * (numHandles.right - index - 1)) / numHandles.right - 90);
            return {
                ...handle,
                style: newPosition,
            };
        });

        console.log(updatedDynamicHandlesR);

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
        updateNodeInternals('control');
    }, [numHandles, dynamicControlHandles.length]);

    useEffect(() => {
        setBitsInputControl(Math.max(Math.ceil(Math.log2(staticControlHandles.length + dynamicControlHandles.length)), 6))
    }, [staticControlHandles.length, dynamicControlHandles.length])


    // Cambiar los bits de un handle estático
    const updateStaticHandleBits = (label, bits) => {
        setStaticControlHandles(prev =>
            prev.map(handle => handle.label === label ? { ...handle, bits } : handle)
        );
    };

    // Funciones para manejar dinámicos

    const addDynamicHandle = ({ label, bits }) => {
        // 1. Verificar si el label ya existe en los handles estáticos o dinámicos
        const existingStaticHandle = staticControlHandles.find(h => h.label === label);
        const existingDynamicHandle = dynamicControlHandles.find(h => h.label === label);

        if (existingStaticHandle || existingDynamicHandle) {
            console.log(`Error: Ya existe un handle con el label "${label}".`);
            return; // Abortamos si el label ya existe
        }

        // 2. Verificar que los bits sean válidos
        if (bits <= 0 || bits > 32) {
            console.log(`Error: Los bits deben ser mayores que 0 y menores o iguales a 32.`);
            return; // Abortamos si los bits no son válidos
        }

        // 3. Determinar la posición y si es izquierdo o derecho
        let position;
        let isLeft;

        if (numHandles.right <= numHandles.left) {
            isLeft = false;
            position = Position.Right;
            setNumHandles(prevState => ({ left: prevState.left, right: prevState.right + 1 }));
        } else {
            isLeft = true;
            position = Position.Left;
            setNumHandles(prevState => ({ left: prevState.left + 1, right: prevState.right }));
        }

        // 4. Crear el nuevo handle
        const newHandle = {
            id: label,            // ID igual al label
            type: "source",       // Tipo source
            position: position,   // La posición determinada
            bits: bits,           // Bits proporcionados
            label: label,         // El label proporcionado
            name: label,          // Nombre igual al label
            style: {},            // Puedes agregar estilos aquí si es necesario
            positionInverted: true,
            isLeft: isLeft
        };

        // 5. Agregar el nuevo handle al final de los handles dinámicos
        setDynamicControlHandles(prevHandles => [...prevHandles, newHandle]);

        setTableData(tableData.map(row => [...row, ...Array(bits).fill('')]));
        console.log("antes")
        console.log(tableData);
        console.log(`Nuevo handle agregado: ${JSON.stringify(newHandle)}`);
    };




    const removeDynamicHandle = (label) => {
        if (!dynamicControlHandles.some(h => h.label === label)) return;
        const handle = dynamicControlHandles.find(h => h.label === label);

        const indexToRemove = sumStaticHandleBits() + sumBitsBeforeDynamicLabel(handle.label);

        if (handle.isLeft) {
            setNumHandles({left: numHandles.left-1, right: numHandles.right});
        } else {
            setNumHandles({left: numHandles.left, right: numHandles.right-1});
        }
        setDynamicControlHandles(prev => prev.filter(h => h.label !== label));
        for (let i = 0; i < handle.bits; i++) {
            const newTableData = tableData.map(row => {
                // Eliminar la columna en la posición indexToRemove de cada fila
                const updatedRow = [...row]; // Crear una copia de la fila
                updatedRow.splice(indexToRemove+i, 1); // Eliminar la columna
                return updatedRow;
            });

            // Eliminar la columna de tableDataReference
            const newTableDataReference = tableDataReference.map(row => {
                // Eliminar la columna en la posición indexToRemove de cada fila
                const updatedRow = [...row]; // Crear una copia de la fila
                updatedRow.splice(indexToRemove+i, 1); // Eliminar la columna
                return updatedRow;
            });
            // Actualizar el estado de las tablas con las nuevas filas sin la columna eliminada
            setTableData(newTableData);
            setTableDataReference(newTableDataReference);
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
     * Static handles
     */
    const changeStaticHandleBits = (handleId, newNumBit) => {
        if (newNumBit <= 0 || newNumBit > 32) return;
        const handle = staticControlHandles.find(h => h.id === handleId);
        if (!handle) return;

        const handleIndex = staticControlHandles.findIndex(h => h.id === handleId);
        if (handleIndex === -1) return;

        const sumBefore = staticControlHandles.slice(0, handleIndex).reduce((total, handle) => total + handle.bits, 0);

        setStaticControlHandles(prev => prev.map((h, index) => index === handleIndex ? { ...h, bits: newNumBit } : h));

        tableData(prevData => {
            const newData = [...prevData];
            // Insertamos una nueva columna vacía en el índice dado
            newData.forEach(row => row.splice(handleIndex, 0, "")); // Insertamos columna vacía
            return newData;
        });

        tableDataReference(prevData => {
            const newData = [...prevData];
            // Insertamos una nueva columna vacía en el índice dado
            newData.forEach(row => row.splice(handleIndex, 0, "")); // Insertamos columna vacía
            return newData;
        });

        // Puedes usar `sumBefore` como desees, aquí solo lo calculamos
        console.log(`Suma de los bits anteriores: ${sumBefore}`);
    };

    const sumStaticHandleBits = () => {
        return staticControlHandles.reduce((total, handle) => total + handle.bits, 0);
    };
    const sumDynamicHandleBits = () => {
        return dynamicControlHandles.reduce((total, handle) => total + handle.bits, 0);
    };
    const sumAllHandleBits = () => {
        return sumStaticHandleBits() + sumDynamicHandleBits();
    };
    const sumBitsBeforeStaticLabel = (label) => {
        // Encontramos el índice del elemento con el label proporcionado
        const index = staticControlHandles.findIndex(item => item.label === label);

        // Si no encontramos el label, retornamos 0
        if (index === -1) {
            console.log('Label no encontrado');
            return 0;
        }

        // Sumamos los bits de los elementos anteriores al índice encontrado
        return staticControlHandles
            .slice(0, index) // Obtener todos los elementos antes del índice
            .reduce((total, item) => total + (item.bits || 0), 0); // Sumar los bits, si no hay bits, se toma 0
    };
    const sumBitsBeforeDynamicLabel = (label) => {
        // Encontramos el índice del elemento con el label proporcionado
        const index = dynamicControlHandles.findIndex(item => item.label === label);

        // Si no encontramos el label, retornamos 0
        if (index === -1) {
            console.log('Label no encontrado');
            return 0;
        }

        // Sumamos los bits de los elementos anteriores al índice encontrado
        return dynamicControlHandles
            .slice(0, index) // Obtener todos los elementos antes del índice
            .reduce((total, item) => total + (item.bits || 0), 0); // Sumar los bits, si no hay bits, se toma 0
    };


    /**
     * Table
     */
    const removeColumn2 = (label) => {
        // Buscar el índice de la columna en dynamicHeadersData que coincide con el label
        const columnIndex = dynamicHeadersData.findIndex(item => item.label === label);

        // Si no se encuentra, no hacer nada
        if (columnIndex === -1) {
            console.log('Columna no encontrada');
            return;
        }

        // Ajustamos el índice sumando el tamaño de staticControlHandles
        const indexToRemove = sumBitsBeforeDynamicLabel + sumStaticHandleBits;

        // Eliminar la columna de tableData
        const newTableData = tableData.map(row => {
            // Eliminar la columna en la posición indexToRemove de cada fila
            const updatedRow = [...row]; // Crear una copia de la fila
            updatedRow.splice(indexToRemove, 1); // Eliminar la columna
            return updatedRow;
        });

        // Eliminar la columna de tableDataReference
        const newTableDataReference = tableDataReference.map(row => {
            // Eliminar la columna en la posición indexToRemove de cada fila
            const updatedRow = [...row]; // Crear una copia de la fila
            updatedRow.splice(indexToRemove, 1); // Eliminar la columna
            return updatedRow;
        });

        // Actualizar el estado de las tablas con las nuevas filas sin la columna eliminada
        setTableData(newTableData);
        setTableDataReference(newTableDataReference);
        console.log(newTableData)
    };





    const addRow = () => {
        const newRow = new Array(sumAllHandleBits()).fill(''); // Valor predeterminado para la nueva fila
        setTableData([...tableData, newRow]);
        console.log("sumAllHandleBits");
        console.log(sumAllHandleBits());
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

    /**
     * Active panel
     */
    const [currentPanel, setCurrentPanel] = useState(0);
    useEffect(() => {
        const handleBeforeUnload = (event) => {
            event.preventDefault();
            event.returnValue = ''; // Requerido por algunos navegadores como Chrome
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    /**
     * Settings handling
     *
     */
    const [settings, setSettings] = useState(defaultSettings);
    const handleUpdateSettingsGrid = (grid) => {
        setSettings({
            ...settings,
            grid: {
                x: grid.target.value,
                y: grid.target.value,
                gap: grid.target.value,
                offset: grid.target.value,
            },
        });
    };

    const handleResetSettings = () => {
        setSettings(defaultSettings);
        console.log("Settings set to default");
        console.log(settings);
    };

    const handleMiniMapSwitchSettings = () => {
        setSettings({
            ...settings,
            minimap: !settings.minimap,
        });
    };



    return (
        <FlowMIPSContext.Provider value={{
            ...logicGates,

            ...multiplexerInputs,

            ...numberNodes,

            ...handleConnectionList,

            ...letterNodes,

            staticHeadersData,
            staticControlHandleInput,
            staticControlHandles,
            updateStaticHandleBits,

            changeStaticHandleBits,
            sumStaticHandleBits,
            sumDynamicHandleBits,
            sumBitsBeforeStaticLabel,
            sumBitsBeforeDynamicLabel,
            sumAllHandleBits,

            dynamicHeadersData,
            addDynamicHandle,removeDynamicHandle,editHeader2,


            dynamicControlHandles,
            updateDynamicHandleBits,
            updateDynamicHandleSide,
            updateDynamicHandleLabel,



            tableData,
            tableDataReference,

            editCell,
            getRowNumberInBinary,

            addRow,
            removeRow,

            infoPanelTypes,
            activeInfoPanel,
            setActiveInfoPanel,

            currentPanel,
            setCurrentPanel,

            settings,
            handleUpdateSettingsGrid,
            handleResetSettings,
            handleMiniMapSwitchSettings,
        }}>
            {children}
        </FlowMIPSContext.Provider>
    );
};
