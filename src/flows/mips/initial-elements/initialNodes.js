import {logicGateTypes} from "../../../assets/svg-nodes/svgNodesData.jsx";
import {
    aluControlHandleList,
    aluExitHandleList, getInstructionRegisterHandles, getMemoryHandles, getRegisterHandles,
    letterHandleList, memoryDataRegisterHandleList,
    pcHandleList,
    shiftLeft2HandleList,
    signExtendHandleList
} from "../nodes/common/handles/handleLists.js";
const memorySize = { width: 120, height: 180 };
const instructionRegisterSize = { width: 120, height: 260 };
const registerSize = { width: 160, height: 220 };
export function initialNodes(
    addColumn,
    removeColumn,
    dynamicControlHandles,
    setDynamicControlHandles,
    numHandlesControl,
    setNumHandlesControl,
) {
    return [
        {
            id: 'test',
            type: 'test',
            data: {
                label: 'Test',
                width: '80px',
                height: '80px',
            },
            position: { x: 350, y: 1110 },
        },

        {
            id: 'and',
            type: 'logicGate',
            data: {
                type: logicGateTypes.AND,
                label: 'AND',
            },
            position: { x: 750, y: 450 },
        },
        {
            id: 'or',
            type: 'logicGate',
            data: {
                type: logicGateTypes.OR,
                label: 'OR',
            },
            position: { x: 640, y: 460 },
        },

        {
            id: 'pc',
            type: 'mipsGeneral',
            data: {
                nodeClass: 'pc',
                label: 'PC',
                isProtected: true,
                handles: pcHandleList,
                size: {
                    width: 40,
                    height: 80,
                }
            },
            position: { x: 400, y: 800 },
        },
        {
            id: 'memory',
            type: 'mipsGeneral',
            data: {
                nodeClass: 'memory',
                label: 'Memoria',
                isProtected: true,
                handles: getMemoryHandles(memorySize),
                size: {
                    width: memorySize.width,
                    height: memorySize.height,
                }
            },
            position: { x: 630, y: 810 },
        },
        {
            id: 'instructionRegister',
            type: 'mipsGeneral',
            data: {
                nodeClass: 'instruction-register',
                label: 'Registro de Instrucción',
                isProtected: true,
                handles: getInstructionRegisterHandles(instructionRegisterSize),
                size: {
                    width: instructionRegisterSize.width,
                    height: instructionRegisterSize.height,
                }
            },
            position: { x: 800, y: 770 },
        },
        {
            id: 'memoryDataRegister',
            type: 'mipsGeneral',
            data: {
                nodeClass: 'memory-data-register',
                label: 'Registro de Instrucción',
                isProtected: true,
                handles: memoryDataRegisterHandleList,
                size: {
                    width: 120,
                    height: 80,
                }
            },
            position: { x: 800, y: 1150 },
        },
        {
            id: 'register',
            type: 'mipsGeneral',
            data: {
                nodeClass: 'register',
                label: 'Registros',
                isProtected: true,
                handles: getRegisterHandles(registerSize),
                size: {
                    width: registerSize.width,
                    height: registerSize.height,
                }
            },
            position: { x: 1170, y: 810 },
        },
        {
            id: 'signExtend',
            type: 'mipsGeneral',
            data: {
                nodeClass: 'sign-extend',
                label: 'Extensión de signo',
                isProtected: true,
                handles: signExtendHandleList,
                size: {
                    width: 80,
                    height: 100,
                }
            },
            position: { x: 1210, y: 1200 },
        },
        {
            id: 'shiftLeftSignExtend',
            type: 'mipsGeneral',
            data: {
                nodeClass: 'shift-left-2',
                label: 'Desp. 2 bits a la izq.',
                isProtected: true,
                handles: shiftLeft2HandleList,
                size: {
                    width: 80,
                    height: 100,
                }
            },
            position: { x: 1400, y: 1200 },
        },
        {
            id: 'shiftLeftInstructionRegister',
            type: 'mipsGeneral',
            data: {
                nodeClass: 'shift-left-2',
                label: 'Desp. 2 bits a la izq.',
                isProtected: true,
                handles: shiftLeft2HandleList,
                size: {
                    width: 80,
                    height: 100,
                }
            },
            position: { x: 1750, y: 600 },
        },
        {
            id: 'letterA',
            type: 'mipsGeneral',
            data: {
                nodeClass: 'letter',
                label: 'A',
                isProtected: true,
                handles: letterHandleList,
                size: {
                    width: 40,
                    height: 40,
                }
            },
            position: { x: 1400, y: 860 },
        },
        {
            id: 'letterB',
            type: 'mipsGeneral',
            data: {
                nodeClass: 'letter',
                label: 'B',
                isProtected: true,
                handles: letterHandleList,
                size: {
                    width: 40,
                    height: 40,
                }
            },
            position: { x: 1400, y: 940 },
        },
        {
            id: 'aluControl',
            type: 'mipsGeneral',
            data: {
                nodeClass: 'alu-control',
                label: 'Control de la ALU',
                isProtected: true,
                handles: aluControlHandleList,
                size: {
                    width: 80,
                    height: 100,
                }
            },
            position: { x: 1600, y: 1200 },
        },

        {
            id: 'alu',
            type: 'alu',
            data: {
                label: 'ALU',
                isProtected: true,
            },
            position: { x: 1700, y: 900 },
        },
        {
            id: 'aluExit',
            type: 'mipsGeneral',
            data: {
                nodeClass: 'alu-exit',
                label: 'Salida ALU',
                isProtected: true,
                handles: aluExitHandleList,
                size: {
                    width: 60,
                    height: 40,
                }
            },
            position: { x: 1900, y: 990 },
        },

        {
            id: 'control',
            type: 'control',
            data: {
                label: 'Control',
                isProtected: true,
                functions: {
                    addColumn: addColumn,
                    removeColumn: removeColumn,
                    dynamicControlHandles: dynamicControlHandles,
                    setDynamicControlHandles: setDynamicControlHandles,
                    numHandlesControl: numHandlesControl,
                    setNumHandlesControl: setNumHandlesControl,
                },
            },

            position: { x: 1000, y: 500 },
        },

        {
            id: 'multiplexer1',
            type: 'multiplexer',
            data: {
                label: 'Mul',
            },
            position: { x: 500, y: 800 },
        },
        {
            id: 'multiplexer2',
            type: 'multiplexer',
            data: {
                label: 'Mul',
            },
            position: { x: 1050, y: 920 },
        },
        {
            id: 'multiplexer3',
            type: 'multiplexer',
            data: {
                label: 'Mul',
            },
            position: { x: 1050, y: 1070 },
        },
        {
            id: 'multiplexer4',
            type: 'multiplexer',
            data: {
                label: 'Mul',
            },
            position: { x: 1550, y: 800 },
        },
        {
            id: 'multiplexer5',
            type: 'multiplexer',
            data: {
                label: 'Mul',
                initialInputs: 4,
            },
            position: { x: 1550, y: 950 },
        },
        {
            id: 'multiplexer6',
            type: 'multiplexer',
            data: {
                label: 'Mul',
                initialInputs: 3,
            },
            position: { x: 2050, y: 500 },
        },
    ];
}