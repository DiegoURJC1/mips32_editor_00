import React, {useCallback, useEffect, useRef, useState} from 'react';
import {ReactFlowProvider, useEdgesState, useNodesState, useReactFlow} from '@xyflow/react';
import './App.css'
import '@xyflow/react/dist/style.css';
import SidePanel from "./modules/side-panel/SidePanel.jsx";
import {initialNodes as initialNodesMips} from "./flows/mips/initial-elements/initialNodes.js";
import {initialNodes as initialNodesStates} from "./flows/states/initial-elements/initialNodes.js";
import {DnDProvider, useDnD} from "./modules/side-panel/DnDContext.jsx";
import {FlowMIPS} from "./flows/mips/FlowMIPS.jsx";
import './xy-theme.css'
import TopBar from "./modules/top-bar/TopBar.jsx";
import {FlowStates} from "./flows/states/FlowStates.jsx";
import TablePanel from "./flows/table/TablePanel.jsx";
import {defaultSettings} from "./common-data/settings.js";
import {initialEdges as initialEdgesMips} from "./flows/mips/initial-elements/initialEdges.js";
import {initialEdges as initialEdgesStates} from "./flows/states/initial-elements/initialEdges.js";
import {FlowMIPSProvider, useFlowMIPS} from "./hooks/FlowMIPSContext.jsx";
import {numberHandleList} from "./flows/mips/nodes/common/handles/handleLists.js";


let id = 0;
const getId = () => `dndNode_${id++}`;



