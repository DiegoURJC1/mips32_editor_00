import React, { useEffect, useState } from 'react';
import {Handle, Position, useNodeConnections, useReactFlow} from '@xyflow/react';
import './custom-handle.css';
import {useFlowMIPS} from "../contexts/FlowMIPSContext.jsx";

const CustomHandle = (props) => {
    const { handleConnectionList } = useFlowMIPS();
    const connections = useNodeConnections({
        handleId: props.id,
        handleType: props.type,
    });



    const isControlHandle = props.id?.toLowerCase().includes('control');

    // Determinar estilo del texto
    const [handlePosition, setHandlePosition] = useState({
        width: 100,
        textAlign: "left",
        transform: "translate(10px, -40%)"
    });

    useEffect(() => {
        setHandlePosition(getLabelStyle(props.position, props.positionInverted));
    }, [props.position, props.positionInverted]);

    const [isMismatch, setIsMismatch] = useState(false);

    const { getNodes, getEdges } = useReactFlow();
    useEffect(() => {
        const nodes = getNodes();
        const edges = getEdges();

        const thisNode = nodes.find(n => n.data?.handles?.some(h => h.id === props.id) && n.id === props.nodeId);
        if (!thisNode) return;

        const thisHandle = thisNode.data?.handles?.find(h => h.id === props.id);
        if (!thisHandle || thisHandle.bits == null) {
            setIsMismatch(false);
            return;
        }

        let hasMismatch = false;

        if (props.type === "target") {
            const connectionsToThis = handleConnectionList.filter(conn =>
                conn.destinyHandleId === props.id &&
                conn.destinyNodeId === props.nodeId
            );

            const totalAssignedBits = connectionsToThis.reduce((sum, conn) => {
                return sum + (conn.assignedBits ?? 0);
            }, 0);

            hasMismatch = totalAssignedBits !== thisHandle.bits;
        }

        else if (props.type === "source") {
            const connectionsFromThis = handleConnectionList.filter(conn =>
                conn.originHandleId === props.id &&
                conn.originNodeId === props.nodeId
            );

            for (const conn of connectionsFromThis) {
                const destNode = nodes.find(n =>
                    n.id === conn.destinyNodeId &&
                    n.data?.handles?.some(h => h.id === conn.destinyHandleId)
                );
                const destHandle = destNode?.data?.handles?.find(h => h.id === conn.destinyHandleId);
                if (!destHandle || destHandle.bits == null) continue;

                const connectionsToDest = handleConnectionList.filter(c =>
                    c.destinyHandleId === conn.destinyHandleId &&
                    c.destinyNodeId === conn.destinyNodeId
                );

                const totalAssignedBits = connectionsToDest.reduce((sum, c) => {
                    return sum + (c.assignedBits ?? 0);
                }, 0);

                if (totalAssignedBits !== destHandle.bits) {
                    hasMismatch = true;
                    break;
                }
            }
        }

        setIsMismatch(hasMismatch);
    }, [getEdges, getNodes, props.id, props.type, props.nodeId, handleConnectionList]);







    // Obtenemos estilos por defecto del tema
    const defaultBgColor = getComputedStyle(document.documentElement).getPropertyValue('--xy-handle-background-color-default').trim();
    const defaultBorderColor = getComputedStyle(document.documentElement).getPropertyValue('--xy-handle-border-color-default').trim();
    const backgroundColor = isMismatch
        ? 'var(--negation-color)'
        : isControlHandle
            ? 'var(--control-color)'
            : defaultBgColor;

    const borderColor = isMismatch
        ? 'var(--negation-border-color)'
        : isControlHandle
            ? 'var(--control-border-color)'
            : defaultBorderColor;
    return (
        <div>
            <Handle
                {...props}
                isConnectable={props.connectioncount ? connections.length < props.connectioncount : true}
                style={{
                    ...props.style,
                    backgroundColor: backgroundColor,
                    borderColor: borderColor,
                }}
            >
                <div
                    className="handle-text"
                    style={{
                        width: `${handlePosition.width}px`,
                        textAlign: handlePosition.textAlign,
                        transform: handlePosition.transform,
                    }}
                >
                    {props.label}
                    {props.bits != null && (
                        <span style={{ fontSize: "0.75em", marginLeft: "4px", opacity: 0.6}}>
                            [{props.bits}]
                        </span>
                    )}
                </div>
            </Handle>
        </div>
    );
};

export default CustomHandle;

// Función para invertir la posición del handle
function invertPosition(pos) {
    switch (pos) {
        case Position.Left: return Position.Right;
        case Position.Right: return Position.Left;
        case Position.Top: return Position.Bottom;
        case Position.Bottom: return Position.Top;
        default: return pos;
    }
}

// Función para calcular la posición y estilos del texto en función de la posición del handle
function getLabelStyle(positionHandle, isControl) {
    let position = {
        width: '100px',
        textAlign: 'left',
        transform: 'translate(10px, -40%)',
    };

    if (isControl) {
        positionHandle = invertPosition(positionHandle);
    }

    switch (positionHandle) {
        case Position.Bottom:
            position.textAlign = 'center';
            position.transform = 'translate(-48px, -100%)';
            break;
        case Position.Top:
            position.textAlign = 'center';
            position.transform = 'translate(-48px, 40%)';
            break;
        case Position.Right:
            position.textAlign = 'right';
            position.transform = 'translate(-105px, -40%)';
            break;
        case Position.Left:
        default:
            position.textAlign = 'left';
            position.transform = 'translate(10px, -40%)';
            break;
    }

    return position;
}
