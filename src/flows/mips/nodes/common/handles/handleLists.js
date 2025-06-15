import {Position} from "@xyflow/react";

export const pcHandleList = [
    {
        id: "input-pc",
        type: "target",
        position: Position.Left,
        bits: 32,
        connectioncount: 1,
        label: null,
        name: "Entrada",
        style: null,
    },
    {
        id: "control-input-pc",
        type: "target",
        position: Position.Top,
        bits: 1,
        connectioncount: 1,
        label: null,
        name: "Control",
        style: null,
    },
    {
        id: "output-pc",
        type: "source",
        position: Position.Right,
        bits: 32,
        connectioncount: null,
        label: null,
        name: "Salida",
        style: null,
    }
];

export function getMemoryHandles(size) {
    return [
        {
            id: "direction-input-memory",
            type: "target",
            position: Position.Left,
            bits: 32,
            connectioncount: 1,
            label: "Dirección",
            name: null,
            style: { top: `${Math.round(size.height / 4 / 10) * 10}px` },
        },
        {
            id: "data-input-memory",
            type: "target",
            position: Position.Left,
            bits: 32,
            connectioncount: 1,
            label: "Dato a\nescribir",
            name: null,
            style: { top: `${Math.round(size.height * 3 / 4 / 10) * 10 - 10}px` },
        },
        {
            id: "control-read-input-memory",
            type: "target",
            position: Position.Top,
            bits: 1,
            connectioncount: 1,
            label: null,
            name: "Entrada escritura",
            style: { left: `${size.width / 4}px` },
        },
        {
            id: "control-write-input-memory",
            type: "target",
            position: Position.Top,
            bits: 1,
            connectioncount: 1,
            label: null,
            name: "Entrada lectura",
            style: { left: `${size.width * 3 / 4}px` },
        },
        {
            id: "output-memory",
            type: "source",
            position: Position.Right,
            bits: 32,
            connectioncount: null,
            label: "Dato/instrucción\nleído",
            name: null,
            style: null
        }
    ];
}

export function getInstructionRegisterHandles(size) {
    return [
        {
            id: "input-instructionRegister",
            type: "target",
            position: Position.Left,
            bits: 32,
            connectioncount: 1,
            label: null,
            name: "Entrada",
            style: null
        },
        {
            id: "control-input-instructionRegister",
            type: "target",
            position: Position.Top,
            bits: 1,
            connectioncount: 1,
            label: null,
            name: "Control",
            style: null
        },
        {
            id: "output-[31-26]-instructionRegister",
            type: "source",
            position: Position.Right,
            bits: 6,
            connectioncount: null,
            label: "Instrucción\n[31-26]",
            name: null,
            style: { top: `${Math.round(size.height * 1 / 5 / 10) * 10 - 20}px` }
        },
        {
            id: "output-[25-21]-instructionRegister",
            type: "source",
            position: Position.Right,
            bits: 5,
            connectioncount: null,
            label: "Instrucción\n[25-21]",
            name: null,
            style: { top: `${Math.round(size.height * 2 / 5 / 10) * 10 - 20}px` }
        },
        {
            id: "output-[20-16]-instructionRegister",
            type: "source",
            position: Position.Right,
            bits: 5,
            connectioncount: null,
            label: "Instrucción\n[20-16]",
            name: null,
            style: { top: `${Math.round(size.height * 3 / 5 / 10) * 10 - 20}px` }
        },
        {
            id: "output-[15-0]-instructionRegister",
            type: "source",
            position: Position.Right,
            bits: 16,
            connectioncount: null,
            label: "Instrucción\n[15-0]",
            name: null,
            style: { top: `${Math.round(size.height * 4 / 5 / 10) * 10 - 20}px` }
        }
    ];
}

