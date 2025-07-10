import React, { useEffect, useState } from "react";
import {useReactFlow, useUpdateNodeInternals} from '@xyflow/react';
import CustomNodeToolbar from "./common/node-toobar/CustomNodeToolbar.jsx";
import HandlesMapper from "../../../handles/HandlesMapper.jsx";
import "./common/node-mips-stylesheet.css";
import { useFlowMIPS } from "../../../contexts/FlowMIPSContext.jsx";
import BasicInputSmall from "../../../modules/basic-input-small/BasicInputSmall.jsx";
import {Position} from "@xyflow/react";

export default function MipsGeneralNode({ id, data, isConnectable }) {
    const {
        numberNodes,
        updateNumberNodeValue,
        updateNumberNodeBits,
        letterSwitchMap,
        setLetterSwitch,
        setHandleConnectionAssignedBits,
    } = useFlowMIPS();
    const { getEdges } = useReactFlow();
    const [localValue, setLocalValue] = useState(data.label ?? "0");
    const [localBits, setLocalBits] = useState(32);
    const [handles, setHandles] = useState(data.handles ?? []);

    const isLetter = data.nodeClass === 'letter';
    const topHandleEnabled = letterSwitchMap.get(id) === true;

    // Sincronizar número
    useEffect(() => {
        const nodeData = numberNodes.get(id);
        if (nodeData) {
            if (typeof nodeData.value !== "undefined") setLocalValue(String(nodeData.value));
            if (typeof nodeData.bits !== "undefined") setLocalBits(nodeData.bits);
        }
    }, [numberNodes, id]);

    const updateNodeInternals = useUpdateNodeInternals();
    // Agregar o quitar handle dinámico al cambiar el switch
    useEffect(() => {
        if (isLetter) {
            if (topHandleEnabled) {
                setHandles(prev => {
                    const exists = prev.some(h => h.id === "letter-control-input");
                    return exists
                        ? prev
                        : [...prev, {
                            id: "letter-control-input",
                            type: "target",
                            name: "Entrada control",
                            position: Position.Top,
                            connectioncount: 1,
                            bits: 1,
                            isConnectable: isConnectable,
                            style: null
                        }];
                });
            } else {
                setHandles(prev => prev.filter(h => h.id !== "letter-control-input"));
                
            }
        }
        updateNodeInternals(id);
    }, [topHandleEnabled, isLetter, updateNodeInternals, id, isConnectable]);


    const handleSwitchToggle = (e) => {
        setLetterSwitch(id, e.target.checked);
    };

    const handleValueChange = (e) => {
        const newValue = e.target.value;
        setLocalValue(newValue);
        const parsed = parseInt(newValue);
        if (!isNaN(parsed)) updateNumberNodeValue(id, parsed);
    };

    const handleBitsChangeNumberNode = (e) => {
        const value = e.target.value;

        // Si el valor es vacío, no hacer nada
        if (value === "") {
            setLocalBits(null);  // o puedes usar `0` en vez de `null` si prefieres
            return;
        }

        // Intentar convertir el valor a un número
        let newBits = parseInt(value);

        // Si el valor no es un número válido, asignar valor por defecto (0)
        if (isNaN(newBits)) {
            setLocalBits(0);
            updateNumberNodeBits(id, 0);
            return;
        }

        // Restringir el valor a que esté dentro del rango [0, 32]
        newBits = Math.max(0, Math.min(32, newBits));

        // Actualizar los bits en el estado local
        setLocalBits(newBits);
        updateNumberNodeBits(id, newBits);

        // Obtener todas las conexiones de ReactFlow
        const edges = getEdges();

        // Filtrar las conexiones que tengan el target y targetHandle que coincidan
        const matchingEdges = edges.filter((edge) =>
            edge.source === id && edge.sourceHandle === "output-number"
        );

        // Para cada conexión que coincida, actualizar los bits asignados
        matchingEdges.forEach((edge) => {
            setHandleConnectionAssignedBits(id, "output-number", edge.target, edge.targetHandle, newBits);
        });
    };


    return (
        <div
            className={`mips-node ${data.nodeClass}`}
            style={{
                width: `${data.size.width}px`,
                height: `${data.size.height}px`,
            }}
        >
            <CustomNodeToolbar nodeId={id} data={data} handles={handles}>
                {data.nodeClass === 'number' && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        <BasicInputSmall
                            type="text"
                            value={localValue}
                            onChange={handleValueChange}
                            placeholder="Valor"
                        />
                        <div className={"node-toolbar-subsection-title"}>Bits</div>
                        <BasicInputSmall
                            type="text"
                            value={localBits}
                            onChange={handleBitsChangeNumberNode}
                            placeholder="Bits"
                            min={1}
                            max={64}
                        />
                    </div>
                )}

                {isLetter && (
                    <div className="mips-node-control-toggle">
                        <label>
                            <input
                                type="checkbox"
                                checked={topHandleEnabled}
                                onChange={handleSwitchToggle}
                            />
                            Activar entrada control
                        </label>
                    </div>
                )}
            </CustomNodeToolbar>

            {/* Visualización del nodo */}
            {localValue}

            {/* Handles */}
            <HandlesMapper
                nodeId={id}
                handleList={handles}
                isConnectable={isConnectable}
            />
        </div>
    );
}
