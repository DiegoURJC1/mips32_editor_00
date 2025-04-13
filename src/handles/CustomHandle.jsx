import React, { useEffect, useState } from 'react';
import {Handle, Position, useNodeConnections, useReactFlow} from '@xyflow/react';
import './custom-handle.css';

const CustomHandle = (props) => {

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

        const thisNode = nodes.find(n =>
            n.data?.handles?.some(h => h.id === props.id)
        );
        if (!thisNode) return;

        const thisHandle = thisNode.data?.handles?.find(h => h.id === props.id);
        if (!thisHandle || thisHandle.bits == null) {
            setIsMismatch(false);
            return;
        }

        // 🔥 Revisamos todos los edges que conectan a este handle
        const relatedEdges = edges.filter(e =>
            e.sourceHandle === props.id || e.targetHandle === props.id
        );

        const mismatches = relatedEdges.some(edge => {
            const isSource = edge.sourceHandle === props.id;
            const otherNodeId = isSource ? edge.target : edge.source;
            const otherHandleId = isSource ? edge.targetHandle : edge.sourceHandle;

            const otherNode = nodes.find(n => n.id === otherNodeId);
            if (!otherNode) return false;

            const otherHandle = otherNode.data?.handles?.find(h => h.id === otherHandleId);
            if (!otherHandle || otherHandle.bits == null) return false;

            return otherHandle.bits !== thisHandle.bits;
        });

        setIsMismatch(mismatches);
    }, [getEdges, getNodes, props.id, connections]);



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
                        <span style={{ fontSize: "0.75em", marginLeft: "4px", opacity: 0.6 }}>
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
