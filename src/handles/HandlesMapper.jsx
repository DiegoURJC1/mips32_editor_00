// components/common/HandlesRenderer.jsx
import React from "react";
import CustomHandle from "./CustomHandle.jsx";

export default function HandlesMapper({ nodeId, handleList, isConnectable }) {
    return (
        <>
            {handleList.map((handle) => (
                ((handle.assignedBit === undefined || handle.assignedBit === 0) && (
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
                        bits={handle.bits}
                    />
                ))
            ))}
        </>
    );
}
