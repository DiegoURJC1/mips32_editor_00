import React, { useState, useEffect } from 'react';
import { NodeToolbar, Position, useReactFlow } from "@xyflow/react";
import "./custom-node-toolbar.css";
import ButtonWithIconSmall, { TrashButtonSmall } from "../../../../../modules/button-with-icon-small/ButtonWithIconSmall.jsx";
import { useFlowMIPS } from "../../../../../contexts/FlowMIPSContext.jsx";

export default function CustomNodeToolbar(props) {
    const { deleteElements } = useReactFlow();
    const { getNodes, getEdges } = useReactFlow();
    const { setHandleConnectionAssignedBits, handleConnectionList } = useFlowMIPS();

    // Estado para controlar la pestaña activa
    const [activeTab, setActiveTab] = useState('content'); // "content", "handles", o "extra"
    const [connections, setConnections] = useState([]); // Para guardar las conexiones de este nodo

    // Filtrar los handles en "target" y "source"
    const targetHandles = props.handles?.filter(handle => handle.type === 'target');
    const sourceHandles = props.handles?.filter(handle => handle.type === 'source');

    // Filtrar las conexiones del nodo
    useEffect(() => {
        const edges = getEdges(); // Obtener todas las conexiones (edges)
        const nodeConnections = edges.filter(edge => {
            return edge.source === props.nodeId || edge.target === props.nodeId;
        });

        // Asignar las conexiones al estado
        setConnections(nodeConnections);
    }, [props.nodeId, getEdges]);

    const handleDelete = () => {
        if (!props.data?.isProtected) {
            console.log(props.nodeId);
            deleteElements({ nodes: [{ id: props.nodeId }] });
        }
    };

    const handleBitsChange = (originNodeId, originHandleId, destinyNodeId, destinyHandleId, newAssignedBits) => {
        if (!isNaN(newAssignedBits)) {
            setHandleConnectionAssignedBits(originNodeId, originHandleId, destinyNodeId, destinyHandleId, newAssignedBits);
        }
    };

    return (
        <NodeToolbar
            align={"start"}
            position={props.position || Position.Right}
        >
            <div className={"custom-node-toolbar"}>
                {/* Pestañas */}
                <div className="tabs">
                    <button
                        className={activeTab === 'content' ? 'active' : ''}
                        onClick={() => setActiveTab('content')}
                    >
                        Contenido
                    </button>
                    <button
                        className={activeTab === 'handles' ? 'active' : ''}
                        onClick={() => setActiveTab('handles')}
                    >
                        E/S
                    </button>
                    <button
                        className={activeTab === 'extra' ? 'active' : ''}
                        onClick={() => setActiveTab('extra')}
                    >
                        Extra
                    </button>
                </div>

                {/* Mostrar contenido según la pestaña activa */}
                {activeTab === 'content' ? (
                    <div className="content-tab">
                        <div className={"node-toolbar-section-title"}>Info básica</div>
                        <div className={"content-tab-content"}>
                            <div className={"node-toolbar-subsection-title"}>
                                {props.data?.label != null && !isNaN(props.data.label) && isFinite(props.data.label)
                                    ? 'Número'
                                    : props.data?.label || 'No label provided'}
                            </div>
                            {props.children}
                        </div>
                        <TrashButtonSmall
                            onClick={handleDelete}
                            disabled={props.data?.isProtected}
                        />
                    </div>
                ) : activeTab === 'handles' ? (
                    <div className="handles-tab">
                        <div className="target-handles">
                            <div className={"node-toolbar-section-title"}>Entradas</div>
                            {targetHandles && targetHandles.length > 0 ? (
                                <ul>
                                    {targetHandles.map(handle => (
                                        <li key={handle.id}>
                                            {handle.name || handle.label}
                                            <br /> Bits: {handle.bits || 'Nan'}
                                            <br /> Num: {handle.connectioncount || "∞"}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No hay handles de tipo target.</p>
                            )}
                        </div>
                        <div className="source-handles">
                            <div className={"node-toolbar-section-title"}>Salidas</div>
                            {sourceHandles && sourceHandles.length > 0 ? (
                                <ul>
                                    {sourceHandles.map(handle => (
                                        <li key={handle.id}>
                                            {handle.name || handle.label}
                                            <br /> Bits: {handle.bits || 'Nan'}
                                            <br /> Num: {handle.connectioncount || "∞"}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No hay handles de tipo source.</p>
                            )}
                        </div>
                    </div>
                ) : activeTab === 'extra' && (
                    <div className="extra-tab">
                        <div className="node-toolbar-section-title">Conexiones salientes</div>
                        {handleConnectionList.filter(conn => conn.originNodeId === props.nodeId).map((conn, index) => {
                            // Nodo actual tiene handles de salida disponibles
                            const sourceHandle = sourceHandles?.find(h => h.id === conn.originHandleId);

                            // Obtener el nodo destino y sus handles
                            const allNodes = getNodes();
                            const targetNode = allNodes.find(n => n.id === conn.destinyNodeId);
                            const targetHandles = targetNode?.data?.handles || [];
                            const targetHandle = targetHandles.find(h => h.id === conn.destinyHandleId);

                            const sourceLabel = sourceHandle?.name || sourceHandle?.label || conn.originHandleId;
                            const targetLabel = targetHandle?.name || targetHandle?.label || conn.destinyHandleId;
                            const targetNodeLabel = targetNode?.data?.label || conn.destinyNodeId;

                            return (
                                <div key={index} className="connection-entry">
                                    <div>
                                        <strong>{sourceLabel}</strong> → <strong>{targetLabel}</strong> [{targetNodeLabel}]
                                    </div>
                                    <div style={{ marginTop: '4px' }}>
                                        Bits asignados:
                                        <input
                                            type="number"
                                            value={conn.assignedBits ?? ''}
                                            onChange={(e) =>
                                                handleBitsChange(
                                                    conn.originNodeId,
                                                    conn.originHandleId,
                                                    conn.destinyNodeId,
                                                    conn.destinyHandleId,
                                                    parseInt(e.target.value, 10)
                                                )
                                            }
                                            style={{ width: '60px', marginLeft: '8px' }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                        {handleConnectionList.filter(conn => conn.originNodeId === props.nodeId).length === 0 && (
                            <p>No hay conexiones salientes para este nodo.</p>
                        )}
                    </div>
                )}
            </div>
        </NodeToolbar>
    );
}