export function getRegisterHandles(size) {
    return [
        {
            id: "control-input-register",
            type: "target",
            position: Position.Top,
            bits: 1,
            connectioncount: 1,
            label: null,
            name: "Control",
            style: null
        },
        {
            id: "read-reg-1-input-register",
            type: "target",
            position: Position.Left,
            bits: 5,
            connectioncount: 1,
            label: "Reg. de\nlectura 1",
            name: null,
            style: { top: `${Math.round(size.height * 1 / 5 / 10) * 10}px` }
        },
        {
            id: "read-reg-2-input-register",
            type: "target",
            position: Position.Left,
            bits: 5,
            connectioncount: 1,
            label: "Reg. de\nlectura 2",
            name: null,
            style: { top: `${Math.round(size.height * 2 / 5 / 10) * 10}px` }
        },
        {
            id: "write-reg-input-register",
            type: "target",
            position: Position.Left,
            bits: 5,
            connectioncount: 1,
            label: "Reg. de\nescritura",
            name: null,
            style: { top: `${Math.round(size.height * 3 / 5 / 10) * 10}px` }
        },
        {
            id: "data-input-register",
            type: "target",
            position: Position.Left,
            bits: 32,
            connectioncount: 1,
            label: "Dato a\nescribir",
            name: null,
            style: { top: `${Math.round(size.height * 4 / 5 / 10) * 10}px` }
        },
        {
            id: "read-data-1-output-register",
            type: "source",
            position: Position.Right,
            bits: 32,
            connectioncount: null,
            label: "Dato\nleído 1",
            name: null,
            style: { top: `${Math.round(size.height * 1 / 3 / 10) * 10}px` }
        },
        {
            id: "read-data-2-output-register",
            type: "source",
            position: Position.Right,
            bits: 32,
            connectioncount: null,
            label: "Dato\nleído 2",
            name: null,
            style: { top: `${Math.round(size.height * 2 / 3 / 10) * 10}px` }
        }
    ];
}

export const memoryDataRegisterHandleList = [
    {
        id: "input-memoryDataRegister",
        type: "target",
        position: Position.Left,
        bits: 32,
        connectioncount: 1,
        label: null,
        name: "Entrada",
        style: null
    },
    {
        id: "output-memoryDataRegister",
        type: "source",
        position: Position.Right,
        bits: 32,
        connectioncount: null,
        label: null,
        name: "Salida",
        style: null
    }
];

export const signExtendHandleList = [
    {
        id: "input-signExtend",
        type: "target",
        position: Position.Left,
        bits: 16,
        connectioncount: 1,
        label: null,
        name: "Entrada",
        style: null
    },
    {
        id: "output-signExtend",
        type: "source",
        position: Position.Right,
        bits: 32,
        connectioncount: null,
        label: null,
        name: "Salida",
        style: null
    }
];

export const shiftLeft2HandleList = [
    {
        id: "input-shiftLeft2",
        type: "target",
        position: Position.Left,
        bits: 32,
        connectioncount: 1,
        label: null,
        name: "Entrada",
        style: null
    },
    {
        id: "output-shiftLeft2",
        type: "source",
        position: Position.Right,
        bits: 32,
        connectioncount: null,
        label: null,
        name: "Salida",
        style: null
    }
];

export const shiftLeft2HandleList2 = [
    {
        id: "input-shiftLeft2",
        type: "target",
        position: Position.Left,
        bits: 26,
        connectioncount: null,
        label: null,
        name: "Entrada",
        style: null
    },
    {
        id: "output-shiftLeft2",
        type: "source",
        position: Position.Right,
        bits: 28,
        connectioncount: null,
        label: null,
        name: "Salida",
        style: null
    }
];

export const letterHandleList = [
    {
        id: "input-letter",
        type: "target",
        position: Position.Left,
        bits: 32,
        connectioncount: 1,
        label: null,
        name: "Entrada",
        style: null
    },
    {
        id: "output-letter",
        type: "source",
        position: Position.Right,
        bits: 32,
        connectioncount: null,
        label: null,
        name: "Salida",
        style: null
    }
];

export function getAluHandles(size) {
    return [
        {
            id: "input1-alu",
            type: "target",
            position: Position.Left,
            bits: 32,
            connectioncount: 1,
            label: null,
            name: "Entrada A",
            style: { top: `${Math.round(size.height / 3 / 10) * 10}px` }
        },
        {
            id: "input2-alu",
            type: "target",
            position: Position.Left,
            bits: 32,
            connectioncount: 1,
            label: null,
            name: "Entrada B ",
            style: { top: `${Math.round(size.height * 2 / 3 / 10) * 10}px` }
        },
        {
            id: "alu-operation-input-alu",
            type: "target",
            position: Position.Bottom,
            bits: 4,
            connectioncount: 1,
            label: "ALU Operación",
            name: null,
            style: { top: `${size.height * 149 / 175}px` }
        },
        {
            id: "zero-output-alu",
            type: "source",
            position: Position.Right,
            bits: 32,
            connectioncount: null,
            label: "Cero",
            name: null,
            style: { top: `${Math.round(size.height / 3 / 10) * 10}px` }
        },
        {
            id: "result-output-alu",
            type: "source",
            position: Position.Right,
            bits: 32,
            connectioncount: null,
            label: "Resultado",
            name: null,
            style: { top: `${Math.round(size.height * 2 / 3 / 10) * 10}px` }
        }
    ];
}

