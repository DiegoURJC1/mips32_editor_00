import {
    addEdge,
    Background,
    ControlButton,
    Controls,
    getViewportForBounds,
    MiniMap,
    ReactFlow,
    useReactFlow,
} from "@xyflow/react";
import "./nodes/common/node-mips-stylesheet.css"

//import {nodeTypes} from "./nodes/common/nodeTypes.js";
import {ConnectionLine} from "../../edges/ConnectionLine.js";
import {DEFAULT_ALGORITHM} from "../../edges/EditableEdge/constants.ts";
import {useCallback} from "react";
import {useAppStore} from "../../store.ts";
import {handleDownload} from "../common/downloadImage.js";
import {edgeTypes} from "../../edges/edgeTypes.js";
import {
    defaultSettings,
    vpcMips
} from "../../common-data/settings.js";
import {validateConnection} from "../common/reactFlowProps.js";




const proOptions = { hideAttribution: true };

import { nodeTypes as mipsNodeTypes } from "./nodes/common/nodeTypes.js";
import { nodeTypes as statesNodeTypes } from '../states/nodes/common/nodeTypes.js';
import {useThemeContext} from "../../contexts/ThemeContext.jsx";
import {useFlowMIPS} from "../../contexts/FlowMIPSContext.jsx";
const allNodeTypes = {
    ...mipsNodeTypes,
    ...statesNodeTypes,
};

export function FlowMIPS(props) {
    const { getNodes } = useReactFlow();
    const { theme } = useThemeContext();
    const { addConnection } = useFlowMIPS();
    const onClickDownload = () => {
        handleDownload(getNodes, getViewportForBounds, theme, 0);
    };
    const {
        settings,
    } = useFlowMIPS();
    const onConnect = useCallback(
        (connection) => {
            console.log(connection);
            const { connectionLinePath } = useAppStore.getState();

            // Creamos un nuevo "edge" basado en el algoritmo seleccionado
            const edge = {
                ...connection,
                id: `${Date.now()}-${connection.source}-${connection.target}`,
                type: 'editable-edge',
                selected: true,
                data: {
                    algorithm: DEFAULT_ALGORITHM,
                    points: connectionLinePath.map((point, i) => ({
                        ...point,
                        id: window.crypto.randomUUID(),
                        prev: i === 0 ? undefined : connectionLinePath[i - 1],
                        active: true,
                    })),
                },
            };


            // Actualizamos las edges en el flow
            props.setEdges((edges) => addEdge(edge, edges));
            console.log(edge);
            const nodes = getNodes();
            const sourceNode = nodes.find((node) => node.id === connection.source);
            const sourceHandle = sourceNode?.data?.handles?.find((handle) => handle.id === connection.sourceHandle);
            console.log("sourceHandle: " + sourceHandle);
            const assignedBits = sourceHandle?.bits ?? 0;  // Si no tiene 'bits', usamos 0 como valor predeterminado
            console.log("assignedBits: " + assignedBits);
            // Llamamos a addConnection para agregar la conexión
            addConnection(
                connection.source,           // origen del nodo
                connection.sourceHandle,     // handle de origen
                connection.target,           // destino del nodo
                connection.targetHandle,     // handle de destino
                assignedBits                 // Pasamos assignedBits desde el sourceHandle
            );
        }, [props, getNodes]
    );



    return(
        <ReactFlow
            nodes={props.nodes}
            edges={props.edges}
            onNodesChange={props.onNodesChange}
            onEdgesChange={props.onEdgesChange}
            onConnect={onConnect}

            onDrop={props.onDrop}
            onDragOver={props.onDragOver}

            nodeTypes={allNodeTypes}
            edgeTypes={edgeTypes}

            isValidConnection={validateConnection}

            // Viewport props
            fitView
            snapToGrid={true}
            snapGrid={[settings.grid.x, settings.grid.y]}
            translateExtent={
                [[
                    vpcMips.translateExtentCoordinates.minX,
                    vpcMips.translateExtentCoordinates.minY
                ], [
                    vpcMips.translateExtentCoordinates.maxX,
                    vpcMips.translateExtentCoordinates.maxY
                ]]
            }
            nodeExtent={
                [[
                    vpcMips.nodeExtentCoordinates.minX,
                    vpcMips.nodeExtentCoordinates.minY
                ], [
                    vpcMips.nodeExtentCoordinates.maxX,
                    vpcMips.nodeExtentCoordinates.maxY
                ]]
            }
            proOptions={proOptions}
            colorMode={theme}

            zoomOnDoubleClick={false}

            connectionLineComponent={ConnectionLine}
        >
            <Controls
                position={"top-right"}
                orientation={"horizontal"}
                style={{backgroundColor: "var(--background-color)"}}
            >
                <ControlButton onClick={onClickDownload}>
                    D
                </ControlButton>
            </Controls>
            {settings.minimap &&
                <MiniMap
                    nodeColor={nodeColor}
                />
            }
            <Background
                variant="dots"
                gap={defaultSettings.grid.gap}
                offset={settings.grid.offset}
                size={1}
            />
        </ReactFlow>
    );
}

const defaultNodeColor = getComputedStyle(document.body).getPropertyValue('--xy-node-background-color-default').trim();
function nodeColor(node) {
    switch (node.type) {
        case 'control':
        case 'aluControl':
            return 'var(--control-color)';
        default:
            return defaultNodeColor;
    }
}