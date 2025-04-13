import React, { useEffect, useState, useMemo } from "react";
import { Position, useReactFlow, useNodeConnections } from "@xyflow/react";
import CustomHandle from "../../../handles/CustomHandle.jsx";
import CustomNodeToolbar from "./common/node-toobar/CustomNodeToolbar.jsx";
import "./common/node-mips-stylesheet.css";

export default function MultiplexerNode({ id, data, isConnectable }) {
    const { setEdges, getEdges, getNodes } = useReactFlow();
    const connections = useNodeConnections(id); // Usamos useNodeConnections para obtener las conexiones del nodo

    const initialInputs = data?.initialInputs || 2;
    const [numInputs, setNumInputs] = useState(
        Array.from({ length: initialInputs }, (_, i) => `${i}`)
    );

    const calculateBitsControl = (numInputs) => {
        return Math.ceil(Math.log2(numInputs));
    };

    const [bitsControl, setBitsControl] = useState(calculateBitsControl(initialInputs));
    const [handleBits, setHandleBits] = useState({});

    const size = {
        width: 60,
        height: 40 + numInputs.length * 40,
    };

    const dynamicHandles = useMemo(() => {
        return numInputs.map((inputId, index) => ({
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
        }));
    }, [numInputs, handleBits, size.height]);

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
        setNumInputs((prev) => {
            const updatedInputs = [...prev, `${prev.length}`];
            setBitsControl(calculateBitsControl(updatedInputs.length));
            return updatedInputs;
        });
    };

    const [removedInputId, setRemovedInputId] = useState(null);

    const handleRemoveInput = () => {
        if (numInputs.length > 2) {
            setNumInputs((prev) => {
                const updatedInputs = prev.slice(0, -1);
                const lastId = prev[prev.length - 1];
                setRemovedInputId(lastId);
                setBitsControl(calculateBitsControl(updatedInputs.length));
                return updatedInputs;
            });
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
        // Cuando las conexiones cambian, actualizar los bits
        connections.forEach((connection) => {
            const { sourceHandle, targetHandle, source, target } = connection;

            // Identificar el handle correspondiente
            const handle = dynamicHandles.find(
                (h) => h.id === sourceHandle || h.id === targetHandle
            );

            if (handle) {
                const otherHandleId = sourceHandle === handle.id ? targetHandle : sourceHandle;
                const otherNode = getNodes().find((n) => n.id === (source === handle.id ? target : source));
                const otherHandle = otherNode?.data?.handles?.find((h) => h.id === otherHandleId);

                if (otherHandle && otherHandle.bits != null) {
                    // Solo actualizamos si los bits han cambiado
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

        // Detectar y eliminar los bits de los handles que han perdido su conexión
        dynamicHandles.forEach((handle) => {
            const isConnected = connections.some(
                (connection) =>
                    connection.sourceHandle === handle.id || connection.targetHandle === handle.id
            );

            // Si el handle no está conectado, ponemos sus bits a null
            if (!isConnected && handleBits[handle.label] !== null) {
                setHandleBits((prevState) => ({
                    ...prevState,
                    [handle.label]: null,
                }));
            }
        });
    }, [connections, dynamicHandles, getNodes, handleBits]); // Dependemos de las conexiones y de los nodos

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
                    <button onClick={handleRemoveInput} disabled={numInputs.length <= 2}>➖</button>
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
