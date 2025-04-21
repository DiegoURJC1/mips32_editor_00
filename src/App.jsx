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

    const [edgesMips, setEdgesMips, onEdgesChangeMips] = useEdgesState(initialEdgesMips);
    const [edgesStates, setEdgesStates, onEdgesChangeStates] = useEdgesState(initialEdgesStates);

    const [numberOfStates, setNumberOfStates] = useState(initialNodesStates().length)
    const [settings, setSettings] = useState(defaultSettings);

    const { removeOrientation, removeMultiplexer, addRow, removeRow, infoPanelTypes, activeInfoPanel, setActiveInfoPanel, } = useFlowMIPS();
    const onNodesChangeMips = useCallback((changes) => {
        let updatedNodes = [...nodesMips];

        changes.forEach(change => {
            if (change.type === 'remove') {
                const deletedNode = updatedNodes.find(node => node.id === change.id);

                if (deletedNode) {
                    // Limpieza de datos según el tipo de nodo
                    if (deletedNode.type === 'logicGate') {
                        removeOrientation(deletedNode.id);
                    } else if (deletedNode.type === 'multiplexer') {
                        removeMultiplexer(deletedNode.id);
                    }

                    // Eliminar nodo del estado local
                    updatedNodes = updatedNodes.filter(node => node.id !== deletedNode.id);
                    setNodesMips(updatedNodes);
                }
            }
        });

        onNodesChangeMipsBase(changes);
    }, [nodesMips, onNodesChangeMipsBase, setNodesMips, removeOrientation, removeMultiplexer]);

    const onNodesChangeStates = useCallback((changes) => {
        let updatedNodes = [...nodesStates];

        changes.forEach(change => {
            if (change.type === 'remove') {
                const deletedNode = updatedNodes.find(node => node.id === change.id);

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

        onNodesChangeStatesBase(changes);
    }, [nodesStates, onNodesChangeStatesBase, removeRow, setNodesStates]);
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
                case 'state':
                    label = 'Estado';
                    break;
                default:
                    label = `${type} node`;
            }

            const upperType = type.toUpperCase();
            const isLogicGate = ['and', 'or', 'not'].includes(type);
            let newNode;

            if (currentPanel === 0) {
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
        [type, screenToFlowPosition, currentPanel, setNodesMips, numberOfStates, addRow, setNodesStates]
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
