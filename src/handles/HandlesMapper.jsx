// components/common/HandlesRenderer.jsx
import React from "react";
import CustomHandle from "./CustomHandle.jsx";
import { useFlowMIPS } from "../contexts/FlowMIPSContext.jsx";

export default function HandlesMapper({ nodeId, handleList, isConnectable }) {
    const { numberNodes } = useFlowMIPS();
    const nodeData = numberNodes.get(nodeId);

    return (
        <>
            {handleList.map((handle) => {
                // Solo renderizar si no tiene assignedBit
                if (handle.assignedBit !== undefined && handle.assignedBit !== 0) return null;

                const dynamicBits = nodeData?.bits ?? handle.bits;

                return (
                    <CustomHandle
                        nodeId={nodeId}
                        key={handle.id}
                        id={handle.id}
                        type={handle.type}
                        position={handle.position}
                        isConnectable={isConnectable}
                        connectioncount={handle.connectioncount}
                        label={handle.label}
                        style={handle.style}
                        positionInverted={handle.positionInverted}
                        bits={dynamicBits}
                    />
                );
            })}
        </>
    );
}
