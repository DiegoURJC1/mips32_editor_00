import React, { useState } from 'react';
import {NodeToolbar, Position, useReactFlow} from "@xyflow/react";
import "./custom-node-toolbar.css";

export default function CustomNodeToolbar(props) {
    const { deleteElements } = useReactFlow();
    // Estado para controlar la pestaña activa
    const [activeTab, setActiveTab] = useState('content'); // "content", "handles", o "extra"

    // Filtrar los handles en "target" y "source"
    const targetHandles = props.handles?.filter(handle => handle.type === 'target');
    const sourceHandles = props.handles?.filter(handle => handle.type === 'source');

    const handleDelete = () => {
        if (!props.data?.isProtected) {
            console.log(props.nodeId)
            deleteElements({ nodes: [{ id: props.nodeId }] });
        }
    };

    return (
        <NodeToolbar
            align={"start"}
            position={props.position || Position.Right}
        >
            <div className={"nodrag"}>
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
                            Handles
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
                            <div>{props.data?.label || 'No label provided'}</div>
                            {props.children}
                            <br/>
                            <button
                                className={"delete"}
                                onClick={handleDelete}
                                disabled={props.data?.isProtected}
                            >🗑️</button>
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
                                                <br/>  Bits: {handle.bits || 'Nan'}
                                                <br/>  Num: {handle.connectioncount || "∞"}

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
                                                <br/>  Bits: {handle.bits || 'Nan'}
                                                <br/>  Num: {handle.connectioncount || "∞"}

                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>No hay handles de tipo source.</p>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="extra-tab">
                            <div className={"node-toolbar-section-title"}>Extra</div>
                            <p>Este es el contenido extra que se muestra al seleccionar la pestaña "Extra Info".</p>
                        </div>
                    )}
                </div>
            </div>

        </NodeToolbar>
    );
}
