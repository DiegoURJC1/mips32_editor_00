import {
    addEdge,
    Background,
    ControlButton,
    Controls,
    getViewportForBounds,
    MiniMap,
    ReactFlow,
    useReactFlow
} from "@xyflow/react";
import {handleDownload} from "../common/downloadImage.js";
import {useCallback} from "react";
import {useAppStore} from "../../store.js";
import {DEFAULT_ALGORITHM} from "../../edges/EditableEdge/constants.js";
import {edgeTypes} from "../../edges/edgeTypes.js";
import {ConnectionLine} from "../../edges/ConnectionLine.js";
import {validateConnection} from "../common/reactFlowProps.js";
import {defaultSettings, vpcStates} from "../../common-data/settings.js";

const proOptions = { hideAttribution: true };

import { nodeTypes as mipsNodeTypes } from "../mips/nodes/common/nodeTypes.js";
import { nodeTypes as statesNodeTypes } from './nodes/common/nodeTypes.js';
import {useThemeContext} from "../../contexts/ThemeContext.jsx";
import {useFlowMIPS} from "../../contexts/FlowMIPSContext.jsx";
const allNodeTypes = {
    ...mipsNodeTypes,
    ...statesNodeTypes,
};

export function FlowStates(props) {
    const { getNodes } = useReactFlow();
    const { theme } = useThemeContext();
    const onClickDownload = () => {
        handleDownload(getNodes, getViewportForBounds, theme, 1);
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


    return (
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

            fitView
            snapToGrid={true}
            snapGrid={[props.settings.grid.x, props.settings.grid.y]}
            translateExtent={
                [[
                    vpcStates.translateExtentCoordinates.minX,
                    vpcStates.translateExtentCoordinates.minY
                ], [
                    vpcStates.translateExtentCoordinates.maxX,
                    vpcStates.translateExtentCoordinates.maxY
                ]]
            }
            nodeExtent={
                [[
                    vpcStates.nodeExtentCoordinates.minX,
                    vpcStates.nodeExtentCoordinates.minY
                ], [
                    vpcStates.nodeExtentCoordinates.maxX,
                    vpcStates.nodeExtentCoordinates.maxY
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
            <MiniMap/>
            <Background
                variant="dots"
                gap={defaultSettings.grid.gap}
                offset={props.settings.grid.offset}
                size={1}
            />
        </ReactFlow>
    );
}