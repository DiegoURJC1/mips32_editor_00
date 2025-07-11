import React, { useEffect, useMemo, useState } from "react";
import { Position, useReactFlow, useNodeConnections } from "@xyflow/react";
import CustomHandle from "../../../handles/CustomHandle.jsx";
import CustomNodeToolbar from "./common/node-toobar/CustomNodeToolbar.jsx";
import "./common/node-mips-stylesheet.css";
import { useFlowMIPS } from "../../../contexts/FlowMIPSContext.jsx";
import ButtonWithIconSmall, {
    ButtonWithTextSmall
} from "../../../modules/button-with-icon-small/ButtonWithIconSmall.jsx";
import HandlesMapper from "../../../handles/HandlesMapper.jsx";

export default function MultiplexerNode({ id, data, isConnectable }) {
    const { setEdges, getNodes } = useReactFlow();
    const connections = useNodeConnections(id);
    //console.log(`${id}: ${connections[0].target}, ${connections[0].targetHandle}, ${connections[0].source}, ${connections[0].sourceHandle}`);

    const { handleConnectionList } = useFlowMIPS();
    const {
        multiplexerInputs,
        addMultiplexerInput,
        removeMultiplexerInput,
        setMultiplexerInputCount,

        staticControlHandles,

        changeStaticHandleBits,
    } = useFlowMIPS();

    const inputsCount = multiplexerInputs.get(id) ?? 2;

    useEffect(() => {
        setMultiplexerInputCount(id, inputsCount);
    }, [id, setMultiplexerInputCount, inputsCount]);

    const numInputs = useMemo(() => (
        Array.from({ length: inputsCount }, (_, i) => `${i}`)
    ), [inputsCount]);

    const calculateBitsControl = (numInputs) => Math.ceil(Math.log2(numInputs));
    const bitsControl = useMemo(() => calculateBitsControl(inputsCount), [inputsCount]);
    const [handleBits, setHandleBits] = useState({});

    const size = {
        width: 60,
        height: 40 + inputsCount * 40,
    };

    useEffect(() => {
        connections.forEach((connection) => {
            if (
                connection.targetHandle === `control-input-${id}` &&
                connection.source === 'control' &&
                connection.target === id
            ) {
                const controlHandleId = connection.sourceHandle;

                // Buscar en staticControlHandles el objeto con id igual a controlHandleId
                const handle = staticControlHandles.find(h => h.id === controlHandleId);
                if (handle && handle.label) {
                    changeStaticHandleBits(handle.label, bitsControl);
                    console.log(`bitsControl: ${bitsControl}`);
                    console.log(`label usado: ${handle.label}`);
                } else {
                    console.log(`handle con id ${controlHandleId} no encontrado o sin label`);
                }
            }
        });
    }, [inputsCount, connections, id, bitsControl]);


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
            bits: handleBits['output'] ?? null,
        },
    ];

    const handleAddInput = () => {
        addMultiplexerInput(id);
    };

    const handleRemoveInput = () => {
        if (inputsCount > 2) {
           const removedInputId = `${inputsCount - 1}-${id}`;
            console.log(`removedInputId: ${removedInputId}`);
            setEdges((edges) =>
                edges.filter((e) =>
                    !(e.targetHandle === `${removedInputId}` && e.target === id)
                )
            );
            removeMultiplexerInput(id);
        }
    };


    useEffect(() => {
        const updatedBits = {};

        dynamicHandles.forEach((handle) => {
            const matches = handleConnectionList.filter(
                (conn) => conn.destinyNodeId === id && conn.destinyHandleId === handle.id
            );

            const totalBits = matches.reduce((sum, conn) => {
                return sum + (typeof conn.assignedBits === 'number' ? conn.assignedBits : 0);
            }, 0);

            updatedBits[handle.label] = matches.length > 0 ? totalBits : null;
        });

        // 👉 Determinar si todos los inputs tienen bits asignados
        const inputBits = Object.values(updatedBits);
        const allHaveBits = inputBits.every((b) => typeof b === 'number');
        const allEqual = allHaveBits && inputBits.every((b) => b === inputBits[0]);

        const outputBits = allEqual ? inputBits[0] : null;

        setHandleBits((prevState) => {
            const isChanged = Object.keys(updatedBits).some(
                (key) => prevState[key] !== updatedBits[key]
            );

            const updated = { ...updatedBits };
            if (prevState['output'] !== outputBits) {
                updated['output'] = outputBits;
            } else if (!isChanged) {
                return prevState;
            }

            return { ...prevState, ...updated };
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

            <div
                className={`node-label ${inputsCount % 2 !== 0 ? "shifted" : ""}`}
            >
                {data.label}
            </div>

            <HandlesMapper
                nodeId={id}
                handleList={[...staticHandles, ...dynamicHandles]}
                isConnectable={isConnectable}
            />
        </div>
    );
}
