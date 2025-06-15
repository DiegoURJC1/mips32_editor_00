import React, { useEffect, useMemo, useState } from "react";
import { Position, useReactFlow, useNodeConnections } from "@xyflow/react";
import CustomHandle from "../../../handles/CustomHandle.jsx";
import CustomNodeToolbar from "./common/node-toobar/CustomNodeToolbar.jsx";
import "./common/node-mips-stylesheet.css";
import { useFlowMIPS } from "../../../contexts/FlowMIPSContext.jsx";
import ButtonWithIconSmall, {
    ButtonWithTextSmall
} from "../../../modules/button-with-icon-small/ButtonWithIconSmall.jsx";

export default function MultiplexerNode({ id, data, isConnectable }) {
    const { setEdges, getNodes } = useReactFlow();
    const connections = useNodeConnections(id);
    const { handleConnectionList } = useFlowMIPS();
    const {
        multiplexerInputs,
        addMultiplexerInput,
        removeMultiplexerInput,
        setMultiplexerInputCount,
    } = useFlowMIPS();

    const inputsCount = multiplexerInputs.get(id) ?? 2;

    useEffect(() => {
        setMultiplexerInputCount(id, inputsCount);
    }, [id, setMultiplexerInputCount, inputsCount]);

    const numInputs = useMemo(() => (
        Array.from({ length: inputsCount }, (_, i) => `${i}`)
    ), [inputsCount]);

    const calculateBitsControl = (numInputs) => Math.ceil(Math.log2(numInputs));
    const [bitsControl, setBitsControl] = useState(calculateBitsControl(inputsCount));
    const [handleBits, setHandleBits] = useState({});
    const [removedInputId, setRemovedInputId] = useState(null);

    const size = {
        width: 60,
        height: 40 + numInputs.length * 40,
    };

    useEffect(() => {
        setBitsControl(calculateBitsControl(inputsCount));
    }, [inputsCount]);

    const dynamicHandles = useMemo(() => (
        numInputs.map((inputId, index) => ({
            id: `${inputId}-${id}`,
            type: "target",
            position: Position.Left,
            connectioncount: 2,
            label: inputId,
            name: `Entrada ${inputId}`,
            bits: handleBits[inputId] || null,
            style: {
                top: `${Math.round(size.height * (index + 1) / (numInputs.length + 1) / 10) * 10}px`,
            },
        }))
    ), [numInputs, id, handleBits, size.height]);

    const staticHandles = [
        {
            id: `control-input-${id}`,
            type: "target",
            position: Position.Top,
            bits: bitsControl,
            connectioncount: 1,
            name: "Control",
        },
        {
            id: `output-${id}`,
            type: "source",
            position: Position.Right,
            connectioncount: null,
            name: "Salida",
        },
    ];

    const handleAddInput = () => {
        addMultiplexerInput(id);
    };

    const handleRemoveInput = () => {
        if (inputsCount > 2) {
            setRemovedInputId(`${inputsCount - 1}`);
            removeMultiplexerInput(id);
        }
    };

    useEffect(() => {
        if (removedInputId) {
            setEdges((edges) =>
                edges.filter((e) => !e.targetHandle?.startsWith(`${removedInputId}`))
            );
            setRemovedInputId(null);
        }
    }, [removedInputId, setEdges]);

    useEffect(() => {
        const updatedBits = {};

        dynamicHandles.forEach((handle) => {
            // Encuentra todas las conexiones que llegan a esta entrada
            const matches = handleConnectionList.filter(
                (conn) => conn.destinyNodeId === id && conn.destinyHandleId === handle.id
            );

            // Suma los bits asignados en esas conexiones
            const totalBits = matches.reduce((sum, conn) => {
                return sum + (typeof conn.assignedBits === 'number' ? conn.assignedBits : 0);
            }, 0);

            // Si no hay conexiones, guarda null
            updatedBits[handle.label] = matches.length > 0 ? totalBits : null;
        });

        setHandleBits((prevState) => {
            const isChanged = Object.keys(updatedBits).some(
                (key) => prevState[key] !== updatedBits[key]
            );

            return isChanged ? updatedBits : prevState;
        });
    }, [handleConnectionList, dynamicHandles, id]);



    return (
        <div
            className="mips-node multiplexer"
            style={{
                width: `${size.width}px`,
                height: `${size.height}px`,
            }}
        >
            <CustomNodeToolbar
                data={data}
                handles={[...staticHandles, ...dynamicHandles]}
                nodeId={id}
            >
                <div style={{ display: "flex", gap: "4px" }}>
                    <ButtonWithTextSmall onClick={handleAddInput}>➕</ButtonWithTextSmall>
                    <ButtonWithTextSmall onClick={handleRemoveInput} disabled={inputsCount <= 2}>➖</ButtonWithTextSmall>
                </div>
            </CustomNodeToolbar>

            <div className="node-label">{data.label}</div>

            {[...staticHandles, ...dynamicHandles].map((handle) => (
                <CustomHandle
                    key={handle.id}
                    id={handle.id}
                    type={handle.type}
                    position={handle.position}
                    isConnectable={isConnectable}
                    connectioncount={handle.connectioncount}
                    label={handle.label}
                    name={handle.label ? undefined : handle.name}
                    style={handle.style}
                    bits={handle.bits}
                />
            ))}
        </div>
    );
}
