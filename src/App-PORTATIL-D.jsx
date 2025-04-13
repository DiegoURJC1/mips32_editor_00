import React, {useCallback, useState} from 'react';
import {
    ReactFlow,
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge, applyEdgeChanges, applyNodeChanges, Position, ControlButton, Panel,
} from '@xyflow/react';
import './App.css'
import '@xyflow/react/dist/style.css';

const initialNodes = [
    {
        id: '1',
        type: 'input',
        data: { label: 'Input Node' },
        position: { x: 0, y: 0 },
    },

    {
        id: '2',
        // you can also pass a React component as a label
        data: { label: <div>Default Node</div> },
        position: { x: 100, y: 125 },
    },
    {
        id: '3',
        type: 'output',
        data: { label: 'Output Node' },
        position: { x: 250, y: 250 },
    },
];

const initialEdges = [
    { id: 'e1-2', source: '1', target: '2' },
    { id: 'e2-3', source: '2', target: '3', animated: true },
];

const defaultEdgeOptions = { type: 'straight',animated: true };

const proOptions = { hideAttribution: true };

export default function App() {
    const [nodes, setNodes] = useNodesState(initialNodes);
    const [edges, setEdges] = useEdgesState(initialEdges);

    const [visibleSidePanel, setVisibleSidePanel] = useState(true);

    const [settings, setSettings] = useState({
        grid: {
            x: 10,
            y: 10,
            gap: 10,
            offset: 10,
        },
        colorMode: {
            dark: 'dark',
            light: 'light',
            system: 'system',
        }
    });

    const handleUpdateSettingsGrid = (e) => {
        setSettings({
            ...settings,
            grid: {
                x: e,
                y: e,
                gap: e,
                offset: e,
            },
        });
    };

    const onNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [setNodes],
    );
    const onEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [setEdges],
    );
    /*
    const onConnect = useCallback(
        (params) =>
            setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );*/
    const onConnect = useCallback(
        (connection) =>
            setEdges((eds) => addEdge({ ...connection, animated: true }, eds)),
        [setEdges],
    );


    return (
        <div className="all">
            <div className="top-bar">
                a
            </div>
            <div className="flow-wrapper">
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}

                    snapToGrid={true}
                    snapGrid={[settings.grid.x,settings.grid.y]}

                    //defaultEdgeOptions={defaultEdgeOptions}
                    fitView
                    proOptions={proOptions}
                    colorMode={settings.colorMode.light}
                >
                    <Controls
                        position={"top-right"}
                        orientation={"horizontal"}
                    >
                        <ControlButton onClick={() => alert('Something magical just happened. ✨')}>
                            B
                        </ControlButton>
                    </Controls>
                    <Panel>
                        <button onClick={() => setVisibleSidePanel(!visibleSidePanel)}>
                            SidePanel
                        </button>
                        {visibleSidePanel &&
                            <div style={{ backgroundColor: 'lightsalmon', height: '100vh' }}>
                                <div>x: {settings.grid.x} y: {settings.grid.y}</div>
                                <div>g: {settings.grid.gap} o: {settings.grid.offset}</div>
                                <button onClick={() => handleUpdateSettingsGrid(10)}>10px</button>
                                <button onClick={() => handleUpdateSettingsGrid(20)}>20px</button>
                                <button onClick={() => handleUpdateSettingsGrid(40)}>40px</button>
                            </div>
                        }

                    </Panel>
                    <MiniMap />
                    <Background
                        variant="dots"
                        gap={settings.grid.gap}
                        offset={settings.grid.offset}
                        size={1}
                    />
                </ReactFlow>
            </div>
        </div>

    );
}