export const App = () => {
    /**
     * Table hooks
     *
     */
    const [currentPanel, setCurrentPanel] = useState(0);

    const [nodesMips, setNodesMips, onNodesChangeMipsBase] = useNodesState(initialNodesMips);
    const [nodesStates, setNodesStates, onNodesChangeStatesBase] = useNodesState(initialNodesStates);

    const [edgesMips, setEdgesMips, onEdgesChangeMipsBase] = useEdgesState(initialEdgesMips);
    const [edgesStates, setEdgesStates, onEdgesChangeStatesBase] = useEdgesState(initialEdgesStates);

    const [numberOfStates, setNumberOfStates] = useState(initialNodesStates().length)
    const [settings, setSettings] = useState(defaultSettings);

    const {
        removeOrientation, removeMultiplexer,
        addRow, removeRow,
        infoPanelTypes, activeInfoPanel, setActiveInfoPanel,
        registerNumberNode, unregisterNumberNode
    } = useFlowMIPS();
    const onNodesChangeMips = useCallback((changes) => {
        let updatedNodes = [...nodesMips];

        const filteredChanges = changes.filter(change => {
            if (change.type === 'remove') {
                const deletedNode = updatedNodes.find(node => node.id === change.id);
                if (deletedNode?.data?.isProtected) {
                    // ❌ Evita eliminar el nodo protegido
                    return false;
                }

                // Limpieza de estructuras internas
                if (deletedNode?.type === 'logicGate') {
                    removeOrientation(deletedNode.id);
                } else if (deletedNode?.type === 'multiplexer') {
                    removeMultiplexer(deletedNode.id);
                } else if (deletedNode?.data.nodeClass === 'number') {
                    unregisterNumberNode(deletedNode.id);
                }

                updatedNodes = updatedNodes.filter(node => node.id !== deletedNode.id);
                setNodesMips(updatedNodes);
            }

            return true;
        });

        if (filteredChanges.length > 0) {
            onNodesChangeMipsBase(filteredChanges);
        }
    }, [nodesMips, setNodesMips, removeOrientation, removeMultiplexer, unregisterNumberNode, onNodesChangeMipsBase]);
    const onEdgesChangeMips = useCallback((changes) => {
        // Si solo hay un cambio y es eliminar un edge, lo dejamos pasar sin filtros
        if (
            changes.length === 1 &&
            changes[0].type === 'remove'
        ) {
            onEdgesChangeMipsBase(changes);
            return;
        }

        const protectedNodeIds = nodesMips
            .filter(n => n.data?.isProtected)
            .map(n => n.id);

        const filteredChanges = changes.filter(change => {
            if (change.type === 'remove') {
                const edge = edgesMips.find(e => e.id === change.id);
                if (!edge) return true;

                const sourceIsProtected = protectedNodeIds.includes(edge.source);
                const targetIsProtected = protectedNodeIds.includes(edge.target);

                const sourceNodeExists = nodesMips.some(n => n.id === edge.source);
                const targetNodeExists = nodesMips.some(n => n.id === edge.target);

                const nodeStillExists = sourceNodeExists && targetNodeExists;

                if ((sourceIsProtected || targetIsProtected) && nodeStillExists) {
                    return false;
                }
            }

            return true;
        });

        if (filteredChanges.length > 0) {
            onEdgesChangeMipsBase(filteredChanges);
        }
    }, [edgesMips, nodesMips, onEdgesChangeMipsBase]);





    const onNodesChangeStates = useCallback((changes) => {
        let updatedNodes = [...nodesStates];
        let dontDelete = false;
        changes.forEach(change => {
            if (change.type === 'remove') {
                const deletedNode = updatedNodes.find(node => node.id === change.id);
                if (deletedNode.data.isProtected === true) {
                    dontDelete = true;
                    return
                }
                if (deletedNode) {
                    const deletedStateNumber = deletedNode.data.statesNumber;
                    console.log(`Node deleted: ${change.id} with state number: ${deletedStateNumber}`);

                    // Remove the corresponding row
                    removeRow(deletedStateNumber);

                    // Update state numbers of remaining nodes
                    updatedNodes = updatedNodes.map(node => {
                        if (node.id !== change.id && node.data.statesNumber > deletedStateNumber) {
                            return {
                                ...node,
                                data: {
                                    ...node.data,
                                    statesNumber: node.data.statesNumber - 1,
                                },
                            };
                        }
                        return node;
                    });

                    // Apply the updated nodes list to state
                    setNodesStates(updatedNodes);
                    setNumberOfStates(n => n - 1);
                } else {
                    console.warn(`Node with id ${change.id} not found.`);
                }
            }
        });
        if (!dontDelete) {
            onNodesChangeStatesBase(changes);
        }
    }, [nodesStates, onNodesChangeStatesBase, removeRow, setNodesStates]);

    const onEdgesChangeStates = useCallback((changes) => {
        // Permitir eliminar si es un único cambio (edge seleccionado manualmente)
        if (
            changes.length === 1 &&
            changes[0].type === 'remove'
        ) {
            onEdgesChangeStatesBase(changes);
            return;
        }

        const filteredChanges = changes.filter(change => {
            if (change.type === 'remove') {
                const edge = edgesStates.find(e => e.id === change.id);
                if (!edge) return true;

                const sourceNode = nodesStates.find(n => n.id === edge.source);
                const targetNode = nodesStates.find(n => n.id === edge.target);

                const sourceIsProtected = sourceNode?.data?.isProtected;
                const targetIsProtected = targetNode?.data?.isProtected;

                if (sourceIsProtected || targetIsProtected) {
                    return false; // bloquear eliminación si está conectado a nodos protegidos
                }
            }

            return true;
        });

        if (filteredChanges.length > 0) {
            onEdgesChangeStatesBase(filteredChanges);
        }
    }, [edgesStates, nodesStates, onEdgesChangeStatesBase]);

    // Update States node when table changes
    useEffect(() => {
        setNodesStates((prevNodes) =>
            prevNodes.map((node) => ({
                ...node,
                data: {
                    ...node.data,
                },
            }))
        );
    }, [setNodesStates]);

    /**
     *
     */

    /**
     *  Drag and drop
     *
     */
    const reactFlowWrapper = useRef(null);
    const { screenToFlowPosition } = useReactFlow();
    const [type] = useDnD();

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);
    const onDrop = useCallback(
        (event) => {
            event.preventDefault();
            console.log(type)
            if (!type) {
                return;
            }

            const position = screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });

            let label;
            switch (type) {
                case 'and':
                    label = 'AND';
                    break;
                case 'or':
                    label = 'OR';
                    break;
                case 'not':
                    label = 'NOT';
                    break;
                case 'multiplexer':
                    label = 'Mul';
                    break;
                case 'number':
                    label = '4';
                    break;
                case 'state':
                    label = 'Estado';
                    break;
                default:
                    label = `${type} node`;
            }

            const upperType = type.toUpperCase();
            const isLogicGate = ['and', 'or', 'not'].includes(type);
            const isNumber = type === 'number'
            let newNode;

            if (currentPanel === 0) {
                if (isNumber) {
                    let newId = getId();
                    newNode = {
                        id: newId,
                        type: 'mipsGeneral',
                        position,
                        data: {
                            nodeClass: 'number',
                            label: '4',
                            isProtected: false,
                            handles: numberHandleList,
                            size: {
                                width: 40,
                                height: 40,
                            }
                        },
                    };

                    registerNumberNode(newId, '4');
                } else {
                    newNode = {
                        id: getId(),
                        type: isLogicGate ? 'logicGate' : type,
                        position,
                        data: {
                            label,
                            ...(isLogicGate && {
                                type: upperType,
                            }),
                        },
                    };
                }

                setNodesMips((nds) => nds.concat(newNode));
            } else if (currentPanel === 1) {
                const numNodes = numberOfStates;
                setNumberOfStates(numNodes + 1);
                newNode = {
                    id: getId(),
                    type,
                    position,
                    data: {
                        label: label,
                        statesNumber: numNodes,
                    },
                };
                addRow();
                setNodesStates((nds) => nds.concat(newNode));
                console.log("NumNodes: ", numNodes);
                console.log("numberOfStates: ", numberOfStates);
            }
        },
        [type, screenToFlowPosition, currentPanel, setNodesMips, registerNumberNode, numberOfStates, addRow, setNodesStates]
    );


    /**
     * Settings handling
     *
     */
    const handleUpdateSettingsGrid = (grid) => {
        setSettings({
            ...settings,
            grid: {
                x: grid.target.value,
                y: grid.target.value,
                gap: grid.target.value,
                offset: grid.target.value,
            },
        });
    };

    const handleResetSettings = () => {
        setSettings(defaultSettings);
        console.log("Settings set to default");
        console.log(settings);
    };



    return (
        <div className="content-wrapper">
            {activeInfoPanel === infoPanelTypes.about && (
                <div className={"about-panel-background"} onClick={() => {setActiveInfoPanel(infoPanelTypes.none)}}>
                    <div className={"about-panel"} onClick={(e) => {e.stopPropagation()}}>
                        <div className={"info-panel-title"}>Acerca de</div>
                        <div className={"info-panel-content"}>
                            Proyecto realizado por Diego Gil Luengo.<br/><br/>
                            Estudiante de la Universidad Rey Juan Carlos en el grado de Ingeniería de Computadores.
                        </div>
                    </div>
                </div>
            )}
            <TopBar
                currentPanel={currentPanel}
                setCurrentPanel={setCurrentPanel}
            />
            <div className="main-content-wrapper">
                {currentPanel === 0 && (
                    <>
                        <SidePanel
                            currentPanel={currentPanel}
                            settings={settings}

                            onChangeGrid={handleUpdateSettingsGrid}
                            onClickResetButton={handleResetSettings}
                        />
                        <div className="flow-wrapper" ref={reactFlowWrapper}>
                            <FlowMIPS
                                // Nodes and Edges
                                nodes={nodesMips}
                                edges={edgesMips}
                                onNodesChange={onNodesChangeMips}
                                onEdgesChange={onEdgesChangeMips}
                                setEdges={setEdgesMips}
                                // Drag and Drop
                                onDrop={onDrop}
                                onDragOver={onDragOver}
                                // Settings
                                settings={settings}
                            />
                        </div>
                    </>
                )}
                {currentPanel === 1 && (
                    <>
                        <SidePanel
                            currentPanel={currentPanel}
                            settings={settings}

                            onChangeGrid={handleUpdateSettingsGrid}
                            onClickResetButton={handleResetSettings}
                        />
                        <div className="flow-wrapper" ref={reactFlowWrapper}>
                            <FlowStates
                                nodes={nodesStates}
                                edges={edgesStates}
                                onNodesChange={onNodesChangeStates}
                                onEdgesChange={onEdgesChangeStates}
                                setEdges={setEdgesStates}

                                onDrop={onDrop}
                                onDragOver={onDragOver}

                                settings={settings}
                            />
                        </div>
                    </>
                )}
                {currentPanel === 2 && (
                    <TablePanel/>
                )}
            </div>
        </div>
    );
}
// eslint-disable-next-line react-refresh/only-export-components
export default () => (
    <ReactFlowProvider>
        <FlowMIPSProvider>
            <DnDProvider>
                <App />
            </DnDProvider>
        </FlowMIPSProvider>
    </ReactFlowProvider>
);
