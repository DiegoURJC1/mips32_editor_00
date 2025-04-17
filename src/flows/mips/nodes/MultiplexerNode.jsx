import React, { useEffect, useMemo, useState } from "react";
import { Position, useReactFlow, useNodeConnections } from "@xyflow/react";
import CustomHandle from "../../../handles/CustomHandle.jsx";
import CustomNodeToolbar from "./common/node-toobar/CustomNodeToolbar.jsx";
import "./common/node-mips-stylesheet.css";
import { useFlowMIPS } from "../../../hooks/FlowMIPSContext.jsx";

export default function MultiplexerNode({ id, data, isConnectable }) {
    const { setEdges, getNodes } = useReactFlow();
    const connections = useNodeConnections(id);

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
            connectioncount: 1,
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
            id: "control-input",
            type: "target",
            position: Position.Top,
            bits: bitsControl,
            connectioncount: 1,
            name: "Control",
        },
        {
            id: "output-multiplexer",
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
        connections.forEach((connection) => {
            const { sourceHandle, targetHandle, source, target } = connection;

            const handle = dynamicHandles.find(
                (h) => h.id === sourceHandle || h.id === targetHandle
            );

            if (handle) {
                const otherHandleId = sourceHandle === handle.id ? targetHandle : sourceHandle;
                const otherNode = getNodes().find((n) => n.id === (source === handle.id ? target : source));
                const otherHandle = otherNode?.data?.handles?.find((h) => h.id === otherHandleId);

                if (otherHandle && otherHandle.bits != null) {
                    setHandleBits((prevState) => {
                        if (prevState[handle.label] !== otherHandle.bits) {
                            return {
                                ...prevState,
                                [handle.label]: otherHandle.bits,
                            };
                        }
                        return prevState;
                    });
                }
            }
        });

        dynamicHandles.forEach((handle) => {
            const isConnected = connections.some(
                (connection) =>
                    connection.sourceHandle === handle.id || connection.targetHandle === handle.id
            );

            if (!isConnected && handleBits[handle.label] !== null) {
                setHandleBits((prevState) => ({
                    ...prevState,
                    [handle.label]: null,
                }));
            }
        });
    }, [connections, dynamicHandles, getNodes, handleBits]);

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
                <div style={{ display: "flex" }}>
                    <button onClick={handleAddInput}>➕</button>
                    <button onClick={handleRemoveInput} disabled={inputsCount <= 2}>➖</button>
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
