// components/common/HandlesRenderer.jsx
import React from "react";
import CustomHandle from "../../../../../handles/CustomHandle.jsx";

export default function HandlesMapper({ nodeId, handleList, isConnectable }) {
    return (
        <>
            {handleList.map((handle) => (
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
            ))}
        </>
    );
}
