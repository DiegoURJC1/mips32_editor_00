import {Algorithm} from "../../../edges/EditableEdge/constants.ts";
import { v4 as uuidv4 } from 'uuid';

export const initialEdges = [
    {
        id: 'control->and',
        type: 'editable-edge',
        source: 'control',
        target: 'and',
        sourceHandle: 'pc-write-cond-output',
        targetHandle: 'input2',
        animated: false,
        data: {
            algorithm: Algorithm.Linear,
            points: [
                {
                    x: 1000,
                    y: 500,
                    id: uuidv4(),
                    active: true,
                },
            ],
        },
    },
    {
        id: 'control->or',
        type: 'editable-edge',
        source: 'control',
        target: 'or',
        sourceHandle: 'pc-write-output',
        targetHandle: 'input2',
        animated: false,
        data: {
            label: 1,
            algorithm: Algorithm.Linear,
            points: [
                { x: 990, y: 520, id: uuidv4(), active: true },
                { x: 730, y: 520, id: uuidv4(), active: true },
                { x: 730, y: 510, id: uuidv4(), active: true },
            ],
        },
    },
    {
        id: 'and->or',
        type: 'editable-edge',
        source: 'and',
        target: 'or',
        sourceHandle: 'output',
        targetHandle: 'input1',
        animated: false,
        data: {
            algorithm: Algorithm.Linear,
            points: [],
        },
    },
    {
        id: 'or->pc',
        type: 'editable-edge',
        source: 'or',
        target: 'pc',
        sourceHandle: 'output',
        targetHandle: 'control-input-pc',
        animated: false,
        data: {
            algorithm: Algorithm.Linear,
            points: [
                { x: 420, y: 500, id: uuidv4(), active: true },
            ],
        },
    },
    {
        id: 'pc->multiplexer1',
        type: 'editable-edge',
        source: 'pc',
        target: 'multiplexer1',
        sourceHandle: 'output-pc',
        targetHandle: '0-multiplexer1',
        animated: false,
        data: {
            algorithm: Algorithm.Linear,
            points: [],
        },
    },
    {
        id: 'multiplexer1->memory',
        type: 'editable-edge',
        source: 'multiplexer1',
        target: 'memory',
        sourceHandle: 'output-multiplexer',
        targetHandle: 'direction-input-memory',
        animated: false,
        data: {
            algorithm: Algorithm.Linear,
            points: [],
        },
    },
    {
        id: 'memory->instructionRegister',
        type: 'editable-edge',
        source: 'memory',
        target: 'instructionRegister',
        sourceHandle: 'output-memory',
        targetHandle: 'input-instructionRegister',
        animated: false,
        data: {
            algorithm: Algorithm.Linear,
            points: [],
        },
    },
    {
        id: 'memory->memoryDataRegister',
        type: 'editable-edge',
        source: 'memory',
        target: 'memoryDataRegister',
        sourceHandle: 'output-memory',
        targetHandle: 'input-memoryDataRegister',
        animated: false,
        data: {
            algorithm: Algorithm.Linear,
            points: [
                { x: 770, y: 900, id: uuidv4(), active: true },
                { x: 770, y: 1250, id: uuidv4(), active: true },
            ],
        },
    },
    {
        id: 'instructionRegister->control',
        type: 'editable-edge',
        source: 'instructionRegister',
        target: 'control',
        sourceHandle: 'output-[31-26]-instructionRegister',
        targetHandle: 'input',
        animated: false,
        data: {
            algorithm: Algorithm.Linear,
            points: [
                { x: 1080, y: 800, id: uuidv4(), active: true },
            ],
        },
    },
    {
        id: 'instructionRegister->register',
        type: 'editable-edge',
        source: 'instructionRegister',
        target: 'register',
        sourceHandle: 'output-[25-21]-instructionRegister',
        targetHandle: 'read-reg-1-input-register',
        animated: false,
        data: {
            algorithm: Algorithm.Linear,
            points: [
            ],
        },
    },
]