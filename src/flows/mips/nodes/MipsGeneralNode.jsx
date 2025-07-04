import React, { useEffect, useState } from "react";
import CustomNodeToolbar from "./common/node-toobar/CustomNodeToolbar.jsx";
import HandlesMapper from "../../../handles/HandlesMapper.jsx";
import "./common/node-mips-stylesheet.css";
import { useFlowMIPS } from "../../../contexts/FlowMIPSContext.jsx";
import BasicInputSmall from "../../../modules/basic-input-small/BasicInputSmall.jsx";

export default function MipsGeneralNode({
                                            id,
                                            data,
                                            isConnectable,
                                        }) {
    const {
        numberNodes,
        updateNumberNodeValue,
        updateNumberNodeBits
    } = useFlowMIPS();

    const [localValue, setLocalValue] = useState(data.label ?? "0");
    const [localBits, setLocalBits] = useState(32);

    // 🔁 Sincronizar localValue/bits con cambios en numberNodes
    useEffect(() => {
        const nodeData = numberNodes.get(id);
        if (nodeData) {
            if (typeof nodeData.value !== "undefined") {
                setLocalValue(String(nodeData.value));
            }
            if (typeof nodeData.bits !== "undefined") {
                setLocalBits(nodeData.bits);
            }
        }
    }, [numberNodes, id]);

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
            <CustomNodeToolbar nodeId={id} data={data} handles={data.handles}>
                {data.nodeClass === 'number' && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        <BasicInputSmall
                            type="text"
                            value={localValue}
                            onChange={handleValueChange}
                            placeholder="Valor"
                        />
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
            </CustomNodeToolbar>

            {/* 👇 Aquí actualizamos lo que se muestra fuera del toolbar */}
            {localValue}

            <HandlesMapper nodeId={id} handleList={data.handles} isConnectable={isConnectable} />
        </div>
    );
}
