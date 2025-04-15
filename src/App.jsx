import React, {useCallback, useRef, useState} from 'react';
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
import {ThemeProvider, useThemeContext} from "./hooks/ThemeContext.jsx";
import {statesData, headersData} from "./common-data/statesData.js";
import {useTable} from "./hooks/useTable.jsx";


let id = 0;
const getId = () => `dndNode_${id++}`;



export const App = () => {
    const [currentPanel, setCurrentPanel] = useState(0);

    const [nodesMips, setNodesMips, onNodesChangeMips] = useNodesState(initialNodesMips);
    const [nodesStates, setNodesStates, onNodesChangeStates] = useNodesState(initialNodesStates);

    const [edgesMips, setEdgesMips, onEdgesChangeMips] = useEdgesState(initialEdgesMips);
    const [edgesStates, setEdgesStates, onEdgesChangeStates] = useEdgesState(initialEdgesStates);

    const reactFlowWrapper = useRef(null);
    const { screenToFlowPosition } = useReactFlow();
    const [type] = useDnD();

    const { theme } = useThemeContext();
    const [settings, setSettings] = useState(defaultSettings);

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
                            type: upperType, // logicGateType como 'AND'
                            isLeftOrientation: false,
                        }),
                    },
                };
                setNodesMips((nds) => nds.concat(newNode));
            } else if (currentPanel === 1) {
                newNode = {
                    id: getId(),
                    type,
                    position,
                    data: {
                        label: label,
                        statesNumber: 9,
                    },
                };
                setNodesStates((nds) => nds.concat(newNode));
            }
        },
        [screenToFlowPosition, setNodesMips, setNodesStates, type, currentPanel, theme] // <- dependencias corregidas
    );


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

    /**
     * Table hooks
     *
     */
    console.log("In App: ",headersData);
    console.log("In App: ",statesData);
    const {
            headers,
            data,
            addColumn,
            removeColumn,
            addRow,
            removeRow,
            getRowNumberInBinary,
            editCell,
            editHeader
        } = useTable(headersData, statesData);

    console.log("In App2: ",headers);
    console.log("In App2: ",data);

    return (
        <div className="content-wrapper">
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
                                nodes={nodesMips}
                                edges={edgesMips}
                                onNodesChange={onNodesChangeMips}
                                onEdgesChange={onEdgesChangeMips}
                                setEdges={setEdgesMips}

                                onDrop={onDrop}
                                onDragOver={onDragOver}
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
                    <TablePanel
                        headers={headers}
                        data={data}
                        removeColumn={removeColumn}
                        removeRow={removeRow}
                        getRowNumberInBinary={getRowNumberInBinary}
                        editCell={editCell}
                        editHeader={editHeader}
                    />
                )}
            </div>
        </div>
    );
}
// eslint-disable-next-line react-refresh/only-export-components
export default () => (
    <ReactFlowProvider>
        <DnDProvider>
            <ThemeProvider>
                <App />
            </ThemeProvider>
        </DnDProvider>
    </ReactFlowProvider>
);