export const aluControlHandleList = [
    {
        id: "control-input-aluControl",
        type: "target",
        position: Position.Bottom,
        bits: 2,
        connectioncount: 1,
        label: null,
        name: "Control",
        style: null
    },
    {
        id: "input-aluControl",
        type: "target",
        position: Position.Left,
        bits: 5,
        connectioncount: 1,
        label: null,
        name: "Entrada",
        style: null
    },
    {
        id: "output-aluControl",
        type: "source",
        position: Position.Right,
        bits: 4,
        connectioncount: null,
        label: null,
        name: "Salida",
        style: null
    }
];

export const aluExitHandleList = [
    {
        id: "input-aluExit",
        type: "target",
        position: Position.Left,
        bits: 32,
        connectioncount: 1,
        label: null,
        name: "Entrada",
        style: null
    },
    {
        id: "output-aluExit",
        type: "source",
        position: Position.Right,
        bits: 32,
        connectioncount: null,
        label: null,
        name: "Salida",
        style: null
    }
];

export function getControlHandles(size, handlePositions) {
    return [
        {
            id: "pc-write-cond-output",
            type: "source",
            position: Position.Left,
            bits: 1,
            label: "EscPC Cond",
            style: handlePositions.pcWriteCondOutput,
            positionInverted: true,
            isLeft: true,
        },
        {
            id: "pc-write-output",
            type: "source",
            position: Position.Left,
            bits: 1,
            label: "EscPC",
            style: handlePositions.pcWriteOutput,
            positionInverted: true,
            isLeft: true,
        },
        {
            id: "i-or-d-output",
            type: "source",
            position: Position.Left,
            bits: 1,
            label: "IoD",
            style: handlePositions.iOrDOutput,
            positionInverted: true,
            isLeft: true,
        },
        {
            id: "mem-read-output",
            type: "source",
            position: Position.Left,
            bits: 1,
            label: "LeerMem",
            style: handlePositions.memReadOutput,
            positionInverted: true,
            isLeft: true,
        },
        {
            id: "mem-write-output",
            type: "source",
            position: Position.Left,
            bits: 1,
            label: "EscrMem",
            style: handlePositions.memWriteOutput,
            positionInverted: true,
            isLeft: true,
        },
        {
            id: "mem-to-reg-output",
            type: "source",
            position: Position.Left,
            bits: 1,
            label: "MemoReg",
            style: handlePositions.memToRegOutput,
            positionInverted: true,
            isLeft: true,
        },
        {
            id: "i-r-write-output",
            type: "source",
            position: Position.Left,
            bits: 1,
            label: "EscrIR",
            style: handlePositions.iRWriteOutput,
            positionInverted: true,
            isLeft: true,
        },
        {
            id: "pc-source-output",
            type: "source",
            position: Position.Right,
            bits: 2,
            label: "FuentePC",
            style: handlePositions.pcSourceOutput,
            positionInverted: true,
            isLeft: true,
        },
        {
            id: "alu-op-output",
            type: "source",
            position: Position.Right,
            bits: 2,
            label: "ALUOp",
            style: handlePositions.aluOpOutput,
            positionInverted: true,
            isLeft: true,
        },
        {
            id: "alu-src-b-output",
            type: "source",
            position: Position.Right,
            bits: 2,
            label: "ALUSrcB",
            style: handlePositions.aluSrcBOutput,
            positionInverted: true,
            isLeft: true,
        },
        {
            id: "alu-src-a-output",
            type: "source",
            position: Position.Right,
            bits: 1,
            label: "ALUSrcA",
            style: handlePositions.aluSrcAOutput,
            positionInverted: true,
            isLeft: true,
        },
        {
            id: "reg-write-output",
            type: "source",
            position: Position.Right,
            bits: 1,
            label: "EscrReg",
            style: handlePositions.regWriteOutput,
            positionInverted: true,
            isLeft: true,
        },
        {
            id: "reg-dst-output",
            type: "source",
            position: Position.Right,
            bits: 1,
            label: "RegDest",
            style: handlePositions.regDstOutput,
            positionInverted: true,
            isLeft: true,
        },
    ];
}

export const numberHandleList = [
    {
        id: "output-number",
        type: "source",
        position: Position.Right,
        bits: 32,
        connectioncount: null,
        label: null,
        name: "Salida",
        style: null
    }
];