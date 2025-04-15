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
import {useThemeContext} from "../../hooks/ThemeContext.jsx";
const allNodeTypes = {
    ...mipsNodeTypes,
    ...statesNodeTypes,
};

export function FlowMIPS(props) {
    const { getNodes } = useReactFlow();
    const { theme } = useThemeContext();
    const onClickDownload = () => {
        handleDownload(getNodes, getViewportForBounds, theme);
    };

    const onConnect = useCallback(
        (connection) => {
            const { connectionLinePath } = useAppStore.getState();

            // Creamos un nuevo "edge" basado en el algoritmo seleccionado
            // y transferimos todos los puntos de control desde connectionLinePath
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

            props.setEdges((edges) => addEdge(edge, edges));
        },
        [props]
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
            snapGrid={[props.settings.grid.x, props.settings.grid.y]}
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
            >
                <ControlButton onClick={onClickDownload}>
                    D
                </ControlButton>
            </Controls>
            <MiniMap
                nodeColor={nodeColor}
            />
            <Background
                variant="dots"
                gap={defaultSettings.grid.gap}
                offset={props.settings.grid.offset}
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