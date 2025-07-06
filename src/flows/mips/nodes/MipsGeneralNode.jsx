import React, { useEffect, useState } from "react";
import { useUpdateNodeInternals } from '@xyflow/react';
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
    } = useFlowMIPS();
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

    const handleBitsChange = (e) => {
        const newBits = parseInt(e.target.value) || 0;
        setLocalBits(newBits);
        updateNumberNodeBits(id, newBits);
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
                            onChange={handleBitsChange}
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
